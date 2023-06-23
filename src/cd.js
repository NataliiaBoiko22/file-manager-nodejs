import path from "path";
import fs from "fs";
export const getAbsPath = (newPathTo, currentdir) => {
  let absolutePath;
  if (!path.isAbsolute(newPathTo)) {
    if (newPathTo.includes("./") || newPathTo.includes("../")) {
      absolutePath = path.resolve(currentdir, newPathTo);
    } else {
      absolutePath = path.join(currentdir, newPathTo);
    }
  } else {
    absolutePath = newPathTo;
  }

  return absolutePath;
};
const cd = async (newPath, currdir) => {
  // process.chdir(currdir);
  let absolutePath = getAbsPath(newPath, currdir);

  absolutePath = await fs.promises
    .stat(absolutePath)
    .then(async (stat) => {
      if (stat.isDirectory()) {
        return absolutePath;
      }
    })
    .catch((err) => {
      console.log("Operation failed");
      return currdir;
    });

  return absolutePath;
};

export default cd;
