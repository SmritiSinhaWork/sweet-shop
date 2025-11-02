import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Candy, LogOut, ShoppingBag, Settings } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Candy className="h-6 w-6 text-primary" />
          <span className="gradient-primary bg-clip-text text-transparent" style={{ color: "white",  padding: "2px 6px"  }}>Sweet Shop</span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/shop">
                <Button 
                  variant={location.pathname === '/shop' ? 'default' : 'ghost'}
                  className="gap-2"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Shop
                </Button>
              </Link>
              
              {user.isAdmin && (
                <Link to="/admin">
                  <Button 
                    variant={location.pathname === '/admin' ? 'default' : 'ghost'}
                    className="gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Admin
                  </Button>
                </Link>
              )}

              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{user.email}</span>
                <Button onClick={logout} variant="outline" size="sm" className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
