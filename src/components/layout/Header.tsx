import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Settings } from 'lucide-react';
import logo from '@/assets/logo_qplus.png';
import { useAuth } from '@/hooks/useAuth';
import { useT } from '@/i18n/LanguageContext';
import LanguageToggle from './LanguageToggle';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const t = useT();

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/propiedades', label: t.nav.properties },
    { to: '/inversiones', label: t.nav.investments },
    { to: '/herramientas', label: t.nav.tools },
    { to: '/mesa-inversionistas', label: t.nav.investorTable },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Q+ Inmobiliaria"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-body text-sm text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="#contacto"
              className="font-body text-sm text-foreground hover:text-primary transition-colors"
            >
              {t.nav.contact}
            </a>

            <LanguageToggle />

            <Link
              to={user ? '/admin' : '/login'}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label={t.nav.adminAccess}
            >
              <Settings className="h-4 w-4 text-muted-foreground" />
            </Link>
          </nav>

          {/* Mobile: language switch stays visible next to the menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label={t.nav.toggleMenu}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-lg hover:bg-muted transition-colors font-body text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="#contacto"
                onClick={() => setIsOpen(false)}
                className="p-3 rounded-lg hover:bg-muted transition-colors font-body text-foreground"
              >
                {t.nav.contact}
              </a>
              <Link
                to={user ? '/admin' : '/login'}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
              >
                <Settings className="h-4 w-4 text-muted-foreground" />
                <span className="font-body text-muted-foreground text-sm">{t.nav.admin}</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
