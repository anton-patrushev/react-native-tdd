import React from 'react';

import FeedScreen from 'src/features/feed/screens/Feed';

import ReduxProvider from 'src/core/redux/provider/index';
import ToastNotificationServiceProvider from 'src/domains/shared/services/notifications/local/toast/ToastNotificationServiceProvider';

const App: React.FC = () => {
  return (
    <>
      <ReduxProvider>
        <FeedScreen />
        <ToastNotificationServiceProvider />
      </ReduxProvider>
    </>
  );
};

export default React.memo(App);
