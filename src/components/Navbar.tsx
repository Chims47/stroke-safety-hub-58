import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { LogOut } from "lucide-react";

export const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/about">
            <Button variant="ghost">About Us</Button>
          </Link>
          <Link to="/contact">
            <Button variant="ghost">Contact</Button>
          </Link>
          {user ? (
            <>
              <span className="text-sm font-medium">{user.email}</span>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth?mode=login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button variant="default">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};