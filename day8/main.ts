if (import.meta.main) {
	// deno-lint-ignore no-unused-labels
	part1: {
		const input = await Deno.readTextFile('./day8/sample');
	
		const lines = input.trim().split('\n');
		const instructions = lines[0].split('');
	
		const map: Record<string, { left: string, right: string }> = {};
		for (let i = 2; i < lines.length; i++) {
			const line = lines[i].split(' = ');
			const [left, right] = line[1].replace('(', '').replace(')', '').split(', ');
			map[line[0]] = { left, right };
		}
		let current = 'AAA';
		let steps = 0;
		while (current !== 'ZZZ') {
			const instruction = instructions[steps % instructions.length];
			if (instruction === 'L') {
				current = map[current].left;
			} else if (instruction === 'R') {
				current = map[current].right;
			}
			steps++;
		}
		console.log('part 1', { steps });
	}
	
	// deno-lint-ignore no-unused-labels
	part2: {
		const input = await Deno.readTextFile('./day8/input');
	
		const lines = input.trim().split('\n');
		const instructions = lines[0].split('');
	
		const map: Record<string, { left: string, right: string }> = {};
		for (let i = 2; i < lines.length; i++) {
			const line = lines[i].split(' = ');
			const [left, right] = line[1].replace('(', '').replace(')', '').split(', ');
			map[line[0]] = { left, right };
		}

		const starters = Object.keys(map).filter(key => key.endsWith('A'))
		const stepNumbers: number[] = [];
		for (const current of starters) {
			let c = current;
			let steps = 0;
			while (!c.endsWith('Z')) {
				const instruction = instructions[steps % instructions.length];
				if (instruction === 'L') {
					c = map[c].left;
				} else if (instruction === 'R') {
					c = map[c].right;
				}
				steps++;
			}
			stepNumbers.push(steps);
		}
		console.log({ stepNumbers})
		// find lowest common multiple of all step numbers
		let steps = stepNumbers[0];
		for (let i = 1; i < stepNumbers.length; i++) {
			let a = steps;
			let b = stepNumbers[i];
			while (a !== b) {
				if (a < b) {
					a += steps;
				} else {
					b += stepNumbers[i];
				}
			}
			steps = a;
		}
		console.log('part 2', { steps });
	}
}
