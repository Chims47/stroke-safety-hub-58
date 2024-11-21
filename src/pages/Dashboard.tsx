import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth?mode=login');
        return;
      }

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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Your Health Dashboard</h1>
            <Link to="/predict">
              <Button>New Assessment</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Activity className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Latest Risk Score</h3>
                  <p className="text-2xl font-bold">
                    {assessments[0]?.risk_score || 0}%
                  </p>
                </div>
              </div>
              <p className="text-slate-600">
                Your latest assessment shows a {assessments[0]?.risk_level?.toLowerCase() || 'low'} risk level
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Calendar className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Total Assessments</h3>
                  <p className="text-2xl font-bold">{assessments.length}</p>
                </div>
              </div>
              <p className="text-slate-600">
                Keep tracking your health regularly for better insights
              </p>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Assessment History</h2>
            <div className="space-y-4">
              {assessments.map((assessment: any, index) => (
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
                    <Link
                      to={`/results?id=${assessment.id}`}
                      className="text-sm text-primary hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;