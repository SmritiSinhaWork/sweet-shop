import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Candy, ShoppingBag, Lock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/shop');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen gradient-hero">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full gradient-primary shadow-sweet animate-float">
              <Candy className="h-16 w-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to <span className="gradient-primary bg-clip-text text-transparent" style={{ color: "white",  padding: "2px 6px"  }}>Sweet Shop</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Your one-stop destination for the most delicious sweets and candies. 
            Explore our collection and satisfy your sweet tooth!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8 shadow-sweet">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
          <div className="text-center p-8 rounded-2xl gradient-card shadow-card hover:shadow-sweet transition-all">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
            <p className="text-muted-foreground">
              Browse through our extensive collection of sweets from various categories
            </p>
          </div>
          
          <div className="text-center p-8 rounded-2xl gradient-card shadow-card hover:shadow-sweet transition-all">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Lock className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Shopping</h3>
            <p className="text-muted-foreground">
              Shop with confidence using our secure authentication system
            </p>
          </div>
          
          <div className="text-center p-8 rounded-2xl gradient-card shadow-card hover:shadow-sweet transition-all">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Fresh Daily</h3>
            <p className="text-muted-foreground">
              All our sweets are fresh and updated with real-time inventory
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
