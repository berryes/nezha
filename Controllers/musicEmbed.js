const { EmbedBuilder } = require("@discordjs/builders")

class MusicEmbed {
    constructor(player,track){
        this.player = player,
        this.track = track,
        this.title,
        this.author,
        this.description,
        this.thumbnail,
        this.footer,
        this.color
    }
    play(){
/*         console.log(this.player,this.track) */

        const embedus = new EmbedBuilder()
        .setTitle(this.track.info.title)
        .setURL(this.track.info.uri)
        .setAuthor({
            name: this.track.info.requester.username + " requested",
            iconURL: this.track.info.requester.displayAvatarURL()
        })
        .setThumbnail(this.track.info.image)
        .setTimestamp()
        .setDescription(`** ${this.track.info.length} ** | <#${this.player.voiceChannel}>`)

        return embedus;
    }
}
module.exports = {MusicEmbed}