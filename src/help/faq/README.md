---
title: Frequently Asked Questions
lang: en-US
---

# Frequently Asked Questions
If you have questions about the app and our plans or need help with installing the app, try checking our guides and faq entries. If you haven't found what you needed, feel free to join the Discord and ask.

## General Information

### Why are you making this app?
There are no decent manga apps on **iOS** and **iPadOS** that have _non-intrusive_ advertisements or **MangaDex** support.

### What type of business model will you take on?
There are no plans to adopt a formal business model. As long as Patreon covers the costs of an Apple Developer Account, profit is secondary. It would be nice to get support for development of the app, but there will be no fee to use Paperback.

### Where can I find this app?
Currently an early version of the app is available through TestFlight. Check [Paperback Installation Guide](/help/guides/getting-started) to download a copy.

If you are a patreon, you will receive an email to your patreon address regarding information about accessing Paperback beta through TestFlight. The TestFlight version of the application contains many additional beta features which can be used before it becomes available on the public one.

 * [Paperback Installation Guide](/help/guides/getting-started)

## Troubleshooting
If you're having problems with the app, please check here before posting. If you're having an issue that is not listed here, please use the #support channel on Discord to ask questions.

<!-- App global issues -->

---

### App crashes on launch
Ensure that you are on iOS 13.4+ or iPadOS 13.4+.

If you are using the **Beta / Patron build**, they are usually unstable. If you are on the correct versioning for your device, and are still getting crashes, you may be encountering a known or unknown bug for your Paperback version. Contact us on our Discord #supporter-chat channel, and staff will try to determine what's happening with you.

---

### App crashes after trying to download a manga
Downloading manga did not work on earlier version of the app. Update to the latest TestFlight build to fix this issue.

<!-- App general issues -->

---

### Sorting by Latest Updates doesn't work
This works but it doesn't respect user's selected language. Try to use **Update Count** sorting instead.

---

### Thumbnail does not appear
In the library, long press the thumbnail then select **Refresh thumbnail** 

<!-- Content settings related -->

---

### How do I filter languages
In the app, go to Settings > Content Settings.

---

### How do I enable Hentai
 * Sign into [MangaDex’s website](https://mangadex.org/) on a browser, go to your settings, and set the Hentai toggle to "**View All**".
 * Then sign into MangaDex on Paperback, hitting "Remember me", and go into your *Content Settings* in the app settings tab and choose "**Show All**".

---

### Manga are not showing up in my library after I follow them?
You need to enable hentai for hentai title to be shown in the library. See [how do I enable Hentai](#how-do-i-enable-hentai).

<!-- Using sources -->

---

### How can I add other manga sources?
Other manga sources are available on the latest TestFlight public and patreon versions of the application.
Read [Adding an External Repository](/help/guides/adding-repos/) guide to learn how to install other sources.

---

### Request a source
Do you like a particular website which is currently not supported by Paperback? You can submit a source request for it. 

> Please make sure the source does not exist nor was already requested before submitting a new issue.

Extensions repositories:

 * [Extensions Foreign](https://github.com/Paperback-iOS/extensions-foreign/issues) for non English websites
 * [H Extensions](https://github.com/Paperback-iOS/h-extensions/issues) for +18 specific websites
 * [Extensions Promises](https://github.com/Paperback-iOS/extensions-promises/issues) for other websites

> **Contribute**
> 
> Would you like to make this extension a reality? You can contribute to its development! Check our (work in progress) [source development](https://deploy-preview-81--paperbackios.netlify.app/help/contribution/extension-development/#a-manga-reader-without-servers) guide to get started. If you need help or have any questions, feel free to use our Discord server #extensions-dev channel.

---

### How do notifications work?
The app will periodically check for updates in the background when iOS or iPadOS allocates time for it, this should be improved as you use the app and iOS learns to prioritize the app's background jobs over others. You can expedite the process by hitting refresh *once* to check for updates. This does not guarantee that notifications will work immediately after. 

Sources supporting notifications have a <el-tag type="success" size="mini" effect="dark"> Notifications </el-tag> badge in the app and the [repositories list](/help/guides/adding-repos/#known-repositories).
 
---

### Bypass Cloudflare protection
Go to **Settings** > **Sources**
Select the source and press **Cloudflare bypass**

This process may need to be done each time the cookies expire, usually every three days.

Sources requiring this process have a <el-tag type="danger" size="mini" effect="dark"> Cloudflare </el-tag> badge in the app and the [repositories list](/help/guides/adding-repos/#known-repositories).

<!-- Using the app -->

---

### How can I download manga to my device for offline viewing?
 * On your manga page scroll down until you see "All Chapters"
 * Press "**View**" then "**Edit**"
 * Select what you want to download
 * Press "**Manage**" then "**Queue Download**"

<PictureDialog title="Download manga" button="GIF" src="/assets/DownloadManga.gif"/>

Repeat the same steps to remove downloaded chapters

---

### How can I make a backup of my library?
**Creating a backup**
 * Go to Settings > Backups
 * Press "**Create a backup**" and choose where you want to save the backup (We recommend you save them to your Notes app)

**Restoring a backup**
 * Go to your previously saved backup and press the share icon
 * Select "**Copy to Paperback**" action
 * You can then press "**Restore**" to restore your backup

**NOTE** 
 * A video guide on how to make a backup is also available [on YouTube](https://www.youtube.com/watch?v=5EPN9FORQ1g)

---

### How to export the app logs?
Go to Settings and press "**Export logs**"

### How to export a source logs
Go to Settings, Sources. Select a source and press "**Export logs**"

---

### The reader is open but stays blank when I try to read a chapter
 * Try to switch between the horizontal and vertical viewer. If switching doesn't fix it, try to read the same chapter on Safari, if it works, ping @Paper on the Discord #support channel.
 * Some chapters are taken off of MangaDex due to group conflicts or chapters being scans of the official translations.

---

### A blue X appears sometimes when I try to read a chapter
Swipe a couple of pages away and then come back to the failed page, it should have been reloaded. If that doesn't work, close the reader and open the chapter again.

<!-- MangaDex specific -->

---

### Pages often fail/take a long time to load on MangaDex source
 * If you're in SEA (Southeast Asia) get a VPN (Psiphon or ProtonVPN) MangaDex servers have routing issues in SEA.
 * If you're not in SEA and still face this issue, see if there's any announcements in the MangaDex discord about issues or maintenance.

---

### I can't find X manga but it's on MangaDex
 * If the manga is REALLY new (1st chapter added in the last hour) it wont be available until after an hour.
 * If the manga isn't new, chances are it's restricted. At the moment, the app doesn't support reading restricted manga. Read the manga on the website instead.
 * The manga may be licensed for the MangaDex extension, but you may try to find the other titles on other [community sources](/help/guides/adding-repos/#known-repositories).

---

### I have an issue that's not listed here
If it's a bug, file a bug report on [GitHub](https://github.com/Paperback-iOS/app/issues) for review. Otherwise, ask for help on the Discord #support channel.
