import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "lucide-react";


// Primeiro, defina a interface para o tipo Food
interface Food {
  id: string;
  name: string;
  category: 'NON_PERISHABLE' | 'PERISHABLE' | 'BAKERY' | 'BEVERAGE' | 'DESSERT' | 'READY_TO_EAT' | 'SPECIAL_DIET';
  description?: string;
  quantity: number;
  validity: string | Date;
  // Adicione outras propriedades conforme necessário
}

interface FoodCardProps {
  food: Food;
}


export const FoodCard = ( {food}:FoodCardProps) =>{
    const getCategoryColor = (category:string) =>{
        const colors: Record<string,string> ={
      NON_PERISHABLE: 'bg-green-100 text-green-800',
      PERISHABLE: 'bg-red-100 text-red-800',
      BAKERY: 'bg-yellow-100 text-yellow-800',
      BEVERAGE: 'bg-blue-100 text-blue-800',
      DESSERT: 'bg-pink-100 text-pink-800'
        };
         return colors[category] || 'bg-gray-100 text-gray-800';
    };

    return (
    <Card className="border-primary hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-text-dark">{food.name}</CardTitle>
        <Badge className={`${getCategoryColor(food.category)} w-fit`}>
          {food.category}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-text-dark">{food.description}</p>
        <div className="flex justify-between">
          <span className="text-primary font-bold">Quantidade: {food.quantity}</span>
          <span className="text-accent">Validade: {new Date(food.validity).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}