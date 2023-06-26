import fs from "fs";
import path from "path";
import {
  failedOperationMess,
  invalidInputMess,
  getCurrentPathMess,
} from "./utils/messages.js";
import getAbsolutePath from "./utils/getAbolutePath.js";
const cp = async (pathToFile, pathToNewDir, currdir) => {
  const pathToSourceFile = getAbsolutePath(pathToFile, currdir);
  const newDirPath = getAbsolutePath(path.normalize(pathToNewDir), currdir);
  if (
    !pathToSourceFile ||
    !newDirPath ||
    pathToFile.trim() === "" ||
    pathToNewDir.trim() === ""
  ) {
    invalidInputMess();
    getCurrentPathMess();
    return;
  }

  try {
    await fs.promises.access(pathToSourceFile, fs.constants.F_OK);
    await fs.promises.access(newDirPath, fs.constants.F_OK);
  } catch (error) {
    invalidInputMess();
    getCurrentPathMess();
    return;
  }

  try {
    const nameOfSourceFile = path.parse(pathToSourceFile).base;
    const absPathToDestinationFile = path.resolve(newDirPath, nameOfSourceFile);
    const fileExists = await new Promise((resolve) => {
      fs.access(absPathToDestinationFile, fs.constants.F_OK, (err) => {
        resolve(!err);
      });
    });

    if (fileExists) {
      console.log(
        `Such a file already exists in the ${pathToNewDir} directory. Enter a valid path.`
      );
      return;
    }

    const readStream = fs.createReadStream(pathToSourceFile);
    const writableStream = fs.createWriteStream(absPathToDestinationFile, {
      flags: "wx",
    });

    readStream.pipe(writableStream);
    console.log(
      `The file ${nameOfSourceFile} has been successfully copied to ${pathToNewDir}`
    );
    getCurrentPathMess();
  } catch {
    failedOperationMess();
    getCurrentPathMess();
  }
};

export default cp;
