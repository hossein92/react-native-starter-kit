import fs from "fs-extra";
import path from "path";
import {
  capitalizeFirstLetter,
  createDirectory,
  generateModelTemplate,
  generateViewModelTemplate,
  generateViewTemplate,
} from "./index.mjs";
import chalk from "chalk";
// Function to create screen files
export const createScreenFiles = async (
  projectRoot,
  screenName,
  folderPath,
  paramListName,
  paramListPath
) => {
  const newScreenName = capitalizeFirstLetter(screenName);
  const screenDir = path.join(projectRoot, folderPath, newScreenName);
  await createDirectory(screenDir);

  const modelFilePath = path.join(screenDir, "models.ts");
  const viewModelFilePath = path.join(screenDir, "view.model.ts");
  const viewFilePath = path.join(screenDir, "View.tsx");

  await fs.outputFile(modelFilePath, generateModelTemplate(screenName));
  await fs.outputFile(viewModelFilePath, generateViewModelTemplate(screenName));
  await fs.outputFile(
    viewFilePath,
    generateViewTemplate(screenName, paramListName, paramListPath)
  );

  console.log(chalk.green(`Screen files created at: ${screenDir}`));
};
