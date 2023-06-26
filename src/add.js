import fs from "fs/promises";
import getAbsolutePath from "./utils/getAbolutePath.js";
import {
  failedOperationMess,
  invalidInputMess,
  getCurrentPathMess,
} from "./utils/messages.js";
const add = async (newFileName, currdir) => {
  const pathToNewFile = getAbsolutePath(newFileName, currdir);

  try {
    const fd = await fs.open(pathToNewFile, "wx");
    const writeStream = fd.createWriteStream();
    writeStream.close();
    console.log(`The file ${newFileName} was succesfully created`);
    getCurrentPathMess();
  } catch (err) {
    if (err.code === "ENOENT") {
      invalidInputMess();
    } else {
      failedOperationMess();
    }
    return false;
  }
};

export default add;
