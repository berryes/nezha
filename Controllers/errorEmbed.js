const { EmbedBuilder } = require("@discordjs/builders")
const errorCodes = require("../errors.json")
class ErrorEmbed {
    constructor(reason){
        this.reason = reason
    }
    get(req){
        const embed = new EmbedBuilder()
        .setColor(0xFF001A)
        .setTitle(errorCodes[req])
        .setTimestamp()
        return embed
    }

}

module.exports = {ErrorEmbed}