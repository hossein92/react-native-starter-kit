import fs from "fs-extra";
import chalk from "chalk";

/**
 * Function to copy a folder and its contents
 * @param src - The source folder path
 * @param dest - The destination folder path
 */
export const copyFolder = (src, dest) => {
  try {
    fs.copySync(src, dest);
    console.log(chalk.green(`Copied folder: ${src} to ${dest}`));
  } catch (err) {
    console.error(chalk.red(`Failed to copy folder: ${src} to ${dest}`));
    console.error(err);
  }
};
