import React from 'react';

import ReduxProvider from 'src/core/redux/provider/index';
import ToastNotificationServiceProvider from 'src/domains/shared/services/notifications/local/toast/ToastNotificationServiceProvider';

import { RootRouter } from 'src/features/app/routers/root/RootRouter';

const App: React.FC = () => {
  return (
    <>
      <ReduxProvider>
        <RootRouter />
        <ToastNotificationServiceProvider />
      </ReduxProvider>
    </>
  );
};

export default React.memo(App);
