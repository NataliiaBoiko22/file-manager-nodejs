import path from "path";
import {
  getCurrentPathMess,
} from "./utils/messages.js";
const up = (homedir, currdir) => {
  const parentDir = path.resolve(currdir, "..");
  if (parentDir === currdir) {
    getCurrentPathMess();

    return currdir;
  } else {
    process.chdir(parentDir);

    getCurrentPathMess();
    return parentDir;
  }
};
export default up;
