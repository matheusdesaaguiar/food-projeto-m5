// types/food.ts
export enum FoodCategory {
  NON_PERISHABLE = "NON_PERISHABLE",
  PERISHABLE = "PERISHABLE",
  BAKERY = "BAKERY",
  BEVERAGE = "BEVERAGE",
  DESSERT = "DESSERT",
  READY_TO_EAT = "READY_TO_EAT",
  SPECIAL_DIET = "SPECIAL_DIET"
}

export interface Food {
  id: string;
  donorId: string;
  collectionPointsId: string;
  name: string;
  validity: Date | string;
  quantity: number;
  category: FoodCategory;
  description: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface FoodCreateInput {
  name: string;
  validity: Date | string;
  quantity: number;
  category: FoodCategory;
  description: string;
  collectionPointsId: string;
  donorId: string;
}

export interface FoodUpdateInput extends Partial<FoodCreateInput> {
  id: string;
}