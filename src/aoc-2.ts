//* Getting the input from https://adventofcode.com/2024/day/2/input
const input = await Deno.readTextFile("input/aoc-2.txt");

function isSortedWithinLimit(report: number[], sort: -1 | 1): boolean {
  let i = 1;
  while (i < report.length) {
    if (sort === 1) {
      if (report[i - 1] >= report[i]) return false;
    } else {
      if (report[i - 1] <= report[i]) return false;
    }
    const difference = Math.abs(report[i] - report[i - 1]);
    if (3 < difference || difference < 1) return false;
    i++;
  }
  return true;
}

const reports = input.split("\n").map(report => report.split(" ").map(level => Number.parseInt(level)));

let result: number = 0;
let toleratedCount: number = 0;
reports.forEach(report => {
  if (isSortedWithinLimit(report, 1)) {
    result++;
  } else if (isSortedWithinLimit(report, -1)) {
    result++;
  } else {
    //? This can be done more efficient by skipping the already valid part of the arrays
    for (let i = 0; i < report.length; i++) {
      const filtered = report.filter((_v, index) => i != index);
      if (isSortedWithinLimit(filtered, 1) || isSortedWithinLimit(filtered, -1)) {
        toleratedCount++;
        return;
      }
    }
  }
});

console.log("Solution Part 1: ", result)
console.log("Solution Part 2: ", result + toleratedCount)