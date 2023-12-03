import { readLines } from "./file_utils";

class NumberNode {
  value: number;
  isVisited: boolean;

  constructor(value: number) {
    this.value = value;
    this.isVisited = false;
  }
}

class Solver {
  rows: number;
  cols: number;
  charMatrix: string[][];
  valuesMatrix: (undefined | NumberNode)[][];
  valuesArr: NumberNode[];

  constructor(inputFileName: string) {
    const lines = readLines(inputFileName);
    this.charMatrix = [];
    this.valuesArr = [];
    this.valuesMatrix = lines.map((line) => {
      const lineRes: (undefined | NumberNode)[] = [];
      const numbersInLine = getNumbersFromString(line);
      let currNumberPos = 0;
      const charsInLine = line.split("");
      this.charMatrix.push(charsInLine);
      for (let i = 0; i < charsInLine.length; i++) {
        const char = charsInLine[i];
        if (!Number.isNaN(parseInt(char))) {
          const numNode = new NumberNode(numbersInLine[currNumberPos]);
          this.valuesArr.push(numNode);
          for (let j = 0; j < numNode.value.toString().length; j++) {
            lineRes.push(numNode);
          }
          i += numNode.value.toString().length - 1;
          currNumberPos++;
        } else {
          lineRes.push(undefined);
        }
      }
      return lineRes;
    });
    this.rows = this.charMatrix.length;
    this.cols = this.charMatrix[0].length;
  }

  clearVisited() {
    this.valuesArr.forEach((valueNode) => (valueNode.isVisited = false));
  }

  solvePart1() {
    this.clearVisited();
    let res = 0;
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const currChar = this.charMatrix[row][col];
        const currVal = this.valuesMatrix[row][col];
        if (currVal === undefined && currChar !== ".") {
          // this is a symbol, explore around it
          for (const row_diff of [-1, 0, 1]) {
            for (const col_diff of [-1, 0, 1]) {
              const newRow = row + row_diff;
              const newCol = col + col_diff;
              if (newRow < 0 || newRow >= this.rows) {
                continue;
              }

              if (newCol < 0 || newCol >= this.cols) {
                continue;
              }

              const neighborVal = this.valuesMatrix[newRow][newCol];
              if (
                neighborVal !== undefined &&
                neighborVal.isVisited === false
              ) {
                res += neighborVal.value;
                neighborVal.isVisited = true;
              }
            }
          }
        }
      }
    }
    this.clearVisited();
    return res;
  }

  solvePart2() {
    let res = 0;
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const currChar = this.charMatrix[row][col];
        const currVal = this.valuesMatrix[row][col];
        if (currVal === undefined && currChar === "*") {
          this.clearVisited();
          let currProduct = 1;
          let neighborCount = 0;
          for (const row_diff of [-1, 0, 1]) {
            for (const col_diff of [-1, 0, 1]) {
              if (row_diff === 0 && col_diff === 0) {
                continue;
              }
              const newRow = row + row_diff;
              const newCol = col + col_diff;
              if (newRow < 0 || newRow >= this.rows) {
                continue;
              }

              if (newCol < 0 || newCol >= this.cols) {
                continue;
              }

              const neighborVal = this.valuesMatrix[newRow][newCol];
              if (
                neighborVal !== undefined &&
                neighborVal.isVisited === false
              ) {
                neighborCount++;
                currProduct *= neighborVal.value;
                neighborVal.isVisited = true;
              }
            }
          }
          if (neighborCount === 2) {
            res += currProduct;
          }
        }
      }
    }
    this.clearVisited();
    return res;
  }
}

function getNumbersFromString(input: string) {
  let res: number[] = [];
  let currInt: number | undefined;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const parsedInt = parseInt(char);
    if (!Number.isNaN(parsedInt)) {
      if (currInt === undefined) {
        currInt = parsedInt;
      } else {
        currInt = currInt * 10 + parsedInt;
      }
    } else {
      if (currInt !== undefined) {
        res.push(currInt);
        currInt = undefined;
      }
    }
  }

  // add the last number if there is one
  currInt && res.push(currInt);
  return res;
}

const solver = new Solver("input.txt");
console.log(solver.solvePart1());
console.log(solver.solvePart2());
/*
todos
- get each number on
*/
