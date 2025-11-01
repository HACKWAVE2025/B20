import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { CropPrediction } from '@/components/dashboard/CropPrediction';
import { AlertsPanel } from '@/components/dashboard/AlertsPanel';
import { AIAssistant } from '@/components/dashboard/AIAssistant';
import { Sprout, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [farmerData, setFarmerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Check authentication and fetch farmer details by email
  useEffect(() => {
  const checkAuthAndLoadData = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      navigate('/auth');
      return;
    }

    const userEmail = session.user.email;
    setUser(session.user);
    console.log('✅ User authenticated:', userEmail);
    // ✅ Use .maybeSingle() to avoid coercion error
    const table = await supabase
      .from('farmers')
      .select('*')
    console.log('✅ Farmers table structure:', table);
    const { data, error } = await supabase
      .from('farmers')
      .select('*')
      .eq('email', userEmail)
      .maybeSingle();

    if (error) {
      console.error('❌ Error fetching farmer data:', error.message);
      toast({
        title: 'Error loading farmer data',
        description: error.message,
        variant: 'destructive',
      });
    } else if (!data) {
      console.warn('⚠️ No farmer record found for this email.');
      toast({
        title: 'No farmer record found',
        description: 'Please complete your registration or contact support.',
      });
    } else {
      setFarmerData(data);
    }

    setLoading(false);
  };

  checkAuthAndLoadData();

  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    if (!session) navigate('/auth');
  });

  return () => subscription.unsubscribe();
}, [navigate, toast]);



  // ✅ Logout Function
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      navigate('/');
    }
  };

  // ✅ Loader while fetching
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary p-2">
                <Sprout className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-primary">AgriVani</span>
            </div>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                {t('dashboard.logout')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Section */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          {t('dashboard.welcome')}, {farmerData?.full_name || user?.email}!
        </h1>

        {/* ✅ Farmer Details Card */}
        {farmerData && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-8 border">
            <h2 className="text-xl font-semibold text-primary mb-4">Farmer Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <p><strong>Email:</strong> {farmerData.email}</p>
              <p><strong>Phone:</strong> {farmerData.phone || '—'}</p>
              <p><strong>Address:</strong> {farmerData.address || '—'}</p>
              <p><strong>Farm Location:</strong> {farmerData.farm_location || '—'}</p>
              <p><strong>Farm Area:</strong> {farmerData.farm_area} {farmerData.farm_area_unit}</p>
              <p><strong>Survey No:</strong> {farmerData.survey_no || '—'}</p>
              <p><strong>Taluk:</strong> {farmerData.taluk || '—'}</p>
              <p><strong>District:</strong> {farmerData.district || '—'}</p>
              <p><strong>State:</strong> {farmerData.state || '—'}</p>
              <p><strong>PIN:</strong> {farmerData.pin || '—'}</p>
              <p><strong>Land Holding Type:</strong> {farmerData.land_holding_type || '—'}</p>
              <p><strong>Irrigation Types:</strong> {farmerData.irrigation_types || '—'}</p>
              <p><strong>Soil Type:</strong> {farmerData.soil_type || '—'}</p>
            </div>
          </div>
        )}

        {/* ✅ Tabs Section (unchanged layout) */}
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="overview">{t('dashboard.overview')}</TabsTrigger>
            <TabsTrigger value="prediction">{t('dashboard.predictions')}</TabsTrigger>
            <TabsTrigger value="alerts">{t('dashboard.alerts')}</TabsTrigger>
            <TabsTrigger value="assistant">{t('dashboard.assistant')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DashboardOverview />
          </TabsContent>
          <TabsContent value="prediction">
            <CropPrediction />
          </TabsContent>
          <TabsContent value="alerts">
            <AlertsPanel />
          </TabsContent>
          <TabsContent value="assistant">
            <AIAssistant />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
