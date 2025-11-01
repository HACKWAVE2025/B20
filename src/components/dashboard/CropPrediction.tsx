import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp } from 'lucide-react';

export const CropPrediction = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate prediction
    setTimeout(() => {
      setPrediction({
        yield: '4.5 tons/ha',
        confidence: '87%',
        fertilizer: {
          nitrogen: '45 kg/ha',
          phosphorus: '30 kg/ha',
          potassium: '25 kg/ha',
        },
      });
      setLoading(false);
      toast({
        title: 'Prediction Complete',
        description: 'Your crop yield has been predicted successfully',
      });
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('cropPrediction.title')}</CardTitle>
          <CardDescription>
            Enter your farm details to get AI-powered yield predictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePredict} className="space-y-4">
            <div className="space-y-2">
              <Label>{t('cropPrediction.cropType')}</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="corn">Corn</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t('cropPrediction.soilType')}</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clay">Clay</SelectItem>
                  <SelectItem value="loam">Loam</SelectItem>
                  <SelectItem value="sandy">Sandy</SelectItem>
                  <SelectItem value="silt">Silt</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('cropPrediction.ph')}</Label>
                <Input type="number" step="0.1" placeholder="6.5" />
              </div>
              <div className="space-y-2">
                <Label>{t('cropPrediction.previousYield')}</Label>
                <Input type="number" placeholder="4000" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>{t('cropPrediction.nitrogen')}</Label>
                <Input type="number" placeholder="40" />
              </div>
              <div className="space-y-2">
                <Label>{t('cropPrediction.phosphorus')}</Label>
                <Input type="number" placeholder="30" />
              </div>
              <div className="space-y-2">
                <Label>{t('cropPrediction.potassium')}</Label>
                <Input type="number" placeholder="25" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t('cropPrediction.location')}</Label>
              <Input placeholder="Enter your location" />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Predicting...' : t('cropPrediction.predict')}
            </Button>
          </form>
        </CardContent>
      </Card>

      {prediction && (
        <Card className="border-primary">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle>{t('cropPrediction.result')}</CardTitle>
            </div>
            <CardDescription>AI-powered analysis of your farm data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Expected Yield</p>
              <p className="text-3xl font-bold text-primary">{prediction.yield}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Confidence: {prediction.confidence}
              </p>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm font-medium mb-4">Recommended Fertilizer</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Nitrogen (N)</span>
                  <span className="font-medium">{prediction.fertilizer.nitrogen}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Phosphorus (P)</span>
                  <span className="font-medium">{prediction.fertilizer.phosphorus}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Potassium (K)</span>
                  <span className="font-medium">{prediction.fertilizer.potassium}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                These recommendations are based on your soil conditions, crop type, and historical data. 
                For best results, consult with a local agricultural expert.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
