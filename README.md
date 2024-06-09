## Documentation

### Overview

The React Native CLI Tool is a command-line interface (CLI) utility designed to streamline the process of setting up and managing React Native projects. It provides commands for project initialization, library installation, folder structure setup, and more.

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/hossein92/react-native-starter-kit.git
   cd react-native-starter-kit
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Link the CLI tool globally:**
   ```sh
   npm link
   ```

### Usage

Once linked, you can use the CLI tool with the `rn-cli` command.

### Commands

#### `init <project-name>`

Creates a new React Native project.

**Options:**

- `-v <version>`: Specify a custom version of React Native.

**Example:**

```sh
rn-cli init MyProject
# or with a specific React Native version
rn-cli init MyProject -v 0.64.0
```

#### `install-libs`

Installs libraries listed in `libraries.json`.

**Example:**

```sh
rn-cli install-libs
```

#### `update-lib`

Updates the version of a library in `libraries.json` by selecting it from a list.

**Example:**

```sh
rn-cli update-lib
```

#### `update-libs-from-file <file-path>`

Updates library versions from a custom JSON file.

**Example:**

```sh
rn-cli update-libs-from-file path/to/custom-libraries.json
```

#### `init-structure`

Creates the initial folder structure for the project.

**Example:**

```sh
rn-cli init-structure
```

#### `absolute-paths`

Copies `babel.config.js` to the project root to enable absolute paths.

**Example:**

```sh
rn-cli absolute-paths
```

#### `setup-app`

Sets up the project with essential configurations and files, including Redux store, navigation, and theming files.

**Example:**

```sh
rn-cli setup-app
```

#### `create-stack`

Creates a new navigation stack.

**Example:**

```sh
rn-cli create-stack
```

#### `create-screen`

Creates a new screen with the necessary configuration.

**Example:**

```sh
rn-cli create-screen
```

### Development and Contribution

If you want to develop or contribute to this project:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/hossein92/react-native-starter-kit.git
   cd react-native-starter-kit
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Link the CLI tool locally:**

   ```sh
   npm link
   ```

4. **Restart the CLI tool after making changes:**
   ```sh
   npm run restart
   ```

### File Structure

The CLI tool operates on the following file structure within the project:

```
project-root/
├── src/
    ├── assets/
    ├── components/
    ├── navigation/
    ├── screens/
    ├── store/
    ├── types/
    └── utils/
        ├── hooks/
        ├── common/
        ├── responsive/
        ├── theme/
        ├── languages/
        ├── services/
        └── navigationRef/

```

### License

This project is licensed under the MIT License.

### Author

Hossein Yousefi

---

This documentation provides a detailed guide on using and contributing to the CLI tool, including installation steps, command descriptions, and file structure.
