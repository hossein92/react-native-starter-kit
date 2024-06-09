#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";
import {
  selectPackageManager,
  copyFile,
  copyFolder,
  createDirectory,
  createStackFile,
  createScreenFiles,
  outputHelp,
} from "./functions/index.mjs";

const program = new Command();

program.version("1.0.0").description("React Native CLI Tool");

let packageManager = "npm"; // default to npm
// help
program
  .command("help")
  .description("Display help information")
  .action(() => {
    outputHelp();
  });

// initial project
program
  .command("init <project-name>")
  .description("Create a new React Native project")
  .option("-v <version>", "Specify a custom version of React Native")
  .action(async (projectName, cmdObj) => {
    await selectPackageManager().then((value) => {
      packageManager = value;
    });

    const projectPath = path.join(process.cwd(), projectName);
    const rnVersion = cmdObj.version ? `${cmdObj.version}` : "0.73.1";

    console.log("React native  Version", rnVersion);
    if (fs.existsSync(projectPath)) {
      console.error(
        chalk.red(`Project directory "${projectName}" already exists.`)
      );
      process.exit(1);
    }

    console.log(
      chalk.green(`Creating new React Native project: ${projectName}`)
    );

    try {
      // const initCommand = `npx @react-native-community/cli@${rnVersion} init AwesomeProject --version ${rnVersion}`;
      const initCommand = `npx react-native@${rnVersion} init ${projectName} --version ${rnVersion}`;
      execSync(initCommand, { stdio: "inherit" });
      console.log(
        chalk.green(`Project "${projectName}" created successfully.`)
      );
    } catch (error) {
      console.error(chalk.red(`Failed to create project: ${error.message}`));
    }
  });

// install pre library
program
  .command("install-libs")
  .description("Install libraries listed in libraries.json")
  .action(async () => {
    await selectPackageManager().then((value) => {
      packageManager = value;
    });
    const cliToolsDirectory = new URL(".", import.meta.url).pathname; // Get the directory where the CLI tools are located
    const librariesPath = path.join(cliToolsDirectory, "libraries.json");
    console.log(librariesPath);
    if (!fs.existsSync(librariesPath)) {
      console.error(chalk.red("libraries.json file not found."));
      process.exit(1);
    }

    const { libraries } = fs.readJsonSync(librariesPath);

    if (
      !libraries ||
      typeof libraries !== "object" ||
      Object.keys(libraries).length === 0
    ) {
      console.error(chalk.red("No libraries to install."));
      process.exit(1);
    }

    const librariesWithVersions = Object.entries(libraries)
      .map(([lib, version]) => `${lib}@${version}`)
      .join(" ");

    console.log(chalk.green("Installing libraries..."));

    try {
      const installCommand =
        packageManager === "yarn"
          ? `yarn add ${librariesWithVersions}`
          : `npm install ${librariesWithVersions}`;

      execSync(installCommand, { stdio: "inherit" });
      console.log(chalk.green("Libraries installed successfully."));
    } catch (error) {
      console.error(chalk.red(`Failed to install libraries: ${error.message}`));
    }
  });

// update single lib with select
program
  .command("update-lib")
  .description("Update library version in libraries.json")
  .action(async () => {
    const cliToolsDirectory = new URL(".", import.meta.url).pathname; // Get the directory where the CLI tools are located
    const librariesPath = path.join(cliToolsDirectory, "libraries.json");

    if (!fs.existsSync(librariesPath)) {
      console.error(chalk.red("libraries.json file not found."));
      process.exit(1);
    }

    let { libraries } = fs.readJsonSync(librariesPath);

    const libraryChoices = Object.keys(libraries).map((lib) => ({
      name: `${lib}@${libraries[lib]}`,
      value: lib,
    }));

    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "library",
        message: "Select a library to update:",
        choices: libraryChoices,
      },
      {
        type: "input",
        name: "version",
        message: "Enter the new version (e.g., 1.2.3):",
      },
    ]);

    libraries[answers.library] = "^" + answers.version;

    fs.writeJsonSync(librariesPath, { libraries }, { spaces: 2 });

    await selectPackageManager().then((value) => {
      packageManager = value;
    });
    try {
      const installCommand =
        packageManager === "yarn"
          ? `yarn upgrade ${answers.library}@${answers.version}`
          : `npm install ${answers.library}@${answers.version}`;

      execSync(installCommand, { stdio: "inherit" });
      console.log(
        chalk.green(`Updated ${answers.library} to version ${answers.version}`)
      );
    } catch (error) {
      console.error(chalk.red(`Failed to install libraries: ${error.message}`));
    }

    // console.log(
    //   chalk.green(`Updated ${answers.library} to version ${answers.version}`)
    // );
  });

