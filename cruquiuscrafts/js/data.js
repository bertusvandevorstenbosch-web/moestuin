// Inhoud van de Cruquius Crafts site. Alles hieraanpassen zonder code-ervaring.

const SITE = {
  whatsappNummer: "31612345678", // Vervang door jullie echte nummer (landcode zonder + of 0)
  email: "hallo@cruquiuscrafts.nl",
  plaats: "Cruquius"
};

const PRODUCTEN = [
  {
    id: "mok-handgreep",
    naam: "Mok met handgreep",
    soort: "ceramiek",
    prijs: 24.5,
    afbeelding: "images/product-mok.svg",
    beschrijving: "Handgedraaide mok van steengoed, met een zachte speelse handgreep. Elke mok is uniek.",
    opVoorraad: true
  },
  {
    id: "schaal-oivorm",
    naam: "Ovale schaal",
    soort: "ceramiek",
    prijs: 32,
    afbeelding: "images/product-schaal.svg",
    beschrijving: "Ovale serveerschaal in aardetinten. Mooi voor salades uit eigen tuin — of gewoon voor elke dag.",
    opVoorraad: true
  },
  {
    id: "kom-set",
    naam: "Set van twee kommen",
    soort: "ceramiek",
    prijs: 45,
    afbeelding: "images/product-kom.svg",
    beschrijving: "Twee kommen die precies in elkaar passen. Glazuur varieert per stook — dat is het charmante.",
    opVoorraad: false
  },
  {
    id: "tomatensaus",
    naam: "Tomatensaus (pot 350 ml)",
    soort: "keuken",
    prijs: 6.5,
    afbeelding: "images/product-saus.svg",
    beschrijving: "Langzaam gestoofde saus van onze eigen tomaten, met basilicum en knoflook uit de kas. Seizoensproduct.",
    opVoorraad: true
  },
  {
    id: "kruidenzout",
    naam: "Kruidenzout uit de tuin",
    soort: "keuken",
    prijs: 4.5,
    afbeelding: "images/product-zout.svg",
    beschrijving: "Grof zout met gedroogde tuinkruiden: tijm, salie, rozemarijn en een snufje chilipeper.",
    opVoorraad: true
  },
  {
    id: "droge-bonen",
    naam: "Droge bonen (250 g)",
    soort: "keuken",
    prijs: 3.5,
    afbeelding: "images/product-bonen.svg",
    beschrijving: "Zelfgedroogde pronkbonen van het afgelopen seizoen. Perfect voor soep of als bijgerecht.",
    opVoorraad: true
  }
];

const WORKSHOPS = [
  {
    id: "pottenbakken-intro",
    naam: "Pottenbakken voor beginners",
    type: "ceramiek",
    datum: "2026-06-14",
    duur: "2,5 uur",
    prijs: 45,
    plekken: 6,
    beschrijving: "Anna neemt je mee op de draaischijf: van klomp klei naar je eigen mok. Inclusief materiaal, stook en een kop koffie uit eigen tuin.",
    opVoorraad: true
  },
  {
    id: "koken-met-de-oogst",
    naam: "Koken met de oogst",
    type: "keuken",
    datum: "2026-06-28",
    duur: "3 uur",
    prijs: 55,
    plekken: 8,
    beschrijving: "We oogsten samen in de moestuin en koken een volledig seizoensmenu. Met receptenkaart om mee naar huis te nemen.",
    opVoorraad: true
  }
];

const BLOGPOSTS = [
  {
    slug: "eerste-seizoen",
    titel: "Ons eerste seizoen op de urban boerderij",
    datum: "2026-04-12",
    auteur: "Cruquius Crafts",
    afbeelding: "images/blog-eerste-seizoen.svg",
    inleiding: "Van kale graszode naar een tuin vol perken, een kas en twee gekke tuinders. Dit is hoe het begon.",
    tekst: `<p>Toen we de tuin overnamen stond er vooral... gras. Veel gras. In één weekend hebben we de eerste vier verhoogde bedden neergezet, en sindsdien is er geen stoppen meer aan.</p>
<h2>Wat er nu groeit</h2>
<p>In de kas staan de tomaten en paprika's al weken te pronken. Buiten gingen de bonen, wortels en bieten de grond in, en de sla komt op — letterlijk, om de paar weken een nieuwe rij, zodat we blijven oogsten.</p>
<h2>Wat we geleerd hebben</h2>
<ul>
<li>Een bed van 60 cm breed is smal: één rij tomaten, en daartussen wortel en basilicum. Perfect.</li>
<li>Vruchtwisseling is geen theorie maar overleving: wat vorig jaar kool was, wordt dit jaar bonen.</li>
<li>Slakken houden van onze verhoogde bedden. Wij iets minder.</li>
</ul>
<p>Volgende keer meer over de oogst — en wat we ermee gaan doen in de keuken.</p>`
  },
  {
    slug: "ceramiek-uit-eigen-hands",
    titel: "Waarom elk stuk anders is",
    datum: "2026-04-25",
    auteur: "Anna",
    afbeelding: "images/blog-ceramiek.svg",
    inleiding: "Mokken die licht scheef staan, glazuur dat nooit twee keer hetzelfde loopt — dat is geen fout, dat is het punt.",
    tekst: `<p>Elke mok begint als een klomp klei op de draaischijf. En elke klomp heeft zijn eigen wil. Ik kan twee identieke mokken proberen te draaien, maar de kil, het glazuur en de stook beslissen mee.</p>
<h2>Steengoed en alledaags</h2>
<p>Alles wat ik maak is van steengoed en gebakken op hoge temperatuur: vaatwasserbestendig, ovenbestendig, en gemaakt om elke dag te gebruiken. Niet voor in de kast, maar op tafel.</p>
<h2>Van tuin naar tafel</h2>
<p>Het mooiste aan Cruquius Crafts is de cirkel: de schaal die ik draaide, zit binnen een week vol tomatensaus uit onze eigen kas. En de lege mok? Die gaat weer vol met koffie terwijl de volgende oogst alweer wacht.</p>`
  }
];
