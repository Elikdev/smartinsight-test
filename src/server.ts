import app from ".";
import config from "./config/config";
import { green, bold } from "kleur";
import sequelize from "./config/db.config";
import logger from "./utils/logger";
import chalk from "chalk"
import dbInit from "./model/init";
import { error } from "winston";

const port = config.PORT;


app.listen(port, async () => {
 sequelize
   .authenticate()
   .then(() => {
     logger(module).info(chalk.green(`Database connected succesfully`));
     dbInit();
   })
   .catch((error) =>
     logger(module).info(chalk.red(`Database error: ${error.message}`))
   );
 console.log(bold(green(`REST API on http://localhost:${port}/`)));
});

process.on("SIGINT", () => {
 console.log("SIGINT signal received");
 process.exit(1)
});

process.on("SIGTERM", () => {
 console.log("SIGTERM signal received");
 process.exit(1)
});

process.on("SIGQUIT", () => {
 console.log("SIGQUIT signal received");
 process.exit(1)
});
