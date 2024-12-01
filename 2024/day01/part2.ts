// https://adventofcode.com/2024/day/1#part2
import { readFileSync } from '../../utils/readFile';

const arrayLeft: number[] = [];
const arrayRight: number[] = [];
readFileSync(import.meta.dirname + '/input.txt').split(/\r?\n/).forEach((line) => {
	let [left, right] = line.split('   ').map((x) => parseInt(x));
	if (!isNaN(left)) arrayLeft.push(left);
	if (!isNaN(right)) arrayRight.push(right);
});

const map = new Map(); // guardar la cantidad de veces que aparece cada número del arrayRight
for (let i = 0; i < arrayRight.length; i++) {
	const value = arrayRight[i];
	if (map.has(value)) {
		map.set(value, map.get(value) + 1);
	} else {
		map.set(value, 1);
	}
}

let sum = 0;
for (let i = 0; i < arrayLeft.length; i++) {
	const value = arrayLeft[i];
	if (map.has(value)) {
		sum += value * map.get(value);
	}
}

console.log(sum); // 27384707
