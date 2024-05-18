import { createLogger, format, transports } from "winston";
import rTracer from "cls-rtracer";
import path from "path";
import Module from "module";

const { combine, timestamp, label, printf } = format;

const getLogLabel = (callingModule: any) => {
  const parts = callingModule.filename.split(path.sep);
  return path.join(parts[parts.length - 2], parts.pop());
};


/**
 * Creates a Winston logger object.
 * ### Log Format
 * *| timestamp | request-id | module/filename | log level | log message |*
 *
 * @param {Module} callingModule the module from which the logger is called
 */
const logger = (callingModule: Module) =>
  createLogger({
    format: combine(
      format.colorize(),
      label({ label: getLogLabel(callingModule) }),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      printf((info) => {
        const rid = rTracer.id();
        
        return rid
          ? `| ${info.timestamp} | ${rid} | ${info.label} | ${info.message} |`
          : `| ${info.timestamp} | ${info.label} | ${info.message} |`;
        
      })
    ),
    transports: [
      new transports.Console({
        //silent: process.env.NODE_ENV === "development"
      }),
    ],
    exitOnError: false,
  });

export default logger;
