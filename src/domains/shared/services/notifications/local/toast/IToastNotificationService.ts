import { ToastNotificationOptions } from './types/ToastNotificationOptions';

export interface IToastNotificationService {
  show(options: ToastNotificationOptions): void;
}
