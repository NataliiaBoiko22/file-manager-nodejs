const fileManager = async () => {
  const username = process.argv
    .slice(2)
    .filter((s) => s.includes("--username"))[0]
    .split("=")[1];
  console.log(`Welcome to the File Manager, ${username}!`);
};

fileManager();
