---
title: Source development quickstart
lang: en-US
---

# Source development quickstart

## Preparing the development environment

1. Create your own fork of one of our repositories, like [Extensions Promises](https://github.com/Paperback-iOS/extensions-promises).

1. Create a new branch before working on your new fork. The method of branching depends on the Git CLI/GUI that you use, reference your software manual, or contact us if you need help with this step.

1. Clone the fork you've just created on your computer.

1. Install dependencies by running
   ```bash
   npm install
   ```

You are ready to start developing a source. When you think the source should be available for users, submit a pull request to one of our repository.

:::: guide Repositories
Please note each of our repositories has its own specificity.

Check our [repositories list]() to figure where your source should be, all repositories are available on GitHub.

::: aside
If you need help figuring to which repository you should submit your new pull request, don't hesitate to contact us.
:::
::::

---

## Try and bundle a repository

**Running tests**

On Visual Studio Code, open the source test file, go to **Run and Debug** then press **Mocha Current File**

**Testing the repository in Paperback application**

Start a webserver by running the following command in your repository folder. You will be able to add it to Paperback application. 
```bash
paperback serve
```

**Bundle the repository**

Run in your repository folder:
```bash
paperback bundle
```

<style>
.custom-block.aside
{
    text-align: left;
}
</style>