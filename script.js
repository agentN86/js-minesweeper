// wowie this is made by
// AGENTN86
// *comments may be added for your viewing pleasure*

var numRows = 8; // How tall (y) it goes
var numCols = 8; // How long (x) it goes
var numMines = 10; // How much mines there are

// DEFAULT:
// numRows = 8;
// numCols = 8;
// numMines = 10;

// You can use this preset to get started: (STARTER:)

// numRows = 5;
// numCols = 5;
// numMines = 5;

// Or you can just be a bit wacky...

// numRows = 10;
// numCols = 10;
// numMines = 50;

var seconds = setInterval(function () {
	if (died == false) { seconds += 1 }
	var digits = seconds.toString().split('')
	var realdigits = digits.map(Number)
	if (realdigits.length == 1) {
		document.getElementById('timer3').src = "./assets/score/score_" + realdigits[0] + ".png"
		document.getElementById('timer2').src = "./assets/score/score_0.png"
		document.getElementById('timer1').src = "./assets/score/score_0.png"
	} else if (realdigits.length == 2) {
		document.getElementById('timer2').src = "./assets/score/score_" + realdigits[0] + ".png"
		document.getElementById('timer3').src = "./assets/score/score_" + realdigits[1] + ".png"
		document.getElementById('timer1').src = "./assets/score/score_0.png"
	} else if (realdigits.length == 3) {
		document.getElementById('timer2').src = "./assets/score/score_" + realdigits[1] + ".png"
		document.getElementById('timer3').src = "./assets/score/score_" + realdigits[2] + ".png"
		document.getElementById('timer1').src = "./assets/score/score_" + realdigits[0] + ".png"
	}
}, 1000)

var died = false;
var chosenFlags = 0;


var flags = numMines - chosenFlags
var digits = flags.toString().split('')
var realdigits = digits.map(Number)
if (realdigits.length == 1) {
	document.getElementById('flags3').src = "./assets/score/score_" + realdigits[0] + ".png"
	document.getElementById('flags2').src = "./assets/score/score_0.png"
	document.getElementById('flags1').src = "./assets/score/score_0.png"
} else if (realdigits.length == 2) {
	document.getElementById('flags2').src = "./assets/score/score_" + realdigits[0] + ".png"
	document.getElementById('flags3').src = "./assets/score/score_" + realdigits[1] + ".png"
	document.getElementById('flags1').src = "./assets/score/score_0.png"
} else if (realdigits.length == 3) {
	document.getElementById('flags2').src = "./assets/score/score_" + realdigits[1] + ".png"
	document.getElementById('flags3').src = "./assets/score/score_" + realdigits[2] + ".png"
	document.getElementById('flags1').src = "./assets/score/score_" + realdigits[0] + ".png"
}



const gameBoard =
	document.getElementById(
		"gameBoard"
	);
let board = [];

function checkWin() {

	let foundMines = 0
	let revealedCells = 0
	let correctCells = (numRows * numCols) - numMines

	for (let y = 0; y < numRows; y++) {
		for (let x = 0; x < numCols; x++) {
			if (board[y][x].isMine == true && board[y][x].flagged == true) {
				foundMines += 1
			}
			if (board[y][x].revealed == true) {
				revealedCells += 1
			}
		}
	}

	// How to Win:
	// - Flag all the mines
	// - Reveal all cells except for mines

	if (foundMines == numMines && chosenFlags == foundMines) {

		if (correctCells == revealedCells) {

			died = true;
			document.getElementById("face").classList.add("facewin")
			if (numMines == 1) {
				document.getElementById('minesBefore').innerText = "the literal"
				document.getElementById('minesText').innerText = "1 mine"
			} else {
				document.getElementById('minesBefore').innerText = "all"
				document.getElementById('minesText').innerText = numMines + " mines"

			}

			document.getElementById('seconds').innerText = seconds

			document.getElementById('dialog').showModal()
			document.getElementById('audio').play()

		}

	}

}

