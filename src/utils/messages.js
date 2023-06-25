import { EOL } from "os";

export function getCurrentPathMess() {
  console.log(`You are currently in ${process.cwd()}${EOL}`);
}
export function getWelcomeMess(userName) {
  console.log(`Welcome to the File Manager, ${userName}!${EOL}`);
}
export function getGoodbyeMess(userName) {
  console.log(
    `${EOL}Thank you for using File Manager, ${userName}, goodbye!${EOL}`
  );
}

export function failedOperationMess() {
  console.log(`${EOL}Operation failed${EOL}`);
}
export function invalidInputMess() {
  console.log(`${EOL}Invalid input${EOL}`);
}
