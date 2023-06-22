import { resolve } from "path";
import fs from "fs/promises";
const add = async (currdir, newFileName) => {
  const filePath = resolve(currdir, newFileName);
  await fs.writeFile(filePath, "").catch((err) => {
    console.log("Operation failed");
  });
};

export default add;
