import { readLines } from "./file_utils";

class Solver {
  lines: string[];
  constructor(inputFileName: string) {
    this.lines = readLines(inputFileName);
  }
}
