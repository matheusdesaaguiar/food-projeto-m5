// src/Controllers/FoodController.js
import Food from "../services/Foods.service.js";

const createFood = async (req, res) => {
  try {
    const { name, category, expirationDate } = req.body;
    const food = await Food.createFood({
      name,
      category,
      expirationDate: new Date(expirationDate),
    });
    res.status(201).json({
      message: "A comida foi criada com sucesso",
      food,
    });
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
    const food = await Food.getFoodById(Number(req.params.id));
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.status(200).json({
      message: "O alimento foi encontrado com sucesso",
      food,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFood = async (req, res) => {
  try {
    const { name, category, expirationDate } = req.body;
    const food = await Food.updateFood(Number(req.params.id), {
      name,
      category,
      expirationDate: new Date(expirationDate),
    });
    res.status(200).json({
      message: "O alimento foi atualizado com sucesso",
      food,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFood = async (req, res) => {
  try {
    await Food.deleteFood(Number(req.params.id));
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
    res.status(200).json({
      message: "Alimentos da categoria foram encontrados com sucesso",
      food,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFoodByName = async (req, res) => {
  try {
    const food = await Food.getFoodByName(req.params.name);
    res.status(200).json({
      message: "Alimentos encontrados pelo nome com sucesso",
      food,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFoodByExpirationDate = async (req, res) => {
  try {
    const food = await Food.getFoodByExpirationDate(req.params.date);
    res.status(200).json({
      message: "Alimentos encontrados pela data de validade",
      food,
    });
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
  getFoodByCategory,
  getFoodByName,
  getFoodByExpirationDate,
};