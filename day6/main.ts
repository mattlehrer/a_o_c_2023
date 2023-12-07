if (import.meta.main) {
	const input = await Deno.readTextFile('./day6/input');

	const lines = input.trim().split('\n');
	// deno-lint-ignore no-unused-labels
	part1: {
		const times = lines[0].trim().split(':')[1].trim().split(' ').map(Number).filter(n => n > 0);
		const distance = lines[1].trim().split(':')[1].trim().split(' ').map(Number).filter(n => n > 0);
		
		let product = 1;
		for (let i = 0; i < times.length; i++) {
			let count = 0;
			for (let j = 1; j < times[i] - 1; j++) {
				if ((times[i] - j) * j > distance[i]) {
					count++;
				}
			}
			product *= count;
		}
		console.log({ product })
	
	}
	
	// deno-lint-ignore no-unused-labels
	part2: {
		const time = Number([...lines[0].trim().split(':')[1].trim()].filter(c => c !== ' ').join(''))
		const distance = Number([...lines[1].trim().split(':')[1].trim()].filter(c => c !== ' ').join(''))
		
			let count = 0;
			for (let i = 1; i < time - 1; i++) {
				if ((time - i) * i > distance) {
					count++;
				}
			}
		console.log({ count })
	
	}
}
