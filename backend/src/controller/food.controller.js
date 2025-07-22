// src/Controllers/FoodController.js
import Food from "../services/Foods.service.js";
import { foodCategories } from "../utils/foodCategory.js";

const createFood = async (req, res) => {
  try {
    const { name, validity, quantity ,category, description } = req.body;
    if (!name || !validity || !quantity || !category || !description) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    if (!Object.values(foodCategories).includes(category)) {
      return res.status(400).json({ error: "Categoria inválida." });
    }

    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ error: "Quantidade deve ser um número positivo." });
    }

    const food = await Food.createFood({ name, validity, quantity, category, description });
    res.status(201).json(
      food
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.getAllFoods();
    res.status(200).json({
      message: "Todos os alimentos foram recebidos com sucesso",
      foods,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFoodById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "ID é obrigatório." });
    }
    const food = await Food.getFoodById(id);

    if (!food) {
      return res.status(404).json({ error: "Alimento não encontrado." });
    }

    res.status(200).json(
      food
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFood = async (req, res) => {
  try {
    const { name, validity, quantity ,category, description} = req.body;
    const id = req.params.id; 
    if (!id || !name || !validity || !quantity || !category || !description) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const existingFood = await Food.getFoodById(Number(id));

    if (!existingFood) {
      return res.status(404).json({ error: "Alimento não encontrado." });
    } 

    const food = await Food.updateFood(id, { name, validity, quantity, category, description });
    
    res.status(200).json(
      food
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFood = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "ID é obrigatório." });
    }
    const existingFood = await Food.getFoodById(id);
    
    if (!existingFood) {
      return res.status(404).json({ error: "Alimento não encontrado." });
    } 
    await Food.deleteFood(id);

    res.status(200).json({
      message: "O alimento foi deletado com sucesso",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFoodByCategory = async (req, res) => {
  try {
    const food = await Food.getFoodByCategory(req.params.category);
    res.status(200).json(
      food
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createFood,
  getAllFoods,
  getFoodById,
  updateFood,
  deleteFood,
  getFoodByCategory
};