// https://adventofcode.com/2024/day/1
import { readFileSync } from '../../utils/readFile';

const arrayLeft: number[] = [];
const arrayRight: number[] = [];
readFileSync(import.meta.dirname + '/input.txt').split(/\r?\n/).forEach((line) => {
	let [left, right] = line.split('   ').map((x) => parseInt(x));
	if (!isNaN(left)) arrayLeft.push(left);
	if (!isNaN(right)) arrayRight.push(right);
});
arrayLeft.sort();
arrayRight.sort();

let sum = 0;
for (let i = 0; i < arrayLeft.length; i++) {
	sum += Math.abs(arrayLeft[i] - arrayRight[i]);
}
console.log(sum); // 1341714
