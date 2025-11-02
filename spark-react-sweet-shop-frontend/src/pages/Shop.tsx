import { useState, useEffect } from 'react';
import { Sweet } from '@/types/sweet';
import SweetCard from '@/components/SweetCard';
import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Loader2 } from 'lucide-react'; // Import Loader2
import { toast } from 'sonner';


//Django API's
const API_URL = 'http://127.0.0.1:8000/api';

const Shop = () => {
  // --- Initialize state as empty ---
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [filteredSweets, setFilteredSweets] = useState<Sweet[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // --- Add a loading state ---
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['all', ...Array.from(new Set(sweets.map(s => s.category)))];


  useEffect(() => {
    const fetchSweets = async () => {
      setIsLoading(true);
      try {
        // This is a public endpoint, so no token is needed
        const response = await fetch(`${API_URL}/sweets/`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch sweets');
        }
        
        const data: Sweet[] = await response.json();
        setSweets(data);
        setFilteredSweets(data); // Initialize filtered list with all sweets
      } catch (error) {
        console.error(error);
        toast.error('Could not load sweets from the shop.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSweets();
  }, []);


  useEffect(() => {
    let result = sweets;

    // Search filter
    if (searchQuery) {
      result = result.filter(sweet =>
        sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sweet.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter(sweet => sweet.category === categoryFilter);
    }

    setFilteredSweets(result);
  }, [searchQuery, categoryFilter, sweets]);

  //purchase logic ---
  const handlePurchase = async (id: string) => {
    // 1. Get the auth token from where we saved it
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      toast.error('You must be logged in to purchase an item.');
      return;
    }

    try {
      // 2. Call the REAL backend purchase endpoint
      const response = await fetch(`${API_URL}/sweets/${id}/purchase/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 3. Send the token for authorization
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        // Handle errors like "out of stock"
        const errorData = await response.json();
        throw new Error(errorData.error || 'Purchase failed');
      }

      // 4. If successful, update the state with the new quantity
      const updatedSweet: Sweet = await response.json();
      setSweets(sweets.map(s => 
        s.id === updatedSweet.id ? updatedSweet : s
      ));
      
      toast.success(`Purchased ${updatedSweet.name}!`);

    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Sweet Shop</h1>
          <p className="text-muted-foreground">Discover our delicious collection of sweets</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search sweets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* --- UPDATED: Sweet Grid with Loading State --- */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : filteredSweets.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No sweets found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSweets.map(sweet => (
              <SweetCard
                key={sweet.id}
                sweet={sweet}
                onPurchase={handlePurchase}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Shop;