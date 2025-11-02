import { useState } from 'react';
import { Sweet } from '@/types/sweet';
import SweetCard from '@/components/SweetCard';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

// Mock data
const initialSweets: Sweet[] = [
  { id: '1', name: 'Chocolate Truffles', category: 'Chocolate', price: 12.99, quantity: 25, description: 'Rich dark chocolate truffles' },
  { id: '2', name: 'Gummy Bears', category: 'Gummy', price: 5.99, quantity: 50, description: 'Colorful gummy bears' },
  { id: '3', name: 'Lollipops', category: 'Candy', price: 2.99, quantity: 0, description: 'Classic lollipops' },
];

const Admin = () => {
  const [sweets, setSweets] = useState<Sweet[]>(initialSweets);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
  });

  const handleOpenDialog = (sweet?: Sweet) => {
    if (sweet) {
      setEditingSweet(sweet);
      setFormData({
        name: sweet.name,
        category: sweet.category,
        price: sweet.price.toString(),
        quantity: sweet.quantity.toString(),
        description: sweet.description || '',
      });
    } else {
      setEditingSweet(null);
      setFormData({ name: '', category: '', price: '', quantity: '', description: '' });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const sweetData: Sweet = {
      id: editingSweet?.id || Date.now().toString(),
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      description: formData.description,
    };

    if (editingSweet) {
      setSweets(sweets.map(s => s.id === editingSweet.id ? sweetData : s));
      toast.success('Sweet updated successfully!');
    } else {
      setSweets([...sweets, sweetData]);
      toast.success('Sweet added successfully!');
    }

    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setSweets(sweets.filter(s => s.id !== id));
    toast.success('Sweet deleted successfully!');
  };

  const handleRestock = (id: string, amount: number) => {
    setSweets(sweets.map(s => 
      s.id === id ? { ...s, quantity: s.quantity + amount } : s
    ));
    toast.success('Sweet restocked!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">Manage your sweet inventory</p>
          </div>
          
          <Button onClick={() => handleOpenDialog()} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Sweet
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sweets.map(sweet => (
            <SweetCard
              key={sweet.id}
              sweet={sweet}
              onEdit={handleOpenDialog}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>
                  {editingSweet ? 'Edit Sweet' : 'Add New Sweet'}
                </DialogTitle>
                <DialogDescription>
                  {editingSweet ? 'Update the sweet details' : 'Add a new sweet to your inventory'}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="0"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingSweet ? 'Update' : 'Add'} Sweet
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Admin;
