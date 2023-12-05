if (import.meta.main) {
	const input = await Deno.readTextFile('./day5/input');

	const lines = input.trim().split('\n');

	let current: number[] = [];
	current = lines[0].split('seeds: ')[1].split(' ').map(Number);
	let i = 2;

	while (i < lines.length) {
		// console.log({i, line: lines[i]})
		if (lines[i].includes('map:')) {
			i++;
			const ranges: number[][] = [];
			while (i < lines.length && Number.isInteger(Number(lines[i][0]))) {
				// construct map
				const [destinationRangeStart, sourceRangeStart, length] = lines[i].split(' ').map(Number);
				ranges.push([destinationRangeStart, sourceRangeStart, length]);
				i++;
			}
			current = current.map((c) => {
				let newC = c;
				ranges.forEach(([destinationRangeStart, sourceRangeStart, length]) => {
					if (c >= sourceRangeStart && c < sourceRangeStart + length) {
						newC = destinationRangeStart + (c - sourceRangeStart);
					}
				})
				return newC;
			})
		}

		i++;
	}
	
	console.log('Part 1:', Math.min(...current));
	
}
