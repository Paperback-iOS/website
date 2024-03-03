# Adding Content

Paperback itself comes without any content. The user needs to add this themselves. While it sounds like a hurdle this can be quite straight forward and be done in less than 10 minutes if you know what to do.

There are the two methods to add content to the app:

1. [Komga:](#komga) A comic and manga self hosting utility, similar to Plex.
2. [Third party extensions:](#third-party-extensions) Self hosting is not necessary with Paperback, other third party extensions are supported as well.

## Komga

Komga is a media server for your comics, manga, BDs, magazine and eBooks. It allows you to organize and manage your CBZ, CBR, PDF and EPUB files in different libraries, collections or reading lists (EPUBs are currently not supported by Paperback).

::: warning Komga Requires a Computer
Using Komga with Paperback requires you to have a computer on and running Komga at all times that you want to use Paperback. You also need to get digital versions of your comics or manga available on that computer.
:::

### Komga setup

An extensive guide on how to setup your own Komga instance can be found on their official website [here](https://komga.org/docs/category/installation).

### Connecting Komga to Paperback

Adding your Komga instance to your Paperback app is straight forward. below you can find the steps on how to accomplish this.

#### 1. Add the official repository

The official repository comes pre-installed on a clean Paperback installation, so most people can skip this step. However, here is a guide on how to add it back to your app if you did end up removing it.

:::: tabs
== Automatically

1.  Click/Press on [this link](https://paperback-ios.github.io/extensions-default/main/).
2.  On the website, select "**Add to Paperback**".
3.  Accept the 'Open in "Paperback"?' pop-up.
4.  In Paperback, select "**Add as Source Repo**".

== Manually

1. Open the app and go to **Settings** > **Extensions**.
2. Select **Edit** > **+**.
3. The "Repository Name" can be whatever you want, it is optional.
4. As "Repository Base URL" you will want to put this url: [https://paperback-ios.github.io/extensions-default/main/](https://paperback-ios.github.io/extensions-default/main/).
5. Read and accept the conditions.
6. Select Add to Paperback.

::::

#### 2. Install the Paperback extension

The official repository contains the "Paperback" extension, here is how to install it:

1. Go to **Settings** > **Extensions** > **Official Repo** (Or whatever other name you gave it during manual installation).
2. Select "**GET**". It should change to "**RELOAD**" if it has successfully installed.

#### 3. Configure the Extension

1. Go to back to your Extensions list and select the "**Paperback**" extension, then go to "**Server Settings**".
2. Fill in your server URL, Komga email and password.
    > It is recommended that you double check your server URL and authentication by using Safari first.
3. Check if Paperback can connect by going one page back and going to "**Try Settings**" (under "**Server Settings**"), if this is successful then you're good to go!

## Third Party Extensions

Third Party extensions are extensions for Paperback not made by the official developers. This means that we do not maintain them nor give support for them. Neither do we allow mentioning them in the official Discord server or GitHub page.

::: danger Warning
Requests for support related to third party extensions in the official Discord server or GitHub page will get declined at all times.
:::

### Adding Repositories

Adding extensions is necessary to add content to your app, there are 2 methods to do this:

:::: tabs
== Automatically

1.  Click/Press on the provided link.
2.  On the website, select "**Add to Paperback**".
3.  Accept the 'Open in "Paperback"?' pop-up.
4.  In Paperback, select "**Add as Source Repo**".

== Manually

1. Open the app and go to **Settings** > **Extensions**.
2. Select **Edit** > **+**.
3. The "Repository Name" can be whatever you want, it is optional.
4. As "Repository Base URL" you will want to put the url provided by the repository developer.
5. Read and accept the conditions.
6. Select Add to Paperback.

::::

### Adding extensions

Repositories contain extensions, here is how to install them:

1. Go to **Settings** > **Extensions** > **Your repository**.
2. Select "**GET**". It should change to "**RELOAD**" if it has successfully installed.

### Configuring extensions

Some extensions might need extra configuration, here is how to do this:

1. Go to back to your Extensions list and select your extension.
2. Check if your extension has a settings section.
