
if (import.meta.main) {
	const input = await Deno.readTextFile("./day1/input");
	
	let sum = 0;
	for (const line of input.split("\n")) {
		const nums = [...line].filter((c) => !Number.isNaN(Number(c))).map(Number);
		sum += 10*nums[0] + nums[nums.length - 1];
	}
	console.log('Part 1:', sum);

	sum = 0;

}
