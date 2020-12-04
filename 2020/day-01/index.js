const  fs  = require('fs');

const inputFile = fs.readFileSync('input.dat');
const expenseArray = inputFile.toString().split('\n');
const numOfExpenses = expenseArray.length;

function part1() {
    let answer;
    for (let i = 0; i < numOfExpenses; i++) {
        for (let j = i + 1; j < numOfExpenses; j++) {
            if (parseInt(expenseArray[i]) + parseInt(expenseArray[j]) === 2020) {
                const [product1, product2] = [parseInt(expenseArray[i]), parseInt(expenseArray[j])];
                answer = product1 * product2;
                break;
            }
        }
    }
    return answer;
}

function part2() {
    let answer;
    for (let i = 0; i < numOfExpenses; i++) {
        for (let j = i + 1; j < numOfExpenses; j++) {
            for (let k = j + 1; k < numOfExpenses; k++) {
                if (parseInt(expenseArray[i]) + parseInt(expenseArray[j]) + parseInt(expenseArray[k]) === 2020) {
                    const [product1, product2, product3] = [parseInt(expenseArray[i]), parseInt(expenseArray[j]), parseInt(expenseArray[k])];
                    answer = product1 * product2 * product3;
                    break;
                }
            }
        }
    }
    return answer;
}

console.log('Advent of Code: Day 1');
console.log('Part 1 answer: ', part1());
console.log('Part 2 answer: ', part2());