function initializeBoard() {
	chosenFlags = 0;
	seconds = 0;

	var flags = numMines - chosenFlags
	var digits = flags.toString().split('')
	var realdigits = digits.map(Number)
	if (realdigits.length == 1) {
		document.getElementById('flags3').src = "./assets/score/score_" + realdigits[0] + ".png"
		document.getElementById('flags2').src = "./assets/score/score_0.png"
		document.getElementById('flags1').src = "./assets/score/score_0.png"
	} else if (realdigits.length == 2) {
		document.getElementById('flags2').src = "./assets/score/score_" + realdigits[0] + ".png"
		document.getElementById('flags3').src = "./assets/score/score_" + realdigits[1] + ".png"
		document.getElementById('flags1').src = "./assets/score/score_0.png"
	} else if (realdigits.length == 3) {
		document.getElementById('flags2').src = "./assets/score/score_" + realdigits[1] + ".png"
		document.getElementById('flags3').src = "./assets/score/score_" + realdigits[2] + ".png"
		document.getElementById('flags1').src = "./assets/score/score_" + realdigits[0] + ".png"
	}

	for (let i = 0; i < numRows; i++) {
		board[i] = [];
		for (
			let j = 0;
			j < numCols;
			j++
		) {
			board[i][j] = {
				isMine: false,
				revealed: false,
				mineNotClicked: false,
				firstMine: false,
				flagged: false,
				notCorrectFlag: false,
				count: 0,
			};
		}
	}

	// Place mines randomly
	let minesPlaced = 0;
	while (minesPlaced < numMines) {
		const row = Math.floor(
			Math.random() * numRows
		);
		const col = Math.floor(
			Math.random() * numCols
		);
		if (!board[row][col].isMine) {
			board[row][
				col
			].isMine = true;
			minesPlaced++;
		}
	}

	// Calculate counts
	for (let i = 0; i < numRows; i++) {
		for (
			let j = 0;
			j < numCols;
			j++
		) {
			if (!board[i][j].isMine) {
				let count = 0;
				for (
					let dx = -1;
					dx <= 1;
					dx++
				) {
					for (
						let dy = -1;
						dy <= 1;
						dy++
					) {
						const ni =
							i + dx;
						const nj =
							j + dy;
						if (
							ni >= 0 &&
							ni <
							numRows &&
							nj >= 0 &&
							nj <
							numCols &&
							board[ni][
								nj
							].isMine
						) {
							count++;
						}
					}
				}
				board[i][j].count =
					count;
			}
		}
	}
}

function revealCell(row, col) {
	if (
		row < 0 ||
		row >= numRows ||
		col < 0 ||
		col >= numCols ||
		board[row][col].revealed
	) {
		return;
	}

	if (board[row][col].flagged) { } else {
		board[row][col].revealed = true;
	}

	if (board[row][col].isMine) {
		// Handle game over
		board[row][col].firstMine = true;
		died = true;

		document.getElementById("face").classList.add("facedead")

		for (let y = 0; y < numRows; y++) {
			for (
				let x = 0;
				x < numCols;
				x++
			) {
				if (board[y][x].isMine == true) {
					board[y][x].revealed = true;
					if (board[y][x].firstMine == false) {
						board[y][x].mineNotClicked = true;
					}
					renderBoard();
				} else {
					if (board[y][x].flagged == true) {
						board[y][x].notCorrectFlag = true;
					}
					renderBoard();
				}
			}
		}
	} else if (
		board[row][col].count === 0
	) {
		// If cell has no mines nearby,
		// Reveal adjacent cells
		for (
			let dx = -1;
			dx <= 1;
			dx++
		) {
			for (
				let dy = -1;
				dy <= 1;
				dy++
			) {
				revealCell(
					row + dx,
					col + dy
				);
			}
		}
	}

	renderBoard();
}

