import os from "os";
import readline from "readline";
import { stdin, stdout, exit } from "process";
import path from "path";
const fileManager = async () => {
  const homedir = os.homedir();
  let currdir = path.join(homedir);

  const username = process.argv
    .slice(2)
    .filter((s) => s.includes("--username"))[0]
    .split("=")[1];
  console.log(`Welcome to the File Manager, ${username}!`);

  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
    prompt: `You are currently in ${currdir}`,
  });
  rl.prompt();
  const stopFileManager = () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
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
};
fileManager();
