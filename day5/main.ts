// deno-lint-ignore-file no-unused-labels
if (import.meta.main) {
	const input = await Deno.readTextFile('./day5/input');

	part1: {
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
					});
					return newC;
				});
			}

			i++;
		}

		console.log('Part 1:', Math.min(...current));
	}

	part2: {
		const lines = input.trim().split('\n');

		const seedLine = lines[0].split('seeds: ')[1].split(' ').map(Number);
		const isSeed = (c: number) => {
			let i = 0;
			while (i < seedLine.length) {
				if (seedLine[i] <= c && c <= seedLine[i] + seedLine[i + 1]) return true;
				i += 2;
			}
			return false;
		};

		let i = 2;
		const maps: [number, number, number][][] = [];

		while (i < lines.length) {
			if (lines[i].includes('map:')) {
				i++;
				const ranges: [number, number, number][] = [];
				while (i < lines.length && Number.isInteger(Number(lines[i][0]))) {
					// construct map
					const [destinationRangeStart, sourceRangeStart, length] = lines[i].split(' ').map(Number);
					ranges.push([destinationRangeStart, sourceRangeStart, length]);
					i++;
				}
				ranges.sort((a, b) => a[0] - b[0]);
				maps.push(ranges);
			}

			i++;
		}

		let current = 0;
		const locationToSeed = (potentialLocation: number) =>
			maps.reduceRight((acc, map) => {
				for (const row of map) {
					if (acc < row[0]) return acc;
					if (acc >= row[0] && acc < row[0] + row[2]) {
						return row[1] + (acc - row[0]);
					}
				}
				return acc;
			}, potentialLocation);

		while (!isSeed(locationToSeed(current))) {
			current++;
		}
		console.log('Part 2:', current);
	}
}
