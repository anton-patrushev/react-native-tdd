import { IEnvInfoService } from 'src/domains/info/services/env/IEnvInfoService';
import { ENVIRONMENT_CONFIG } from 'src/core/env/config';
import { injectable } from 'inversify';

@injectable()
export class EnvInfoService implements IEnvInfoService {
  getEnvName(): string {
    return ENVIRONMENT_CONFIG.ENVIRONMENT;
  }

  getBaseApiURL(): string {
    return ENVIRONMENT_CONFIG.API_BASE;
  }

  getSomeAnalyticsKey(): string {
    return ENVIRONMENT_CONFIG.SOME_ANALYTICS_KEY;
  }
}
