import { prisma } from '../utils/bdConfig.js';

const getAll = async () => {
  return await prisma.collectionPoints.findMany({
    include: {
      food: true,
      // beneficiary: true, // Uncomment if you want to include beneficiary data
    },
  });
};  

const getById = async (id) => {
  return await prisma.collectionPoints.findUnique({
    where: { id },
    include: {
      food: true,
      // beneficiary: true, // Uncomment if you want to include beneficiary data
    },
  });
};

const create = async (data) => {
  return await prisma.collectionPoint.create({ 
    data: {  
      name: data.name,
      address: data.address,
      phone: data.phone,
    },
    include: {
      food: true,
    },
  });
};

const update = async (id, data) => {
  // Remove undefined fields to avoid overwriting with undefined
  const updateData = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.address !== undefined) updateData.address = data.address;
  if (data.phone !== undefined) updateData.phone = data.phone;
  if (data.hoursOfOperetion !== undefined) updateData.hoursOfOperetion = data.hoursOfOperetion;

  if (Object.keys(updateData).length === 0) {
    throw new Error('Pelo menos um campo deve ser atualizado.');
  }

  return await prisma.collectionPoints.update({
    where: { id },
    data: updateData,
    include: {
      food: true,
    },
  });
};

const remove = async (id) => {
  return await prisma.collectionPoint.delete({ where: { id } });
};

export default {
  getAll,
  create,
  update,
  remove,
};