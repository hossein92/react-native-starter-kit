import inquirer from "inquirer";
// select package Manager function
export async function selectPackageManager() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "packageManager",
      message: "Select your package manager:",
      choices: ["npm", "yarn"],
      default: "npm",
    },
  ]);
  return answers.packageManager;
}
