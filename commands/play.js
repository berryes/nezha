const { MusicEmbed } = require("../Controllers/musicEmbed");

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
          
          if(res.loadType === "LOAD_FAILED") return message.reply("Failed to load stream");
          

          // in case its a playlist
          if(res.loadType === "PLAYLIST_LOADED"){
            
            // adding tracks
            for (const track of res.tracks) {
                track.info.requester = message.author;
                player.queue.add(track);
              }

              
              // in case player is not playing
              if (!player.isPlaying) return player.play();

          }

          const track = res.tracks[0];
          track.info.requester = message.author;
          player.queue.add(track);

          const embed = new MusicEmbed({player:player}).found()
          message.reply({embeds: [embed]})

          if (!player.isPlaying) return player.play();

    }
}