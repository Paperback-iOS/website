---
title: Frequently Asked Questions
lang: en-US
---

# Frequently Asked Questions
If you have questions about the app and our plans or need help with installing the app, try checking our guides and faq entries. If you haven't found what you needed, feel free to join the Discord and ask.

## General Information

### Why are you making this app?
There are no decent manga apps on **iOS** that have _non-intrusive_ advertisements or **MangaDex** support.

### What type of business model will you take on?
There are no plans to adopt a formal business model. As long as Patreon covers the costs of an Apple Developer Account, profit is secondary. It would be nice to get support for development of the app, but there will be no fee to use Paperback.

### When are you planning on releasing the app?
There is a public build of the app on [GitHub](https://github.com/Paperback-iOS/app/releases). Acquiring an Apple Developer Account has been difficult, but hopefully TestFlight builds will be able to be launched soon. After the TestFlight builds we hope to release Paperback on the App Store. For a guide to install the app see:

 * [Paperback Installation Guide](/help/guides/getting-started)

## Troubleshooting
If you're having problems with the app, please check here before posting. If you're having an issue that is not listed here, please use the #support channel on Discord to ask questions.

---

### App crashes on launch
If you are using the **Public build**, check if you are on iOS 13.4+ or iPadOS 13.4+. If you are using the **Beta / Patron build**, ping @Paper on the Discord #supporter-chat channel.

---

### Both Paperback and AltStore crash on launch
Applications installed with AltStore need to be refreshed every seven days. While AltServer and Mail or iCloud/iTune are open and your device is connected to the same network as your computer, AltStore will try to refresh the app automatically.
If Paperback and AltStore both crash on launch it is likely that their certificate is expired.
Without uninstalling anything connect your iPhone/iPad to your computer. Open AltServer and Mail or iCloud/iTunes then select "**Install AltStore**" from AltServer menu.

---

### App crashes when trying to follow on iPad
This is a known Apple bug that was fixed in iPadOS 13.4, Update to iPadOS 13.4 or avoid following manga in Paperback and use the MangaDex website to follow (and then sync).

---

### App crashes after trying to download a manga
Download currently does not work and breaks the app. You will need to delete and reinstall the app.

---

### How do I filter languages
In the app, go to Settings > Content Settings.

---

### How do I enable Hentai
Go to [MangaDex Settings](https://mangadex.org/settings) and login. Look for the **Hentai toggle** and choose **Show toggle (in navbar cog)**.
Then restart the app and go to Settings > Content Settings.

---

### My content settings are reset everytime I open the app
When you are logging in, make sure that **Remember me** is checked on the page.
Also make sure that your email address is verified on MangaDex.

---

### The reader is open but stays blank when I try to read a chapter
 * Try to switch between the horizontal and vertical viewer. If switching doesn't fix it, try to read the same chapter on Safari, if it works, ping @Paper on the Discord #support channel.
 * Some chapters are taken off of MangaDex due to group conflicts or chapters being scans of the official translations.

---

### A blue X appears sometimes when I try to read a chapter
Swipe a couple of pages away and then come back to the failed page, it should have been reloaded. If that doesn't work, close the reader and open the chapter again.

---

### Pages often fail/take a long time to load
 * If you're in SEA (Southeast Asia) get a VPN (Psiphon or ProtonVPN) MangaDex servers have routing issues in SEA.
 * If you're not in SEA and still face this issue, see if there's any announcements in the MangaDex discord about issues or maintenance.

---

### I can't find X manga but it's on MangaDex
 * If the manga is REALLY new (1st chapter added in the last hour) it wont be available until after an hour.
 * If the manga isn't new, chances are it's restricted. At the moment, the app doesn't support reading restricted manga. Read the manga on the website instead.

---

### Manga Rock to MangaDex Sync
Unfortunately, only premium members of Manga Rock are able to transfer their data currently.

 * [**MR to MD Guide**](https://www.reddit.com/r/mangarockapp/comments/f89aie/tool_exporting_mr_favorites/)

---

### Syncing lists takes a really long time
Syncing more than 1,000 manga will take some time however, you can improve this by changing the list type on Follows page of MD:

 * On Safari, go to [MangaDex Follows](https://mangadex.org/follows/manga/) and change the display list to **Simple list** from the menu in the top right of the table.

---

### Sorting by Latest Updates doesn't work
This works but it doesn't respect user's selected language. Try to use **Update Count** sorting instead.

---

### I have an issue that's not listed here
If it's a bug, file a bug report on [GitHub](https://github.com/Paperback-iOS/app/issues) for review. Otherwise, ask for help on the Discord #support channel.
