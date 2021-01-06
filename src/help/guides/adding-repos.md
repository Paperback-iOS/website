---
title: Adding Repositories
lang: en-US
---

# External Source Repositories
## What is an External Repository?
**Paperback** out of the box only comes with **MangaDex** as a source for manga. The app however has support for adding sources from external repositories which are not on the official listings. Beta Sources, 18+ Sources, and sources developed independently are separated due to **Paperback** having to adhere to Apple policies in order to be distributed through TestFlight and the Apple App Store. 


## Adding an External Repository
1. Open up Paperback on your device
1. Navigate to the **Settings** tab of the application
1. Navigate to the **Sources** tab inside of Settings
1. At the bottom of the page, you are able to add a repository by specifying a name, and the URL which the repository sits at. Ensure that your repository title is at least 4 characters long
    > Reference the [Known Repositories](/help/guides/adding-repos/#known-repositories) section for a list of known repositories, their links, and what they contain
1. Tap "**Add**"
1. Select the repository that you have added, which should have appeared in the list of repositories on this page
    > If you do not see sources, you may have typed in your Base URL incorrectly. Delete the repository and try again. If you do see sources, congratulations!

## Known Repositories
This is a list of all of the known repositories currently for Paperback, as well as the repository contents.

| Repository Name/URL | Available Sources | Notes | Add Repo (iOS Only) |
| :------------------ | :---------------- | :---- | :-----------------: |
| **Primary Sources** <br> https://paperback-ios.github.io/extensions-beta | <ExtensionsList url="https://paperback-ios.github.io/extensions-beta"/> | Officialy maintained repository, contains a few major sources suited for most users | [Add to Paperback](paperback://addRepo?displayName=Primary%20Sources&url=https://paperback-ios.github.io/extensions-beta) |
| **H-Extensions** <br> https://paperback-ios.github.io/h-extensions | <ExtensionsList url="https://paperback-ios.github.io/h-extensions"/> | Official repository for 18+ sources. These also include redirector versions of the source, which allow you to view content even if it is blocked in your country, without a VPN | [Add to Paperback](paperback://addRepo?displayName=H-Extensions&url=https://paperback-ios.github.io/h-extensions) |
| **MangaDex Unlocked** <br> https://pogogo007.github.io/extensions-beta | <ExtensionsList url="https://pogogo007.github.io/extensions-beta"/> | This source overwrites MangaDex and unlocks the full contents of the website. No content is filtered. May load faster than the built-in version of the source | [Add to Paperback](paperback://addRepo?displayName=MangaDex%20Unlocked&url=https://pogogo007.github.io/extensions-beta) |
| **Beta Extensions** <br> https://conradweiser.github.io/extensions | <ExtensionsList url="https://conradweiser.github.io/extensions"/> | These extensions are upcoming to the official repository. These sources may or may not work | [Add to Paperback](paperback://addRepo?displayName=Beta%20Extensions&url=https://conradweiser.github.io/extensions) |
