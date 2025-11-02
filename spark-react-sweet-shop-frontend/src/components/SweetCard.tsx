import { Sweet } from '@/types/sweet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SweetCardProps {
  sweet: Sweet;
  onPurchase?: (id: string) => void;
  onEdit?: (sweet: Sweet) => void;
  onDelete?: (id: string) => void;
}

const SweetCard = ({ sweet, onPurchase, onEdit, onDelete }: SweetCardProps) => {
  const { user } = useAuth();
  const isOutOfStock = sweet.quantity === 0;

  // --- THIS IS THE FIX ---
  // Convert the price string to a number.
  const priceAsNumber = Number(sweet.price);
  // --- END OF FIX ---

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-sweet hover:-translate-y-1">
      <CardHeader className="relative pb-4">
        <div className="absolute top-4 right-4 z-10">
          <Badge 
            variant={isOutOfStock ? "destructive" : "secondary"}
            className="shadow-sm"
          >
            {isOutOfStock ? 'Out of Stock' : `${sweet.quantity} left`}
          </Badge>
        </div>
        
        <div className="aspect-square rounded-lg gradient-card flex items-center justify-center mb-4">
          {sweet.image ? (
            <img 
          	src={sweet.image} 
          	  alt={sweet.name}
          	  className="w-full h-full object-cover rounded-lg"
          	/>
          ) : (
            <div className="text-6xl animate-float">🍬</div>
          )}
        </div>
        
        <CardTitle className="text-xl">{sweet.name}</CardTitle>
        <Badge variant="outline" className="w-fit">
    	    {sweet.category}
  	    </Badge>
  	  </CardHeader>
  	  
  	  <CardContent>
  	    {sweet.description && (
  	      <p className="text-sm text-muted-foreground line-clamp-2">
  	        {sweet.description}
  	      </p>
  	    )}
  	    <p className="text-2xl font-bold mt-2 text-primary">
          {/* --- THIS IS THE FIX --- */}
  	      ${priceAsNumber.toFixed(2)}
  	    </p>
  	  </CardContent>
  	  
  	  <CardFooter className="flex gap-2">
  	    {user?.isAdmin ? (
  	      <>
  	        <Button
  	          variant="outline"
  	          size="sm"
  	          className="flex-1 gap-2"
  	          onClick={() => onEdit?.(sweet)}
  	        >
  	          <Edit className="h-4 w-4" />
  	          Edit
  	        </Button>
  	        <Button
  	          variant="destructive"
  	          size="sm"
  	          onClick={() => onDelete?.(sweet.id)}
  	        >
  	          <Trash2 className="h-4 w-4" />
  	        </Button>
  	      </>
  	    ) : (
  	      <Button
  	        className="w-full gap-2"
  	        disabled={isOutOfStock}
  	        onClick={() => onPurchase?.(sweet.id)}
  	      >
  	        <ShoppingCart className="h-4 w-4" />
  	        {isOutOfStock ? 'Out of Stock' : 'Purchase'}
  	      </Button>
  	    )}
  	  </CardFooter>
  	</Card>
  );
};

export default SweetCard;