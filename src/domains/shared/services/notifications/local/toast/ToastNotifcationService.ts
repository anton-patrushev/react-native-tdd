import Toast from 'react-native-toast-message';

import { ToastNotificationType } from './types/ToastNotificationType';
import { IToastNotificationService } from './IToastNotificationService';
import { ToastNotificationOptions } from './types/ToastNotificationOptions';

class _ToastNotificationService implements IToastNotificationService {
  private _showSuccess = (title: string, body?: string) => {
    Toast.show({ type: 'success', text1: title, text2: body });
  };

  private _showError = (title: string, body?: string) => {
    Toast.show({ type: 'error', text1: title, text2: body });
  };

  private _showInfo = (title: string, body?: string) => {
    Toast.show({ type: 'info', text1: title, text2: body });
  };

  public show = (options: ToastNotificationOptions) => {
    switch (options.type) {
      case ToastNotificationType.SUCCESS:
        return this._showSuccess(options.title, options.body);

      case ToastNotificationType.ERROR:
        return this._showError(options.title, options.body);

      case ToastNotificationType.INFO:
        return this._showInfo(options.title, options.body);
    }
  };
}

const ToastNotificationService = new _ToastNotificationService();

export default ToastNotificationService;
