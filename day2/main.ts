if (import.meta.main) {
	let input = await Deno.readTextFile('./day2/input');

	let sum = 0;
	const MAX = {
		red: 12,
		green: 13,
		blue: 14
	}
	for (const line of input.trim().split('\n')) {
		const [gameString, allRounds] = line.split(': ');
		const gameNum = parseInt(gameString.split(' ')[1]);
		const rounds = allRounds.split(';');
		let isOk = true;
		for (const round of rounds) {
			let colors = round.split(',');
			colors = colors.map(color => color.trim());
			for (const colorString of colors) {
				const [amount, color] = colorString.split(' ');
				const amountNum = parseInt(amount);
				if (amountNum > MAX[color]) {
					isOk = false;
					break;
				}
			}
		}
		if (isOk) {
			sum += gameNum;
		}
	}
	console.log('Part 1:', sum);

	input = await Deno.readTextFile('./day2/input');
	sum = 0;
	
	for (const line of input.trim().split('\n')) {
		const [gameString, allRounds] = line.split(': ');
		const gameNum = parseInt(gameString.split(' ')[1]);
		const rounds = allRounds.split(';');
		const MIN = {
			red: 1,
			green: 1,
			blue: 1
		}
		for (const round of rounds) {
			let colors = round.split(',');
			colors = colors.map(color => color.trim());
			for (const colorString of colors) {
				const [amount, color] = colorString.split(' ');
				const amountNum = parseInt(amount);
				if (amountNum > MIN[color]) {
					MIN[color] = amountNum;
				}
			}
		}
		console.log({MIN});
		sum += MIN.red * MIN.green * MIN.blue;
	}
	console.log('Part 2:', sum);
}
