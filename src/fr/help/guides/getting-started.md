---
title: Démarrer
lang: fr-FR
---

# Démarrer

## Installation
**Paperback** n’est actuellement _pas_ disponible sur **TestFlight** et _nécessite_ l’utilisation d’**AltStore** afin d’installer l’application sur votre iPhone ou iPad. TestFlight sera utilisé lorsque le développeur principal obtiendra un [Compte Développeur Apple](https://developer.apple.com/programs/).

::: tip Tutoriel vidéo
Si vous préférez utiliser un tutoriel vidéo, Artesians en a réalisé un super en anglais. Vous le trouverez [ici](https://www.youtube.com/watch?v=n1KRwsxNiWY) pour Windows et [ici](https://www.youtube.com/watch?v=CjPjsF4yJ0M) pour macOS.
:::

### Prérequis
1. Sur votre iPhone ou votre iPad, téléchargez l’application <Download text="depuis ce lien"/>. Elle sera téléchargée sous le nom **`Paperback.ipa`**.
1. Téléchargez la version d’[AltServer](https://altstore.io/) correspondant à votre système d’exploitation.

::: tip Pré-versions
Sur [GitHub](https://github.com/Paperback-iOS/app/releases) il y a aussi des pré-versions. Elles ne sont utilisables que par les supporters sur Patreon. Si vous n’êtes pas un supporter assurez-vous d’installer la version **Stable**.
Si tester les nouvelles fonctionnalités en avance vous intéresse, considérez devenir un supporter.
:::

::: warning Avertissement
Cette application a besoin de iOS 13.4+ ou iPadOS 13.4+ pour fonctionner. Paperback N’EST PAS conçu pour des versions de iOS antérieurs sur lesquels elle ne fonctionnera pas.
:::

:::: el-tabs
::: el-tab-pane label="macOS 10.14+"
### Altstore
#### Instructions
1. Copiez "**AltServer.app**" dans le dossier *Applications* et ouvrez-la.
1. Connectez votre **iPhone** ou votre **iPad** à votre ordinateur, vérifiez qu’il est déverrouillé et que votre ordinateur est un appareil de confiance.
1. Utilisateurs de **Mojave**, ouvrez **iTunes** et activez "**Synchroniser avec cet appareil en Wi-Fi**" pour votre iPhone/iPad.
   Utilisateurs de **Catalina**, ouvrez le **Finder** et activez "**Afficher cet appareil lorsqu’il est en Wi-Fi**" pour votre iPhone/iPad.
1. Cliquez sur l’icône de **AltServer** dans la barre des menus, cliquez sur "**Install AltStore**" et choisissez votre iPhone/iPad.
1. Saisissez votre identifiant Apple ainsi que votre mot de passe. (L’adresse mail **TOUT COMME** le mot de passe sont sensibles à la casse).
   > *Votre identifiant Apple et votre mot de passe sont envoyés à Apple et uniquement à Apple*.
1. **AltServer** vous demandera d’installer un module dans Mail, suivez les instructions pour continuer. Cela n’est nécessaire que lors de la première installation.
1. AltStore devrait être installé sur votre iPhone/iPad.

#### Module Mail
1. Cliquez sur "**Install Mail Plug-in**" depuis le menu d'AltServer.
1. Saisissez votre mot de passe pour permettre à AltServer d’installer le module.
1. Redémarrez l’application Mail et ouvrez ses préférences `(CMD+,)`.
1. Cliquez sur "**Gérer les modules…**" et activez "**AltPlugin.mailbundle**".
1. Cliquez maintenant sur "**Appliquer et redémarrer Mail**" afin de finir l’installation.

### Paperback
#### Installation
1. Ouvrez **AltServer** et **Mail**.
1. Assurez-vous d’être _connecté au même réseau_ (au même routeur, dans la majorité des cas) que l’ordinateur sur lequel **AltServer** est ouvert. Si vous n’êtes pas connecté au même réseau, vous pouvez relier votre téléphone au moyen d’un câble.
1. Faites confiance à l'application AltStore : allez, sur votre appareil, dans Réglages > Général > Gestion de l'appareil. Choisissez votre identifiant Apple et appuyez sur **Faire confiance**.
1. Ouvrez **AltStore** sur votre iPhone/iPad.
1. Allez dans l’onglet **My Apps** et touchez l’icône **+** en haut à gauche.
1. Ouvrez le fichier **`.IPA`** que vous avez téléchargé dans la section [Prérequis](getting-started/#prerequis).
1. **Paperback** devrait maintenant être installé !
:::

::: el-tab-pane label="Windows 10"
### Altstore
#### Instructions
1. Téléchargez et installez [iTunes](https://www.apple.com/itunes/download/win64) pour Windows.
   <el-tag type="warning">Pas la version du Windows Store !</el-tag>
1. Téléchargez et installez [iCloud pour Windows 8](https://support.apple.com/en-us/HT204283).
   <el-tag type="warning">Pas la version du Windows Store !</el-tag>
   > Vous ne trouvez pas le lien de téléchargement d’**iCloud** pour Windows 8 ? <PictureDialog title="Télécharger iCloud pour Windows 8" button="GIF" src="/assets/iCloud.gif"/>
1. Redémarrez votre ordinateur après avoir installé **iTunes** et **iCloud**.
   <el-tag type="warning">Il faut que vous redemarriez votre ordinateur !</el-tag>
1. Décompressez le fichier **`AltInstaller.zip`** précédemment téléchargé. Exécutez **`setup.exe`** et suivez les instructions.
1. Démarrez **AltServer** depuis votre *Zone de notifications*.
   > Vous ne trouvez pas **AltServer** ? <PictureDialog title="Démarrer AltServer" button="Image" src="/assets/AltServer.png"/>
1. Connectez votre **iPhone** à votre ordinateur, vérifiez qu’il est déverrouillé et que votre ordinateur est un appareil de confiance.
1. Ouvrez **iTunes** et cochez "**Synchroniser avec cet appareil sur Wi-Fi**".
1. Cliquez sur l’icône d’**AltServer** puis sur "**Install AltStore**", sélectionnez votre iPhone/iPad.
1. Saisissez votre identifiant Apple ainsi que votre mot de passe. (L’adresse mail **TOUT COMME** le mot de passe sont sensibles à la casse).
   > *Votre identifiant Apple et votre mot de passe sont envoyés à Apple et uniquement à Apple*.
1. AltStore devrait être installé sur votre iPhone/iPad.

### Paperback
#### Installation
1. Ouvrez **AltServer** ainsi que **iCloud** et **iTunes**.
1. Assurez-vous d’être _connecté au même réseau_ (au même routeur, dans la majorité des cas) que l’ordinateur sur lequel **AltServer** est ouvert. Si vous n’êtes pas connecté au même réseau, vous pouvez relier votre téléphone au moyen d’un câble.
1. Faites confiance à l'application AltStore : allez, sur votre appareil, dans Réglages > Général > Gestion de l'appareil. Choisissez votre identifiant Apple et appuyez sur **Faire confiance**.
1. Ouvrez **AltStore** sur votre téléphone.
1. Allez dans l’onglet **My Apps** et touchez l’icône **+** en haut à gauche.
1. Ouvrez le fichier **`.IPA`** que vous avez téléchargé dans la section [Prérequis](getting-started/#prerequis).
1. **Paperback** devrait maintenant être installé !
:::
::::

## FAQ Installation
### Je suis confronté à "Access Denied" lorsque j’essaye d’installer AltStore
Exécutez AltServer en tant qu’administrateur et assurez-vous que vous avez redémarré votre ordinateur après avoir installé iTunes et iCloud.

### Je ne parviens pas à trouver le fichier .IPA à télécharger
Vous pouvez télécharger le fichier **`.IPA`** <Download text="depuis ce lien"/>.

### J’ai un problème qui n’est pas listé sur cette page
Vérifiez qu’il n’est pas présent sur la page [FAQ AltStore](https://altstore.io/faq/).
Si vous ne parvenez toujours pas à le résoudre, vous pouvez accéder au canal #support de notre **[Discord](https://discord.gg/Ny83JV3)** pour recevoir une réponse rapidement ou publier un post sur **[Reddit](https://www.reddit.com/r/Paperback/)**.

---

## Résolution des problèmes de l’application
Si vous avez des problèmes avec l’application, merci de regarder la rubrique **[Résolution des problèmes de l’application](/fr/help/faq/#resolution-des-problemes-de-l-application)**.  
Si ceux-ci ne sont pas listés sur cette page, merci d’utiliser le canal #support sur **[Discord](https://discord.gg/Ny83JV3)** afin de poser vos questions.