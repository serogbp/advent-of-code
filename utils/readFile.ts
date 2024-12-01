import fs from 'fs';
import readline from 'readline';

export function readFile(path: string) {
	return fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.error('Error al leer el archivo:', err);
			return;
		}
		return data;
	});
}

export function readFileSync(path: string) {
	return fs.readFileSync(path, 'utf8');
}

export function readLineByLine(path: string) {
	const fileStream = fs.createReadStream(path);
	const readLine = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});
	readLine.on('line', (line) => {
		console.log(`Línea leída: ${line}`);
	});

	readLine.on('close', () => {
		console.log('Archivo leído completamente');
	});
	return readLine;
}
