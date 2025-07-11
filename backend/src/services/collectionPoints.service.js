import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAll = async (client = getPrisma()) => {
  return await client.collectionPoint.findMany();
};

const create = async (data, client = getPrisma()) => {
  return await client.collectionPoint.create({ data });
};

const update = async (id, data, client = getPrisma()) => {
  return await client.collectionPoint.update({
    where: { id },
    data,
  });
};

const remove = async (id, client = getPrisma()) => {
  return await client.collectionPoint.delete({ where: { id } });
};

export default {
  getAll,
  create,
  update,
  remove,
};