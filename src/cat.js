import path from "path";
import { resolve } from "path";
import { createReadStream } from "fs";
import { pipeline } from "stream/promises";
import { Writable } from "stream";
import {
  failedOperationMess,
  invalidInputMess,
  getCurrentPathMess,
} from "./utils/messages.js";
import getAbsolutePath from "./utils/getAbolutePath.js";

const createSendStream = () => {
  return new Writable({
    write(chunk, encoding, callback) {
      console.log(chunk.toString());
      callback();
    },
  });
};
const cat = async (pathToFile, currdir) => {
  const filePath = getAbsolutePath(pathToFile, currdir);

  try {
    await pipeline(
      createReadStream(resolve(currdir, filePath)),
      createSendStream()
    );
    getCurrentPathMess();
    return path;
  } catch (err) {
    if (err.code === "ENOENT") {
      invalidInputMess();
      getCurrentPathMess();
    } else {
      failedOperationMess();
      getCurrentPathMess();
    }
    return false;
  }
};
export default cat;
