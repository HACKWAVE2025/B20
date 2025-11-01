import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, CloudRain, Bug, Rabbit } from 'lucide-react';

export const AlertsPanel = () => {
  const { t } = useTranslation();

  const alerts = [
    {
      id: 1,
      type: 'weather',
      icon: <CloudRain className="h-5 w-5" />,
      title: t('alerts.weather'),
      message: 'Heavy rainfall expected in the next 48 hours',
      severity: 'warning',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'pest',
      icon: <Bug className="h-5 w-5" />,
      title: t('alerts.pest'),
      message: 'Increased aphid activity detected in your region',
      severity: 'info',
      time: '5 hours ago',
    },
    {
      id: 3,
      type: 'animal',
      icon: <Rabbit className="h-5 w-5" />,
      title: t('alerts.animal'),
      message: 'Animal movement detected near Field B',
      severity: 'warning',
      time: '1 day ago',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'warning':
        return 'bg-warning/10 text-warning border-warning';
      case 'info':
        return 'bg-info/10 text-info border-info';
      case 'success':
        return 'bg-success/10 text-success border-success';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>{t('alerts.title')}</CardTitle>
          </div>
          <CardDescription>
            Stay updated with real-time alerts about weather, pests, and animals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <Card key={alert.id} className="border-l-4 border-l-warning">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
                      {alert.icon}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{alert.title}</h4>
                        <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t('alerts.noAlerts')}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alert Settings</CardTitle>
          <CardDescription>
            Configure how you want to receive alerts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Weather Alerts</p>
              <p className="text-sm text-muted-foreground">Get notified about weather changes</p>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Pest Alerts</p>
              <p className="text-sm text-muted-foreground">Receive pest activity updates</p>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Animal Detection</p>
              <p className="text-sm text-muted-foreground">Get alerts for animal intrusions</p>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success">Enabled</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
