import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { 
  Sprout, 
  CloudRain, 
  Bell, 
  MessageSquare,
  Leaf,
  TrendingUp
} from 'lucide-react';

const Home = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: t('features.cropPrediction'),
      description: t('features.cropPredictionDesc'),
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: t('features.fertilizer'),
      description: t('features.fertilizerDesc'),
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: t('features.realtime'),
      description: t('features.realtimeDesc'),
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: t('features.voice'),
      description: t('features.voiceDesc'),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-background" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-8">
              <Sprout className="h-12 w-12 text-primary" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {t('hero.title')}
              <span className="block text-primary mt-2">🌾</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link to="/auth?signup=true">
                <Button size="lg" className="text-lg px-8 rounded-full">
                  {t('hero.cta')}
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 rounded-full">
                {t('hero.learnMore')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('features.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-all hover:shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <CloudRain className="h-16 w-16 text-secondary mx-auto" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Empowering Farmers with AI Technology
            </h2>
            <p className="text-lg text-muted-foreground">
              AgriVani combines artificial intelligence with traditional farming wisdom to help you make better decisions, 
              increase yields, and protect your crops. Our multilingual platform ensures every farmer can access modern 
              agricultural technology in their preferred language.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
