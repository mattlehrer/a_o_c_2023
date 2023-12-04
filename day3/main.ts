if (import.meta.main) {
	const input = await Deno.readTextFile('./day3/input');

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

	sum = 0;
	y = 0;
	let x = 0;
	while (y < grid.length) {
		while (x < grid[y].length && grid[y][x] !== '*') {
			x++;
		}
		
		if (grid[y][x] === '*') {
			const gearNumbers: number[] = [];
			if (y - 1 >= 0) {
				xStart = x - 1;
				if (!Number.isNaN(Number(grid[y-1][xStart]))) {
					while (xStart >= 0 && !Number.isNaN(Number(grid[y-1][xStart]))) {
						xStart--;
					}
					xStart++;
					if (y===1) console.log({xStart})
				} else {
					while (xStart <= x + 1 && xStart < grid[y-1].length && Number.isNaN(Number(grid[y-1][xStart]))) {
						xStart++;
					}
				}
				if (xStart < x + 2 && !Number.isNaN(Number(grid[y-1][xStart]))) {
					let xEnd = xStart + 1;
					while (xEnd < grid[y-1].length && !Number.isNaN(Number(grid[y-1][xEnd]))) {
						xEnd++;
					}
					gearNumbers.push(Number(grid[y-1].slice(xStart, xEnd).join('')));
				}

				if (!Number.isNaN(Number(grid[y - 1][x - 1])) && Number.isNaN(Number(grid[y - 1][x])) && !Number.isNaN(Number(grid[y - 1][x + 1]))) {
					let xEnd = x + 1;
					while (xEnd < grid[y - 1].length && !Number.isNaN(Number(grid[y - 1][xEnd]))) {
						xEnd++;
					}
					gearNumbers.push(Number(grid[y - 1].slice(x + 1, xEnd).join('')));
				}
			}
			

			if (x - 1 >= 0 && !Number.isNaN(Number(grid[y][x-1]))) {
				xStart = x - 1;
				if (!Number.isNaN(Number(grid[y][xStart]))) {
					while (xStart >= 0 && !Number.isNaN(Number(grid[y][xStart]))) {
						xStart--;
					}
				}
				gearNumbers.push(Number(grid[y].slice(xStart + 1, x).join('')));
			}

			if (x + 1 < grid[y].length && !Number.isNaN(Number(grid[y][x+1]))) {
				let xEnd = x+1;
				while (xEnd < grid[y].length && !Number.isNaN(Number(grid[y][xEnd]))) {
						xEnd++;
				}
				gearNumbers.push(Number(grid[y].slice(x + 1, xEnd).join('')));
			}

			if (y + 1 < grid.length) {
				xStart = Math.max(x - 1, 0);
				if (!Number.isNaN(Number(grid[y+1][xStart]))) {
					while (xStart >= 0 && !Number.isNaN(Number(grid[y + 1][xStart]))) {
						xStart--;
					}
					xStart++;
				} else {
					while (xStart <= x + 1 && xStart < grid[y + 1].length && Number.isNaN(Number(grid[y + 1][xStart]))) {
						xStart++;
					}
				}
				
				if (xStart < x + 2 && !Number.isNaN(Number(grid[y + 1][xStart]))) {
					let xEnd = xStart + 1;
					while (xEnd < grid[y+1].length && !Number.isNaN(Number(grid[y+1][xEnd]))) {
						xEnd++;
					}
					gearNumbers.push(Number(grid[y+1].slice(xStart, xEnd).join('')));
				}

				if (!Number.isNaN(Number(grid[y + 1][x - 1])) && Number.isNaN(Number(grid[y + 1][x])) && !Number.isNaN(Number(grid[y + 1][x + 1]))) {
					let xEnd = x + 1;
					while (xEnd < grid[y + 1].length && !Number.isNaN(Number(grid[y + 1][xEnd]))) {
						xEnd++;
					}
					gearNumbers.push(Number(grid[y + 1].slice(x + 1, xEnd).join('')));
				}
			}

			console.log({gearNumbers})
			if (gearNumbers.length >= 2) {
				sum += gearNumbers.reduce((a, b) => a * b, 1);
			}
		}
		
		if (x >= grid[y].length) {
			y++;
			x = 0;
		} else {
			x++;
		}
	}
	console.log('Part 2:', sum);
}
