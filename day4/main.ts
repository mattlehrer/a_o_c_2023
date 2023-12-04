if (import.meta.main) {
	const input = await Deno.readTextFile('./day4/input');

	let sum = 0;
	const output: Record<string, number> = {};
	const queue = [];
	for (const line of input.trim().split('\n')) {
		const [card, numbers] = line.split(': ');
		const [winning, youHave] = numbers.split(' | ');
		const winningNumbers = new Set([...winning.split(' ').filter(c => c !== '').map(Number)]);
		const youHaveNumbers = new Set([...youHave.split(' ').filter(c => c !== '').map(Number)]);
		const intersection = new Set([...winningNumbers].filter(x => youHaveNumbers.has(x)));
		if (intersection.size > 1) {
			sum += 2 ** (intersection.size - 1)
		} else if (intersection.size === 1) {
			sum += 1;
		}
		const cardNum = card.split(' ').filter(c => c !== '')[1];
		output[cardNum] = intersection.size;
		queue.push(cardNum);
	}
	console.log('Part 1:', sum);

	sum = 0;
	while (queue.length > 0) {
		const card: string = queue.shift()!;
		const cardNum = Number(card);
		sum++;
		for (let i = cardNum + output[card]; i > cardNum; i--) {
			queue.unshift(`${i}`);
		}
	}
	
	console.log('Part 2:', sum);
}
