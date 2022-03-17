export enum EnvironmentNames {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  QA = 'qa',
  PRODUCTION = 'production',
}

export type EnvironmentConfig = {
  ENVIRONMENT: EnvironmentNames;
  API_BASE: string;
  SOME_ANALYTICS_KEY: string;
};
