// yarn jest --coverage src/core/ioc/hooks/__tests__/useInjection.test.ts

import { renderHook } from '@testing-library/react-hooks';

import useInjection from '../useInjection';
import { container } from 'src/core/ioc/container/container';

describe('useInjection', () => {
  const dependency = { dependencyMethod: jest.fn(), dependencyProp: 'prop' };

  const testIdentifier = Symbol.for('TestDependency');

  beforeAll(() => {
    container.unbindAll();

    container
      .bind<typeof dependency>(testIdentifier)
      .toConstantValue(dependency);
  });

  afterAll(() => {
    container.unbindAll();
  });

  describe('when the dependency was registered in IOC container', () => {
    it('should return dependency by provided identifier', () => {
      const { result } = renderHook(() => useInjection(testIdentifier));

      const actualResult = result.current;
      const expectedResult = dependency;

      expect(actualResult).toBe(expectedResult);
      expect(actualResult).toStrictEqual(expectedResult);
    });
  });

  describe("when the dependency wasn't registered in IOC container", () => {
    beforeAll(() => {
      container.unbind(testIdentifier);
    });

    it('should throw an error', () => {
      const { result } = renderHook(() => useInjection(testIdentifier));

      expect(result.error).toBeDefined();
    });
  });
});
