import React from 'react';
import Toast from 'react-native-toast-message';

interface IToastNotificationServiceProviderProps {}

const ToastNotificationServiceProvider: React.FC<IToastNotificationServiceProviderProps> =
  () => {
    return <Toast ref={(ref) => Toast.setRef(ref)} />;
  };

export default React.memo(ToastNotificationServiceProvider);
