import { EOL } from "os";
const { stdout } = process;

export function getCurrentPathMess() {
  stdout.write(`\nYou are currently in ${process.cwd()}\n`);
}
export const getWelcomeMess = (userName) =>
  `Welcome to the File Manager, ${userName}!`;
export const getGoodbyeMess = (userName) =>
  `${EOL}Thank you for using File Manager, ${userName}, goodbye!`;

export const failedOperationMess = "Operation failed";
export const invalidInputMess = "Invalid input";
