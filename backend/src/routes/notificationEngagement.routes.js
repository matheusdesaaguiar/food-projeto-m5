import { Router } from "express";
import notificationController from "../controller/notificationengagement.controller.js";

const notificationRoutes = Router();

notificationRoutes.post('/create', notificationController.createNotification);
notificationRoutes.get('/getall', notificationController.getAllNotifications);
notificationRoutes.put('/update/:id', notificationController.updateNotification);
notificationRoutes.delete('/delete/:id', notificationController.deleteNotification);

export default notificationRoutes;