const { MusicEmbed } = require("../Controllers/musicEmbed");
const played = require("../Database/models/played");

module.exports = {
    execute: async (client,message,args) =>{
        
        const res = await client.jukebox.resolve(args.join(" "));

        const player = client.jukebox.createConnection({
            guildId: message.guild.id,
            voiceChannel: message.member.voice.channelId,
            textChannel: message.channel.id,
            selfDeaf: true
          });

          if (player.isPlaying){
            player.queue.add(res.tracks[0])
          }
          
          if(res.loadType === "LOAD_FAILED") { message.reply("Failed to load stream")
            return console.log(res)
        }
          if(res.loadType === "NO_MATCHES") return message.reply("No track found");
          if(res.loadType === "LOAD_FAILED") return message.reply("Failed to load");
          

          // in case its a playlist
          if(res.loadType === "PLAYLIST_LOADED"){
            const playedModel = await played()
            
            // adding tracks
            for (const track of res.tracks) {
                track.info.requester = message.author;
                player.queue.add(track);
                await playedModel.create({uri: track.info.uri })
              }

              // in case player is not playing
              if (!player.isPlaying) return player.play();

          }

          const track = res.tracks[0];
          track.info.requester = message.author;
          player.queue.add(track);

          const embed = new MusicEmbed({player:player}).found()

          let deletion = await message.reply({embeds: [embed]})
          deletion.delete()

          const playedModel = await played()
          await playedModel.create({uri: res.tracks[0].info.uri })

          if (!player.isPlaying) return player.play();


    }
}