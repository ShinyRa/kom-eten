import { Message } from "discord.js";

import { Command, CommandParams } from "./Command";

export class Help extends Command {
  public async execute({ message }: CommandParams): Promise<Message> {
    return message.author.send("bruh");
  }
}
