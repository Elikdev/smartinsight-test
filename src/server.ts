import app from ".";
import config from "./config/config";
import { green, bold } from "kleur";

const port = config.PORT;


app.listen(port, async () => {
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
