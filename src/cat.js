import path from "path";
import { resolve } from "path";
import { createReadStream } from "fs";
import { pipeline } from "stream/promises";
import { Writable } from "stream";

const createSendStream = () => {
  return new Writable({
    write(chunk, encoding, callback) {
      console.log(chunk.toString());
      callback();
    },
  });
};
const cat = async (currdir, fileName) => {
  if (fileName === "") {
    console.log("Invalid input");
    return false;
  }
  try {
    await pipeline(
      createReadStream(resolve(currdir, fileName)),
      createSendStream()
    );

    return path;
  } catch (err) {
    console.log("Operation failed");
    return false;
  }
};

export default cat;
