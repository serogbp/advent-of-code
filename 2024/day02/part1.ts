// https://adventofcode.com/2024/day/2
import { readFileSync } from '../../utils/readFile';

type trend = 'increasing' | 'decreasing' | undefined;


const reports: number[][] = [];
readFileSync(import.meta.dirname + '/input.txt').split(/\r?\n/).forEach((line) => {
	const report: number[] = line.split(' ').map((x) => parseInt(x));
	reports.push(report);
});
reports.pop(); // remove NaN

// Save if
// The levels are either all increasing or all decreasing.
// Any two adjacent levels differ by at least one and at most three.
let safeReports = 0;

reports.forEach((report) => {
	let trend: trend;
	for (let i = 1; i < report.length; i++) {
		const last = report[i - 1];
		const current = report[i];

		const differ = Math.abs(last - current);
		if (![1, 2, 3].includes(differ)) {
			console.log('Cambio brusco: ', last, current, ' diferencia: ', differ, report.toString());
			return; // Cambio brusco
		}

		const currentTrend: trend = last > current ? 'decreasing' : 'increasing';
		if (!trend) trend = currentTrend;
		else if (trend !== currentTrend) {
			console.log('Cambio de tendencia: ', trend, currentTrend, report.toString());
			return; // Cambio de tendencia
		}
	}
	console.log('Report safe: ', report.toString());
	safeReports++;
});

console.log(safeReports); // 402
