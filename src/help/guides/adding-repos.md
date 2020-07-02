---
title: Adding Repositories
lang: en-US
---

# External Source Repositories
## What is an External Repository?
**Paperback** out of the box only comes with **MangaDex** as a source for manga. The app however has support for adding sources from external repositories which are not on the official listings. Beta Sources, 18+ Sources, and sources developed independently are seperated due to **Paperback** having to adhere to Apple policies in order to be distributed through TestFlight and the Apple App Store. 

::: warning Warning
Currently external sources are only available on the Beta version of the application. If you are not a Patreon, this guide will not be very useful to you. This feature will be available in public builds in the future.
:::


## Adding an External Repository
1. Open up Paperback on your device.
1. Navigate to the **Settings** tab of the application.
1. Navigate to the **Sources** tab inside of Settings.
1. At the bottom of the page, you are able to add a repository by specifying a name, and the URL which the repository sits at. Ensure that your repository title is at least 4 characters long.
    > Reference the [Known Repositories](/help/guides/adding-repos/#known-repositories) section for a list of known repositories, their links, and what they contain.
1. Tap "**Add**".
1. Select the repository that you have added, which should have appeared in the list of repositories on this page.
    > If you do not see sources, you may have typed in your Base URL incorrectly. Delete the repository and try again. If you do see sources, congratulations!

## Known Repositories
This is a list of all of the known repositories currently for Paperback, as well as the repository contents.
| Repository Name | Base URL | Available Sources | Notes |
| :-------------: | :------: | :---------------- | :---: |
| **Official Repository** | Built into Paperback | <ExtensionsList url="https://paperback-ios.github.io/extensions"/> | Officially maintained repository, sources which are available and simply need enabled inside of the app
| **H-Extensions**    | https://paperback-ios.github.io/h-extensions | <ExtensionsList url="https://paperback-ios.github.io/h-extensions"/> | Official repository for 18+ sources. These also include redirector versions of the source, which allow you to view content even if it is blocked in your country, without a VPN
| **Beta Extensions** | https://conradweiser.github.io/extensions | <ExtensionsList url="https://conradweiser.github.io/extensions"/> | These extensions are upcoming to the official repository. These sources may or may not work |
