// yarn jest --coverage src/core/app/__tests__/initApp.test.ts

import { AppRegistry } from 'react-native';

import initApp, { appRegister } from '../initApp';

import AppMock from 'src/core/app/__mocks__/App';
import * as initIoCModule from 'src/core/ioc/init';

jest.mock('src/core/app/App');
jest.mock('src/core/ioc/init');

describe('when initApp called', () => {
  let registerComponentSpy: jest.SpyInstance;
  let initializeDIContainerSpy: jest.SpyInstance;

  beforeAll(() => {
    registerComponentSpy = jest.spyOn(AppRegistry, 'registerComponent');
    initializeDIContainerSpy = jest.spyOn(
      initIoCModule,
      'initializeDIContainer',
    );
  });

  afterAll(() => {
    jest.unmock('src/core/app/App');
    registerComponentSpy.mockRestore();
    initializeDIContainerSpy.mockRestore();
  });

  it('should register core application with provided appName', async () => {
    const appName = 'tdd-application';

    await initApp(appName);

    expect(initializeDIContainerSpy).toHaveBeenCalledTimes(1);
    expect(registerComponentSpy).toHaveBeenCalledTimes(1);
    expect(registerComponentSpy).toHaveBeenCalledWith(appName, appRegister);
  });

  describe('appRegister', () => {
    it('should return App', () => {
      const actualResult = appRegister();

      expect(actualResult.name).toBe(AppMock.name);
    });
  });
});
