import { useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/i18n/LanguageContext';

/**
 * Automatic translation for content that lives in the database (property
 * titles and descriptions, feature blocks, investment names...).
 *
 * Interface copy is NOT handled here — that comes from `src/i18n/translations.ts`.
 *
 * Behaviour:
 *  - In Spanish it is a no-op: the original text is returned untouched.
 *  - In English it looks in the browser cache first, then asks the `translate`
 *    edge function for whatever is missing (which keeps its own server-side
 *    cache, so a given text is only ever paid for once).
 *  - If anything fails, the original Spanish text is shown. The page never
 *    breaks and never shows a blank space because of a translation.
 */

const CACHE_PREFIX = 'qplus-tr';
const MAX_TEXTS_PER_REQUEST = 40;

/** FNV-1a — small, fast, good enough to key a cache entry. */
function hashText(value: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16);
}

function cacheKey(text: string, target: string): string {
  return `${CACHE_PREFIX}:${target}:${hashText(text)}`;
}

function readCache(text: string, target: string): string | null {
  try {
    return window.localStorage.getItem(cacheKey(text, target));
  } catch {
    return null;
  }
}

function writeCache(text: string, target: string, translated: string): void {
  try {
    window.localStorage.setItem(cacheKey(text, target), translated);
  } catch {
    // storage full or unavailable — the server cache still does its job
  }
}

/**
 * Translate a list of strings. The returned array always has the same length
 * and order as the input; `null`/`undefined` entries come back as ''.
 */
export function useAutoTranslate(texts: (string | null | undefined)[]): string[] {
  const { language } = useLanguage();

  // Stable identity for the effect: the actual contents, not the array object.
  const serialized = JSON.stringify(texts ?? []);
  const source = useMemo<string[]>(
    () => (JSON.parse(serialized) as (string | null | undefined)[]).map((value) => value ?? ''),
    [serialized]
  );

  const [translations, setTranslations] = useState<Record<string, string>>({});
  const requestId = useRef(0);

  useEffect(() => {
    if (language === 'es') {
      // Drop any English results, but do not trigger a pointless re-render
      // when there is nothing to drop.
      setTranslations((previous) => (Object.keys(previous).length === 0 ? previous : {}));
      return;
    }

    const unique = Array.from(
      new Set(source.map((value) => value.trim()).filter((value) => value.length > 0))
    );
    if (unique.length === 0) return;

    const currentRequest = requestId.current + 1;
    requestId.current = currentRequest;

    const resolved: Record<string, string> = {};
    const missing: string[] = [];

    unique.forEach((text) => {
      const cached = readCache(text, language);
      if (cached !== null) resolved[text] = cached;
      else missing.push(text);
    });

    // Show whatever the cache already knows, immediately.
    if (Object.keys(resolved).length > 0) {
      setTranslations((previous) => ({ ...previous, ...resolved }));
    }

    if (missing.length === 0) return;

    let cancelled = false;

    const run = async () => {
      // Long lists are chunked so one big page never sends an oversized body.
      for (let i = 0; i < missing.length; i += MAX_TEXTS_PER_REQUEST) {
        const chunk = missing.slice(i, i + MAX_TEXTS_PER_REQUEST);

        try {
          const { data, error } = await supabase.functions.invoke('translate', {
            body: { texts: chunk, target: language, source: 'es' },
          });

          if (error) throw error;

          const list: unknown = data?.translations;
          if (!Array.isArray(list)) throw new Error('Unexpected translate response');

          const batch: Record<string, string> = {};
          chunk.forEach((text, index) => {
            const translated = list[index];
            if (typeof translated === 'string' && translated.trim().length > 0) {
              batch[text] = translated;
              writeCache(text, language, translated);
            }
          });

          if (cancelled || requestId.current !== currentRequest) return;
          if (Object.keys(batch).length > 0) {
            setTranslations((previous) => ({ ...previous, ...batch }));
          }
        } catch (err) {
          // Falling back to Spanish is an acceptable outcome, not a page error.
          console.warn('Automatic translation unavailable:', err);
          return;
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [language, source]);

  return useMemo(
    () =>
      source.map((value) => {
        if (!value) return '';
        if (language === 'es') return value;
        return translations[value.trim()] ?? value;
      }),
    [source, translations, language]
  );
}

/** Convenience wrapper for a single string. */
export function useAutoTranslateText(text: string | null | undefined): string {
  const single = useMemo(() => [text], [text]);
  return useAutoTranslate(single)[0];
}
