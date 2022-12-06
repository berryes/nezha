const { EmbedBuilder } = require("@discordjs/builders")

class MusicEmbed {
    constructor(object){
        this.player = object.player ?? null,
        this.track = object.track ?? null,
        this.playlist = object.playlist ?? "Playlist",
        this.title,
        this.author,
        this.description,
        this.thumbnail,
        this.footer,
        this.color
    }
    play(){ // n
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
    found(){
        const embedus = new EmbedBuilder()
        .setDescription("Loading track(s)")
        return embedus
    }
    end(){
        const embedus = new EmbedBuilder()
        .setDescription("next track")
        return embedus
    }
    stop(){

    }
    playlist(){
        const embedus = new EmbedBuilder()
        .setTitle()
        return embedus
    }

}
module.exports = {MusicEmbed}