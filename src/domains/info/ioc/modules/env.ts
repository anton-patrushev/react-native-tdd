import { ContainerModule, interfaces } from 'inversify';
import { IEnvInfoService } from 'src/domains/info/services/env/IEnvInfoService';
import { ENV_MODULE_IDENTIFIERS } from 'src/domains/info/ioc/modules/env.symbols';
import { EnvInfoService } from 'src/domains/info/services/env/EnvInfoService';

const initializeEnvModule: interfaces.ContainerModuleCallBack = (bind) => {
  bind<IEnvInfoService>(ENV_MODULE_IDENTIFIERS.ENV_INFO_SERVICE)
    .to(EnvInfoService)
    .inSingletonScope();
};

export const EnvModule = new ContainerModule(initializeEnvModule);