function renderBoard() {
	gameBoard.innerHTML = "";

	for (let i = 0; i < numRows; i++) {
		for (
			let j = 0;
			j < numCols;
			j++
		) {
			const cell =
				document.createElement(
					"div"
				);
			cell.className = "cell";

			if (board[i][j].flagged) {
				cell.classList.add("flagged")
			}

			if (
				board[i][j].notCorrectFlag
			) {
				cell.classList.add(
					"notCorrectFlag"
				);
			}

			if (
				board[i][j].mineNotClicked
			) {
				cell.classList.add(
					"unclickedmine"
				);
			}

			if (board[i][j].revealed) {
				cell.classList.add(
					"revealed"
				)

				if (
					board[i][j].isMine
				) {
					cell.classList.add(
						"mine"
					)
				} else if (
					board[i][j].count >
					0
				) {

					cell.style.backgroundImage =
						"url('./assets/Tile" + board[i][j].count + ".png";
				}
			}

			cell.addEventListener("mousedown", (event) => {
				document.getElementById("face").classList.add("faceshocked")
				if (died == false) {
					if (event.button == 0) {
						if (board[i][j].flagged == false) {
							revealCell(i, j)
							checkWin()
						}
					}

					if (event.button == 2) {
						if (board[i][j].flagged == false) {
							cell.classList.add("flagged")
							chosenFlags += 1
							board[i][j].flagged = true


							var flags = numMines - chosenFlags
							var digits = flags.toString().split('')
							var realdigits = digits.map(Number)
							if (realdigits.length == 1) {
								document.getElementById('flags3').src = "./assets/score/score_" + realdigits[0] + ".png"
								document.getElementById('flags2').src = "./assets/score/score_0.png"
								document.getElementById('flags1').src = "./assets/score/score_0.png"
							} else if (realdigits.length == 2) {
								document.getElementById('flags2').src = "./assets/score/score_" + realdigits[0] + ".png"
								document.getElementById('flags3').src = "./assets/score/score_" + realdigits[1] + ".png"
								document.getElementById('flags1').src = "./assets/score/score_0.png"
							} else if (realdigits.length == 3) {
								document.getElementById('flags2').src = "./assets/score/score_" + realdigits[1] + ".png"
								document.getElementById('flags3').src = "./assets/score/score_" + realdigits[2] + ".png"
								document.getElementById('flags1').src = "./assets/score/score_" + realdigits[0] + ".png"
							}

							// alert(realdigits[1])
							// alert(realdigits[0])

							checkWin();


						} else {
							cell.classList.remove("flagged")
							chosenFlags -= 1
							board[i][j].flagged = false

							var flags = numMines - chosenFlags
							var digits = flags.toString().split('')
							var realdigits = digits.map(Number)
							if (realdigits.length == 1) {
								document.getElementById('flags3').src = "./assets/score/score_" + realdigits[0] + ".png"
								document.getElementById('flags2').src = "./assets/score/score_0.png"
								document.getElementById('flags1').src = "./assets/score/score_0.png"
							} else if (realdigits.length == 2) {
								document.getElementById('flags2').src = "./assets/score/score_" + realdigits[0] + ".png"
								document.getElementById('flags3').src = "./assets/score/score_" + realdigits[1] + ".png"
								document.getElementById('flags1').src = "./assets/score/score_0.png"
							} else if (realdigits.length == 3) {
								document.getElementById('flags2').src = "./assets/score/score_" + realdigits[1] + ".png"
								document.getElementById('flags3').src = "./assets/score/score_" + realdigits[2] + ".png"
								document.getElementById('flags1').src = "./assets/score/score_" + realdigits[0] + ".png"
							}

							checkWin();

						}
					}
				}
			});

			cell.addEventListener("mouseup", () => {
				document.getElementById("face").classList.remove("faceshocked")
			})

			gameBoard.appendChild(cell);
		}
		gameBoard.appendChild(
			document.createElement("br")
		);
	}
}

initializeBoard();
renderBoard();
document.getElementById("face").classList.remove("faceshocked")
died = false;



document.getElementById("face").onclick = function () {
	initializeBoard();
	renderBoard();

	document.getElementById('timer1').src = "./assets/score/score_0.png"
	document.getElementById('timer2').src = "./assets/score/score_0.png"
	document.getElementById('timer3').src = "./assets/score/score_0.png"

	document.getElementById("face").classList.remove("facedead")
	document.getElementById("face").classList.remove("facewin")
	document.getElementById("face").classList.remove("faceshocked")
	died = false;
};

document.getElementById('setupboard').onclick = function () {

	numRows = document.getElementById('heiINPUT').value
	numCols = document.getElementById('lenINPUT').value
	numMines = document.getElementById('minINPUT').value

	initializeBoard();
	renderBoard();

	document.getElementById("face").classList.remove("faceshocked")
	died = false;

}

document.getElementById("gamemode").addEventListener("change", () => {
	switch (document.getElementById("gamemode").value) {
		case "classic":

			numRows = 8
			numCols = 8
			numMines = 10

			initializeBoard();
			renderBoard();

			document.getElementById("face").classList.remove("faceshocked")
			document.getElementById("customConfig").style.display = "none"
			died = false;


			break

		case "googleeasy":

			numRows = 8
			numCols = 10
			numMines = 10

			initializeBoard();
			renderBoard();

			document.getElementById("face").classList.remove("faceshocked")
			document.getElementById("customConfig").style.display = "none"
			died = false;


			break

		case "googlemedium":

			numRows = 14
			numCols = 18
			numMines = 40

			initializeBoard();
			renderBoard();

			document.getElementById("face").classList.remove("faceshocked")
			document.getElementById("customConfig").style.display = "none"
			died = false;


			break

		case "googlehard":

			numRows = 20
			numCols = 24
			numMines = 100

			initializeBoard();
			renderBoard();

			document.getElementById("face").classList.remove("faceshocked")
			document.getElementById("customConfig").style.display = "none"
			died = false;

			break

		case "custom":

			document.getElementById("customConfig").style.display = "block"

			break
	}

})