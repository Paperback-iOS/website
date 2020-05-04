---
title: Getting started
lang: en-US
---

# Getting started

## Installation
**Paperback** is currently _not_ on **TestFlight** and _requires_ the usage of **AltStore** in order to install onto your phone. In the future, TestFlight will be used when the lead developer obtains an [Apple Developer Account](https://developer.apple.com/programs/).

### Prerequisites
1. On your phone, download the app through the front-page of this website. The app will download as **`Paperback.ipa`**.
	
	Alternatively you can download through our [GitHub releases page](https://github.com/FaizanDurrani/Paperback/releases/latest).
1. Download [AltServer](https://altstore.io/) for your operating system.

::: tip Pre-releases
 If you're interested in the features introduced in the **Pre-release** or **Stable** builds then you need to be a Patron to use the app.
:::

::: warning Warning
This requires iOS 13.3+ or iPadOS 13.4+, the app will CRASH otherwise. Paperback is NOT designed for any iOS below.
:::

### AltStore instructions for Mac
1. Copy "**AltServer.app**" to your *Applications* folder.
1. Launch **AltServer** from your menu bar (there should be an icon).
1. Connect your **iPhone** to your computer and make sure it's unlocked and your device is trusted.
1. **Mojave** users need to open **iTunes** and enable "**iTunes Wi-Fi sync**" for your phone.
   **Catalina** users need to open **Finder** and enable "**Show this iPhone when on WiFi**" for your phone.
1. Click the **AltServer** icon in the Mac menu bar and click "**Install AltStore**" and select your device.
1. Enter your Apple ID email and password. (**BOTH** email address and password are case sensitive).
	> *Your Apple ID and password are sent to Apple, and nowhere else.*
	- **AltServer** will ask you to install a Mail plug-in, follow the instructions to continue. This is only required the first time.
2. AltStore should be installed to your phone.
 
---
 
### AltStore Mail plug-in for Mac
1. Click the "**Install Mail Plug-in**" from the AltServer menu.
1. Enter your password to grant AltServer permission to install the plug-in.
1. Restart Mail and Open Mail > Preferences.
1. Click "**Manage Plug-ins**" and enable "**AltPlugin.mailbundle**".
1. Finally, click "**Apply and Restart Mail**" to finish installation.
 
---
 
### AltStore instructions for Windows
1. Download and install [iTunes](https://www.apple.com/itunes/download/win64) for Windows.
   _This will not work if you have the Windows Store app version of **iTunes**._
1. Download and install [iCloud for Windows 8](https://support.apple.com/en-us/HT204283).
   _This will not work if you have the Windows Store app version of **iCloud**._
	> Can't find the link to download **iCloud** for Windows 8? [Image](https://imgur.com/a/P1ef4Wd)
1. Restart your PC after installing both **iTunes** and **iCloud** (you can't skip this step).
1. Extract the downloaded **`AltInstaller.zip`** file. Run **`setup.exe`** and follow the instructions.
1. Launch **AltServer** from your *Notification Area*/*System Tray* or *Hidden Icons*.
	> Can't find **AltServer**? [Image](https://imgur.com/a/rSagfh2)
1. Connect your iPhone to your computer and make sure it's unlocked and your device is trusted.
1. Open **iTunes** and enable "**iTunes Wi-Fi sync**" for your phone.
1. Click the **AltServer** icon and click "**Install AltStore**, then choose your device.
1. Enter your Apple ID email and password. (**BOTH** email address and password are case sensitive).
	> *Your Apple ID and password are sent to Apple, and nowhere else.*
1. AltStore should then be installed into your phone.
 
---
 
### Paperback Installation
1. **On Mac**: Open **Mail**.
	**On Windows**: Open **AltServer** along with **iCloud** and **iTunes**.
1. Make sure you're on the _same connection_ (same router, in most cases) as the computer running **AltServer**. If you're not connected to the same network, you can connect your phone via cable.
1. Launch **AltStore** on your phone.
1. Go to **My Apps** and tap the **+** icon in the top left corner.
1. Open the **`.IPA`** you downloaded from the [prerequisites](/help/guides/getting-started/#prerequisites) section and **Paperback** should finally be installed!
 
---
 
## Installation FAQ
### I get "Access Denied" when trying to install AltStore
Run AltServer as an administrator, and ensure that you've restarted after installing iTunes and iCloud.
 
### I can't find the .IPA file to download
Navigate down toward the assets drop down, the .IPA should be listed there. [https://imgur.com/a/onrwNC8](https://imgur.com/a/onrwNC8)
 
### I have some other issue that isn't listed here
Please, check [https://altstore.io/faq/](https://altstore.io/faq/). If you still can't resolve the issue visit the #support channel in our **[Discord](https://discord.gg/Ny83JV3)** for fast reponse or submit a post.
 
---
 
## App Troubleshooting
If you're having problems with the application, please check here for frequently asked questions. If you're having an issue that is not below, please use the #support channel on Discord to ask questions. 
 
### App crashes on launch
1. Your iOS may be outdated. Paperback requires you to be on iOS 13.4+ or iPadOS 13.4+ if installed through AltStore.
1. Your certificate for Paperback may have expired. You need to reinstall AltStore onto your device.
1. If you are on the Patron build, please ping Paper#1932 on Discord in #supporter-chat.

### Manga language settings
Go to Settings > Content Settings and select your preferred language.

### Hentai settings
1. Go to [MangaDex](https://mangadex.org/settings) and login. 
1. Find the "**Hentai Toggle**" and enable it.
1. Go to Settings > Content Settings and choose your preferred filter.

### Content settings reset
You need to login to Mangadex, tick "**Remember Me**," and make sure your email is verified.

### Blank reader
1. Chapters can be removed from MangaDex due to translation group conflicts or chapters being scans of official translations.
1. Switch between the horizontal and vertical viewer. 

### Blue X
1. Scroll or swipe a couple of pages away to reload the failed page. 
1. Close the reader and reopen the chapter.

### Page failed to load
1. If you are reading from SEA, MangaDex servers have routing issues, so get a VPN (**Psiphon** or **ProtonVPN**).
1. If you are not in SEA, check if MangaDex is having server complications or maintenance.

### X Manga is not on Paperback
1. If the manga is *new* (added in the last hour), it will not be available until after an hour.
1. The manga may be restricted. Paperback does not support reading restricted manga.

### Syncing is taking a long time
Syncing more than 1,000 manga will take a considerable amount of time. You can improve this by changing the list type on the [follows page of MangaDex](https://mangadex.org/follows/manga/), and changing the display list to "**Simple List**" from the menu.

### Sorting by latest updates 
"**Latest Updates**" does not currently respect the user's language preference. Use "**Update Count**" sorting instead.

### I have an issue not located here
If the issue is a bug, file a bug report on [GitHub](https://github.com/Paperback-iOS/app/issues). Otherwise, ask for help in the Discord #support channel.