// update list with JSON file
program
  .command("update-libs-from-file <file-path>")
  .description("Update libraries versions from a custom JSON file")
  .action(async (filePath) => {
    const customFilePath = path.join(process.cwd(), filePath);
    const cliToolsDirectory = new URL(".", import.meta.url).pathname; // Get the directory where the CLI tools are located
    const librariesPath = path.join(cliToolsDirectory, "libraries.json");

    if (!fs.existsSync(customFilePath)) {
      console.error(chalk.red("Custom JSON file not found."));
      process.exit(1);
    }

    if (!fs.existsSync(librariesPath)) {
      console.error(chalk.red("libraries.json file not found."));
      process.exit(1);
    }

    const customLibraries = fs.readJsonSync(customFilePath).libraries;
    let { libraries } = fs.readJsonSync(librariesPath);

    libraries = { ...libraries, ...customLibraries };

    fs.writeJsonSync(librariesPath, { libraries }, { spaces: 2 });
    const librariesWithVersions = Object.entries(libraries)
      .map(([lib, version]) => `${lib}@${version}`)
      .join(" ");

    await selectPackageManager().then((value) => {
      packageManager = value;
    });
    try {
      const installCommand =
        packageManager === "yarn"
          ? `yarn add ${librariesWithVersions}`
          : `npm install ${librariesWithVersions}`;

      execSync(installCommand, { stdio: "inherit" });
      console.log(
        chalk.green("Updated libraries from custom file successfully.")
      );
    } catch (error) {
      console.error(chalk.red(`Failed to install libraries: ${error.message}`));
    }
  });

// Define the command to create the folder structure
program
  .command("init-structure")
  .description("Create the initial folder structure for the project")
  .action(() => {
    const projectRoot = process.cwd();
    // const srcPath = path.join(projectRoot, "src");

    const directories = [
      "src/assets",
      "src/screens",
      "src/navigation",
      "src/components",
      "src/types",
      "src/store",
      "src/utils",
      "src/utils/hooks",
      "src/utils/common",
      "src/utils/languages",
      "src/utils/services",
      "src/utils/navigationRef",
    ];

    directories.forEach((dir) => {
      createDirectory(path.join(projectRoot, dir));
    });

    console.log(chalk.green("Folder structure created successfully."));
  });

// Define the command to copy babel.config.js for Absolute Paths
program
  .command("absolute-paths")
  .description("Copy babel.config.js to the project root")
  .action(() => {
    const projectRoot = process.cwd();
    const cliToolsDirectory = new URL(".", import.meta.url).pathname;
    // copy babel config file
    const srcFile = path.join(cliToolsDirectory, "src/utils/babel.config.js");
    const destFile = path.join(projectRoot, "babel.config.js");
    copyFile(srcFile, destFile);
    // copy tsconfig file
    const tsSrcFile = path.join(cliToolsDirectory, "src/utils/tsconfig.json");
    const tsDestFile = path.join(projectRoot, "tsconfig.json");
    copyFile(tsSrcFile, tsDestFile);
  });

