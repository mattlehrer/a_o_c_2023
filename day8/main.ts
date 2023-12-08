if (import.meta.main) {
	const input = await Deno.readTextFile('./day8/input');

	const lines = input.trim().split('\n');

	// deno-lint-ignore no-unused-labels
	part1: {
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
		console.log({ steps });

	}
	
	// deno-lint-ignore no-unused-labels
	// part2: {
	
	// }	
}
