import { Dialect } from 'sequelize';

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DATABASE: string;
      DATABASE_USER: string;
      DATABASE_PASSWORD: string;
      HOST: string;
      DIALECT: Dialect;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}