// Define the command to setup App
program
  .command("setup-app")
  .description("Setup project ")
  .action(async () => {
    await selectPackageManager().then((value) => {
      packageManager = value;
    });
    try {
      const installCommand =
        packageManager === "yarn"
          ? `yarn add -D babel-plugin-module-resolver`
          : `npm install -D babel-plugin-module-resolver `;

      execSync(installCommand, { stdio: "inherit" });
      console.log(chalk.green("Libraries installed successfully."));
    } catch (error) {
      console.error(chalk.red(`Failed to install libraries: ${error.message}`));
    }
    // babel-plugin-module-resolver
    const projectRoot = process.cwd();
    const cliToolsDirectory = new URL(".", import.meta.url).pathname;
    // copy store initial config file
    const storeSrcFile = path.join(
      cliToolsDirectory,
      "src/components/redux/index.ts"
    );
    const storeDestFile = path.join(projectRoot, "src/store/index.ts");
    copyFile(storeSrcFile, storeDestFile);
    // copy settings store initial config file
    const settingsSrcFile = path.join(
      cliToolsDirectory,
      "src/components/redux/settings.ts"
    );
    const settingsDestFile = path.join(projectRoot, "src/store/settings.ts");

    copyFile(settingsSrcFile, settingsDestFile);
    // copy StoreHook file
    const storeHookSrcFile = path.join(
      cliToolsDirectory,
      "src/components/redux/StoreHook.ts"
    );
    const storeHookDestFile = path.join(
      projectRoot,
      "src/utils/hooks/StoreHook.ts"
    );
    copyFile(storeHookSrcFile, storeHookDestFile);
    //copy root navigation file
    const rootNavigationSrcFile = path.join(
      cliToolsDirectory,
      "src/components/redux/RootNavigation.js"
    );
    const rootNavigationDestFile = path.join(
      projectRoot,
      "src/utils/navigationRef/RootNavigation.js"
    );
    copyFile(rootNavigationSrcFile, rootNavigationDestFile);

    //copy responsive file
    const responsiveSrcFile = path.join(
      cliToolsDirectory,
      "src/utils/responsive"
    );
    const responsiveDestFile = path.join(projectRoot, "src/utils/responsive");
    copyFolder(responsiveSrcFile, responsiveDestFile);
    //copy theme file
    const themeSrcFile = path.join(cliToolsDirectory, "src/utils/theme");
    const themeDestFile = path.join(projectRoot, "src/utils/theme");
    copyFolder(themeSrcFile, themeDestFile);

    // copy app file
    const appSrcFile = path.join(
      cliToolsDirectory,
      "src/components/redux/App.tsx"
    );
    const appDestFile = path.join(projectRoot, "App.tsx");
    copyFile(appSrcFile, appDestFile);

    // copy app navigation file
    const appNavigationSrcFile = path.join(
      cliToolsDirectory,
      "src/components/redux/AppNavigation.tsx"
    );
    const appNavigationDestFile = path.join(
      projectRoot,
      "src/navigation/AppNavigation.tsx"
    );
    copyFile(appNavigationSrcFile, appNavigationDestFile);

    // copy default stack file
    const stackSrcFile = path.join(
      cliToolsDirectory,
      "src/components/stack/AuthStack.tsx"
    );
    const stackDestFile = path.join(
      projectRoot,
      "src/navigation/AuthStack.tsx"
    );
    copyFile(stackSrcFile, stackDestFile);

    // copy default screen fils
    const splashSrcFile = path.join(
      cliToolsDirectory,
      "src/components/screen/splash"
    );
    const splashDestFile = path.join(projectRoot, "src/screens/splash");
    copyFolder(splashSrcFile, splashDestFile);
  });

// Define the command to create a stack
program
  .command("create-stack")
  .description("Create a new navigation stack")
  .action(async () => {
    const projectRoot = process.cwd();
    const defaultFolderPath = "src/navigation";
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "stackName",
        message: "Enter the name of the stack:",
        validate: (input) =>
          input.trim() !== "" || "Stack name cannot be empty",
      },
      {
        type: "input",
        name: "folderPath",
        message:
          "Enter the folder path from the project root where the stack file should be created (default: src/navigation):",
        // validate: (input) =>
        //   input.trim() !== "" || "Folder path cannot be empty",
        default: defaultFolderPath,
      },
    ]);

    const { stackName, folderPath } = answers;

    await createStackFile(projectRoot, stackName, folderPath);
  });

// Define the command to create a screen
program
  .command("create-screen")
  .description("Create a new screen")
  .action(async () => {
    const projectRoot = process.cwd();

    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "screenName",
        message: "Enter the name of the screen:",
        validate: (input) =>
          input.trim() !== "" || "Screen name cannot be empty",
      },
      {
        type: "input",
        name: "folderPath",
        message:
          "Enter the folder path from the project root where the screen files should be created (default: src/screens/[SCREEN_NAME]):",
        filter: (input) => input.trim(),
      },
      {
        type: "input",
        name: "paramListName",
        message: "Enter the ParamList name:",
        validate: (input) =>
          input.trim() !== "" || "ParamList name cannot be empty",
      },
      {
        type: "input",
        name: "paramListPath",
        message:
          "Enter the import path for the ParamList(example: @/navigation/AuthStack):",
        validate: (input) =>
          input.trim() !== "" || "ParamList path cannot be empty",
      },
    ]);

    const { screenName, folderPath, paramListName, paramListPath } = answers;
    const defaultFolderPath = path.join("src/screens");

    await createScreenFiles(
      projectRoot,
      screenName,
      folderPath || defaultFolderPath,
      paramListName,
      paramListPath
    );
  });

// Parse and execute the commands
program.parse(process.argv);
