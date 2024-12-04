//* Getting the input from https://adventofcode.com/2024/day/3/input
const input = await Deno.readTextFile("input/aoc-3.txt");


//* Defining useful functions
function convertAndCalculateMul(entry: string): number {
  const filtered = entry.replaceAll(/mul\(|\)/g, "");
  const splitted = filtered.split(",");
  const parsed = splitted.map(e => Number.parseInt(e));
  return parsed[0] * parsed[1];
}

//* Actual code

//? Regex to match "mul, do and don't" as specified
const regex = /mul\([0-9]{1,3},[0-9]{1,3}\)|do\(\)|don't\(\)/g;
const mulArr = []

let match;
do {
  match = regex.exec(input);
  if (match) {
    mulArr.push(match[0]);
  }
} while (match);

//? Filter for mul, calculate mul and sum up
const result1 = mulArr
  .filter(e => !e.startsWith("do")) // Filter for "do" and "don't"
  .map(e => convertAndCalculateMul(e))
  .reduce((sum, current) => sum + current, 0);

console.log("Solution Part 1: ", result1);

//? While "do()", calculate mul and sum up
let doState = true;
const result2 = mulArr
  .map(e => {
    if (doState === true && e.startsWith("mul")) {
      return convertAndCalculateMul(e);
    }
    if (e === "do()") doState = true;
    else doState = false;
    return 0;
  })
  .reduce((sum, current) => sum + current, 0);

console.log("Solution Part 2: ", result2);