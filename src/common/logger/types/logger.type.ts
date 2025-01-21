export interface LoggerConfig {
  token: string;
  source?: string;
}

export interface LogConfig {
  admin?: LoggerConfig;
  core?: LoggerConfig;
  app?: LoggerConfig;
}

