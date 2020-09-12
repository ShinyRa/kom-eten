const Discord = require("discord.js");
const client = new Discord.Client();
const fetch = require("node-fetch");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.reply("Pong!");
  }
});

client.login("");

setInterval(async () => {
  let json = await fetch(
    "http://localhost:3000/eten/readEten"
  ).then((response) => response.json());

  for (var index in json) {
    client.channels.cache
      .get("737362429092036702")
      .send(json[index].message || "ETEN!");
  }
}, 1000);
