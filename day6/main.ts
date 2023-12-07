if (import.meta.main) {
	const input = await Deno.readTextFile('./day6/input');

	const lines = input.trim().split('\n');

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
