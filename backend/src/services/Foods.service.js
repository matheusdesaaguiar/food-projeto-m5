// src/Services/Foods.Services.js
import prisma from "../utils/bdConfig.js";

const createFood = async (foodData) => {
  const { name, validity, quantity, category, description } = foodData;

  return await prisma.food.create({
    data: {
      name,
      validity: new Date(validity),
      quantity,
      category,
      description,
    }
  });
};

const getAllFoods = () => {
  return prisma.food.findMany();
};

const getFoodById = (id) => {
  return prisma.food.findUnique({ where: { id } });
};

const updateFood = (id, data) => {
  const { name, validity, quantity, category, description } = data;
  return prisma.food.update({
    where: { id },
    data: {
      name,
      validity: new Date(validity),
      quantity,
      category,
      description,
    }
  });
};

const deleteFood = (id) => {
  return prisma.food.delete({
    where: { id },
  });
};

const getFoodByCategory = (category) => {
  return prisma.food.findMany({
    where: { category },
  });
};

export default {
  createFood,
  getAllFoods,
  getFoodById,
  updateFood,
  deleteFood,
  getFoodByCategory
};