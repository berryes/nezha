module.exports = async (client,message) =>
{

    console.log(process.env.PREFIXES.split(" "));
    if (message.content) {
        if(process.env.PREFIXES.split(" ").includes(message.content[0])){
            let args = message.content
            .slice(1)
            .trim()
            .split(/ +/g);

            const command = client.commands.get(args[0]);
            args.shift();

            command.execute(client,message,args);
        }
    }

}