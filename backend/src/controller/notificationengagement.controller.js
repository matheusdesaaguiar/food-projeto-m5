import notificationService from '../services/NotificationEngagement.service.js'
const { createNotification, getAllNotifications, updateNotification, deleteNotification } = notificationService;

class NotificationController {

    async createNotification(req, res){
        const {
            foodId,
            beneficiaryId,
            notificationType,
        } = req.body;

        if(!foodId || !beneficiaryId || !notificationType) {
            return res.status(400).send({ message: 'Por favor, forneca todos os dados necessários!' })
        };

        const notification = await createNotification({
            foodId,
            beneficiaryId,
            notificationType,
        });
        res.status(201).send({ message: 'Notificação criada com sucesso', notification });
    };

    async getAllNotifications(req, res){
        const notifications = await getAllNotifications();
        res.status(200).send({ message: 'Busca por todas as notificações concluidada!', notifications })
    };

    async updateNotification(req, res){
        const {id} = req.params;
        const {
            foodId,
            beneficiaryId,
            notificationType,
            updateAt,
        } = req.body

        if(!foodId || !beneficiaryId || !notificationType || !updateAt){
            res.status(400).send({ message: 'Por favor, forneca todos os dados necessários'});
        };

        const update = await updateNotification(id, {
            foodId,
            beneficiaryId,
            notificationType,
            updateAt,
        });
        res.status(200).send({ message: 'Atualização concluida!', update });
    };

    async deleteNotification(req, res){
        const {id} = req.params;
        const deleteN = await deleteNotification(id);
        if(!deleteN) {
            return res.status(400).send({ message: 'Essa notificação não foi encontrada' });
        };
        res.status(200).send({ message: 'Notificação deletada com sucesso!' })
    };
};

export default new NotificationController;