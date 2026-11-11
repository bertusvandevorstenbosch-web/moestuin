# 🌱 Moestuin

Een app om je moestuin bij te houden. Installeerbaar op je telefoon (PWA), werkt ook offline,
en je gegevens blijven op je eigen apparaat.

## Wat kan de app?

- **Perken** — verdeel je tuin in perken/vakken en zie wat waar staat
- **Gewassen** — met ras, zaaidatum, oogstdatum en status
- **Taken** — terugkerende klussen (watergeven, wieden, bemesten) met herinnering wat er te laat is
- **Groei-logboek** — notities per gewas: zaai, kieming, oogst, plagen, opmerkingen
- **Zaaischema** — per maand wat je in het Nederlandse klimaat kunt zaaien, planten en oogsten
- **Vruchtwisseling** — waarschuwing als een gewasfamilie twee jaar achter elkaar op hetzelfde perk staat
- **Companion planting (buren)** — goede en slechte buurgewassen, ook als hint bij je eigen gewassen
- **Plagen & ziektes** — naslag met herkenning en biologische aanpak
- **Back-up** — exporteer/importeer je gegevens als JSON-bestand (bijv. om in Google Drive te bewaren)

## Installatie op je telefoon

1. Zorg dat de app ergens bereikbaar is (zie hieronder).
2. Open de URL in Chrome (Android) of Safari (iPhone).
3. Kies in het browsermenu **"Toevoegen aan startscherm"**.
4. Klaar — de app opent nu als eigen app en werkt ook zonder internet.

## De app online zetten (GitHub Pages)

1. Ga in deze repo naar **Settings → Pages**.
2. Kies bij **Source**: *Deploy from a branch*, kies branch `main`, map `/ (root)`, en klik **Save**.
3. Na een minuut staat de app op `https://<gebruikersnaam>.github.io/<reponaam>/`.

> Let op: GitHub Pages werkt alleen bij **publieke** repos op een gratis account.
> Wil je de repo privé houden, dan kun je de bestanden ook tijdelijk lokaal serveren
> (`python3 -m http.server`) en via je wifi-netwerk op de telefoon openen; na installatie
> werkt de app offline en is de pc niet meer nodig.

## Technisch

- Gewone HTML/CSS/JavaScript — geen build-stap, geen dependencies, geen tracking
- Gegevens in `localStorage` op het apparaat zelf
- Service worker voor offline gebruik
