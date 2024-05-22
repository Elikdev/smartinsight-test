require("dotenv").config();
const {
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_DIALECT,
  DATABASE_PORT,
} = process.env;

module.exports = {
  logging: (e) => console.log(e),
  dialect: DATABASE_DIALECT,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  host: DATABASE_HOST,
  port: DATABASE_PORT,
};
