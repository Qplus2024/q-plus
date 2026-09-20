import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/**
 * Translates site content (property titles, descriptions, feature blocks...)
 * on demand.
 *
 * Every translation is cached in the `ai_translations` table, so each distinct
 * piece of text is only ever sent to the AI gateway once, no matter how many
 * visitors read it. If the cache table is missing or unreachable the function
 * still works — it just pays for the translation again next time.
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAX_TEXTS = 40;
const MAX_TOTAL_CHARS = 12000;
const MODEL = "google/gemini-3-flash-preview";

const LANGUAGE_NAMES: Record<string, string> = {
  es: "Spanish (Colombian)",
  en: "English",
};

interface RequestBody {
  texts: string[];
  target?: string;
  source?: string;
}

/** FNV-1a — must produce the same value as the client-side helper. */
function hashText(value: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16);
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function getServiceClient() {
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return null;
  try {
    return createClient(url, key, { auth: { persistSession: false } });
  } catch {
    return null;
  }
}

/** Ask the model for the whole batch in one call and parse its JSON array. */
async function translateBatch(
  texts: string[],
  sourceLang: string,
  targetLang: string,
  apiKey: string,
): Promise<string[]> {
  const sourceName = LANGUAGE_NAMES[sourceLang] ?? sourceLang;
  const targetName = LANGUAGE_NAMES[targetLang] ?? targetLang;

  const systemPrompt = `You are a professional translator for a Colombian real estate agency.
Translate from ${sourceName} to ${targetName}.

RULES:
- Return ONLY a JSON array of strings, same length and same order as the input. No markdown, no commentary.
- Translate item by item. Never merge, split, reorder or drop items.
- Keep proper nouns untranslated: place names (El Retiro, Sabaneta, Copacabana, Envigado, Antioquia, Medellín, El Poblado), neighbourhood names, building names, brand names and the company name "Q+ Inmobiliaria".
- Keep numbers, prices, currency codes (COP, USD), measurements (m², m2) and units exactly as they are.
- Preserve the original line breaks, capitalisation style (if the source is ALL CAPS, keep it ALL CAPS) and punctuation style.
- If an item is already in ${targetName}, or is just a number or a proper noun, return it unchanged.
- Use natural, professional real estate wording aimed at international buyers.`;

  const userPrompt = `Translate these ${texts.length} items and return a JSON array of ${texts.length} strings:

${JSON.stringify(texts, null, 2)}`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("AI gateway error:", response.status, errorText);
    throw new Error(`AI gateway error: ${response.status}`);
  }

  const data = await response.json();
  const content: string = data.choices?.[0]?.message?.content?.trim() ?? "";

  // The model occasionally wraps the array in a ```json fence.
  const cleaned = content
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("[");
    const end = cleaned.lastIndexOf("]");
    if (start === -1 || end === -1) throw new Error("Translation response was not JSON");
    parsed = JSON.parse(cleaned.slice(start, end + 1));
  }

  if (!Array.isArray(parsed) || parsed.length !== texts.length) {
    throw new Error("Translation response did not match the requested items");
  }

  return parsed.map((value, index) =>
    typeof value === "string" && value.trim().length > 0 ? value : texts[index]
  );
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: RequestBody = await req.json();
    const target = body.target === "es" ? "es" : "en";
    const source = body.source === "en" ? "en" : "es";

    const texts = Array.isArray(body.texts)
      ? body.texts.filter((t): t is string => typeof t === "string" && t.trim().length > 0)
      : [];

    if (texts.length === 0) {
      return json({ translations: [] });
    }
    if (texts.length > MAX_TEXTS) {
      return json({ error: `Too many items (max ${MAX_TEXTS})` }, 400);
    }
    if (texts.reduce((total, t) => total + t.length, 0) > MAX_TOTAL_CHARS) {
      return json({ error: "Payload too large" }, 400);
    }
    if (source === target) {
      return json({ translations: texts });
    }

    const supabase = getServiceClient();
    const results = new Map<string, string>();
    const hashes = texts.map((text) => hashText(`${source}:${target}:${text}`));

    // 1. Server-side cache
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from("ai_translations")
          .select("hash, translated_text")
          .in("hash", hashes);

        if (!error && Array.isArray(data)) {
          const byHash = new Map(
            data.map((row: { hash: string; translated_text: string }) => [
              row.hash,
              row.translated_text,
            ])
          );
          texts.forEach((text, index) => {
            const hit = byHash.get(hashes[index]);
            if (typeof hit === "string") results.set(text, hit);
          });
        }
      } catch (err) {
        console.warn("Translation cache unavailable, continuing without it:", err);
      }
    }

    const missing = texts.filter((text) => !results.has(text));

    // 2. Translate whatever is left
    if (missing.length > 0) {
      const apiKey = Deno.env.get("LOVABLE_API_KEY");
      if (!apiKey) {
        console.error("LOVABLE_API_KEY is not configured");
        return json({ translations: texts });
      }

      let translated: string[];
      try {
        translated = await translateBatch(missing, source, target, apiKey);
      } catch (err) {
        console.error("Translation failed, returning source text:", err);
        return json({ translations: texts.map((text) => results.get(text) ?? text) });
      }

      missing.forEach((text, index) => results.set(text, translated[index]));

      // 3. Store for next time
      if (supabase) {
        try {
          const rows = missing.map((text, index) => ({
            hash: hashText(`${source}:${target}:${text}`),
            source_lang: source,
            target_lang: target,
            source_text: text,
            translated_text: translated[index],
          }));
          await supabase.from("ai_translations").upsert(rows, { onConflict: "hash" });
        } catch (err) {
          console.warn("Could not write to the translation cache:", err);
        }
      }
    }

    return json({ translations: texts.map((text) => results.get(text) ?? text) });
  } catch (error) {
    console.error("Error in translate:", error);
    return json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
});
