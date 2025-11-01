import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CloudRain, Leaf, TrendingUp, Sprout } from 'lucide-react';

export const DashboardOverview = () => {
  const { t } = useTranslation();

  const cards = [
    {
      title: t('dashboard.weather'),
      value: '28°C',
      subtitle: 'Sunny, Clear Sky',
      icon: <CloudRain className="h-8 w-8 text-info" />,
      trend: '+2°C',
    },
    {
      title: t('dashboard.soil'),
      value: 'Good',
      subtitle: 'pH: 6.5, Moisture: 65%',
      icon: <Leaf className="h-8 w-8 text-success" />,
      trend: '+5%',
    },
    {
      title: t('dashboard.yield'),
      value: '4.2 tons/ha',
      subtitle: 'Estimated for Rice',
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      trend: '+12%',
    },
    {
      title: t('dashboard.fertilizer'),
      value: '120 kg',
      subtitle: 'NPK Recommended',
      icon: <Sprout className="h-8 w-8 text-secondary" />,
      trend: 'Optimal',
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {card.subtitle}
              </p>
              <div className="flex items-center mt-2">
                <span className="text-xs font-medium text-success">
                  {card.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Crop prediction completed</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-warning" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Weather alert received</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-success" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Fertilizer plan updated</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Soil Moisture</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-success w-[65%]" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Crop Health</span>
                  <span className="text-sm font-medium">82%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[82%]" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Fertilizer Usage</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-[45%]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
