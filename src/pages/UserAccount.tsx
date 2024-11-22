import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { Activity, Calendar, User } from "lucide-react";

const UserAccount = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth?mode=login');
        return;
      }

      setUser(session.user);

      try {
        const { data, error } = await supabase
          .from('assessments')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setAssessments(data || []);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load your assessments. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <User className="w-12 h-12 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Account Details</h1>
                <p className="text-slate-600">{user?.email}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Activity className="w-8 h-8 text-primary" />
              <h2 className="text-xl font-semibold">Assessment History</h2>
            </div>
            <div className="space-y-4">
              {assessments.length === 0 ? (
                <p className="text-center text-slate-600 py-4">
                  No assessments found. Take your first assessment now!
                </p>
              ) : (
                assessments.map((assessment: any) => (
                  <div
                    key={assessment.id}
                    className="flex items-center justify-between p-4 bg-secondary rounded-lg"
                  >
                    <div>
                      <p className="font-medium">
                        {new Date(assessment.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-slate-600">
                        Risk Level: {assessment.risk_level}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{assessment.risk_score}%</p>
                      <Button
                        variant="link"
                        className="text-sm"
                        onClick={() => navigate(`/results?id=${assessment.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;