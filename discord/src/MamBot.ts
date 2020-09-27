import { Client, Message } from "discord.js";

import { version } from "../package.json";
import { OtterLogger } from "./utils/logger/OtterLogger";
import { ActivityStatusEnum } from "./utils/logger/activity/ActivityStatusEnum";

import * as Cmd from "./commands";

export default class MamBot {
  logger: OtterLogger;
  client: Client;

  PREFIX: string = "?";
  commands: Map<string, any> = new Map<string, any>();

  constructor(logger: OtterLogger) {
    this.logger = logger;
    this.client = new Client();

    this.commands.set("help", new Cmd.Help());

    this.client
      .login(process.env.API_KEY)
      .catch((err) => {
        this.logger.report(err.message, ActivityStatusEnum.ERROR);
        this.logger.report(
          `Unable to log in with key ${process.env.API_KEY}`,
          ActivityStatusEnum.ERROR
        );
      })
      .finally(() => {
        this.listenForCommands();
        this.client.user?.setActivity(
          `[${version}] in ${process.env.NODE_ENV} environment!`
        );
      });

    this.client.on("error", (err) => {
      this.logger.report(err.message, ActivityStatusEnum.ERROR);
    });
  }

  listenForCommands(): void {
    this.client.on("message", async (message: Message) => {
      if (!message.content.startsWith(this.PREFIX)) return;

      const identifier = message.content.substring(1);
      const command = this.commands.get(identifier);

      if (command instanceof Cmd.Command) {
        this.logger.report(
          `Executing command "${message.content}", for user ${message.author.tag}`
        );
        command
          .execute({ message: message })
          .then(() => {
            this.logger.report(
              `Completed command "${message.content}", for user ${message.author.tag}`
            );
          })
          .catch((error) => {
            this.logger.report(
              `Failed to execute command "${message.content}", for user ${message.author.tag}`,
              ActivityStatusEnum.ERROR
            );
            this.logger.report(error, ActivityStatusEnum.ERROR);
          });
      }
    });
  }

  public logout(): void {
    this.logger.report(`Logging out mambot...`);
    this.client.destroy();
    this.logger.report(`Goodbye!`);
  }
}
