import { resolve } from "path";
import fs from "fs/promises";
const add = async (currdir, newFileName) => {
  if (newFileName === "") {
    console.log("Invalid input");
  }
  try {
    const filePath = resolve(currdir, newFileName);
    await fs.writeFile(filePath, "");
    console.log(`file ${newFileName} added`);
  } catch {
    console.log("Operation failed");
  }
};

export default add;
