const  fs  = require('fs');

const inputFile = fs.readFileSync('input.dat');
const inputArray = inputFile.toString().split('\n');

function parseInputStr(input) {
    const parts = input.split(' ');
    const [p1, p2] = parts[0].split('-');
    const ltr = parts[1].substring(0,1);
    const pwd = parts[2]

    return [p1, p2, ltr, pwd];
}

function part1() {
    const validPasswords = inputArray.filter(input => {
        const [min, max, letter, password] = parseInputStr(input);

        const letterMap = Array.from(password).reduce((acc, l) => {
            (acc[l]) ? acc[l] += 1: acc[l] = 1;
            return acc;
        }, {});

        return (letterMap[letter] >= min && letterMap[letter] <= max);
    });
    return validPasswords.length;
}

function part2() {
    const validPasswords = inputArray.filter(input => {
        const [pos1, pos2, letter, password] = parseInputStr(input);
        let policy = 0;

        if (password[pos1-1] === letter) {
            policy++;
        }

        if (password[pos2-1] === letter) {
            policy++;
        }

        return policy === 1;
    });

    return validPasswords.length;
}

console.log('Advent of Code: Day 2');
console.log('Part 1 answer: ', part1());
console.log('Part 2 answer: ', part2());