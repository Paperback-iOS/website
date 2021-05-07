---
title: MangaDex backup migrator
lang: en-US
---

:::: guide MangaDex to MangaDex backup migrator
MangaDex changed their ids to UUIDS. If the source remains compatible with legacy ids, using them will be slower as it requires to call a conversion endpoint every time.

To migrate you library:
1. [Make a backup]() of your library
1. Convert your backup with this *MangaDex to MangaDex backup migrator*
1. Reinstall Paperback
1. [Restore]() the migrated backup

::: aside
Please note the conversion can take some time on big libraries
:::
::::

<br/>
<br/>

<MdToMdMigrator/>

<style>
.custom-block.aside
{
    text-align: left;
}
</style>
