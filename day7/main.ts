if (import.meta.main) {
	const input = await Deno.readTextFile('./day7/input');

	const lines = input.trim().split('\n');
	// deno-lint-ignore no-unused-labels
	part1: {
		const hands = lines.map(line => line.trim().split(' ')).map(h => ({ hand: h[0], bid: parseInt(h[1]) }));
		hands.sort((a, b) => compareHands(a.hand, b.hand));

		let sum = 0;
		for (let i = 0; i < hands.length; i++) {
			const rank = i + 1;
			console.log({rank, hand: hands[i]})
			sum += rank * hands[i].bid;
		}

		console.log('part 1', sum);
	}
	
	// deno-lint-ignore no-unused-labels
	part2: {
	console.log('part 2')
	}	
}

function compareHands(a: string, b: string) {
	const ranks = [
		'A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'
	];
	
	const aRanks = new Set(a.split(''));
	const bRanks = new Set(b.split(''));
	
	const aCounts = [];
	for (const c of aRanks) {
		aCounts.push(a.split('').filter(x => x === c).length);
	}
	const bCounts = [];
	for (const c of bRanks) {
		bCounts.push(b.split('').filter(x => x === c).length);
	}
	
	aCounts.sort((a, b) => b - a);
	bCounts.sort((a, b) => b - a);

	// are they different strength hands?
	let j = 0;
	while (j < aCounts.length && aCounts[j] === bCounts[j]) {
		j++;
	}
	if (j < aCounts.length) {
		return aCounts[j] - bCounts[j];
	}

	// no, go to tie breaker
	let i = 0;
	while (i < a.length && a[i] === b[i]) {
		i++;
	}
	return ranks.indexOf(b[i]) - ranks.indexOf(a[i]);
}
