import fs from "fs-extra";
import chalk from "chalk";

// Function to create directory if it doesn't exist
export const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(chalk.green(`Created directory: ${dirPath}`));
  } else {
    console.log(chalk.yellow(`Directory already exists: ${dirPath}`));
  }
};
