# 🌱 Cruquius Crafts

De website van urban boerderij **Cruquius Crafts** (Cruquius): blog, kleine webshop
(ceramiek + producten uit de moestuin) en workshops.

## Online

Via GitHub Pages: `https://bertusvandevorstenbosch-web.github.io/moestuin/`
(later te koppelen aan eigen domein, bijv. cruquiuscrafts.nl)

## Inhoud beheren (zonder code-ervaring)

Alle teksten, producten, workshops en blogposts staan in **één bestand**:
[`js/data.js`](js/data.js). Open het bestand, pas de tekst aan, en sla op —
de site werkt direct bij.

- **Eigen nummer/e-mail**: pas bovenin `SITE` aan (`whatsappNummer` met landcode, bijv. `31612345678`)
- **Product toevoegen**: kopieer een blok tussen `{ ... }` in `PRODUCTEN`, verander naam/prijs/beschrijving
- **Foto's**: zet je foto in de map `images/` en vul de bestandsnaam in bij `afbeelding`
- **Uitverkocht**: zet `opVoorraad: false`
- **Blogpost schrijven**: kopieer een blok in `BLOGPOSTS`; tekst mag gewone HTML bevatten (`<p>`, `<h2>`, `<ul>`)

## Bestellen

Klanten bestellen via een vooringevuld WhatsApp-bericht (nummer instelbaar in `SITE`).
Betaling regelen jullie onderling (Tikkie, iDEAL-verzoek, contant bij afhalen).

### Later: echte iDEAL-betalingen

Maak een gratis **Mollie**-account aan, maak per product een betaallink, en zet die
in het productblok als extra veld (bijv. `betaalLink: "https://mollie.com/..."`).
De site kan daarmee uitgebreid worden zonder herbouw.

## Technisch

- Statische site: HTML/CSS/JavaScript, geen dependencies, geen build-stap, geen tracking
- Werkt op elke gratis statische host (GitHub Pages, Netlify, Cloudflare Pages)
- Blog en shop draaien op hash-routering (`#/blog/...`), dus geen server nodig
