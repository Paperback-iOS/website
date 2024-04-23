---
title: Connecting Trackers
description: Enable automatic tracking for alternative backups and monitoring your reading progress.
---

# Connecting Trackers

Adding external trackers is an optional but recommended step, this will prevent potential data loss if the Paperback app would break by automatically tracking what you read with an external tracker. There is an official tracker repository containing Paperback extensions for the following trackers:

- [**AniList (Recommended):**](https://anilist.co) A more modern tracker with one of the biggest libraries.
- [**MyAnimeList:**](https://myanimelist.net) The tracker with the biggest userbase.
- [**MangaUpdates:**](https://mangaupdates.com) An alternative smaller tracker.

We recommend that you use AniList, this because it has as modern user interface and one of if not the largest manga libraries. Trackers are installed the same way as content providing extensions. Bellow follows a guide on how to install and setup the AniList extension, the process for installing other tracker extensions is similar (they are located in the same repository).

## 1. Adding the Tracker Repository

There are two methods to install the tracker repository:

:::: tabs
== Automatically (Recommended)

1. Click or press on [this link](https://paperback-ios.github.io/extensions/main/).
2. On the website, select "**Add to Paperback**".
3. Accept the 'Open in "Paperback"?' pop-up.
4. In Paperback, select "**Add as Source Repo**".

== Manually

1. Open the app and navigate to **Settings** > **Extensions**.
2. Select **Edit** > **+**.
3. The "Repository Name" is optional.
4. For "Repository Base URL", use this URL: [https://paperback-ios.github.io/extensions/main/](https://paperback-ios.github.io/extensions/main/).
5. Read and accept the conditions.
6. Select "**Add to Paperback**".

::::

## 2. Installing the AniList Extension

Once you've added the tracker repository, you can install the "AniList" extensions:

1. Go to **Settings** > **Extensions** > **Default extensions** (or the name you provided during manual installation).
2. Select "**GET**" next to the "AniList" extension. It should change to "**RELOAD**" if the installation is successful.

## 3. Configuring the AniList Extension

To be able to start tracking your reading progress, you will need to configure the "AniList" extension.

1. Make an account on [AniList](https://anilist.co).
2. Go to your extensions list and select the "**AniList**" extension, then select "**Login with Anilist**".
3. Go through the AniList login process.
   > You might need to verify yourself via an email it sends you on logging in.
4. You might want to go to "**Tracker Settings**" (above "Login with Anilist") and configure those settings as well, but this is not necessary.

## 4. Tracking your reading progress

On reading a manga you can select the tracker button in the title view page (an arrow), and connect your Paperback title to a title on AniList, once this is done it will update your AniList automatically with your progress on reading a chapter on Paperback.
