import MamBot from "./MamBot";

import { OtterLogger } from "./utils/logger/OtterLogger";
import { version } from "../package.json";

const ENV = process.env.NODE_ENV;
const logger: OtterLogger = new OtterLogger();

const welcome: String = String.raw`

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

const bot = new MamBot(logger);

process.on("SIGINT", () => {
  bot.logout();
  process.exit(0);
});
