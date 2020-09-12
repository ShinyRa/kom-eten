import { Client } from "discord.js";
import { version } from "../package.json";
import DotenvParser from "./utils/DotenvParser";
import axios from "axios";
import { OtterLogger } from "./utils/logger/OtterLogger";
import { ActivityStatusEnum } from "./utils/logger/activity/ActivityStatusEnum";

export default class OtterBot {
  logger: OtterLogger;

  client: Client;
  FULL_DAY: number = 23;
  FULL_MINUTE: number = 60;

  isOtterday: boolean = false;
  dotenvParser: DotenvParser;

  PREFIX: string = "?";

  constructor(logger: OtterLogger) {
    this.logger = logger;
    this.dotenvParser = new DotenvParser();
    this.client = new Client();

    this.client
      .login(this.dotenvParser.get("API_KEY"))
      .catch((err) => {
        this.logger.report(err.message, ActivityStatusEnum.ERROR);
        this.logger.report(
          `Unable to log in with key ${this.dotenvParser.get("API_KEY")}`,
          ActivityStatusEnum.ERROR
        );
      })
      .finally(() => {
        this.listenForCommands();
        this.client.user?.setActivity(
          `[${version}] in ${process.env.NODE_ENV} environment!`
        );
      });

    this.client.on("ready", () => {
      this.logger.report(`Logged in as ${this.client.user?.tag}!`);
    });

    this.client.on("error", (err) => {
      this.logger.report(err.message, ActivityStatusEnum.ERROR);
    });
  }

  listenForCommands() {
    this.client.on("message", async (msg) => {
      if (msg.content === "ping") {
        msg.reply("Pong!");
      }
      // setInterval(async () => {
      //   let json = await fetch(
      //     "http://localhost:3000/eten/readEten"
      //   ).then((response) => response.json());

      //   for (var index in json) {
      //     client.channels.cache
      //       .get("737362429092036702")
      //       .send(json[index].message || "ETEN!");
      //   }
      // }, 1000);
    });
  }

  logout() {
    this.client.destroy();
  }
}
