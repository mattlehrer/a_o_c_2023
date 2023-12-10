// deno-lint-ignore-file no-unused-labels
type Position = { x: number; y: number };

const isInside = (l: Position[], point: Position) => {
	if (l.some((p) => p.x === point.x && p.y === point.y)) return false;
	let odd = false;
	for (let i = 0, j = l.length - 1; i < l.length; i++) {
		if (
			l[i].y > point.y !== l[j].y > point.y &&
			point.x < ((l[j].x - l[i].x) * (point.y - l[i].y)) / (l[j].y - l[i].y) + l[i].x
		) {
			odd = !odd;
		}
		j = i;
	}
	return odd;
};

if (import.meta.main) {
	const input = await Deno.readTextFile('./day10/input');

	const lines = input.trim().split('\n');

	let y = 0;
	let x = 0;

	while (lines[y][x] !== 'S') {
		x++;
		if (x >= lines[y].length) {
			x = 0;
			y++;
		}
	}

	const start: Position = { x, y };

	part1: {
		let current: Position | undefined;
		let from: 'east' | 'west' | 'north' | 'south';

		if (y > 0 && ['|', 'F', '7'].includes(lines[y - 1][x])) {
			// north
			current = { x, y: y - 1 };
			from = 'south';
		} else if (y < lines.length && ['|', 'L', 'J'].includes(lines[y + 1][x])) {
			// south
			current = { x, y: y + 1 };
			from = 'north';
		} else if (x > 0 && ['-', 'L', 'F'].includes(lines[y][x - 1])) {
			// west
			current = { x: x - 1, y };
			from = 'east';
		} else if (x < lines[0].length && ['-', '7', 'J'].includes(lines[y][x + 1])) {
			// east
			current = { x: x + 1, y };
			from = 'west';
		} else {
			throw new Error('wtf');
		}

		if (!current || !from) throw new Error('no direction from start');

		let loopLength = 0;
		while (!(current.x === start.x && current.y === start.y)) {
			loopLength++;
			if (lines[current.y][current.x] === '|') {
				if (from === 'north') {
					current.y++;
				} else if (from === 'south') {
					current.y--;
				} else {
					throw new Error('invalid direction');
				}
			} else if (lines[current.y][current.x] === '-') {
				if (from === 'east') {
					current.x--;
				} else if (from === 'west') {
					current.x++;
				} else {
					throw new Error('invalid direction');
				}
			} else if (lines[current.y][current.x] === 'L') {
				if (from === 'north') {
					current.x++;
					from = 'west';
				} else if (from === 'east') {
					current.y--;
					from = 'south';
				} else {
					throw new Error('invalid direction');
				}
			} else if (lines[current.y][current.x] === 'J') {
				if (from === 'north') {
					current.x--;
					from = 'east';
				} else if (from === 'west') {
					current.y--;
					from = 'south';
				} else {
					throw new Error('invalid direction');
				}
			} else if (lines[current.y][current.x] === '7') {
				if (from === 'west') {
					current.y++;
					from = 'north';
				} else if (from === 'south') {
					current.x--;
					from = 'east';
				} else {
					throw new Error('invalid direction');
				}
			} else if (lines[current.y][current.x] === 'F') {
				if (from === 'south') {
					current.x++;
					from = 'west';
				} else if (from === 'east') {
					current.y++;
					from = 'north';
				} else {
					throw new Error('invalid direction');
				}
			} else if (lines[current.y][current.x] === '.') {
				throw new Error('invalid direction');
			} else if (lines[current.y][current.x] === 'S') {
				break;
			} else {
				throw new Error('invalid direction');
			}
		}
		console.log('part 1', { loopLength, farthest: Math.ceil(loopLength / 2) });
	}

	part2: {
		let current: Position | undefined;
		let from: 'east' | 'west' | 'north' | 'south';

		if (y > 0 && ['|', 'F', '7'].includes(lines[y - 1][x])) {
			// north
			current = { x, y: y - 1 };
			from = 'south';
		} else if (y < lines.length && ['|', 'L', 'J'].includes(lines[y + 1][x])) {
			// south
			current = { x, y: y + 1 };
			from = 'north';
		} else if (x > 0 && ['-', 'L', 'F'].includes(lines[y][x - 1])) {
			// west
			current = { x: x - 1, y };
			from = 'east';
		} else if (x < lines[0].length && ['-', '7', 'J'].includes(lines[y][x + 1])) {
			// east
			current = { x: x + 1, y };
			from = 'west';
		} else {
			throw new Error('wtf');
		}

		if (!current || !from) throw new Error('no direction from start');
		const loop = [];
		loop.push({ x: start.x, y: start.y });
		loop.push({ x: current.x, y: current.y });

		while (!(current.x === start.x && current.y === start.y)) {
			if (lines[current.y][current.x] === '|') {
				if (from === 'north') {
					current.y++;
				} else if (from === 'south') {
					current.y--;
				} else {
					throw new Error('invalid direction');
				}
			} else if (lines[current.y][current.x] === '-') {
				if (from === 'east') {
					current.x--;
				} else if (from === 'west') {
					current.x++;
				} else {
					throw new Error('invalid direction');
				}
			} else if (lines[current.y][current.x] === 'L') {
				if (from === 'north') {
					current.x++;
					from = 'west';
				} else if (from === 'east') {
					current.y--;
					from = 'south';
				} else {
					throw new Error('invalid direction');
				}
			} else if (lines[current.y][current.x] === 'J') {
				if (from === 'north') {
					current.x--;
					from = 'east';
				} else if (from === 'west') {
					current.y--;
					from = 'south';
				} else {
					throw new Error('invalid direction');
				}
			} else if (lines[current.y][current.x] === '7') {
				if (from === 'west') {
					current.y++;
					from = 'north';
				} else if (from === 'south') {
					current.x--;
					from = 'east';
				} else {
					throw new Error('invalid direction');
				}
			} else if (lines[current.y][current.x] === 'F') {
				if (from === 'south') {
					current.x++;
					from = 'west';
				} else if (from === 'east') {
					current.y++;
					from = 'north';
				} else {
					throw new Error('invalid direction');
				}
			} else if (lines[current.y][current.x] === '.') {
				throw new Error('invalid direction');
			} else if (lines[current.y][current.x] === 'S') {
				break;
			} else {
				throw new Error('invalid direction');
			}
			loop.push({ x: current.x, y: current.y });
		}

		let inside = 0;
		for (let y = 0; y < lines.length; y++) {
			for (let x = 0; x < lines[y].length; x++) {
				if (isInside([...loop], { x, y })) {
					inside++;
				}
			}
		}
		console.log('part 2', inside);
	}
}
