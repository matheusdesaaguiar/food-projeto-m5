// src/services/beneficiaryService.js

export const createBeneficiary = async (data, prisma) => {
  return await prisma.beneficiary.create({ data });
};

export const getAllBeneficiaries = async (prisma) => {
  return await prisma.beneficiary.findMany();
};

export const getBeneficiaryById = async (id, prisma) => {
  return await prisma.beneficiary.findUnique({ where: { id } });
};

export const updateBeneficiary = async (id, data, prisma) => {
  return await prisma.beneficiary.update({
    where: { id },
    data,
  });
};

export const deleteBeneficiary = async (id, prisma) => {
  return await prisma.beneficiary.delete({ where: { id } });
};
