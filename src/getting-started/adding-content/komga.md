# Komga

Komga serves as a media server for comics, manga, BDs, magazines, and eBooks. It offers the capability to organize and manage CBZ, CBR, PDF, and EPUB files (Note: EPUBs are not currently supported by Paperback) across different libraries, collections, or reading lists.

Check their [official website](https://komga.org) for more info.

::: warning Komga Requires a Computer
Utilizing Komga with Paperback necessitates having a computer running Komga at all times when accessing Paperback. Additionally, digital versions of your content must be available on this computer.

If this method doesn't suit your needs, we suggest exploring the [third-party extensions](/getting-started/adding-content/third-party-extensions) option.
:::

## Komga Setup

For detailed instructions on setting up your own Komga instance, refer to the comprehensive guide provided on their website [here](https://komga.org/docs/category/installation).

## Connecting Komga to Paperback

Integrating your Komga instance with your Paperback app is straightforward. The official repository includes the "Paperback" extension, this extension allows you to connect your Komga instance with the Paperback app.

Typically, this repository and extension come pre-installed on a clean Paperback installation, enabling most users to skip step 1 and 2. However, if you did end up removing them and need to add it back, here is how:

### 1. Adding the Official Repository

There are two methods to install the official repository:

:::: tabs
== Automatically (Recommended)

1. Click or press on [this link](https://paperback-ios.github.io/extensions-default/main/).
2. On the website, select "**Add to Paperback**".
3. Accept the 'Open in "Paperback"?' pop-up.
4. In Paperback, select "**Add as Source Repo**".

== Manually

1. Open the app and navigate to **Settings** > **Extensions**.
2. Select **Edit** > **+**.
3. The "Repository Name" is optional.
4. For "Repository Base URL", use this URL: [https://paperback-ios.github.io/extensions-default/main/](https://paperback-ios.github.io/extensions-default/main/).
5. Read and accept the conditions.
6. Select Add to Paperback.

::::

### 2. Installing the Paperback Extension

Once you've added the official repository, you can install the "Paperback" extensions:

1. Go to **Settings** > **Extensions** > **Official Repo** (or the name you provided during manual installation).
2. Select "**GET**". It should change to "**RELOAD**" if the installation is successful.

### 3. Configuring the Paperback Extension

To access content from your Komga instance, you will need to configure the "Paperback" extension.

1. Go to your extensions list and select the "**Paperback**" extension, then go to "**Server Settings**".
2. Enter your server URL, Komga email, and password.
   > It's recommended to double-check your server URL and authentication using a browser first.
3. Verify connectivity by navigating back and selecting "**Try Settings**" (under "**Server Settings**"). If successful, you're ready to proceed!
