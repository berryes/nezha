module.exports = {
    execute: async (client,message,args) =>{
        
        const res = await client.jukebox.resolve(args.join(" "));

        const player = client.jukebox.createConnection({
            guildId: message.guild.id,
            voiceChannel: message.member.voice.channelId,
            textChannel: message.channel.id,
            selfDeaf: true
          });
        

          const track = res.tracks[0];
          track.info.requester = message.author;
          player.queue.add(track);
          /* message.reply(`Queued Track \n \`${track.title}\``); */

          player.play();
    }
}