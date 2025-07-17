import FoodsList from './components/FoodList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alimentos Doados | Sistema de Doações',
  description: 'Visualize e doe alimentos para ajudar a comunidade',
};

export default function FoodsPage() {
  return (
    <div className="min-h-screen bg-background">
      <FoodsList />
    </div>
  );
}