const { EmbedBuilder } = require("@discordjs/builders");
const dayjs = require("dayjs");

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

        let seconds = Math.floor((this.track.info.length / 1000) % 60),
        minutes = Math.floor((this.track.info.length / (1000 * 60)) % 60),
        hours = Math.floor((this.track.info.length / (1000 * 60 * 60)) % 24);
        
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        const embedus = new EmbedBuilder()
        .setTitle(this.track.info.title)
        .setURL(this.track.info.uri)
        .setAuthor({
            name: this.track.info.requester.username + " requested",
            iconURL: this.track.info.requester.displayAvatarURL()
        })
        .setThumbnail(this.track.info.image)
        .setTimestamp()
        .setDescription(`** ${hours + ":" + minutes + ":" + seconds} ** | <#${this.player.voiceChannel}>`)

        return embedus;
    }
    found(){
        const embedus = new EmbedBuilder()
        .setDescription("Loading track(s)")
        return embedus
    }
    end(){
        const embedus = new EmbedBuilder()
        .setDescription("Queue ended")
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