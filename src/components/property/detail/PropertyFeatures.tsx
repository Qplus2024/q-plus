import { lazy, Suspense, useMemo } from "react";
import { Check, LucideProps } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import type { BlockWithAttributes, BlockType } from "@/types/property";
import { useT } from "@/i18n/LanguageContext";
import { useAutoTranslate } from "@/hooks/useAutoTranslate";

interface PropertyFeaturesProps {
  blocks: BlockWithAttributes[];
  propertyValues: Record<string, string>;
}

/** Translates a piece of admin-entered text (block name, attribute, value). */
type Translate = (text: string) => string;

// Dynamic icon component
const DynamicIcon = ({
  name,
  ...props
}: { name: string } & Omit<LucideProps, "ref">) => {
  const kebabName = name
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase() as keyof typeof dynamicIconImports;

  if (!dynamicIconImports[kebabName]) {
    return null;
  }

  const IconComponent = lazy(dynamicIconImports[kebabName]);

  return (
    <Suspense fallback={<div className="w-5 h-5" />}>
      <IconComponent {...props} />
    </Suspense>
  );
};

const ChecklistDisplay = ({
  attributes,
  values,
  translate,
}: {
  attributes: BlockWithAttributes["attributes"];
  values: Record<string, string>;
  translate: Translate;
}) => {
  const activeAttributes = attributes.filter(
    (attr) => values[attr.id] === "true"
  );

  if (!activeAttributes.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {activeAttributes.map((attr) => (
        <div key={attr.id} className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <Check className="w-3 h-3 text-green-600" />
          </div>
          <span className="text-sm font-body text-foreground">{translate(attr.name)}</span>
        </div>
      ))}
    </div>
  );
};

const DetailsListDisplay = ({
  attributes,
  values,
  translate,
}: {
  attributes: BlockWithAttributes["attributes"];
  values: Record<string, string>;
  translate: Translate;
}) => {
  const filledAttributes = attributes.filter(
    (attr) => values[attr.id] && values[attr.id].trim() !== ""
  );

  if (!filledAttributes.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {filledAttributes.map((attr) => (
        <div key={attr.id} className="flex justify-between gap-2 py-2 border-b border-border last:border-0">
          <span className="text-sm text-muted-foreground">{translate(attr.name)}</span>
          <span className="text-sm font-medium text-foreground text-right">
            {translate(values[attr.id])}
          </span>
        </div>
      ))}
    </div>
  );
};

const FreeTextDisplay = ({
  attributes,
  values,
  translate,
}: {
  attributes: BlockWithAttributes["attributes"];
  values: Record<string, string>;
  translate: Translate;
}) => {
  const firstAttr = attributes[0];
  if (!firstAttr || !values[firstAttr.id]) return null;

  return (
    <p className="text-sm text-muted-foreground font-body leading-relaxed whitespace-pre-line">
      {translate(values[firstAttr.id])}
    </p>
  );
};

const PropertyFeatures = ({ blocks, propertyValues }: PropertyFeaturesProps) => {
  const t = useT();

  // Filter blocks that have at least one value
  const blocksWithValues = useMemo(
    () =>
      blocks.filter((block) =>
        block.attributes.some((attr) => {
          const value = propertyValues[attr.id];
          if (!value) return false;
          if (block.type === "checklist") return value === "true";
          return value.trim() !== "";
        })
      ),
    [blocks, propertyValues]
  );

  // Everything the admin typed that is actually rendered, gathered once so it
  // can be translated in a single batched request.
  const translatableStrings = useMemo(() => {
    const collected: string[] = [];

    blocksWithValues.forEach((block) => {
      collected.push(block.name);

      block.attributes.forEach((attr) => {
        const value = propertyValues[attr.id];
        if (!value || value.trim() === "") return;

        if (block.type === "checklist") {
          if (value === "true") collected.push(attr.name);
          return;
        }

        collected.push(attr.name);
        // "true"/"false" are flags, not prose — never send them anywhere.
        if (value !== "true" && value !== "false") collected.push(value.trim());
      });
    });

    return Array.from(new Set(collected.filter((text) => text && text.trim() !== "")));
  }, [blocksWithValues, propertyValues]);

  const translatedStrings = useAutoTranslate(translatableStrings);

  const translate = useMemo<Translate>(() => {
    const map = new Map<string, string>();
    translatableStrings.forEach((text, index) => {
      map.set(text, translatedStrings[index] || text);
    });
    return (text: string) => map.get(text?.trim()) ?? text;
  }, [translatableStrings, translatedStrings]);

  if (!blocksWithValues.length) return null;

  const renderBlockContent = (block: BlockWithAttributes) => {
    const blockType = block.type as BlockType;

    switch (blockType) {
      case "checklist":
        return (
          <ChecklistDisplay
            attributes={block.attributes}
            values={propertyValues}
            translate={translate}
          />
        );
      case "details_list":
        return (
          <DetailsListDisplay
            attributes={block.attributes}
            values={propertyValues}
            translate={translate}
          />
        );
      case "free_text":
        return (
          <FreeTextDisplay
            attributes={block.attributes}
            values={propertyValues}
            translate={translate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t.property.features}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blocksWithValues.map((block) => (
          <Card key={block.id} className="overflow-hidden">
            <CardHeader className="pb-3 bg-muted/30">
              <CardTitle className="flex items-center gap-2 text-base">
                {block.icon && (
                  <DynamicIcon
                    name={block.icon}
                    className="w-5 h-5 text-primary"
                  />
                )}
                {translate(block.name)}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {renderBlockContent(block)}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PropertyFeatures;
