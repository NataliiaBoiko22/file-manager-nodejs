import fs from "fs";
import path from "path";
import {
  failedOperationMess,
  invalidInputMess,
  getCurrentPathMess,
} from "./utils/messages.js";
import getAbsolutePath from "./utils/getAbolutePath.js";
const mv = async (pathToFile, pathToNewDir, currdir) => {
  const pathToSourceFile = getAbsolutePath(pathToFile, currdir);
  const pathToNewDirrect = getAbsolutePath(pathToNewDir, currdir);

  if (
    !pathToSourceFile ||
    !pathToNewDirrect ||
    pathToFile.trim() === "" ||
    pathToNewDir.trim() === ""
  ) {
    invalidInputMess();
    return;
  }

  try {
    await fs.promises.access(pathToSourceFile, fs.constants.F_OK);
    await fs.promises.access(pathToNewDirrect, fs.constants.F_OK);
  } catch (error) {
    invalidInputMess();
    return;
  }

  try {
    const nameOfSourceFile = path.parse(pathToSourceFile).base;
    const absPathToDestinationFile = path.resolve(
      pathToNewDirrect,
      nameOfSourceFile
    );
    const fileExists = await new Promise((resolve) => {
      fs.access(absPathToDestinationFile, fs.constants.F_OK, (err) => {
        resolve(!err);
      });
    });

    if (fileExists) {
      console.log(
        `Such a file already exists in the ${pathToNewDirrect} directory. Enter a valid path.`
      );
      return;
    }

    const readStream = fs.createReadStream(pathToSourceFile);
    const writableStream = fs.createWriteStream(absPathToDestinationFile, {
      flags: "wx",
    });

    readStream.pipe(writableStream);
    await fs.promises.rm(pathToSourceFile);
    console.log(
      `The file ${pathToFile} has been successfully moved  to ${pathToNewDir}!`
    );
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
export default mv;
