import { readFile } from "fs";

let inputArray: string[] = [];
class Solver {
  inputArray: string[];

  constructor(inputArray: string[]) {
    this.inputArray = inputArray;
  }

  solve(): number {
    let sum = 0;
    inputArray.forEach((stringInput) => {
      let [start, end] = [0, stringInput.length - 1];
      let firstNum: number | undefined;
      let lastNum: number | undefined;
      while (
        start < stringInput.length &&
        end >= 0 &&
        (firstNum === undefined || lastNum === undefined)
      ) {
        firstNum =
          firstNum !== undefined || Number.isNaN(parseInt(stringInput[start]))
            ? firstNum
            : parseInt(stringInput[start]);
        lastNum =
          lastNum !== undefined || Number.isNaN(parseInt(stringInput[end]))
            ? lastNum
            : parseInt(stringInput[end]);
        start++;
        end--;
      }
      if (firstNum !== undefined && lastNum !== undefined) {
        const newNumber = firstNum * 10 + lastNum;
        sum += newNumber;
      }
    });
    return sum;
  }
}

// class to read file and return array of strings
readFile("demo_input.txt", (err, data) => {
  if (err) {
    console.log(err);
  }
  inputArray = data.toString().split("\n");
  const result = new Solver(inputArray).solve();
  console.log(result);
});
