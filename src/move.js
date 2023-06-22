import fs from "fs/promises";
import cp from "./copy.js";
import rm from "./remove.js";
const mv = async (pathToSourceFile, pathToNewDir, currdir) => {
  await cp(pathToSourceFile, pathToNewDir, currdir).then(
    rm(pathToSourceFile, currdir)
  );
};
export default mv;
