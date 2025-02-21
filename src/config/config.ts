import { AppConfig } from './config.type';

export default (): AppConfig => ({
  port: parseInt(process.env.PORT!, 10) || 3000,
  database: {
    url: process.env.DATABASE_URL!,
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: '1d',
  },
  mail: {
    host: process.env.MAIL_HOST||"thsv53.hostatom.com",
    port: Number(process.env.MAIL_PORT||465),
    user: process.env.MAIL_USER||"test@ta-pps.com",
    password: process.env.MAIL_PASSWORD||"Nontawat...15885",
  },
  stripe_secret_key:process.env.STRIPE_SECRET_KEY!,
  logtail_key:process.env.LOGTAIL_KEY!
});