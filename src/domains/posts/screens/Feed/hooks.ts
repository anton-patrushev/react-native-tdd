import React from 'react';
import { useSelector } from 'react-redux';

import { getPostsError } from 'src/domains/posts/redux/selectors/posts';
import { ToastNotificationType } from 'src/domains/shared/services/notifications/local/toast/types/ToastNotificationType';
import useInjection from 'src/core/ioc/hooks/useInjection';
import { TOAST_NOTIFICATIONS_IDENTIFIERS } from 'src/domains/shared/ioc/modules/toastNotifications.symbols';
import { IToastNotificationService } from 'src/domains/shared/services/notifications/local/toast/IToastNotificationService';

export default function useFeedScreen() {
  const toastNotificationService = useInjection<IToastNotificationService>(
    TOAST_NOTIFICATIONS_IDENTIFIERS.TOAST_NOTIFICATIONS_SERVICE,
  );

  const postsLoadingError = useSelector(getPostsError);

  React.useEffect(() => {
    if (postsLoadingError) {
      toastNotificationService.show({
        type: ToastNotificationType.ERROR,
        title: 'Loading posts failed',
        body: postsLoadingError,
      });
    }
  }, [toastNotificationService, postsLoadingError]);
}
