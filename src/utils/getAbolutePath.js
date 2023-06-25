import path from "path";

const getAbsolutePath = (newPathTo, currentdir) => {
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
export default getAbsolutePath;
