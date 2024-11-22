import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Activity, Scale, Home, Cigarette, Briefcase, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Information = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Understanding Health Indicators</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="text-red-500" />
                Heart Disease
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">Common Symptoms:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Chest pain or discomfort</li>
                <li>Shortness of breath</li>
                <li>Pain in the neck, jaw, throat, upper belly, or back</li>
                <li>Fatigue</li>
                <li>Irregular heartbeat</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="text-blue-500" />
                Hypertension (High Blood Pressure)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">Common Symptoms:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Severe headaches</li>
                <li>Nosebleeds</li>
                <li>Fatigue or confusion</li>
                <li>Vision problems</li>
                <li>Difficulty breathing</li>
              </ul>
              <p className="mt-4">Normal blood pressure: Less than 120/80 mmHg</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="text-green-500" />
                Body Mass Index (BMI)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">How to Calculate:</h3>
              <p className="mb-4">BMI = weight(kg) / [height(m)]²</p>
              
              <h3 className="font-semibold mb-2">BMI Categories:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Underweight: Less than 18.5</li>
                <li>Normal weight: 18.5-24.9</li>
                <li>Overweight: 25-29.9</li>
                <li>Obesity: 30 or greater</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="text-purple-500" />
                Residence Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Your living environment can impact your health:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Urban:</strong> City living, typically with better access to healthcare but potentially more stress and pollution</li>
                <li><strong>Rural:</strong> Countryside living, often with cleaner air but might have limited access to immediate healthcare</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cigarette className="text-orange-500" />
                Smoking Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">Categories:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Never Smoked:</strong> No history of smoking</li>
                <li><strong>Former Smoker:</strong> Quit smoking for at least one year</li>
                <li><strong>Current Smoker:</strong> Currently smoking or quit less than one year ago</li>
              </ul>
              <p className="mt-4">Smoking significantly increases stroke risk</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="text-gray-500" />
                Work Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">Categories and Health Implications:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Private:</strong> Various stress levels depending on position</li>
                <li><strong>Self-employed:</strong> Flexible schedule but potential financial stress</li>
                <li><strong>Government:</strong> Generally stable work environment</li>
                <li><strong>Student:</strong> Academic stress but typically more active lifestyle</li>
                <li><strong>Retired:</strong> Less work stress but important to maintain activity</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Average Glucose Level</h2>
          <p className="mb-4">Normal blood glucose levels vary throughout the day:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Fasting (before meals):</strong> 70-99 mg/dL</li>
            <li><strong>2 hours after meals:</strong> Less than 140 mg/dL</li>
            <li><strong>Random check:</strong> Less than 200 mg/dL</li>
          </ul>
          <p className="mt-4 text-sm text-gray-600">Note: Consistently high glucose levels may indicate diabetes, which increases stroke risk.</p>
        </div>
      </div>
    </div>
  );
};

export default Information;