# Contributing to the Paperback website <!-- omit in toc -->

First off, thanks for taking the time to contribute!

Before contributing, please make sure to take a moment and read through the following guidelines:

- [Code of Conduct](CODE_OF_CONDUCT.md)

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved. The community looks forward to your contributions.

## Table of Contents <!-- omit in toc -->

- [Your First Code Contribution](#your-first-code-contribution)
  - [Development Setup](#development-setup)
  - [Project Structure](#project-structure)
  - [To Do](#to-do)
  - [Improving The Documentation](#improving-the-documentation)
- [Styleguides](#styleguides)
  - [Commit Messages](#commit-messages)
  - [Pull Requests](#pull-requests)

## Your First Code Contribution

Generally you can fork this directory, commit your changes to that and afterwards you can make a pull request.

For major changes, please open an issue first to discuss what you would like to change. Check the [support disclaimer](SUPPORT_DISCLAIMER.md) for more info regarding issues.

### Development Setup

You will need [Node.js](http://nodejs.org) **version 18+**.

After cloning the repo and entering the the directory, run:

```bash
# Installs any dependencies needed.
$ npm install
```

To run a development server for the website now, run:

```bash
# This command start a local server you can access and edit live.
$ npm dev
```

To test and build the website, run:

```bash
# This command tests and builds the website
$ npm build
```

> Fix any issues that pop up and then run this command again.

To preview the previously build website, run

```bash
# This command starts a local server you can access and use view the build.
$ npm preview
```

**Note:** There are git hooks in place to run the build tests on commits as well. Pull requests with failing tests will not be merged.

### Project Structure

- **`src`**: Contains all the files used for the website.

  - **`.vitepress`**:

    - **`components`**: Contains Vue components.
    - **`config`**: Contains extra config files used in the main configuration file.
    - **[`dist`](https://vitepress.dev/guide/deploy)**: Contains built files for distribution.
      > **Note:** Changes to this folder will not carry over with Git.
    - **`theme`**: Contains custom theme files.
    - `config.ts`: Main configuration file for VitePress.

  - **`public`**: Files to be exposed publicly without any processing.

- `package.json`: Contains information about which plugins are installed in the project.

### To Do

A list of to do items for the website:

- Update to version +9.0 of ESLint and switch to a flat config.
- Update and add the following contributing guides:
  - Extension Contributing
  - Website Contributing
- Add the following tools to the website:
  - Backup Converter
  - Themes Creator

### Improving The Documentation

Updates, improvements and corrections to the documentation are always welcome.

## Styleguides

### Commit Messages

Ensure that your commit messages are both clear and descriptive.

### Pull Requests

Each pull request should provide a detailed description of the changes it introduces. Simply using the commit message as the title might not suffice. Additionally, it's crucial to include links to any other relevant issues or pull requests.
