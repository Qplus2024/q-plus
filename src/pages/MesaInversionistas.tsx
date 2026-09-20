import { Youtube } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/LanguageContext';

const YOUTUBE_CHANNEL = 'https://www.youtube.com/@QPlus_Inmobiliaria';

// Direct links to each month's video, in the same order as the months listed
// in src/i18n/translations.ts (investorTable.months). Leave an entry as null
// until that video is published and the channel link is used instead.
const VIDEO_URLS: (string | null)[] = [null, null, null, null, null, null];

const MesaInversionistas = () => {
  const t = useT();
  const months = t.investorTable.months;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-24 pb-12 bg-secondary">
        <div className="container mx-auto px-4">
          <Badge className="mb-4 bg-primary text-primary-foreground font-body">
            {t.investorTable.badge}
          </Badge>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t.investorTable.title}
          </h1>
          <p className="font-body text-muted-foreground max-w-2xl">
            {t.investorTable.subtitle}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {months.map((item, index) => {
              const videoUrl = VIDEO_URLS[index] ?? null;

              return (
                <Card key={item.month} className="flex flex-col">
                  <CardContent className="pt-6 flex flex-col gap-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        {item.month}
                      </h3>
                      <span className="font-mono text-xs text-muted-foreground border border-border rounded-full px-2.5 py-1">
                        {String(index + 1).padStart(2, '0')} / {String(months.length).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="font-body text-sm font-semibold text-primary">{item.topic}</p>
                    <ul className="space-y-2 flex-1">
                      {item.tips.map((tip) => (
                        <li key={tip} className="font-body text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary">-</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="gap-2 mt-2" asChild>
                      <a href={videoUrl ?? YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer">
                        <Youtube className="h-4 w-4" />
                        {videoUrl ? t.investorTable.watchVideo : t.investorTable.watchChannel}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MesaInversionistas;
