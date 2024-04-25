---
title: Add Repository
description: Paperback deeplink for adding a repository to the app.
navbar: false
sidebar: false
editLink: false
lastUpdated: false
next: false
---

<!--
Redirect to the url scheme paperback://addRepo/?displayName=displayName&url=url
The url argument must point to the webpage hosting the `versioning.json` file and must not have a trailing slash e.g. https://paperback-ios.github.io/extensions-default/main.
-->

<script setup>
import DeeplinkParser from '../.vitepress/components/DeeplinkParser.vue'
</script>

<DeeplinkParser />
