if (import.meta.main) {
	let input = await Deno.readTextFile('./day3/input');

	const nonSymbols = [...'0123456789.'];
	const grid: string[][] = [];
	let i = 0;
	for (const line of input.trim().split('\n')) {
		grid[i] = line.split('');
		i++;
	}
	let sum = 0;
	let y = 0;
	let xStart = 0;
	while (y < grid.length) {
		while (xStart < grid[y].length && Number.isNaN(Number(grid[y][xStart]))) {
			xStart++;
		}
		let xEnd = xStart;
		while (xEnd < grid[y].length && !Number.isNaN(Number(grid[y][xEnd]))) {
			xEnd++;
		}
		if (!Number.isNaN(Number(grid[y][xStart]))) {
			const searchSpace = []
			if (y - 1 > 0) {
				searchSpace.push(...grid[y - 1].slice(Math.max(0, xStart - 1), Math.min(xEnd + 1, grid[y - 1].length)));
			}
			if (xStart - 1 > 0) searchSpace.push(grid[y][xStart - 1]);
			if (xEnd < grid[y].length) searchSpace.push(grid[y][xEnd]);
			if (y + 1 < grid.length) {
				searchSpace.push(...grid[y + 1].slice(Math.max(0, xStart - 1), Math.min(xEnd + 1, grid[y + 1].length)));
			}
			const isPartNumber = searchSpace.some((s) => !nonSymbols.includes(s));
			if (isPartNumber) {
				sum += Number(grid[y].slice(xStart, xEnd).join(''));
			}
		}
		if (xStart >= grid[y].length) {
			y++;
			xStart = 0;
		} else {
			xStart = xEnd + 1;
		}
	}
	console.log('Part 1:', sum);

	input = await Deno.readTextFile('./day3/sample');
	sum = 0;
	// for (const line of input.trim().split('\n')) {
	// 	// 
	// }
	// console.log('Part 2:', sum);
}
