// import { basename, resolve } from "path";
// import { createBrotliDecompress } from "zlib";
// // import { pipeline } from "stream/promises";
// import { createReadStream, createWriteStream } from "fs";
// import fs from "fs/promises";
// import zlib from "zlib";
// import path from "path";
// import { pipeline } from "stream";
// const decompress = async (
//   pathToPackedFile,
//   pathToUnpackDestination,
//   currentPath
// ) => {
//   console.log(basename(pathToFile).slice(0, -3));
//   console.log(pathToDestination);
//   const readStream = createReadStream(
//     resolve(
//       path,
//       pathToFile,
//       basename(pathToFile).slice(0, pathToFile.lastIndexOf("."))
//     )
//   );
//   const writeStream = createWriteStream(resolve(path, pathToDestination));

//   const brotliDecompress = createBrotliDecompress();
//   brotliDecompress.on("data", (data) => {
//     writeStream.write(data);
//   });

//   readStream.pipe(brotliDecompress);

//   const pathToSourceFile = path.resolve(currentPath, pathToPackedFile);
//   const pathToDestinationFile = path.resolve(
//     currentPath,
//     pathToUnpackDestination
//   );

//   const fdRead = await fs.open(pathToSourceFile, "r");
//   const fdWrite = await fs.open(pathToDestinationFile, "w");

//   const readStream = fdRead.createReadStream();
//   const writeStream = fdWrite.createWriteStream();
//   const decompessBrotli = zlib.createBrotliDecompress();

//   pipeline(readStream, decompessBrotli, writeStream, (err) => {
//     if (err) {
//       console.log("errors.OPERATION_ERROR_MESSAGE");
//     }
//   });

//   console.log(
//     `file ${pathToSourceFile} unpacked into ${pathToDestinationFile}`
//   );
// };
// export default decompress;
import { basename, resolve } from "path";
import { createBrotliDecompress } from "zlib";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";

const decompress = async (pathToFile, pathToDestination, currdir) => {
  console.log(currdir);
  console.log(pathToFile);

  console.log(pathToDestination);
  console.log(resolve(currdir, pathToFile));
  console.log(
    resolve(currdir, pathToDestination, basename(pathToFile).slice(0, -3))
  );

  const readStream = createReadStream(resolve(currdir, pathToFile));
  const writeStream = createWriteStream(
    resolve(currdir, pathToDestination, basename(pathToFile).slice(0, -3))
  );
  const brotliCompress = createBrotliDecompress();

  await pipeline(readStream, brotliCompress, writeStream);
};
export default decompress;
