const fs = require("fs");

const inputFile = fs.readFileSync("input.dat");
const rawInput = inputFile.toString().split("\n\n");

const allFields = ["byr", "cid", "ecl", "eyr", "hcl", "hgt", "iyr", "pid"];

function processInput(i) {
    return i.replace(/\n/g, " ").split(" ");
}

function validatePassportKeys(info) {
    if (!info.includes("cid")) {
        info = [...info, "cid"];
    }
    const sortedInfo = info.sort();

    if (info.length !== 8) {
        return false;
    }

    const results = sortedInfo.filter((prop, i) => prop === allFields[i]);

    return results.length === allFields.length;
}

function validatePassportData(data) {
    let isValidData = false;
    for (const [key, value] of Object.entries(data)) {
        switch (key) {
            case "byr":
                isValidData = value >= 1920 && value <= 2002;
                break;
            case "cid":
                isValidData = true;
                break;
            case "ecl":
                isValidData = [
                    "amb",
                    "blu",
                    "brn",
                    "gry",
                    "grn",
                    "hzl",
                    "oth"
                ].includes(value);
                break;
            case "eyr":
                isValidData = value >= 2020 && value <= 2030;
                break;
            case "hcl":
                isValidData = /^#[0-9a-f]{6}$/.test(value);
                break;
            case "hgt":
                if (/^[0-9]{2,3}(cm|in)$/.test(value)) {
                    const [hgtVal] = value.match(/[0-9]*/);
                    const [hgtUnit] = value.match(/cm|in/);
                    if (hgtUnit === "cm") {
                        isValidData = hgtVal >= 150 && hgtVal <= 193;
                    }
                    if (hgtUnit === "in") {
                        isValidData = hgtVal >= 59 && hgtVal <= 76;
                    }
                } else {
                    isValidData = false;
                }
                break;
            case "iyr":
                isValidData = value >= 2010 && value <= 2020;
                break;
            case "pid":
                isValidData = /^[0-9]{9}$/.test(value);
                break;
            default:
                console.log("shoud not get here...");
        }

        if (!isValidData) {
            break;
        }
    }
    return isValidData;
}

function getNumOfValidPassports() {
    const validInfo = getValidPassports();
    return validInfo.length;
}

function getNumOfPassportsWithValidData() {
    const validPD = getValidPassports().filter((data) =>
        validatePassportData(data)
    );
    return validPD.length;
}

function getValidPassports() {
    return rawInput
        .map((info) => processInput(info))
        .map((info) =>
            info.reduce((acc, data) => {
                const [key, value] = data.split(":");
                acc[key] = value;
                return acc;
            }, {})
        )
        .filter((data) => validatePassportKeys(Object.keys(data)));
}

console.log("Advent of Code: Day 4");
console.log("Part 1 -- valid passports: ", getNumOfValidPassports());
console.log(
    "Part 2 -- passports with valid data: ",
    getNumOfPassportsWithValidData()
);
