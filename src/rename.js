import { dirname, resolve } from "path";
import { rename } from "fs/promises";
const rn = async (curFileName, currdir, updateFileName) => {
  const filePath = resolve(currdir, curFileName);
  await rename(filePath, resolve(dirname(filePath), updateFileName)).catch(
    (err) => {
      console.log("Operation failed");
    }
  );
};

export default rn;
