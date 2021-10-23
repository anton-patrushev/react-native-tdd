import { ToastNotificationType } from './types/ToastNotificationType';
import { IToastNotificationService } from './IToastNotificationService';
import { ToastNotificationOptions } from './types/ToastNotificationOptions';

// Ignore test coverage for FakeNotificationService
/* istanbul ignore next */
class _FakeNotificationService implements IToastNotificationService {
  _showSuccess = (_title: string, _body?: string) => {};

  _showError = (_title: string, _body?: string) => {};

  _showInfo = (_title: string, _body?: string) => {};

  show = (options: ToastNotificationOptions) => {
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

const FakeToastNotificationService = new _FakeNotificationService();

export default FakeToastNotificationService;
