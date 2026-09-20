import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useT } from "@/i18n/LanguageContext";

const SLIDE_IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80&fm=webp",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&fm=webp",
];

const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const t = useT();

  const slides = [
    {
      title: t.hero.slide1Title,
      subtitle: t.hero.slide1Subtitle,
      cta: t.hero.slide1Cta,
      link: "/propiedades",
      image: SLIDE_IMAGES[0],
    },
    {
      title: t.hero.slide2Title,
      subtitle: t.hero.slide2Subtitle,
      cta: t.hero.slide2Cta,
      link: "/inversiones",
      image: SLIDE_IMAGES[1],
    },
  ];

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();

    // Autoplay
    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative h-[50vh] min-h-[400px] mt-16 overflow-hidden bg-background">
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {slides.map((slide, i) => (
            <div key={i} className="relative flex-[0_0_100%] min-w-0 h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

              <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-4">
                  <AnimatePresence mode="wait">
                    {selectedIndex === i && (
                      <motion.div
                        key={i}
                        className="max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                          {slide.title}
                        </h1>
                        <p className="font-body text-base md:text-lg text-white/80 mb-8 max-w-lg">
                          {slide.subtitle}
                        </p>
                        <Link
                          to={slide.link}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display font-semibold rounded-lg hover:opacity-90 transition-opacity"
                        >
                          {slide.cta}
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              selectedIndex === i
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`${t.hero.slideAria} ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
