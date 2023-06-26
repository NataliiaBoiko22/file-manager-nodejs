import os from "os";
import readline from "readline";
import { EOL } from "os";
import { stdin, stdout, exit } from "process";
import {
  getCurrentPathMess,
  getWelcomeMess,
  getGoodbyeMess,
  invalidInputMess,
} from "./src/utils/messages.js";
import up from "./src/up.js";
import cd from "./src/cd.js";
import ls from "./src/list.js";
import cat from "./src/cat.js";
import add from "./src/add.js";
import rn from "./src/rename.js";
import cp from "./src/copy.js";
import rm from "./src/remove.js";
import mv from "./src/move.js";
import oS from "./src/os.js";
import hash from "./src/hash.js";
import compress from "./src/compress.js";
import decompress from "./src/decompress.js";
import resolvePath from "./src/parseline.js";

const fileManager = async () => {
  const homedir = os.homedir();
  let currdir = process.cwd();
  const userName = process.argv
    .slice(2)
    .filter((s) => s.includes("--username"))[0]
    .split("=")[1];

  getWelcomeMess(userName);

  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
    prompt: getCurrentPathMess(),
  });
  rl.prompt();
  const stopFileManager = () => {
    getGoodbyeMess(userName);
    exit();
  };

  rl.on("SIGINT", () => {
    stopFileManager();
  });
  rl.on("line", (inputLine) => {
    if (inputLine.trim().toLowerCase().includes(".exit")) {
      stopFileManager();
    }
  });

  rl.on("line", async (enter) => {
    let line = resolvePath(enter);
    let command = line[0];
    let source = line[1];
    let destination = line[2];
    let lineLength = line.length;

    switch (true) {
      case command === "up":
        currdir = up(homedir, currdir);
        rl.setPrompt(`You are currently in ${currdir}${EOL}`);
        rl.prompt();
        break;
      case command === "cd" && lineLength === 2:
        currdir = await cd(source, currdir);
        rl.setPrompt(`You are currently in ${currdir}${EOL}`);
        rl.prompt();
        break;
      case command === "ls":
        await ls(currdir);
        break;
      case command === "cat" && lineLength === 2:
        await cat(source, currdir);
        break;
      case command === "add" && lineLength === 2:
        await add(source, currdir);
        break;
      case command === "rn" && lineLength === 3:
        await rn(source, destination, currdir);
        break;
      case command === "cp" && lineLength === 3:
        await cp(source, destination, currdir);
        break;
      case command === "rm" && lineLength === 2:
        await rm(source, currdir);
        break;
      case command === "mv" && lineLength === 3:
        await mv(source, destination, currdir);
        break;
      case command === "os" && lineLength === 2:
        await oS(source);
        break;
      case command === "hash" && lineLength === 2:
        await hash(source, currdir);
        break;
      case command === "compress" && lineLength === 3:
        await compress(source, destination, currdir);
        break;
      case command === "decompress" && lineLength === 3:
        await decompress(source, destination, currdir);
        break;
      default:
        invalidInputMess();
    }
  });
};
fileManager();
