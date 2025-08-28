'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger, DialogDescription } from "@radix-ui/react-dialog"; // Adicionei DialogDescription
import { FoodFormValues, foodSchema } from "@src/app/schemas/food.schema";
import { Button } from "@src/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@src/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@src/components/ui/form";
import { Input } from "@src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { Textarea } from "@src/components/ui/textarea";
import { useFood } from "@src/hooks/use-food";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const AddFoodModal = () => {
  const { addFood } = useFood();
  const [isOpen, setIsOpen] = useState(false);

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
    try {
    const success = await addFood(values);
    if (success) {
      toast.success('Alimento adicionado com sucesso!');
      form.reset();
      setIsOpen(false);
    } else {
      toast.error('Erro ao adicionar alimento');
    }
  } catch {
    toast.error('Ocorreu um erro ao processar sua solicitação');
  }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-accent text-green">
          <Plus className="mr-2 h-4 w-4" /> Adicionar Alimento
        </Button>
      </DialogTrigger>
      
      <DialogContent className="bg-background border-primary">
        <DialogHeader>
          <DialogTitle className="text-text-dark">Adicionar Novo Alimento</DialogTitle>
          {/* Adição da descrição para acessibilidade */}
          <DialogDescription className="text-text-dark/70 text-sm mt-1">
            Preencha os detalhes do alimento que deseja cadastrar no sistema
          </DialogDescription>
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
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    value={field.value}
                  >
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
                    <Input 
                      type="date" 
                      {...field} 
                      className="border-primary"
                      value={field.value as string}
                    />
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
                      onChange={(e) => field.onChange(Number(e.target.value))}
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
            
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-accent text-white flex-1"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Adicionando...' : 'Adicionar'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};