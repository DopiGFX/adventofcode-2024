//* Getting the input from https://adventofcode.com/2024/day/1/input
const input = await Deno.readTextFile("input/aoc-1.txt");

//* Defining useful functions
function pushInSortedArray(arr: number[], input: number): void {
  let low = 0;
  let high = arr.length;
  while (low < high) {
    const mid = (low + high) >>> 1;
    if (arr[mid] < input) low = mid + 1;
    else high = mid;
  }
  arr.splice(low, 0, input);
}

//* Actual code

const leftList: number[] = [];
const rightList: number[] = [];

//? Parsing the input into separate sorted number arrays
const pairs = input.split("\n");
pairs.forEach(pair => {
  const entry = pair.split("   ").map(e => Number.parseInt(e));
  pushInSortedArray(leftList, entry[0]);
  pushInSortedArray(rightList, entry[1]);
});

//? Calculating the distances between the entries and sum them up
let result1 = 0;

leftList.forEach((leftEntry, index) => {
  result1 += Math.abs(leftEntry - rightList[index])
});

console.log("Solution Part 1: ", result1)

//? Calculating the similarity score between the arrays and sum them up
let result2 = 0;

leftList.forEach((leftEntry) => {
  const firstIndex = rightList.indexOf(leftEntry);
  if (firstIndex === -1) return;
  result2 += (rightList.lastIndexOf(leftEntry) - rightList.indexOf(leftEntry) + 1) * leftEntry;
});

console.log("Solution Part 2: ", result2)