import fs from "fs";
import getAbsolutePath from "./utils/getAbolutePath.js";
import {
  failedOperationMess,
  invalidInputMess,
  getCurrentPathMess,
} from "./utils/messages.js";
const cd = async (newPath, currdir) => {
  try {
    let absolutePath = getAbsolutePath(newPath, currdir);

    const stat = await fs.promises.stat(absolutePath);

    if (stat.isDirectory()) {
      process.chdir(absolutePath);
      getCurrentPathMess();
      return absolutePath;
    } else {
      invalidInputMess();
      return currdir;
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      invalidInputMess();
    } else {
      failedOperationMess();
    }
    return currdir;
  }
};

export default cd;
