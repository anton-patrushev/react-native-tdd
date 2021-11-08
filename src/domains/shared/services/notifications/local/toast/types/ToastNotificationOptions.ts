import { ToastNotificationType } from './ToastNotificationType';

export type ToastNotificationOptions = {
  type: ToastNotificationType;
  title: string;
  body?: string;
};
