// 📦 Service responsável pela lógica de negócios dos doadores
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';
import { generateToken } from '../utils/jwt.js';

const prisma = new PrismaClient();

export const createDonor = async (data) => {
  return await prisma.donor.create({ data });
};

export const getAllDonors = async () => {
  return await prisma.donor.findMany();
};

export const getDonorById = async (id) => {
  return await prisma.donor.findUnique({
    where: { id: parseInt(id) },
  });
};

export const updateDonor = async (id, data) => {
  return await prisma.donor.update({
    where: { id: parseInt(id) },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });
};

export const deleteDonor = async (id) => {
  return await prisma.donor.delete({
    where: { id: parseInt(id) },
  });
};

export const registerDonor = async (donorData) => {
  const { email, password, ...otherData } = donorData;

  const existingDonor = await prisma.donor.findUnique({
    where: { email }
  });

  if (existingDonor) {
    throw new Error('E-mail já cadastrado');
  }

  const hashedPassword = await hashPassword(password);

  const donor = await prisma.donor.create({
    data: {
      ...otherData,
      email,
      password: hashedPassword
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      cnpj: true,
      createdAt: true
    }
  });

  const token = generateToken({
    donorId: donor.id,
    email: donor.email
  });

  return {
    donor,
    token
  };
};

export const loginDonor = async (email, password) => {
  const donor = await prisma.donor.findUnique({
    where: { email }
  });

  if (!donor) {
    throw new Error('Credenciais inválidas');
  }

  const isValidPassword = await comparePassword(password, donor.password);

  if (!isValidPassword) {
    throw new Error('Credenciais inválidas');
  }

  const token = generateToken({
    donorId: donor.id,
    email: donor.email
  });

  return {
    donor: {
      id: donor.id,
      name: donor.name,
      email: donor.email,
      phone: donor.phone,
      address: donor.address,
      cnpj: donor.cnpj,
      createdAt: donor.createdAt
    },
    token
  };
};
