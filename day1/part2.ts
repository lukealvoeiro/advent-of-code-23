import { readFile } from "fs";
import { TrieNode } from "./utils";

let inputArray: string[] = [];
const VALID_NUMBERS = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};
const VALID_NUMBERS_BACKWARDS = Object.fromEntries(
  Object.entries(VALID_NUMBERS).map(([key, value]) => [
    key.split("").reverse().join(""),
    value,
  ])
);
let MAX_WORD_LENGTH = 0;
Object.keys(VALID_NUMBERS).forEach((key) => {
  MAX_WORD_LENGTH = Math.max(MAX_WORD_LENGTH, key.length);
});

class Solver {
  inputArray: string[];
  dictionaryRoot: TrieNode;

  constructor(inputArray: string[], dictionary: TrieNode) {
    this.inputArray = inputArray;
    this.dictionaryRoot = dictionary;
  }

  getNumberFromString(
    stringInput: string,
    startingIndex: number,
    direction: "forwards" | "backwards"
  ): number | undefined {
    const parsedInt = parseInt(stringInput[startingIndex]);
    if (!Number.isNaN(parsedInt)) {
      return parsedInt;
    }

    let step: number;
    if (direction === "forwards") step = 1;
    else step = -1;

    for (let i = startingIndex; i < stringInput.length && i >= 0; i += step) {
      if (direction === "forwards") {
        if (i - startingIndex > MAX_WORD_LENGTH) {
          break;
        }
        const currWord = stringInput.slice(startingIndex, i + 1);
        if (this.dictionaryRoot.isValidWord(currWord)) {
          const wordValue = this.dictionaryRoot.getWordValue(currWord);
          return wordValue;
        }
      } else {
        if (startingIndex - i > MAX_WORD_LENGTH) {
          break;
        }
        const currWord = stringInput.slice(i, startingIndex + 1);
        if (this.dictionaryRoot.isValidWord(currWord)) {
          const wordValue = this.dictionaryRoot.getWordValue(
            stringInput.slice(i, startingIndex + 1)
          );
          return wordValue;
        }
      }
    }
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
        if (firstNum === undefined) {
          firstNum = this.getNumberFromString(stringInput, start, "forwards");
        }
        if (lastNum === undefined) {
          lastNum = this.getNumberFromString(stringInput, end, "backwards");
        }
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
readFile("input.txt", (err, data) => {
  if (err) {
    console.log(err);
  }
  inputArray = data.toString().split("\n");
  const result = new Solver(
    inputArray,
    TrieNode.populate({ ...VALID_NUMBERS, ...VALID_NUMBERS_BACKWARDS })
  ).solve();
  console.log(result);
});
