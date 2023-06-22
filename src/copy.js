import fs from "fs";
import path from "path";

const cp = async (pathToSourceFile, pathToNewDir, currdir) => {
  if (pathToSourceFile === "") {
    console.log("Invalid input");
  }
  try {
    const nameOfSourceFile = path.parse(pathToSourceFile).base;
    const absPathToSourceFile = path.resolve(currdir, pathToSourceFile);
    const absPathToDestinationFile = path.resolve(
      currdir,
      pathToNewDir,
      nameOfSourceFile
    );
    const readStream = fs.createReadStream(absPathToSourceFile);
    const writableStream = fs.createWriteStream(absPathToDestinationFile);

    readStream.pipe(writableStream);
  } catch {
    console.log("Operation Failed");
  }
};
export default cp;
