import React from 'react';

import FeedScreen from 'src/posts/screens/Feed';

import ReduxProvider from 'src/core/redux/provider/index';

const App: React.FC = () => {
  return (
    <ReduxProvider>
      <FeedScreen />
    </ReduxProvider>
  );
};

export default React.memo(App);
