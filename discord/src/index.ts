// import { scheduleJob } from "node-schedule";
import readline from "readline";
import OtterBot from "./OtterBot";
import { version } from "../package.json";
import { OtterLogger } from "./utils/logger/OtterLogger";

const ENV = process.env.NODE_ENV || "";
const IO = readline.createInterface(process.stdin, process.stdout);
const logger: OtterLogger = new OtterLogger(IO);

let welcome: String = String.raw`

 __    __     ______     __    __     ______     ______     ______  
/\ "-./  \   /\  __ \   /\ "-./  \   /\  == \   /\  __ \   /\__  _\ 
\ \ \-./\ \  \ \  __ \  \ \ \-./\ \  \ \  __<   \ \ \/\ \  \/_/\ \/ 
 \ \_\ \ \_\  \ \_\ \_\  \ \_\ \ \_\  \ \_____\  \ \_____\    \ \_\ 
  \/_/  \/_/   \/_/\/_/   \/_/  \/_/   \/_____/  \/_____/     \/_/ 
                                                                    
`;

logger.writeToConsole(welcome.toString());
logger.report(`Version: [${version}]`);
logger.report(`Lauching mambot in ${ENV} environment...`);
logger.report(`Logging in mambot...`);

if (ENV === "production") {
  console = console || {};
  console.log = function () {};
}

const bot = new OtterBot(logger);

process.on("SIGINT", () => {
  logger.report(`Logging out mambot...`);
  bot.logout();
  logger.report(`Goodbye!`);
  process.exit(0);
});
