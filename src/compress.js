import { basename, resolve } from "path";
import { createBrotliCompress } from "zlib";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";

const compress = async (pathToFile, pathToDestination, currdir) => {
  const readStream = createReadStream(resolve(currdir, pathToFile));
  const writeStream = createWriteStream(
    resolve(currdir, pathToDestination, `${basename(pathToFile)}.br`)
  );
  const brotliCompress = createBrotliCompress();

  await pipeline(readStream, brotliCompress, writeStream);
};
export default compress;
