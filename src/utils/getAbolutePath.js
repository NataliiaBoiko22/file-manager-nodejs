import path from "path";

const getAbsolutePath = (pathToFile, currdir) => {
  let absolutePath;
  if (!path.isAbsolute(pathToFile)) {
    if (pathToFile.includes("./") || pathToFile.includes("../")) {
      absolutePath = path.resolve(currdir, pathToFile);
    } else {
      absolutePath = path.join(currdir, pathToFile);
    }
  } else {
    absolutePath = pathToFile;
  }

  return absolutePath;
};
export default getAbsolutePath;
