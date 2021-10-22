import React from 'react';
import { Provider } from 'react-redux';

import { buildStore } from '../store';

interface IReduxProviderProps {}

const store = buildStore();

const ReduxProvider: React.FC<IReduxProviderProps> = props => {
  return <Provider store={store}>{props.children}</Provider>;
};

export default React.memo(ReduxProvider);
