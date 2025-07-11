import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE (C) - CRIA NOTIFICAÇÃO (POST)
const createNotification = async(data)=>{
    const create = await prisma.notificationEngagement.create({
        data: {
            foodId: data.foodId,
            beneficiaryId: data.beneficiaryId,
            notificationType: data.notificationType,
        },
    });

    return create;
};

// READ (R) - BUSCAR TODAS AS NOTIFICAÇÕES (GET)
const getAllNotifications = async()=>{
    const notification = await prisma.notificationengagement.findMany();

    return notification;
};

// UPDATE (U) - ATUALIZAR OS DADOS DE UMA NOTIFICAÇÃO (PUT)
const updateNotification = async(id, data)=>{
    const update = await prisma.notificationEngagement.update({
        where: {id},
        data: {
            foodId: data.foodId,
            beneficiaryId: data.beneficiaryId,
            notificationType: data.notificationType,
            updateAt: data.updateAt,
        },
    });

    return update;
};

// DELETE (D) - DELETA UMA NOTIFICAÇÃO (DELETE)
const deleteNotification = async(id)=>{
    const deleteN = await prisma.notificationEngagement.delete({ where: {id} });

    return deleteN;
}

export default {
    createNotification,
    getAllNotifications,
    updateNotification,
    deleteNotification
}