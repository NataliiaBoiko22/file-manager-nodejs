import { dirname, resolve } from "path";
import { rename } from "fs/promises";
import fs from "fs";
import {
  failedOperationMess,
  invalidInputMess,
  getCurrentPathMess,
} from "./utils/messages.js";
import getAbsolutePath from "./utils/getAbolutePath.js";

const rn = async (pathToFile, updateFileName, currdir) => {
  const pathToSourceFile = getAbsolutePath(pathToFile, currdir);

  if (
    !pathToFile ||
    !updateFileName ||
    pathToFile.trim() === "" ||
    updateFileName.trim() === ""
  ) {
    invalidInputMess();
    return;
  }

  try {
    await fs.promises.access(pathToSourceFile, fs.constants.F_OK);
  } catch (error) {
    invalidInputMess();
    return;
  }
  try {
    await rename(
      pathToSourceFile,
      resolve(dirname(pathToSourceFile), updateFileName)
    );
    console.log(`The file has been successfully renamed to ${updateFileName}!`);
    getCurrentPathMess();
  } catch (err) {
    failedOperationMess();
  }
};

export default rn;
