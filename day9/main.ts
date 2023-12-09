if (import.meta.main) {
	// deno-lint-ignore no-unused-labels
	part1: {
		const input = await Deno.readTextFile('./day9/sample');

		const lines = input.trim().split('\n');
		let sum = 0;

		for (const line of lines) {
			const numbers = line.split(' ').map(Number);

			let sequence: number[] = [];
			for (let i = 1; i < numbers.length; i++) {
				sequence.push(numbers[i] - numbers[i - 1]);
			}
			const sequences = [numbers, sequence];
			while (sequence.some((n) => n !== 0)) {
				const prev = [...sequence];
				sequence = [];
				for (let i = 1; i < prev.length; i++) {
					sequence.push(prev[i] - prev[i - 1]);
				}
				sequences.push(sequence);
			}

			const partialSum = sequences.reduce((acc, seq) => acc + seq[seq.length - 1], 0);
			sum += partialSum;
		}

		console.log('part 1', { sum });
	}

	// deno-lint-ignore no-unused-labels
	part2: {
		const input = await Deno.readTextFile('./day9/input');

		const lines = input.trim().split('\n');
		let sum = 0;

		for (const line of lines) {
			const numbers = line.split(' ').map(Number);

			let sequence: number[] = [];
			for (let i = 1; i < numbers.length; i++) {
				sequence.push(numbers[i] - numbers[i - 1]);
			}
			const sequences = [numbers, sequence];
			while (sequence.some((n) => n !== 0)) {
				const prev = [...sequence];
				sequence = [];
				for (let i = 1; i < prev.length; i++) {
					sequence.push(prev[i] - prev[i - 1]);
				}
				sequences.push(sequence);
			}

			const partialSum = sequences.reduceRight((acc, seq) => seq[0] - acc, 0);
			// console.log({ sequences, partialSum });
			sum += partialSum;
		}

		console.log('part 2', { sum });
	}
}
