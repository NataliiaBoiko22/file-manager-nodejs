import fs from "fs/promises";
import {
  failedOperationMess,
  invalidInputMess,
  getCurrentPathMess,
} from "./utils/messages.js";
import getAbsolutePath from "./utils/getAbolutePath.js";

const rm = async (pathToFile, currdir) => {
  const pathToSourceFile = getAbsolutePath(pathToFile, currdir);
  try {
    await fs.rm(pathToSourceFile);
    console.log(`The file ${pathToFile} has been successfully deleted!`);
    getCurrentPathMess();
    return true;
  } catch (err) {
    if (err.code === "ENOENT") {
      invalidInputMess();
    } else {
      failedOperationMess();
    }
    return false;
  }
};
export default rm;
