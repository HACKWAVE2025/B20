import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Sprout, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-full bg-primary p-2">
              <Sprout className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-primary">AgriVani</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/#features" className="text-sm font-medium hover:text-primary transition-colors">
              {t('nav.features')}
            </Link>
            <Link to="/#about" className="text-sm font-medium hover:text-primary transition-colors">
              {t('nav.about')}
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Link to="/auth">
              <Button variant="ghost">{t('nav.login')}</Button>
            </Link>
            <Link to="/auth?signup=true">
              <Button>{t('nav.signup')}</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/"
              className="block py-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/#features"
              className="block py-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.features')}
            </Link>
            <div className="pt-4 space-y-2">
              <LanguageSwitcher />
              <Link to="/auth" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full">
                  {t('nav.login')}
                </Button>
              </Link>
              <Link to="/auth?signup=true" onClick={() => setIsOpen(false)}>
                <Button className="w-full">{t('nav.signup')}</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
