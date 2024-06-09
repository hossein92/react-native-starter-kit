import fs from "fs-extra";
import chalk from "chalk";
import path from "path";
import { generateStackTemplate } from "./generateStackTemplate.mjs";

// Function to create stack file
export const createStackFile = async (projectRoot, stackName, folderPath) => {
  const stackTemplate = generateStackTemplate(stackName);
  const stackFilePath = path.join(projectRoot, folderPath, `${stackName}.tsx`);
  await fs.outputFile(stackFilePath, stackTemplate);
  console.log(chalk.green(`Stack file created at: ${stackFilePath}`));
};
