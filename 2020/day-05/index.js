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

function getNextSeatLocation(i, j) {
    if (i === 127 && j === 7) {
        return [127, 7];
    }

    if (j === 7 && i < 127) {
        return [i + 1, 0];
    }
    return [i, j + 1];
}

function getPrevSeatLocation(i, j) {
    if (i === 0 && j === 0) {
        return [0, 0];
    }
    if (i === 0 && j < 8) {
        return [i, j - 1];
    }

    if (j === 0 && i > 0) {
        return [i - 1, 7];
    }
    return [i, j - 1];
}

function generateSeatingPlan() {
    const plane = new Array(128).fill(0).map(() => new Array(8).fill(0));
    rawInput.forEach((bp) => {
        plane[getRow(bp)][getColumn(bp)] = "X";
    });

    return plane;
}

function findSeatId() {
    let emptySeatId;
    let foundSeat = false;
    const seats = generateSeatingPlan();
    for (let i = 0; i < 128; i++) {
        if (foundSeat) break;
        for (let j = 0; j < 8; j++) {
            if (seats[i][j] === 0) {
                emptySeatId = generateSeatID(i, j);
                const [ni, nj] = getNextSeatLocation(i, j);
                const [pi, pj] = getPrevSeatLocation(i, j);
                if (seats[ni][nj] === "X" && seats[pi][pj] === "X") {
                    foundSeat = true;
                    break;
                }
            }
        }
    }
    return emptySeatId;
}

console.log("Advent of Code: Day 5");
console.log("Part 1 -- Highest seat ID: ", getHigestSeatID());
console.log("Part 2 -- Find my seat: ", findSeatId());
