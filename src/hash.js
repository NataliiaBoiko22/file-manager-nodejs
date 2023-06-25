import crypto from "crypto";
import { readFile } from "fs";
import { failedOperationMess, invalidInputMess } from "./utils/messages.js";
import getAbsPath from "./utils/getAbolutePath.js";

const hash = async (pathToFile, currdir) => {
  if (!pathToFile || pathToFile.trim() === "") {
    invalidInputMess();
    getCurrentPathMess();
    return;
  }
  const absPathTo = getAbsPath(pathToFile, currdir);
  readFile(pathToFile, (err, file) => {
    if (err) {
      failedOperationMess();
      getCurrentPathMess();
    } else {
      console.log(crypto.createHash("sha256").update(file).digest("hex"));
      getCurrentPathMess();
    }
  });
  return currdir;
};

export default hash;
