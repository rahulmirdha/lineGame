const prompt = require('prompt-sync')();

console.log('Welcome to the line game...');

//n*n board
//1 op1
//2 op2

let boardSize = prompt(`select the size of the board: `);
let n = parseInt(boardSize);
if (!n || n < 4) {
	console.log(`invalid board size: ${boardSize}`);
	return;
}
let board = [];
const displayBoard = (board) => {
	console.log('board:');
	for (let i = 0; i < n; i++) {
		console.log(JSON.stringify(board[i]));
	}
	console.log('\n');
};

for (let i = 0; i < n; i++) {
	board.push([]);
	for (let j = 0; j < n; j++) {
		board[i].push(0);
	}
}

console.log('initial board is...');
displayBoard(board);

let lastLevel = [];

for (let i = 0; i < n; i++) {
	lastLevel.push(n);
}

const checkIfWin = (board, row, col, val) => {
	//any 4 rows, cols or diags should have continuous 1 or 2
	let isHorPos = col + 3 < n ? true : false;
	let isHorNeg = col - 3 >= 0 ? true : false;
	let isVerPos = row + 3 < n ? true : false;
	let isVerNeg = row - 3 >= 0 ? true : false;

	if (
		isHorPos &&
		board[row][col + 1] == val &&
		board[row][col + 2] == val &&
		board[row][col + 3] == val
	)
		return [true, val];
	if (
		isHorNeg &&
		board[row][col - 1] == val &&
		board[row][col - 2] == val &&
		board[row][col - 3] == val
	)
		return [true, val];
	if (
		isVerPos &&
		board[row + 1][col] == val &&
		board[row + 2][col] == val &&
		board[row + 3][col] == val
	)
		return [true, val];
	if (
		isVerNeg &&
		board[row - 1][col] == val &&
		board[row - 2][col] == val &&
		board[row - 3][col] == val
	)
		return [true, val];
	if (
		isHorPos &&
		isVerPos &&
		board[row + 1][col + 1] == val &&
		board[row + 2][col + 2] == val &&
		board[row + 3][col + 3] == val
	)
		return [true, val];
	if (
		isHorPos &&
		isVerNeg &&
		board[row - 1][col + 1] == val &&
		board[row - 2][col + 2] == val &&
		board[row - 3][col + 3] == val
	)
		return [true, val];
	if (
		isHorNeg &&
		isVerPos &&
		board[row + 1][col - 1] == val &&
		board[row + 2][col - 2] == val &&
		board[row + 3][col - 3] == val
	)
		return [true, val];
	if (
		isHorNeg &&
		isVerNeg &&
		board[row - 1][col - 1] == val &&
		board[row - 2][col - 2] == val &&
		board[row - 3][col - 3] == val
	)
		return [true, val];

	return [false, -1];
};

let count = 0;
while (true && count != n * n) {
	let val = count % 2;
	val = val === 0 ? 2 : 1;
	let col = prompt(`please enter the column participant ${val}: `);
	console.log(`you have entered col: ${col}`);
	col = parseInt(col) - 1;
	if ((!col && col !== 0) || col < 0 || col >= n) {
		console.log(
			`entered col: ${
				col + 1
			} is not a valid value, please enter something from 1 to ${n}`,
		);
		continue;
	}
	let lastFilledRow = lastLevel[col];
	let row = lastFilledRow - 1;
	if (row < 0) {
		console.log(`the col: ${col + 1} is filled`);
		continue;
	}
	lastLevel[col] = row;
	board[row][col] = val;
	displayBoard(board);
	let [flag, op] = checkIfWin(board, row, col, val);
	if (flag) {
		console.log(`participant ${op} won!`);
		break;
	}
	count++;
}

console.log('game over!');
