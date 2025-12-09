import { AppError } from "../middleware/error";
import Notification from "./notification.schema";

const createNotification = async () => {
  return {
    msg: "Notification created",
  };
};
const getNotification = async () => {
  const notification = await Notification.find();
  if (!notification) {
    throw new AppError(404, "No notifications found");
  }
  return notification;
};
const getAdminNotification = async (adminId: string) => {
  if (!adminId) {
    throw new AppError(400, "No admin id provided");
  }
  const notification = await Notification.find({
    recipientId: adminId,
  });
  if (!notification) {
    throw new AppError(404, "No notifications found for this admin");
  }
  return notification;
};
const readNotification = async () => {
  return {
    msg: "Notification read",
  };
};

export const NotificationService = {
  createNotification,
  getNotification,
  getAdminNotification,
  readNotification,
};
