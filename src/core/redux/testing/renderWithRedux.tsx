import { render } from '@testing-library/react-native';

import React from 'react';

import { Provider } from 'react-redux';
import { RootState } from 'typesafe-actions';

import { buildStore } from '../store';

interface RenderWithReduxOptions {
  state?: RootState;
}

export function renderWithRedux<P>(
  component: React.ComponentType<P>,
  options: RenderWithReduxOptions,
) {
  const store = buildStore(options.state);

  const queries = render(<Provider store={store}>{component}</Provider>);

  return {
    ...queries,
    store: store,
  };
}
