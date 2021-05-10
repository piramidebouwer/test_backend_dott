import { Reader } from '../Reader'

var input = 	'1'		+ '\n' +
				'3 4'	+ '\n' +
				'0001'	+ '\n' +
				'0011'	+ '\n' +
				'0110'	+ '\n' ;

describe("Reader", () => {
	const reader: Reader = new Reader();

	test('Read valid input from stdin', () => {
		const mockStdIn = require('mock-stdin').stdin();

		(async () => {
			expect(await reader.read('')).toEqual(input);
		})();

		mockStdIn.send(input);
		mockStdIn.end();
	});
	
	test('Read filethatdoesntexist', async () => {
		try {
			await reader.read('filethatdoesntexist');
		}
		catch (error) {
			expect(error.code).toEqual('ENOENT');
		}
	});

	test('Read valid input from tmpfile', async () => {
		expect(await reader.read('./tests/tmp/tmpfile.txt')).toEqual(input);
	});

	test('Read invalid input from invalidfile', async () => {
		expect(await reader.read('./tests/tmp/invalidfile.txt')).toEqual('invalid file\n');
	});
});
