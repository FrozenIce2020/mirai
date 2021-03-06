exports.run = (client, message, [second_command, mention, xp_count]) => {
    const mysql = require("mysql");
    const con = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });
    try {
		const memberMention = message.mentions.members.first();

		if(second_command == "добавить"){
			if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Недостаточно прав!");
			if(!memberMention) return message.channel.send("Вы не указали человека!");
			if(!xp_count) return message.channel.send("Вы не указали количество очков!");
			if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Недостаточно прав!");

			con.query(`SELECT * FROM global WHERE userid = ${memberMention.user.id}`, function(err, xp){
				if(err) throw err;
				if(xp.length == 0){
					con.query(`INSERT INTO global (userid, xp) VALUES('${memberMention.id}',${xp_count})`)
					message.channel.send(`Очки пользователя ${memberMention} успешно увеличены до **${xp_count}**`)
				} else {
					const newXP = parseInt(xp_count) + xp[0].xp;
					con.query(`UPDATE global SET xp = ${newXP} WHERE userid = ${memberMention.user.id}`, function(err){
						if(err) throw err;
						message.channel.send(`Очки пользователя ${memberMention} успешно увеличены с **${xp[0].xp}** до **${newXP}**`);
					})
				}
			})
		} else if(second_command == "удалить"){
			if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Недостаточно прав!");
			if(!memberMention) return message.channel.send("Вы не указали человека!");
			if(!xp_count) return message.channel.send("Вы не указали количество очков!");

			con.query(`SELECT * FROM global WHERE userid = ${memberMention.user.id}`, function(err, xp){
				if(err) throw err;
				if(xp.length == 0){
					con.query(`INSERT INTO global (userid, xp) VALUES('${memberMention.id}',${xp_count})`)
					message.channel.send(`Очки пользователя ${memberMention} успешно уменьшены до **${xp_count}**`)
				} else {
					const newXP = xp[0].xp - xp_count;
					con.query(`UPDATE global SET xp = ${newXP} WHERE userid = ${memberMention.user.id}`, function(err){
						if(err) throw err;
						message.channel.send(`Очки пользователя ${memberMention} успешно уменьшены с **${xp[0].xp}** до **${newXP}**`);
					})
				}
			})
		} else return message.channel.send("Неизвестный аргумент");
	} catch(err) {
		client.fetchUser('412338841651904516').then(user => user.send(`\`\`\`javascript\n${err.stack}\`\`\``));
	}
};
