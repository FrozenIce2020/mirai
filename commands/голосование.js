exports.run = async (client, message, args) => {
	let i, b, c = 0;
	for(i = 0; i < args.size; i++){
		await console.log(i)
		let a = await args[i].match(/"(.+?)"/);
		await console.log(a[1]);
		b[i] = a[1]
	}
	//const map = await b.map(count => `${++c} - ${b[c++]}`).join(`\n`);
	//await message.channel.send(map);
	//await console.log(map)
	//message.channel.send(`${b.map(b => `${++c} - ${b}`).join(`\n`)}`);
}
