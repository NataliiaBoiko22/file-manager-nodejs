import crypto from "crypto";
import { readFile } from "fs";
import {
  failedOperationMess,
  invalidInputMess,
  getCurrentPathMess,
} from "./utils/messages.js";
import getAbsolutePath from "./utils/getAbolutePath.js";

const hash = async (pathToFile, currdir) => {
  if (!pathToFile || pathToFile.trim() === "") {
    invalidInputMess();
    return;
  }
  const absPathTo = getAbsolutePath(pathToFile, currdir);
  readFile(absPathTo, (err, file) => {
    if (err) {
      failedOperationMess();
    } else {
      console.log(crypto.createHash("sha256").update(file).digest("hex"));
      getCurrentPathMess();
    }
  });
  return currdir;
};

export default hash;
