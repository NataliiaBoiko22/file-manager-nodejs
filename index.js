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
import ls from "./src/ls.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileManager = async () => {
  const homedir = os.homedir();
  let currdir = process.cwd();
  console.log(homedir);
  console.log(currdir);

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
    switch (true) {
      case line === "up":
        currdir = up(homedir, currdir);
        rl.setPrompt(`You are currently in ${currdir}\n`);

        rl.prompt();
        console.log(currdir);

        break;
      case line.includes("cd "):
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
    }
  });
};
fileManager();
