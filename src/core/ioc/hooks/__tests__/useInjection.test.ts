// yarn jest --coverage src/core/ioc/hooks/__tests__/useInjection.test.ts

import { renderHook } from '@testing-library/react-hooks';
import DI from '../../DI';
import { Dependency } from '../../types';

import useInjection from '../useInjection';

jest.mock('src/core/ioc/DI');

describe('useInjection', () => {
  const key = 'dependency-key' as Dependency;

  const dependency = { dependencyMethod: jest.fn(), dependencyProp: 'prop' };

  afterAll(() => {
    jest.unmock('src/core/ioc/DI');
  });

  beforeAll(() => {
    // @ts-ignore
    DI.registerDependency(key, dependency);
  });

  afterAll(() => {
    // @ts-ignore
    DI.registerDependency(key, null);
  });

  it('should return dependency by provided key', () => {
    const { result } = renderHook(() => useInjection(key));

    const actualResult = result.current;
    const expectedResult = dependency;

    expect(actualResult).toBe(expectedResult);
  });
});
