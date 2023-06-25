import os from "os";
import readline from "readline";
import path from "path";
import { fileURLToPath } from "url";
import { stdin, stdout, exit } from "process";
import {
  getCurrentPathMess,
  getWelcomeMess,
  getGoodbyeMess,
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
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const fileManager = async () => {
  const homedir = os.homedir();
  let currdir = process.cwd();
  // process.chdir(homedir);
  // console.log(homedir);
  // console.log(currdir);

  const userName = process.argv
    .slice(2)
    .filter((s) => s.includes("--username"))[0]
    .split("=")[1];

  console.log(getWelcomeMess(userName));

  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
    prompt: getCurrentPathMess(),
  });
  rl.prompt();
  const stopFileManager = () => {
    console.log(getGoodbyeMess(userName));
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

  rl.on("line", async (line) => {
    let command = line.split(" ")[0];
    let source = line.split(" ")[1];
    let destination = line.split(" ")[2];

    switch (true) {
      case line === "up":
        currdir = up(homedir, currdir);
        rl.setPrompt(`You are currently in ${currdir}\n`);
        rl.prompt();
        console.log(currdir);
        break;
      case command === "cd":
        let newPath = line.split(" ")[1];
        currdir = await cd(newPath, currdir);
        rl.setPrompt(`You are currently in ${currdir}\n`);
        rl.prompt();
        console.log(currdir);
        break;
      case line === "ls":
        await ls(currdir);
        rl.prompt();
        break;
      case command === "cat":
        await cat(currdir, source);
        rl.prompt();
        break;
      case command === "add":
        await add(currdir, source);
        rl.prompt();
        break;
      case command === "rn":
        await rn(source, currdir, destination);
        rl.prompt();
        break;
      case command === "cp":
        await cp(source, destination, currdir);
        rl.prompt();
        break;
      case command === "rm":
        await rm(source, currdir);
        rl.prompt();
        break;
      case command === "mv":
        await mv(source, destination, currdir);
        rl.prompt();
        break;
      case command === "os --":
        await oS(source);
        rl.prompt();
        break;
      case command === "hash ":
        await hash(source);
        rl.prompt();
        break;
      case command === "compress":
        await compress(source, destination, currdir);
        rl.prompt();
        break;
      case command === "decompress":
        await decompress(source, destination, currdir);
        rl.prompt();
        break;
    }
  });
};
fileManager();
