import React from 'react';

import PostsList from 'src/posts/components/PostsList';

import ReduxProvider from 'src/core/redux/providers/redux/Provider';

const App: React.FC = () => {
  return (
    <ReduxProvider>
      <PostsList />
    </ReduxProvider>
  );
};

export default App;
