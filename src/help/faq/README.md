---
title: Frequently Asked Questions
lang: en-US
sidebarDepth: 2
---

# Frequently Asked Questions
If you have questions about the app and our plans or need help with installing the app, try checking our guides and faq entries. If you haven't found what you needed, feel free to join the Discord and ask.

# General Information

### Why are you making this app?
There are no decent manga apps on **iOS** and **iPadOS** that have *non-intrusive* advertisements support for third-party plugins.

### What type of business model will you take on?
There are no plans to adopt a formal business model. As long as Patreon covers the costs of an Apple Developer Account, profit is secondary. It would be nice to get support for development of the app, but there will be no fee to use Paperback.

### Where can I find this app?
Currently an early version of the app is available. Check [Paperback Installation Guide](/help/guides/getting-started) to download a copy.

If you are a patreon, you will receive an email to your patreon address regarding information about accessing Paperback beta through TestFlight. The beta version of the application contains many additional beta features which can be used before it becomes available on the public one.

 * [Paperback Installation Guide](/help/guides/getting-started)

### Will this app be available on Android?
Paperback is designed for iOS and iPadOS. On Android, you can use [Tachiyomi](https://tachiyomi.org/)

### Disclaimer
:::: warning Paperback is not hosting any copyrighted content.
We are not affiliated with or responsible for any source.

Source are community made. 

**We are not responsible if it is / has;**  
slow, down, missing chapters, bad image quality, another language or another manga.
::::

# Troubleshooting

## Application

### The app crashes on launch
Ensure that you are on iOS 13.4+ or iPadOS 13.4+.

If you are using the **Beta / Patron build**, they are usually unstable. If you are on the correct versioning for your device, and are still getting crashes, you may be encountering a known or unknown bug for your Paperback version. Contact us on our Discord `#supporter-squad` channel, and staff will try to determine what's happening with you.

### The app crashes after trying to download a manga
Downloading manga did not work on earlier version of the app. Update to the latest build to fix this issue.

### The app crash after trying to make a backup <el-tag size="mini" type="warning">Depreciated</el-tag>
<!-- Need a revision -->
<!-- This section is referenced in How can I make a backup of my library -->
Go to settings and choose "**Clear orphaned chapters**".

## Features

### How can I make a backup of my library?
You should always have a backup of your library, especially before updating the app.

:::: guide Creating a backup
 * Go to Settings > Backups
 * Press "**Create a backup**" and choose where you want to save the backup (We recommend you save them to your Notes app)

**Restoring a backup**
 * Go to your previously saved backup and press the share icon
 * Select "**Copy to Paperback**" action
 * You can then press "**Restore**" to restore your backup

::: aside
A video guide is also available [on YouTube](https://www.youtube.com/watch?v=5EPN9FORQ1g)
:::
::::

> If the app crashed when you made the backup, see [this faq section](#the-app-crash-when-i-try-to-make-a-backup-depreciated).

### How can I download manga to my device for offline viewing?
:::: guide Download chapters
 * On your manga page scroll down until you see "All Chapters"
 * Press "**View**" then "**Edit**"
 * Select what you want to download
 * Press "**Manage**" then "**Queue Download**"

::: aside
See our <PictureDialog title="Download manga" button="GIF" src="/assets/DownloadManga.gif"/>
:::
::::

Repeat the same steps to remove downloaded chapters.

## Library

### Thumbnail does not appear
In the library, long press the thumbnail then select **Refresh thumbnail**.

### Manga are not showing up in my library after I follow them
You need to [adjust your content settings](#adjust-content-settings) for hentai titles to be shown in the library.

### Sorting by Latest Updates doesn't work <el-tag size="mini" type="warning">Depreciated</el-tag>
This works but it doesn't respect user's selected language. Try to use **Update Count** sorting instead.

## Content settings

### Adjust content settings
In order to adjust your content settings, including allowing more mature content to display in Paperback, you need to have a Paperback account.

1. Visit [Paperback Portal](https://portal.paperback.moe/welcome)
1. Login with your Paperback Account (or create one if you don't have one)
1. Change the content setting to your liking
1. Logout of the app if you were logged in
1. Login again in the app

> **Notes**: 
> If you set your content settings to "Adult" on the portal, you can restrict what content appears in the app by going into Settings > General Settings > Content Filtering.

> **A Common Problem**: 
> I've updated my settings on the portal, why has it not changed in my app?  
> Simply restart the app by removing it from your app switcher.

### I see `_ sources filtered` when trying to add a source
You will need to [adjust your Paperback account content settings](#adjust-content-settings).

### Where did my language filter go?
It's now handled by sources!

Go to **Settings** > **External Sources**, then select a source to access its settings.

> **Notes**:
>
> Sources need to be updated to support this new feature, it may thus still be unavailable for some of your sources. \
>  Make sure you always use the latest version of a source.

> **Oh but I still see other languages!**
> 
> Fear not, that means you already fetched the chapters. Long press the manga thumbnail in library and **Refresh Stored Chapters**.

## Extensions

### How can I add other manga sources? <el-tag size="mini" type="warning">Not up to date</el-tag>
Other manga sources are available on the latest public and patreon versions of the application.
Read [Adding an External Repository](/help/guides/adding-repos/) guide to learn how to install other sources.

### Request a source
<!-- Need a revision -->
Do you like a particular website which is currently not supported by Paperback? You can submit a source request for it. 

> Please make sure the source does not exist nor was already requested before submitting a new issue.

Extensions repositories:

 * [Extensions Foreign](https://github.com/Paperback-iOS/extensions-foreign/issues) for non English websites
 * [H Extensions](https://github.com/Paperback-iOS/h-extensions/issues) for +18 specific websites
 * [Extensions Promises](https://github.com/Paperback-iOS/extensions-promises/issues) for other websites

> **Contribute**
> 
> Would you like to make this extension a reality? You can contribute to its development! Check our [source development](/help/contribution/extension-development/) guide to get started. If you need help or have any questions, feel free to use our Discord server `#extensions-dev` channel.

### How do notifications work?
The app will periodically check for updates in the background when iOS or iPadOS allocates time for it, this should be improved as you use the app and iOS learns to prioritize the app's background jobs over others. You can expedite the process by hitting refresh *once* to check for updates. This does not guarantee that notifications will work immediately after. 

Sources supporting notifications have a <el-tag type="success" size="mini" effect="dark"> Notifications </el-tag> badge in the app. <!-- and the [repositories list](/help/guides/adding-repos/#known-repositories). -->

### Bypass Cloudflare protection
Go to **Settings** > **Sources**.
Select the source and press **Cloudflare bypass**

This process may need to be done each time the cookies expire, usually every three days.

Sources requiring this process have a <el-tag type="danger" size="mini" effect="dark"> Cloudflare </el-tag> badge in the app. <!-- and the [repositories list](/help/guides/adding-repos/#known-repositories).-->

### A particular source does not work
Sometimes, usually after the source made modifications to its website, a source can stop working in the app.

Troubleshooting steps:

 * Some source may require a [bypass CloudFlare](#bypass-cloudflare-protection) process
 * Make sure the issue was not reported before: known source issues are listed in our Discord `#source-updates` channel
 * Make sure you are using the latest version of both the source and the application
 * Check the source in webview: if it does not work, there is nothing Paperback can do as the app relies on the website to get contents

> Sometimes, sources are blocked by specific networks or internet providers. If you can not access the source in webview, you may want to try to use a VPN.

If the previous points did not help you to identify the issue, you can try to ask in our Discord `#source-issues` channel.

## Readers

### The is some flash between pages on horizontal reader
<!-- Need a revision -->
This is a known issue on the horizontal reader which should not happen on the vertical reader.

## Patreon

> The beta version of the application may contain additional beta features which can be used before it becomes available on the public one.

### I pledge on Patreon, when will I receive the invite
They are sent out once a day or every 24 hours roughly. Contact Paper on Discord if you waited more than a day.

## Bugs and feature requests

### How to export the app logs?
Go to Settings and press "**Export logs**".

### How to export a source logs?
Go to Settings, External Sources. Then select a source and press "**Export logs**".

### I found a bug, what should I do?
If reading this page did not allow you to solve it, you can make a bug report on the [issue tracker](https://github.com/Paperback-iOS/app/issues).

> Please make sure the bug was not already reported before opening an issue.

### Suggest new features
You can open feature requests on the [issue tracker](https://github.com/Paperback-iOS/app/issues).

> Please make sure the feature was not already requested before opening an issue.
