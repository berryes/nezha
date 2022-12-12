const { ErrorEmbed } = require("../Controllers/errorEmbed");

module.exports = {

    execute: async (client,message,args) =>{
        

        const player = client.jukebox.createConnection({
            guildId: message.guild.id,
            voiceChannel: message.member.voice.channelId,
            textChannel: message.channel.id,
            selfDeaf: true
          });


        const errorEmbed = new ErrorEmbed()
        if(!player.isPlaying) return message.reply({embeds:[errorEmbed.get("notPlaying")]})

        let currentIndex = player.queue.length,  randomIndex;
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [player.queue[currentIndex], player.queue[randomIndex]] = [
            player.queue[randomIndex], player.queue[currentIndex]];
        }

        message.reply("Shuffled")
    }
}