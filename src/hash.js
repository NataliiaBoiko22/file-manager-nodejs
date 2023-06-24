import crypto from "crypto";
import { readFile } from "fs";
const hash = async (path) => {
  readFile(path, (err, file) => {
    if (err) {
      console.log("Operation failed");
    } else {
      console.log(crypto.createHash("sha256").update(file).digest("hex"));
    }
  });
};
export default hash;
