---
title: Démarrer
lang: fr-FR
---

# Démarrer

## Installation
**Paperback** n’est actuellement _pas_ disponible sur **TestFlight** et _nécéssite_ l’utilisation d’**AltStore** afin d’installer l’application sur votre téléphone. TestFlight sera utilisé lorsque le développeur principal obtiendra un [Compte Développeur Apple](https://developer.apple.com/programs/).

::: tip Tutoriel vidéo
 Si vous préférez utiliser un tutoriel vidéo, Artesians en a réalisé un super en anglais. Vous le trouverez [ici pour Windows](https://www.youtube.com/watch?v=n1KRwsxNiWY).
:::

### Prérequis
1. Sur votre téléphone, téléchargez l’application depuis la page d’accueil de ce site. L’application sera téléchargée sous le nom **`Paperback.ipa`**.
	
	Vous pouvez aussi la télécharger depuis notre [page de publications Github](https://github.com/FaizanDurrani/Paperback/releases/latest).
1. Téléchargez la version d’[AltServer](https://altstore.io/) correspondant à votre système d’exploitation.

::: tip Pré-versions
 Si vous êtes intéressés par les fonctionnalités introduites dans les **Pré-versions** ainsi que dans les **Versions stables** il est nécessaire que vous soyez un supporter sur Patreon pour pouvoir utiliser l’application.
:::

::: warning Avertissement
Cette application a besoin de iOS 13.3+ ou iPadOS 13.4+ pour fonctionner. Paperback N’EST PAS conçu pour des versions de iOS antérieurs sur lesquels elle ne fonctionnera pas.
:::

### Instructions pour AltStore sur Mac
1. Copiez "**AltServer.app**" dans le dossier *Applications* et ouvrez-la.
1. Connectez votre **iPhone** à votre ordinateur, vérifiez qu’il est déverrouillé et que votre ordinateur est un appareil de confiance.
1. Utilisateurs de **Mojave**, vous devez ouvrir **iTunes** et activer "**Synchroniser avec cet appareil en Wi-Fi**" pour votre appareil.
   Utilisateurs de **Catalina**, vous devez ouvrir le **Finder** et activer "**Afficher cet appareil lorsqu’il est en Wi-Fi**".
1. Cliquez sur l’icône de **AltServer** dans la barre des menus, cliquez sur "**Install AltStore**" et choisissez votre appareil.
1. Saisissez votre identifiant Apple ainsi que votre mot de passe. (L’adresse mail **TOUT COMME** le mot de passe sont sensibles à la casse).
	> *Votre identifiant Apple et votre mot de passe sont envoyés à Apple et uniquement à Apple*.
	- **AltServer** vous demandera d’installer un module dans Mail, suivez les instructions pour continuer. Cela n’est nécessaire que lors de la première installation.
1. AltStore devrait être installé sur votre appareil.
 
---

### Module AltStore pour Mail sur Mac
1. Cliquez sur "**Install Mail Plug-in**" dans le menu de AltServer.
1. Saisissez votre mot de passe pour permettre à AltServer d’installer le module.
1. Redémarrez l’application Mail et ouvrez ses préférences `(CMD+,)`.
1. Cliquez sur "**Gérer les modules…**" et activez "**AltPlugin.mailbundle**".
1. Cliquez maintenant sur "**Appliquer et redémarrer Mail**" afin de finir l’installation.
 
---

### Instructions pour AltStore sur Windows
1. Téléchargez et installez [iTunes](https://www.apple.com/itunes/download/win64) pour Windows.
  _Cela ne fonctionnera pas si vous avez une version d’**iTunes** provenant du Windows Store._
1. Téléchargez et installez [iCloud pour Windows 8](https://support.apple.com/en-us/HT204283).
  _Cela ne fonctionnera pas si vous avez une version d’**iCloud** provenant du Windows Store._
 > Vous ne trouvez pas le lien de téléchargement d’**iCloud** pour Windows 8 ? [Image](https://imgur.com/a/P1ef4Wd)
1. Redémarrez votre ordinateur après avoir installé **iTunes** et **iCloud**.
  _Cela ne fonctionnera pas si vous n’avez pas redémarré votre ordinateur._
1. Décompressez le fichier **`AltInstaller.zip`** précédemment téléchargé. Exécutez **`setup.exe`** et suivez les instructions.
1. Démarrez **AltServer** depuis votre *Zone de notifications* ou depuis les *icônes cachées*.
 > Vous ne trouvez pas **AltServer** ? [Image](https://imgur.com/a/rSagfh2)
1. Connectez votre **iPhone** à votre ordinateur, vérifiez qu’il est déverrouillé et que votre ordinateur est un appareil de confiance.
1. Ouvrez **iTunes** et cochez "**Synchroniser avec cet appareil sur Wi-Fi**".
1. Cliquez sur l’icône d’**AltServer** puis sur "**Install AltStore**, sélectionnez votre appareil.
1. Saisissez votre identifiant Apple ainsi que votre mot de passe. (L’adresse mail **TOUT COMME** le mot de passe sont sensibles à la casse).
	> *Votre identifiant Apple et votre mot de passe sont envoyés à Apple et uniquement à Apple*.
1. AltStore devrait être installé sur votre appareil.

---

### Installation de Paperback
1. **Sur Mac** : ouvrez **Mail** et **AltServer**.
 **Sur Windows** : ouvrez **AltServer** ainsi que **iCloud** et **iTunes**.
1. Assurez-vous d’être _connecté au même réseau_ (au même routeur, dans la majorité des cas) que l’ordinateur sur lequel **AltServer** est ouvert. Si vous n’êtes pas connecté au même réseau, vous pouvez relier votre téléphone au moyen d’un câble.
1. Faites confiance à l'application AltStore : allez sur votre appareil dans Réglages, Général, Gestion de l'appareil. Choisissez votre identifiant Apple et appuyez sur **Faire confiance**.
1. Ouvrez **AltStore** sur votre téléphone.
1. Allez dans l’onglet **My Apps** et touchez l’icône **+** en haut à gauche.
1. Ouvrez le fichier **`.IPA`** que vous avez téléchargé dans la section [prérequis](getting-started/#prerequis).
1. **Paperback** devrait maintenant être installé !

---

## FAQ Installation
### Je suis confronté à "Access Denied" lorsque j’essaye d’installer AltStore
Exécutez AltServer en tant qu’administrateur et assurez-vous que vous avez redémarré l’ordinateur après avoir installé iTunes et iCloud.

### Je ne parviens pas à trouver le fichier `.IPA` à télécharger
Regardez dans le menu déroulant **assets**. Le fichier devrait s’y trouver. [Image](https://imgur.com/a/onrwNC8)

### J’ai un problème qui n’est pas listé sur cette page
Merci de vérifier qu’il n’est pas présent sur la page [altstore.io/faq/](https://altstore.io/faq/).  
Si vous ne parvenez toujours pas à le résoudre, vous pouvez accéder au canal #support de notre **[Discord](https://discord.gg/Ny83JV3)** pour recevoir une réponse rapidement ou publier un post sur **[Reddit](https://www.reddit.com/r/Paperback/)**.

---

## Résolution des problèmes de l’application
Si vous avez des problèmes avec l’application, merci de regarder la page **[Résolution des problèmes de l’application](https://www.reddit.com/r/Paperback/wiki/troubleshooting)**.  
Si celui-ci n’est pas listé sur cette page, merci d’utiliser le canal #support sur **[Discord](https://discord.gg/Ny83JV3)** afin de poser votre question.