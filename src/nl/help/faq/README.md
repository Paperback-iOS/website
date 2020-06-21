---
title: Veelgestelde vragen
lang: nl-NL
---

# Veelgestelde vragen
Als je vragen hebt over de app en onze plannen of hulp nodig hebt bij het installeren van de app, kijk dan in onze handleidingen en veelgestelde vragen. Als je niet kan vinden wat je nodig hebt, kom dan op onze Discord (Alleen in het Engels) om het te vragen.

## Algemene informatie

### Waarom maak je deze app?
Er zijn geen fatsoenlijke manga-apps op **iOS** die _niet-opdringerige_ advertenties of **MangaDex** ondersteuning hebben.

### Welk type bedrijfsmodel ga je gebruiken?
Er zijn geen plannen om een formeel bedrijfsmodel vast te stellen. Zolang Patreon de kosten van een Apple Developer Account dekt, is de winst secundair. Het wordt op prijs gesteld om de app financieel te ondersteunen via Patreon, maar Paperback kost niets.

### Wanneer ben je van plan de app uit te brengen?
Er is een publieke build van de app op [GitHub](https://github.com/Paperback-iOS/app/releases). Het aanmelden voor een Apple Developer-account was moeilijk, maar hopelijk kunnen de TestFlight-builds binnenkort beginnen. Na de TestFlight-builds hopen we Paperback in de App Store uit te kunnen brengen. Voor een handleiding om de app te installeren:

 * [Paperback Installatiehandleiding](/nl/help/guides/getting-started)

## Probleemoplossing
Als je problemen hebt met de app, kijk dan op deze pagina voordat je een bericht plaatst. Als je een probleem hebt dat hier niet wordt vermeld, gebruik dan het #support-kanaal op Discord om je vragen te stellen (In het Engels).

---

### De app loopt vast bij het opstarten
Zorg ervoor dat je iOS 13.4+ of iPadOS 13.4+ gebruikt.

Als je de **Beta / Patron build** gebruikt kan het zijn dat deze onstabiel is. Als je de juiste iOS of iPadOS versie voor je apparaat gebruikt en nog steeds crasht, kan het zijn dat je een al bekende bug tegen bent gekomen. Neem contact met ons op via het Discord #supporter-chatkanaal en iemand zal je proberen te helpen met het probleem.

---

### Zowel Paperback als AltStore crashen bij het opstarten
Toepassingen die met AltStore zijn geïnstalleerd, moeten elke zeven dagen worden vernieuwd. Zorg ervoor dat AltServer en Mail of iCloud / iTunes open zijn en dat je apparaat is verbonden met hetzelfde netwerk als je computer. AltStore probeert de app automatisch te vernieuwen op de achtergrond. Als AltStore niet automatisch wordt vernieuwd, kan je dit proces handmatig activeren door je apparaat aan te sluiten op een computer met AltServer en vervolgens de vernieuwing op je apparaat uit te voeren via de AltStore-app.
Als Paperback en AltStore beide crashen bij het opstarten, is het waarschijnlijk dat het certificaat is verlopen.
Sluit uw iPhone / iPad aan op je computer zonder iets te verwijderen. Open AltServer en Mail of iCloud / iTunes en selecteer vervolgens "**AltStore** installeren" in het AltServer-menu.
Nadat AltStore opnieuw is geïnstalleerd, open je AltStore en vernieuw je het certificaat voor Paperback. Je kunt Paperback opnieuw openen en er zouden geen gegevens verloren moeten zijn gegaan.

---

### De app loopt vast bij het volgen van manga op de iPad
Dit is een bekende Apple-bug die is opgelost in iPadOS 13.4, update naar iPadOS 13.4 of vermijd het volgen van manga in Paperback en gebruik de MangaDex-website om manga te volgen (en vervolgens te synchroniseren).

---

### De app loopt vast bij het downwloaden van een manga
Het downloaden van manga werkt momenteel niet en crasht de app. Je moet de app verwijderen en opnieuw installeren om dit probleem op te lossen.

---

### Hoe filter ik talen?
In de app, ga naar Settings > Content Settings (De app is nog niet beschikbaar in het Nederlands).

---

### Hoe zet ik hentai aan?
Ga naar de [MangaDex Instellingen](https://mangadex.org/settings) en login. Zoek de **Hentai toggle** opie en kies voor **Show toggle (in navbar cog)**.
Start vervolgens de app opnieuw op en ga naar Settings > Content Settings (De app is nog niet beschikbaar in het Nederlands).

---

### Elke keer dat ik de app open worden mijn instellingen gereset
Wanneer je inlogt, zorg ervoor dat "**Onthoud mij**" aangevinkt staat op de pagina.
Zorg er ook voor dat je e-mailadres is geverifieerd op MangaDex.

---

### De lezer is open maar blijft blanco als ik een hoofdstuk probeer te lezen
 * Probeer te schakelen tussen de horizontale en verticale lezer. Als het wisselen niet lukt, probeer dan hetzelfde hoofdstuk via Safari te lezen op de MangaDex website. Als dat wel werkt, ping @Paper in het Discord #supporter-kanaal (In het Engels).
 * Sommige hoofdstukken zijn van MangaDex verwijderd vanwege groepsconflicten of hoofdstukken zijn scans van officiële vertalingen.

---

### Soms verschijnt er een blauwe kruis wanneer ik een hoofdstuk probeer te lezen
Veeg een paar pagina's verder en kom daarna terug naar de mislukte pagina, deze zou opnieuw geladen moeten zijn. Als dat niet werkt, sluit dan de lezer en open het hoofdstuk opnieuw.

---

### Het laden van pagina's mislukt of het laden van pagina's duurt lang
 * Als je in Zuidoost Azië bent, gebruik dan een VPN (Psiphon of ProtonVPN) MangaDex-servers hebben routingproblemen in Zuidoost Azië.
 * Als je niet in Zuidoost Azië bent en nog steeds problemen hebt, kijk dan of er aankondigingen zijn in de MangaDex-Discord over problemen of gepland onderhoud.

---

### Ik kan een bepaalde manga niet vinden, maar deze staat wel op MangaDex
 * Als de manga ECHT nieuw is (het eerste hoofdstuk toegevoegd in het afgelopen uur), is deze pas na een uur beschikbaar.
 * Als de manga niet nieuw is, is de kans groot dat deze beperkt is. Op dit moment ondersteunt de app het lezen van beperkte manga niet. Lees de manga dan op de website in plaats van de app.

---

### Hoe kan ik Manga Rock naar MangaDex synchroniseren
Helaas kunnen alleen premium-leden van Manga Rock hun gegevens momenteel overzetten.

 * [**MR naar MD Handleiding (Engels)**](https://www.reddit.com/r/mangarockapp/comments/f89aie/tool_exporting_mr_favorites/)

---

### Het synchroniseren van lijsten duurt erg lang
Het synchroniseren van meer dan 1.000 manga's duurt enige tijd, maar je kan dit versnellen door het lijsttype op de Follows-pagina van MD te wijzigen:

 * Ga in Safari naar [MangaDex Follows](https://mangadex.org/follows/manga/) en verander de weergavelijst naar **Simple list** in het menu rechts bovenin de tabel.

---

### Het sorteren op nieuwste updates werkt niet
Dit werkt wel, maar het houd geen rekening met de geselecteerde taal van de gebruiker. Probeer in plaats daarvan te sorteren op **Update Count**.

---

### Ik heb een probleem dat hier niet wordt vermeld
Als het een bug is, maak dan een bugrapport aan op [GitHub](https://github.com/Paperback-iOS/app/issues) (In het Engels). Vraag anders om hulp in het Discord #support-kanaal (In het Engels).