export interface DatabaseConfig {
  url: string;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
}

export interface MailConfig {
  host: string;
  port: number;
  user: string;
  password: string;
}

export interface AppConfig {
  port: number;
  database: DatabaseConfig;
  jwt: JwtConfig;
  mail: MailConfig;
  stripe_secret_key:string
  logtail_key:string
}

