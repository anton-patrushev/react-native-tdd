import { ContainerModule, interfaces } from 'inversify';
import { IToastNotificationService } from 'src/domains/shared/services/notifications/local/toast/IToastNotificationService';
import { TOAST_NOTIFICATIONS_IDENTIFIERS } from 'src/domains/shared/ioc/modules/toastNotifications.symbols';
import ToastNotificationService from 'src/domains/shared/services/notifications/local/toast/ToastNotifcationService';

const initializeToastNotificationsModule: interfaces.ContainerModuleCallBack = (
  bind,
) => {
  bind<IToastNotificationService>(
    TOAST_NOTIFICATIONS_IDENTIFIERS.TOAST_NOTIFICATIONS_SERVICE,
  ).toConstantValue(ToastNotificationService);
};

export const ToastNotificationsModule = new ContainerModule(
  initializeToastNotificationsModule,
);
