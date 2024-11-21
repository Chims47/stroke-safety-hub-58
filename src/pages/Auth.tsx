import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState(searchParams.get("mode") || "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "login") {
        // Mock successful login for now
        toast({
          title: "Success",
          description: "Logged in successfully!",
        });
        navigate("/dashboard");
      } else {
        // Mock successful signup for now
        toast({
          title: "Account created",
          description: "Your account has been created successfully!",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: mode === "login" 
          ? "Invalid email or password" 
          : "Failed to create account. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Logo />
      </div>
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="w-full"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : mode === "login" ? "Login" : "Sign Up"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Button
            variant="link"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            disabled={isLoading}
          >
            {mode === "login"
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Auth;