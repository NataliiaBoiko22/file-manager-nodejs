import { readdir } from "fs/promises";
import { getCurrentPathMess } from "./utils/messages.js";
async function ls(path) {
  const list = [];

  const files = await readdir(path, { withFileTypes: true });

  files.forEach((file, index) => {
    let fileData = {
      index: index,
      name: file.name.slice(0, 50),
      type: file.isDirectory() ? "directory" : "file",
    };
    list.push(fileData);
  });

  console.table(list, ["index", "name", "type"]);
  getCurrentPathMess();
  return list;
}

export default ls;
