import { motion } from "framer-motion";
import { Target, TrendingUp, Users, Shield } from "lucide-react";
import { useT } from "@/i18n/LanguageContext";

const AboutSection = () => {
  const t = useT();

  const highlights = [
    { icon: Target, label: t.about.highlight1 },
    { icon: TrendingUp, label: t.about.highlight2 },
    { icon: Users, label: t.about.highlight3 },
    { icon: Shield, label: t.about.highlight4 },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            className="relative rounded-2xl overflow-hidden aspect-[4/3]"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&fm=webp"
              alt={t.about.imageAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="text-sm font-semibold tracking-widest uppercase text-primary mb-2 block">
              {t.about.eyebrow}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t.about.title}
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              {t.about.paragraph1}
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              {t.about.paragraph2}
            </p>

            {/* Highlight pills */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border bg-secondary/50"
                >
                  <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                    <h.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {h.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
