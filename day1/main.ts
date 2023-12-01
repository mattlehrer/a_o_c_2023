if (import.meta.main) {
	let input = await Deno.readTextFile('./day1/sample');

	let sum = 0;
	for (const line of input.split('\n')) {
		const nums = [...line].filter((c) => !Number.isNaN(Number(c))).map(Number);
		sum += 10 * nums[0] + nums[nums.length - 1];
	}
	console.log('Part 1:', sum);

	input = await Deno.readTextFile('./day1/input');
	sum = 0;
	const nums = [
		'one',
		'two',
		'three',
		'four',
		'five',
		'six',
		'seven',
		'eight',
		'nine',
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
	];

	const words: Record<string, number> = {
			'one': 1,
			'two': 2,
			'three': 3,
			'four': 4,
			'five': 5,
			'six': 6,
			'seven': 7,
			'eight': 8,
			'nine': 9,
			'0': 0,
			'1': 1,
			'2': 2,
			'3': 3,
			'4': 4,
			'5': 5,
			'6': 6,
			'7': 7,
			'8': 8,
			'9': 9,
	}
	
	for (const line of input.split('\n')) {
		const first: Record<string, number> = {};
		const last: Record<string, number> = {};
		for (let i = 0; i < nums.length; i++) {
			if (line.indexOf(nums[i]) !== -1) {
				first[nums[i]] = line.indexOf(nums[i]);
				last[nums[i]] = line.lastIndexOf(nums[i]);
			}
		}

		const sortedFirst = Object.entries(first).sort((a, b) => a[1] - b[1]);
		const sortedLast = Object.entries(last).sort((a, b) => b[1] - a[1]);

		const f = words[sortedFirst[0][0]];

		const l = words[sortedLast[0][0]]
		sum += 10 * f + l;
	}
	console.log('Part 2:', sum);
}
