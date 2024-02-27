# Extension Development Quick-Start

## Preparing the development environment

1. Create your own fork of one of our repositories, like [Extensions](https://github.com/Paperback-iOS/extensions).

2. Create a new branch before working on your new fork. The method of branching depends on the Git CLI/GUI that you use, reference your software manual, or contact us if you need help with this step.

3. Clone the fork you've just created on your computer.

4. Install dependencies by running
    ```bash
    npm install
    ```

Now, you are ready to start developing an extension.

## Try and bundle a repository

**Running tests**

On Visual Studio Code, open the extension test file, go to **Run and Debug** then press **Mocha Current File**

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
