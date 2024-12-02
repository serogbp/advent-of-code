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
	const badIndexes = Array.from(new Set([...checkDiffer(report), ...checkTrend(report)]));
	if (badIndexes.length === 0) {
		safeReports++;
		return;
	}

	if (badIndexes.length > 1) {
		return;
	}

	for (let i = 0; i < badIndexes.length; i++) {
		const reportFiltered = report.filter((_, index) => index !== badIndexes[i]);
		if (checkDiffer(reportFiltered).length === 0 || checkTrend(reportFiltered).length === 0) {
			console.log('now safe', reportFiltered.toString());
			safeReports++;
			return;
		}
	}
});

function checkTrend(report: number[]): number[] {
	let trend: trend;
	const badIndexes: number[] = [];
	for (let i = 1; i < report.length; i++) {
		const last = report[i - 1];
		const current = report[i];
		if (last === current) {
			badIndexes.push(i);
			continue;
		}
		const currentTrend: trend = last > current ? 'decreasing' : 'increasing';

		if (!trend) {
			trend = currentTrend;
		} else if (trend !== currentTrend) {
			badIndexes.push(i);
		}
	}
	return badIndexes;
}

function checkDiffer(report: number[]): number[] {
	const badIndexes: number[] = [];
	for (let i = 1; i < report.length; i++) {
		const last = report[i - 1];
		const current = report[i];
		const differ = Math.abs(last - current);
		if (![1, 2, 3].includes(differ)) {
			badIndexes.push(i);
		}
	}
	return badIndexes;
}

console.log(safeReports - 1); // 455
