const fs = require("fs");

const inputFile = fs.readFileSync("input.dat");
const rawInput = inputFile.toString().split("\n");

function getRow(boardingPass) {
    let lowerRow = 0;
    let upperRow = 127;
    for (let i = 0; i < 7; i++) {
        if (boardingPass[i] === "F") {
            upperRow = upperRow - Math.ceil((upperRow - lowerRow) / 2);
        } else if (boardingPass[i] === "B") {
            lowerRow = lowerRow + Math.ceil((upperRow - lowerRow) / 2);
        }
    }
    return lowerRow;
}

function getColumn(boardingPass) {
    let lowerCol = 0;
    let upperCol = 7;
    for (let i = 7; i < boardingPass.length; i++) {
        if (boardingPass[i] === "L") {
            upperCol = upperCol - Math.ceil((upperCol - lowerCol) / 2);
        } else if (boardingPass[i] === "R") {
            lowerCol = lowerCol + Math.ceil((upperCol - lowerCol) / 2);
        }
    }
    return lowerCol;
}

function generateSeatID(row, col) {
    return row * 8 + col;
}

function getHigestSeatID() {
    let higestId = 0;

    rawInput.forEach((bp) => {
        const seatId = generateSeatID(getRow(bp), getColumn(bp));
        if (seatId > higestId) {
            higestId = seatId;
        }
    });

    return higestId;
}

console.log("Advent of Code: Day 5");
console.log("Part 1 -- Highest seat ID: ", getHigestSeatID());
