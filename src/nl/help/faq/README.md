---
title: Veelgestelde vragen
lang: nl-NL
---

# Veelgestelde vragen
Als je vragen hebt over de app en onze plannen of hulp nodig hebt bij het installeren van de app, bekijk dan onze handleidingen en veelgestelde vragen. Als je niet kan vinden wat je nodig hebt, kom dan op onze Discord (Alleen in het Engels) om het te vragen.

## Algemene informatie

### Waarom maak je deze app?
Er zijn geen fatsoenlijke manga-apps op **iOS** die _niet-opdringerige_ advertenties of **MangaDex** ondersteuning hebben.

### Welk type bedrijfsmodel ga je gebruiken?
Er zijn geen plannen om een formeel bedrijfsmodel vast te stellen. Zolang Patreon de kosten van een Apple Developer Account dekt, is de winst secundair. Het wordt op prijs gesteld om de app financieel te ondersteunen via Patreon, maar Paperback kost niets.

### Wanneer ben je van plan de app uit te brengen?
Er is een openbare build van de applicatie op [GitHub](https://github.com/FaizanDurrani/Paperback-Public/releases). Het verkrijgen van een Apple Developer-account is moeilijk, maar hopelijk kunnen de TestFlight-builds binnenkort worden gestart. Na de TestFlight-builds hopen we Paperback in de App Store uit te brengen. Voor een gids om de applicatie te installeren, zie: 

* [Paperback Installatiehandleiding](/nl/help/guides/getting-started)

## Probleemoplossing
Als je problemen hebt met de applicatie, kijk dan op deze pagina voordat je een bericht plaatst. Als je een probleem hebt dat hier niet wordt vermeld, gebruik dan het #support-kanaal op Discord om vragen te stellen (In het Engels).

--- 

### App loopt vast bij het opstarten
**Openbare build** gebruikers moeten controleren of ze iOS 13.4+ gebruiken. **Beta / Patreon build** gebruikers moeten Paper op Discord pingen in het #supporter-kanaal.

---

### App loopt vast bij het volgen van manga op de iPad
This is a known Apple bug that is fixed in iPadOS 13.4, Update to iOS 13.4 or avoid following manga from Paperback and use MangaDex's website to follow (and then sync).

---

### Hoe filter ik talen?
Go to Settings > Content Settings.

---

### Hoe zet ik hentai aan?
Go to [https://mangadex.org/settings](https://mangadex.org/settings) and login. Look for "**Hentai Toggle**" and enable it.
Then restart the app and go to Settings > Content Settings.

---

### Elke keer dat ik de app open, worden mijn instellingen gereset
You need to login with "**Remember Me**" checked.
Also make sure that your email is verified.

---

### De lezer is open maar blijft blanco als ik een hoofdstuk probeer te lezen
 * Switch between the horizontal/vertical viewers. If switching doesn't fix, try to read the same chapter on safari, if it works, ping @Paper on Discord in #support channel.
 * Some chapters are taken off of MangaDex due to group conflicts or chapters being scans of the official TL.

---

### Soms verschijnt er een blauwe X wanneer ik een hoofdstuk probeer te lezen
Scroll/swipe a couple of pages away then come back to the failed page, it should reload. If that doesn't work, close the reader and open the chapter the again.

---

### Het laden van pagina's mislukt of het laden van pagina's duurt lang
 * If you're in SEA get a VPN (Psiphon or ProtonVPN) MangaDex servers have routing issues in SEA.


 * If you're not in SEA and still face this issue, see if there's any announcements in the MangaDex discord about server complications.

---

### Ik kan een bepaalde manga niet vinden, maar het staat wel op MangaDex
 * If the manga is REALLY new (1st chapter added in the last hour) it wont be available until after an hour.
 * If the manga isn't new, chances are it's restricted. At the moment, the app doesn't support reading restricted Manga.
Read on the website instead.

---

### Hoe kan ik Manga Rock naar MangaDex synchroniseren
Unfortunately, only premium members of Manga Rock are able to transfer their data currently.

* [**MR to MD Guide**](https://www.reddit.com/r/mangarockapp/comments/f89aie/tool_exporting_mr_favorites/)

---

### Het synchroniseren van lijsten duurt erg lang
Syncing more than 1,000 manga will take some time, however you can improve this improve by changing the list type on Follows page of MD:
 * On Safari, go to [https://mangadex.org/follows/manga/](https://mangadex.org/follows/manga/) and change the display list to "Simple List" from the menu in the top right of the table.

### Het sorteren op nieuwste updates werkt niet
It works but it doesn't respect user's selected language, try to use Update Count sorting instead.

### Ik heb een probleem dat hier niet wordt vermeld
If its a bug, file a bug report on GitHub for review. Otherwise, ask for help in the Discord #support channel.