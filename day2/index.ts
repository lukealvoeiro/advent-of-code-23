import { readLines } from "./file_utils";

const NUM_RED = 12;
const NUM_GREEN = 13;
const NUM_BLUE = 14;

type Game = {
  id: number;
  reveals: { quantity: number; color: "red" | "green" | "blue" }[][];
};

function parseLine(line: string): Game {
  const [lhs, rhs] = line.split(":").map((x) => x.trim());
  const gameId = parseInt(lhs.split(" ")[1]);
  const reveals = rhs.split(";");
  const parsedReveals = reveals.map((reveal) => {
    const cubesRevealed = reveal.split(",").map((x) => x.trim());
    let revealsParsed = [];
    return cubesRevealed.map((cube) => {
      const splitCube = cube.split(" ").map((x) => x.trim());
      const quantity = parseInt(splitCube[0]);
      const color = splitCube[1] as "red" | "green" | "blue";
      return { quantity, color };
    });
  });
  return { id: gameId, reveals: parsedReveals };
}

class Solver {
  lines: string[];
  constructor(inputFileName: string) {
    this.lines = readLines(inputFileName);
  }

  solvePart1() {
    let total = 0;
    for (const line of this.lines) {
      let validLine = true;
      const gameRun = parseLine(line);
      for (const revealRound of gameRun.reveals) {
        let [redSeen, greenSeen, blueSeen] = [0, 0, 0];
        revealRound.forEach((reveal) => {
          if (reveal.color === "red") {
            redSeen += reveal.quantity;
          } else if (reveal.color === "green") {
            greenSeen += reveal.quantity;
          } else {
            blueSeen += reveal.quantity;
          }
        });
        if (redSeen > NUM_RED || greenSeen > NUM_GREEN || blueSeen > NUM_BLUE) {
          validLine = false;
          break;
        }
      }
      if (validLine) {
        total += gameRun.id;
        console.log(gameRun.id, "is valid");
      }
    }
    return total;
  }

  solvePart2() {
    let total = 0;
    for (const line of this.lines) {
      const gameRun = parseLine(line);
      let [maxRed, maxGreen, maxBlue] = [0, 0, 0];
      for (const revealRound of gameRun.reveals) {
        let [redSeen, greenSeen, blueSeen] = [0, 0, 0];
        revealRound.forEach((reveal) => {
          if (reveal.color === "red") {
            redSeen += reveal.quantity;
          } else if (reveal.color === "green") {
            greenSeen += reveal.quantity;
          } else {
            blueSeen += reveal.quantity;
          }
        });

        maxRed = Math.max(maxRed, redSeen);
        maxGreen = Math.max(maxGreen, greenSeen);
        maxBlue = Math.max(maxBlue, blueSeen);
      }
      console.log("Game", gameRun.id, " ", maxRed, maxGreen, maxBlue);
      total += maxRed * maxGreen * maxBlue;
    }
    return total;
  }
}

console.log(new Solver("input.txt").solvePart2());
