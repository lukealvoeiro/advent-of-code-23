import { readFileSync } from "fs";

export function readLines(filename: string): string[] {
  return readFileSync("input.txt", "utf-8").split("\n");
}
