import React from 'react';
import { useSelector } from 'react-redux';

import DI from 'src/core/ioc/DI';
import { Dependency } from 'src/core/ioc/types';

import { getPostsError } from 'src/posts/redux/selectors/posts';
import { ToastNotificationType } from 'src/shared/services/notifications/local/toast/types/ToastNotificationType';

export default function useFeedScreen() {
  const postsLoadingError = useSelector(getPostsError);

  React.useEffect(() => {
    if (postsLoadingError) {
      const ToastNotificationService = DI.getDependency(
        Dependency.TOAST_NOTIFICATION_SERVICE,
      );

      ToastNotificationService.show({
        type: ToastNotificationType.ERROR,
        title: 'Loading posts failed',
        body: postsLoadingError,
      });
    }
  }, [postsLoadingError]);
}
