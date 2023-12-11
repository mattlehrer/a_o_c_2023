// deno-lint-ignore-file no-unused-labels

if (import.meta.main) {
	const input = await Deno.readTextFile('./day11/input');

	const lines = input
		.trim()
		.split('\n')
		.map((line) => line.split(''));

	part1: {
		const expandedUniverse: string[][] = [];
		for (let y = 0; y < lines.length; y++) {
			const line = lines[y];
			if (line.every((c) => c === '.')) {
				expandedUniverse.push(line, line);
			} else {
				expandedUniverse.push(line);
			}
		}
		const addColumns: number[] = [];
		for (let x = 0; x < expandedUniverse[0].length; x++) {
			let hasGalaxy = false;
			for (let y = 0; y < expandedUniverse.length; y++) {
				if (expandedUniverse[y][x] === '#') {
					hasGalaxy = true;
					break;
				}
			}
			if (!hasGalaxy) {
				addColumns.push(x);
			}
		}

		addColumns.forEach((x, i) => {
			for (let y = 0; y < expandedUniverse.length; y++) {
				expandedUniverse[y] = [expandedUniverse[y].slice(0, x + i), '.', expandedUniverse[y].slice(x + i)].flat();
			}
		});

		const galaxies: [number, number][] = [];
		for (let y = 0; y < expandedUniverse.length; y++) {
			const line = expandedUniverse[y];
			for (let x = 0; x < line.length; x++) {
				if (line[x] === '#') {
					galaxies.push([x, y]);
				}
			}
		}

		let totalDistance = 0;

		for (let i = 0; i < galaxies.length - 1; i++) {
			for (let j = i + 1; j < galaxies.length; j++) {
				const [x1, y1] = galaxies[i];
				const [x2, y2] = galaxies[j];
				const distance = Math.abs(x1 - x2) + Math.abs(y1 - y2);
				totalDistance += distance;
			}
		}

		console.log('part 1: ', totalDistance);
	}

	part2: {
		const emptyRows: number[] = [];
		for (let y = 0; y < lines.length; y++) {
			if (lines[y].every((c) => c === '.')) {
				emptyRows.push(y);
			}
		}

		const emptyColumns: number[] = [];
		for (let x = 0; x < lines[0].length; x++) {
			let hasGalaxy = false;
			for (let y = 0; y < lines.length; y++) {
				if (lines[y][x] === '#') {
					hasGalaxy = true;
					break;
				}
			}
			if (!hasGalaxy) {
				emptyColumns.push(x);
			}
		}

		const galaxies: [number, number][] = [];
		for (let y = 0; y < lines.length; y++) {
			const line = lines[y];
			for (let x = 0; x < line.length; x++) {
				if (line[x] === '#') {
					galaxies.push([x, y]);
				}
			}
		}

		let totalDistance = 0;

		const expansionDistance = 1_000_000;

		for (let i = 0; i < galaxies.length - 1; i++) {
			for (let j = i + 1; j < galaxies.length; j++) {
				const [x1, y1] = galaxies[i];
				const [x2, y2] = galaxies[j];
				let distance = Math.abs(x1 - x2) + Math.abs(y1 - y2);
				emptyRows.forEach((y) => {
					if ((y1 < y && y < y2) || (y2 < y && y < y1)) {
						distance += expansionDistance - 1;
					}
				});
				emptyColumns.forEach((x) => {
					if ((x1 < x && x < x2) || (x2 < x && x < x1)) {
						distance += expansionDistance - 1;
					}
				});
				totalDistance += distance;
			}
		}

		console.log('part 1: ', totalDistance);
	}
}
