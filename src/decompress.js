import { basename, resolve } from "path";
import { createBrotliDecompress } from "zlib";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";
import fs from "fs";
import getAbsolutePath from "./utils/getAbolutePath.js";
import {
  failedOperationMess,
  invalidInputMess,
  getCurrentPathMess,
} from "./utils/messages.js";

const decompress = async (pathToFile, pathToNewDir, currdir) => {
  const pathToSourceFile = getAbsolutePath(pathToFile, currdir);
  const pathToNewDirrect = getAbsolutePath(pathToNewDir, currdir);
  if (
    !pathToSourceFile ||
    !pathToNewDirrect ||
    pathToFile.trim() === "" ||
    pathToNewDir.trim() === ""
  ) {
    invalidInputMess();
    getCurrentPathMess();
    return;
  }

  try {
    await fs.promises.access(pathToSourceFile, fs.constants.F_OK);
    await fs.promises.access(pathToNewDirrect, fs.constants.F_OK);
  } catch (error) {
    invalidInputMess();
    getCurrentPathMess();

    return;
  }
  try {
    const readStream = createReadStream(pathToSourceFile);
    const writeStream = createWriteStream(
      resolve(pathToNewDirrect, basename(pathToFile).slice(0, -3))
    );
    const brotliCompress = createBrotliDecompress();

    await pipeline(readStream, brotliCompress, writeStream);
    console.log(`The file has been successfully decompressed.`);
    getCurrentPathMess();
  } catch (error) {
    failedOperationMess();
    getCurrentPathMess();

    return;
  }
};
export default decompress;
