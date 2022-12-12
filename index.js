const { ShardingManager } = require('discord.js');

const played = require('./Database/models/played');

require("dotenv").config()
const manager = new ShardingManager('./bot.js', { token: process.env.BOT_TOKEN });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');
db.close()

async function generate(){
    await played({i:true})
}

generate()