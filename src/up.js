
import path from "path";
function up(homedir, currdir) {
  const parentDir = path.resolve(currdir, "..");
  return parentDir === currdir ? currdir : parentDir;
}
export default up;
