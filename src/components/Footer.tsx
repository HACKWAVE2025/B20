import { useTranslation } from 'react-i18next';
import { Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-full bg-primary p-2">
                <Sprout className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary">AgriVani</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('hero.subtitle')}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">{t('nav.features')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{t('features.cropPrediction')}</li>
              <li>{t('features.fertilizer')}</li>
              <li>{t('features.realtime')}</li>
              <li>{t('features.voice')}</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/privacy" className="hover:text-primary">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} AgriVani. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
