exports.run = (client, message, args) => {
    const Discord = require("discord.js");
    const mysql = require("mysql");
    const con = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });
    try {
        const mentionMember = message.mentions.members.first();
        if(mentionMember){
            con.query(`SELECT id,kick FROM kick ORDER BY kick.id DESC`, function(err, result){
                if(err) throw err;
                const lastID = result[0].id;
                const random = Math.floor(Math.random() * lastID) + 1;
                con.query(`SELECT kick FROM kick WHERE id=${random}`, function(err, result){
                    if(err) throw err;
                    const embed = new Discord.RichEmbed().setDescription(message.author + " пнул(а) " + mentionMember).setImage(result[0].kick).setFooter("Ваш бот - Дружелюбная изба", client.user.avatarURL).setColor("ffda8b");
                    message.channel.send(embed);
                    console.log('Команда "пнуть" использована пользователем ' + message.author.username + '. Результат - успешно');
                })
            })
        }
        if(!mentionMember){
            con.query(`SELECT id,kick FROM kick ORDER BY kick.id DESC`, function(err, result){
                if(err) throw err;
                const lastID = result[0].id;
                const random = Math.floor(Math.random() * lastID) + 1;
                con.query(`SELECT kick FROM kick WHERE id=${random}`, function(err, result){
                    if(err) throw err;
                    const embed = new Discord.RichEmbed().setDescription(message.author + " пнул(а)... Самого себя?").setImage(result[0].kick).setFooter("Ваш бот - Дружелюбная изба", client.user.avatarURL).setColor("ffda8b");
                    message.channel.send(embed);
                    console.log('Команда "пнуть" использована пользователем ' + message.author.username + '. Результат - успешно');
                })
            })
        }
    } catch(err) {
        client.fetchUser('412338841651904516').then(user => user.send(`\`\`\`javascript\n${err.stack}\`\`\``));
    }
}
