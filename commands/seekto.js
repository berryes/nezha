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

        if(isNaN( parseInt(args[0]) )) return message.reply( { embeds:[errorEmbed.get("seekNaN")] } )


        player.seekTo( ( parseInt ( args[0] ) * 1000  ) )
    }
}