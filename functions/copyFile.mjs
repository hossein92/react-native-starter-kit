import fs from "fs-extra";
import chalk from "chalk";

// Function to copy file
export const copyFile = (src, dest) => {
  try {
    fs.copySync(src, dest);
    console.log(chalk.green(`Copied file: ${src} to ${dest}`));
  } catch (err) {
    console.error(chalk.red(`Failed to copy file: ${src} to ${dest}`));
  }
};
