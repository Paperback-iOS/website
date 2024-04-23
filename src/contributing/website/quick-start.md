# Website Development Quick Start

We recommend you start with reading the [contribution guidelines](https://github.com/Paperback-iOS/website/blob/master/.github/CONTRIBUTING.md) on GitHub.

## Through GitHub

You can simply use the "**Edit this page**" button at the bottom of every page and use GitHub to edit these pages and propose the changes. Here is a step by step guide on how to do this:

1. Press the "**Edit this page**" button at the bottom of the page you want to edit.
2. Press the edit icon (pencil) at the top left of the editor.
3. Press the green "**Fork this repository**" button.
4. Make your changes.
5. Commit your changes using the green "**Commit**" button.
6. Press the green "**Create Pull Request**" button, give it a descriptive title and detailed description and press the green "**Create Pull Request**" button again.
7. Wait for a response and check the reviews by the website maintainers.

## Through your own IDE

### Editing

It is also possible to edit these pages from your own IDE. This can be achieved using the following steps:

1. Fork the repository through GitHub (you will need to be logged in). This can be done from the [repository page](https://github.com/Paperback-iOS/website), using the "**Fork**" button on the top right.
2. Clone your remote fork of this repository:

```bash
git clone your-fork.url
```

3. Change directory to the root of the project:

```bash
cd your-fork-name
```

4. Install the dependencies:

```bash
npm i
```

Now you're all set up and can start making changes.

### Proposing Changes

1. Track and commit your changes:

```bash
git add --all # Or specify specific files and commit in segments
git commit -m "Your changes"
```

2. Push your changes to your remote fork

```bash
git push origin master
```

3. Go to [https://github.com/Paperback-iOS/website/pulls](https://github.com/Paperback-iOS/website/pulls) and open a new pull request using the green "**New pull request**" button. Give it a descriptive title and detailed description.
4. Wait for a response and check the reviews by the website maintainers.
