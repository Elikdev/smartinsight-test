import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const {
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_DIALECT,
  DATABASE_PORT
} = process.env as {
  DATABASE_NAME: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_HOST: string;
  DATABASE_DIALECT:
    | "mysql"
    | "postgres"
    | "sqlite"
    | "mariadb"
    | "mssql"
    | "db2"
    | "snowflake"
    | "oracle";
   DATABASE_PORT: string;
};
console.log(
  chalk.green(
    `DATABASE CONFIG: ${JSON.stringify({
      DATABASE_NAME,
      DATABASE_USER,
      DATABASE_PASSWORD,
      DATABASE_HOST,
      DATABASE_DIALECT,
      DATABASE_PORT,
    })}`
  )
);
const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: DATABASE_DIALECT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: console.log,
    port: DATABASE_PORT ? Number(DATABASE_PORT) : 5432,
  }
);


export default sequelize;
