import fs from "fs/promises";
import path from "path";
const rm = async (pathToSourceFile, currdir) => {
  if (pathToSourceFile === "") {
    console.log("Invalid input");
  }

  const absPathToSourceFile = path.resolve(currdir, pathToSourceFile);

  try {
    await fs.rm(absPathToSourceFile);
    return true;
  } catch {
    console.log("Operation failed");
    return false;
  }
};
export default rm;
