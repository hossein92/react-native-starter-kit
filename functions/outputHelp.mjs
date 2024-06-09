import chalk from "chalk";
// Helper function to output the command descriptions
export function outputHelp() {
  console.log(`
${chalk.bold("Commands:")}
  ${chalk.green("init <project-name>")} ${chalk.dim(
    "Create a new React Native project"
  )}
    -v <version> ${chalk.dim("Specify a custom version of React Native")}
  
  ${chalk.green("install-libs")} ${chalk.dim(
    "Install libraries listed in libraries.json"
  )}
  
  ${chalk.green("update-lib")} ${chalk.dim(
    "Update a library version in libraries.json"
  )}
  
  ${chalk.green("update-libs-from-file <file-path>")} ${chalk.dim(
    "Update libraries versions from a custom JSON file"
  )}
  
  ${chalk.green("init-structure")} ${chalk.dim(
    "Create the initial folder structure for the project"
  )}
  
  ${chalk.green("absolute-paths")} ${chalk.dim(
    "Copy babel.config.js to the project root"
  )}
  
  ${chalk.green("setup-app")} ${chalk.dim(
    "Setup the project with essential configurations and files"
  )}
  
  ${chalk.green("create-stack")} ${chalk.dim("Create a new navigation stack")}
  
  ${chalk.green("create-screen")} ${chalk.dim("Create a new screen")}
  
${chalk.bold("Options:")}
  -h, --help  ${chalk.dim("display help for command")}
`);
}
