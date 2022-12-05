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


const musicNodes = [
  {
    name: "asd",
    host: process.env.LAVALINK_NODE_HOST,
    port: process.env.LAVALINK_NODE_PORT,
    password: process.env.LAVALINK_NODE_PASSWORD
  }
]
client.jukebox = new Poru(client, nodes, PoruOptions);
client.poru.on("trackStart", (player, track) => {
  const channel = client.channels.cache.get(player.textChannel);
  return channel.send(`Now playing \`${track.title}\``);
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
const fs = require("fs")
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
