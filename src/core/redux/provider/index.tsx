import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../store';

interface IReduxProviderProps {}

const ReduxProvider: React.FC<IReduxProviderProps> = props => {
  return <Provider store={store}>{props.children}</Provider>;
};

export default React.memo(ReduxProvider);
