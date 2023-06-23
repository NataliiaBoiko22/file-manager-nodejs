import { arch, cpus, EOL, homedir, userInfo } from "os";

const oS = function (command) {
  switch (true) {
    case command === "--EOL":
      console.log(JSON.stringify(EOL));
      break;
    case command === "--cpus":
      const cpusArray = cpus();
      let cpusList = cpusArray.map((cpu) => {
        cpu.clock_rate = `${cpu.speed / 1000}00 GHz`;
        cpu.model = cpu.model.trim();
        return cpu;
      });
      console.table(cpusList, ["model", "clock_rate"]);
      break;
    case command === "--homedir":
      console.log(homedir() + "\n");
      break;
    case command === "--username":
      const userData = JSON.stringify(userInfo());
      console.log(JSON.parse(userData).username + "\n");
      break;
    case command === "--architecture":
      console.log(arch() + "\n");
      break;
    default:
      console.log("Operation Failed");
      break;
  }
};

export default oS;
