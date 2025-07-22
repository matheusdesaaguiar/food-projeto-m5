'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { FoodFormValues, foodSchema } from "@src/app/schemas/food.schema";
import { Button } from "@src/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@src/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@src/components/ui/form";
import { Input } from "@src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { Textarea } from "@src/components/ui/textarea";
import { useFood } from "@src/hooks/use-food";
import { Plus } from "lucide-react";
import { Form, useForm } from "react-hook-form";
import { toast } from "sonner";

export const AddFoodModal = () => {
  const { addFood } = useFood();
  const form = useForm<FoodFormValues>({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      name: '',
      validity: '',
      quantity: 1,
      category: 'NON_PERISHABLE',
      description: '',
      collectionPointsId: ''
    }
  });

  const onSubmit = async (values: FoodFormValues) => {
    const success = await addFood(values);
    if (success) {
      toast.success('Alimento adicionado com sucesso!');
      form.reset();
    } else {
      toast.error('Erro ao adicionar alimento');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-accent text-white">
          <Plus className="mr-2 h-4 w-4" /> Adicionar Alimento
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-background border-primary">
        <DialogHeader>
          <DialogTitle className="text-text-dark">Adicionar Novo Alimento</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-dark">Nome</FormLabel>
                  <FormControl>
                    <Input {...field} className="border-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-dark">Categoria</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-primary">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {foodSchema.shape.category.options.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="validity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-dark">Data de Validade</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="border-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-dark">Quantidade</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      className="border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-dark">Descrição</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="border-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="bg-primary hover:bg-accent text-white w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Adicionando...' : 'Adicionar Alimento'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};


