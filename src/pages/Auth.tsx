import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    full_name: "",
    phone: "",
    address: "",
    farm_location: "",
    farm_area: "",
    farm_area_unit: "",
    survey_no: "",
    taluk: "",
    district: "",
    state: "",
    pin: "",
    land_holding_type: "",
    irrigation_types: "",
    soil_type: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        setLoading(false);
        return;
      }

      // Insert farmer record
      const { error: insertError } = await supabase.from("farmers").insert([
        {
          id: data.user?.id,
          email: form.email,
          full_name: form.full_name,
          phone: form.phone,
          address: form.address,
          farm_location: form.farm_location,
          farm_area: form.farm_area,
          farm_area_unit: form.farm_area_unit,
          survey_no: form.survey_no,
          taluk: form.taluk,
          district: form.district,
          state: form.state,
          pin: form.pin,
          land_holding_type: form.land_holding_type,
          irrigation_types: form.irrigation_types,
          soil_type: form.soil_type,
        },
      ]);

      if (insertError) {
        toast({ title: "Error", description: insertError.message, variant: "destructive" });
      } else {
        toast({ title: "Account Created!", description: "You can now log in." });
        setIsSignUp(false);
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error) {
        toast({ title: "Login Failed", description: error.message, variant: "destructive" });
      } else if (data.session) {
        toast({ title: "Login Successful", description: "Redirecting to dashboard..." });
        navigate("/dashboard");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>{isSignUp ? "Create Farmer Account" : "Farmer Login"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input name="email" placeholder="Email" onChange={handleChange} required />
            <Input name="password" type="password" placeholder="Password" onChange={handleChange} required />

            {isSignUp && (
              <>
                <Input name="full_name" placeholder="Full Name" onChange={handleChange} />
                <Input name="phone" placeholder="Phone" onChange={handleChange} />
                <Input name="address" placeholder="Address" onChange={handleChange} />
                <Input name="farm_location" placeholder="Farm Location (lat,lng)" onChange={handleChange} />
                <Input name="farm_area" placeholder="Farm Area" onChange={handleChange} />
                <Input name="farm_area_unit" placeholder="Area Unit (acre/hectare)" onChange={handleChange} />
                <Input name="survey_no" placeholder="Survey No" onChange={handleChange} />
                <Input name="taluk" placeholder="Taluk" onChange={handleChange} />
                <Input name="district" placeholder="District" onChange={handleChange} />
                <Input name="state" placeholder="State" onChange={handleChange} />
                <Input name="pin" placeholder="PIN Code" onChange={handleChange} />
                <Input name="land_holding_type" placeholder="Land Holding Type" onChange={handleChange} />
                <Input name="irrigation_types" placeholder="Irrigation Types (comma-separated)" onChange={handleChange} />
                <Input name="soil_type" placeholder="Soil Type" onChange={handleChange} />
              </>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
            </Button>
          </form>

          <p className="text-center mt-4">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setIsSignUp(false)}
                  className="text-blue-600 cursor-pointer"
                >
                  Login
                </span>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <span
                  onClick={() => setIsSignUp(true)}
                  className="text-blue-600 cursor-pointer"
                >
                  Sign Up
                </span>
              </>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
