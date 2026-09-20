import { useLanguage } from '@/i18n/LanguageContext';
import { LANGUAGES, type Language } from '@/i18n/translations';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  className?: string;
  /** Stretch to the full width of its container (mobile menu) */
  fullWidth?: boolean;
}

const LABELS: Record<Language, string> = {
  es: 'ES',
  en: 'EN',
};

/** ES | EN segmented switch. */
const LanguageToggle = ({ className, fullWidth = false }: LanguageToggleProps) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.nav.languageLabel}
      className={cn(
        'inline-flex items-center rounded-lg border border-border bg-muted/50 p-0.5',
        fullWidth && 'w-full',
        className
      )}
    >
      {LANGUAGES.map((code) => {
        const isActive = language === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLanguage(code)}
            aria-pressed={isActive}
            lang={code}
            className={cn(
              'font-body text-xs font-semibold px-2.5 py-1 rounded-md transition-colors',
              fullWidth && 'flex-1',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {LABELS[code]}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageToggle;
