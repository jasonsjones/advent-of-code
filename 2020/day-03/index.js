const  fs  = require('fs');

const inputFile = fs.readFileSync('input.dat');
const terrain = inputFile.toString().split('\n');

function normalizeColPosition(colPos) {
    return colPos % Array.from(terrain[0]).length;
}

function findTrees(rightStep, downStep) {
    const slope = rightStep/downStep;

    const trees = terrain.filter((t, i) => {
        if (i % downStep !== 0) {
            return false;
        }
        const location = Array.from(t)[normalizeColPosition(i * slope)]
        return location === '#';
    });

    return trees.length;
}
const [trees1, trees2, trees3, trees4, trees5] = [findTrees(1,1), findTrees(3,1), findTrees(5,1), findTrees(7,1), findTrees(1,2)];

console.log('Advent of Code: Day 3');
console.log('Part 1 -- Number of trees (3, 1): ', trees2);
console.log('Part 2 -- Number of trees (1, 1): ', trees1);
console.log('Part 2 -- Number of trees (3, 1): ', trees2);
console.log('Part 2 -- Number of trees (5, 1): ', trees3);
console.log('Part 2 -- Number of trees (7, 1): ', trees4);
console.log('Part 2 -- Number of trees (2, 1): ', trees5);
console.log('Part 2 -- Product of trees: ', trees1 * trees2 * trees3 * trees4 * trees5);
