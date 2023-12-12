// deno-lint-ignore-file no-unused-labels

if (import.meta.main) {
	const input = await Deno.readTextFile('./day12/input');

	const lines = input.trim().split('\n');

	part1: {
		let sum = 0;

		for (const line of lines) {
			const [conditions, size] = line.split(' ');
			const sizes = size.split(',').map(Number);

			const possibleConditions = [[...conditions]];
			while (possibleConditions.some((p) => p.some((c) => c === '?'))) {
				possibleConditions.forEach((p, i) => {
					const index = p.findIndex((c) => c === '?');
					if (index > -1) {
						const newConditions = [...p];
						newConditions[index] = '.';
						possibleConditions[i] = newConditions;
						const newConditions2 = [...p];
						newConditions2[index] = '#';
						possibleConditions.push(newConditions2);
					}
				});
			}

			const totalSizes = sizes.reduce((a, b) => a + b, 0);

			let sumForLine = 0;
			for (const possibility of possibleConditions) {
				if (possibility.filter((c) => c === '#').length === totalSizes) {
					const runs = possibility
						.join('')
						.split('.')
						.filter((r) => r.length > 0);
					const runLengths = runs.map((r) => r.length);
					if (runLengths.length === sizes.length) {
						if (runLengths.every((r, i) => r === sizes[i])) {
							sumForLine++;
						}
					}
				}
			}
			console.log({ line, sumForLine });
			sum += sumForLine;
		}

		console.log('part 1: ', sum);
	}

	part2: {
		console.log('part 2: ');
	}
}
