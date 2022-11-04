---
title: Frequently Asked Questions
lang: en-US
sidebarDepth: 2
---

# Frequently Asked Questions
If you have questions about the app and our plans or need help with installing the app, try checking our guides and DAQ entries. If you haven't found what you needed, feel free to join the [Discord](https://discord.gg/Ny83JV3) and ask using our thread system.

# General Information

### Where can I find this app?
Check [Paperback Installation Guide](/help/guides/getting-started).

### Disclaimer
:::: warning Paperback is not hosting any copyrighted content.
We are not affiliated with or responsible for any source.

Sources are community made.

**We are not responsible if it is / has:**
slow, down, missing chapters, bad image quality, another language or another title.
::::

# Troubleshooting

## Application

### The app crashes on launch
Ensure that you are on iOS 13.4+ or iPadOS 13.4+.

If you are using the **Beta/Patreon build**, they are usually unstable. If you are on the correct version for your device, and are still getting crashes, you may be encountering a known or unknown bug for your Paperback version. Contact us on our Discord `#support` channel, and staff will try to determine what's happening with you.

### The app crashes after trying to download a chapter
Turn off your device LTE & WiFi connection, open Paperback and remove the chapter.

### The app crashes when I open a title
Ensure you are on the latest version of Paperback.

Switch to the new reader/viewer, available to version 0.7 and above.
<br>
* Settings -> Experimental Features

### The app crashes when I search for titles
Ensure you are on the latest version of Paperback.

It is recommended to have no more than 10 sources installed. Check if you have any deprecated sources and repositories and remove them.
If you are still crashing, attempt a database repair.
* Settings -> Attempt Database Repair

## Features

### How can I download manga to my device for offline viewing?
:::: guide Download chapters
 * On your title page scroll down until you see "All Chapters"
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
You need to [adjust your content settings](/help/guides/content-settings) for Adult titles to be shown in the library.

### Sorting by Latest Updates doesn't work <el-tag size="mini" type="warning">Depreciated</el-tag>
This works but it doesn't respect user's selected language. Try to use **Update Count** sorting instead.

## Extensions

### Adding other third party sources
The app allow the user to [install community made source repositories](/help/guides/adding-repos).

### How do notifications work?
The app will periodically check for updates in the background when iOS or iPadOS allocates time for it, this should be improved as you use the app and iOS learns to prioritize the app's background jobs over others. You can expedite the process by hitting refresh *once* to check for updates. This does not guarantee that notifications will work immediately after.

Sources supporting notifications have a <el-tag type="success" size="mini" effect="dark"> Notifications </el-tag> badge in the app. <!-- and the [repositories list](/help/guides/adding-repos/#known-repositories). -->

### Bypass Cloudflare protection
Go to **Settings** > **Sources**.
Select the source and press **Cloudflare bypass**

> This process can also be done by pressing the cloud icon on the source homepage.

This process may need to be done each time the cookies expire, usually every three days.

Sources requiring this process have a <el-tag type="danger" size="mini" effect="dark"> Cloudflare </el-tag> badge in the app. <!-- and the [repositories list](/help/guides/adding-repos/#known-repositories).-->


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
