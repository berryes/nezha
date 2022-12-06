// bot.js
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { Poru } = require("poru");
require("dotenv").config()

const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildVoiceStates,
    ],
  });

  const PoruOptions = {
    reconnectTime: 0,
    resumeKey: "MyPlayers",
    resumeTimeout: 0,
    defaultPlatform: "ytsearch",
  };
const musicNodes = [
  {
    name: "asd",
    host: process.env.LAVALINK_NODE_HOST,
    port: process.env.LAVALINK_NODE_PORT,
    password: process.env.LAVALINK_NODE_PASSWORD
  }
]

client.config = new Collection();
client.jukebox = new Poru(client, musicNodes, PoruOptions);

client.jukebox.on("trackStart", (player, track) => {
  const channel = client.channels.cache.get(player.textChannel);

  const embed = new MusicEmbed({player:player,track:track})

  return channel.send({embeds: [embed.play()]});
});

client.jukebox.on("nodeClose", (node) => {
  console.log("lost connection to node")
})

client.jukebox.on("trackEnd",  (player,track,oldtrack) => {
  const embed = new MusicEmbed({player:player,track:track})
  
  console.log("track ended")

   client.channels.cache.get(player.textChannel).send({embeds: [embed.end()]})
})


client.on("ready", () => {
  console.log("Ready!");
  client.jukebox.init(client);
});


/* for(let i = 0; i < 30; i++){
  if(!process.env[`LAVALINK_NODE${i}_HOST`]) 

    musicNodes.push({
      name: Math.random().toString(32).substring(2),
      host: process.env[`LAVALINK_NODE${i}_HOST`],
      port: parseInt(process.env[`LAVALINK_NODE${i}_PORT`]),
      password: process.env[`LAVALINK_NODE${i}_PASSWORD`]
    })

} */


// command and even handeling
client.commands = new Collection();
const fs = require("fs");
const { MusicEmbed } = require('./Controllers/musicEmbed');
const events = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`./events/${file}`);
  console.log(`Event loaded     ${eventName}`)
  client.on(eventName, event.bind(null, client));
}

const commands = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./commands/${file}`);
  console.log(`Command loaded     ${commandName}`)
  client.commands.set(commandName,command);

}
// END of command and event handeling


// logging client in via token
client.login(process.env.BOT_TOKEN);
