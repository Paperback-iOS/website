---
title: Frequently Asked Questions
lang: en-US
sidebarDepth: 2
---

# Frequently Asked Questions
::: tip 
If you need further assistance feel free to join the [Paperback Discord Server](https://discord.paperback.moe) and create a support post in `#support`.
:::

## General Information

### Where can I find this app?
Check [Paperback Installation Guide](/help/guides/getting-started).

### One of my extension loads really slow
Paperback does not give support for third-party extensions. Please reach out to the extension developer for assistance.

## Troubleshooting
### Application
::: tip Stay up-to-date
Ensure that you are on the latest build available to you. Paperback is still in Beta and is continuously being improved
:::

### The app crashes on launch
If you are using the **Beta/Patreon build**, they are usually unstable. If you are on the correct version for your device, and are still getting crashes, you may be encountering a known or unknown bug for your Paperback version. Contact us on our Discord `#support` channel, and staff will try to determine what's happening with you.

### The app crashes in Library and Download Manager
Run DB Repair by going to Settings

### The app crashes when I attempt database repair
Try making a backup. If the app crashes while making a backup, export your database via `Settings > Developer > Export Database` and long press the `Attempt Database Repair` button and attempt repair without making backup.


## Features
### How can I download manga to my device for offline viewing?
1. Open the title you wish to download the chapters of
1. Press the ellipses button and select `Select`
1. Select the chapters you want to download
1. Press `Manage Downloads` and select `Queue Downloads`  
_Repeat the same steps but choose `Remove Downloads` to remove downloaded chapters._


## Library
### Thumbnail does not appear
In the library, long press the thumbnail then select **Refresh Metadata**.

### Manga are not showing up in my library after I follow them
You need to [adjust your content settings](/help/guides/content-settings) for Adult titles to be shown in the library.


## Extensions
### Adding other third party sources
1. Navigate to `Settings > Extensions`
1. Press `Edit` button in the top-right corner
1. Press `+` button in the top-left corner
1. Input a name for the Repository you're about to add
1. Paste the base url for the Repository that you found/received
1. Acknowledge and accept the conditions

### How do notifications work?
Notifications are not supported in 0.8.x

### Bypass Cloudflare protection
Press the cloud button in the top-right corner of the Discover tab
This process may need to be done each time the cookies expire, usually every three days.
::: info 
Sources requiring this process have a cloud icon in the app.
:::


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
