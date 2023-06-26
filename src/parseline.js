export const resolvePath = (str) => {
  const parts = str
    .split(/ +(?=(?:(?:[^"]*"){2})*[^"]*$)/)
    .map((part) => part.replace(/["']/g, ""));
//   console.log(parts);
  return parts;
};

export default resolvePath;
