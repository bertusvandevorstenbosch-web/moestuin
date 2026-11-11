// Vaste naslagdata voor de Moestuin-app (Nederlands klimaat).

const GEWASFAMILIES = {
  "nachtschade": ["tomaat", "aardappel", "paprika", "aubergine", "peper"],
  "kruisbloemigen": ["kool", "broccoli", "bloemkool", "radijs", "rucola", "paksoi", "koolrabi", "spruitjes"],
  "vlinderbloemigen": ["boon", "bone", "erwt", "erwtje", "kapucijner", "tuinboon", "snijboon", "prinsessenboon"],
  "cucurbitaceae": ["komkommer", "courgette", "pompoen", "meloen", "kalebas"],
  "composieten": ["sla", "andijvie", "witlof", "artisjok", "zonnebloem", "endive"],
  "leliefamilie": ["ui", "uitje", "knoflook", "prei", "sjalot", "bieslook"],
  "wortelfamilie": ["wortel", "peen", "pastinaak", "venkel", "peterselie", "karwij"],
  "bietfamilie": ["biet", "rode biet", "spinazie", "snijbiet", "mangold", "wortelraap"],
  "grassen": ["mais", "tarwe", "gerst"],
  "overig": []
};

function gewasFamilie(naam) {
  const n = naam.toLowerCase();
  for (const [familie, leden] of Object.entries(GEWASFAMILIES)) {
    if (familie === "overig") continue;
    for (const lid of leden) {
      if (n.includes(lid)) return familie;
    }
  }
  return "overig";
}

const MAANDNAMEN = [
  "januari", "februari", "maart", "april", "mei", "juni",
  "juli", "augustus", "september", "oktober", "november", "december"
];

// Zaaischema per maand (gemiddeld Nederlands klimaat).
const ZAAISCHEMA = {
  1:  { zaai: [], plant: ["stokuien (onder glas)"], oogst: ["winterpostelein", "andijvie (dekfol)"] },
  2:  { zaai: ["pepers", "paprika's", "aubergines (binnen)", "tomaten (binnen, late maand)"], plant: [], oogst: ["wintergroenten", "peterselie"] },
  3:  { zaai: ["erwten", "wortels", "radijs", "spinazie", "sla (onder glas)", "stokbonen (onder glas)"], plant: ["aardappelen (vroeg)", "uitjes", "sjalotten"], oogst: ["spruitjes", "winterkool", "prei"] },
  4:  { zaai: ["wortels", "radijs", "sla", "bieten", "erwten", "koolsoorten", "snijbiet"], plant: ["aardappelen", "uienzetten"], oogst: ["radijs", "spinazie", "lente-uitjes"] },
  5:  { zaai: ["bonen", "maïs", "komkommers (buiten, late maand)", "courgettes", "sla (om de paar weken)"], plant: ["tomaten (buiten, na ijsheiligen)", "paprika", "komkommer"], oogst: ["radijs", "sla", "vroege aardappelen (late maand)"] },
  6:  { zaai: ["bonen", "sla", "wortels (late maand)", "radijs", "andijvie"], plant: ["pompoenen", "koolsoorten", "prei"], oogst: ["sla", "radijs", "eerste courgettes", "doperwten"] },
  7:  { zaai: ["sla (zomersla)", "andijvie", "spinazie (late maand)", "radijs", "herfstbieten"], plant: ["herfstprei"], oogst: ["tomaten", "courgettes", "bonen", "komkommers", "aardappelen"] },
  8:  { zaai: ["spinazie", "winterpostelein", "sla (onder glas)", "rammenas", "winteruitjes"], plant: [], oogst: ["tomaten", "paprika", "courgettes", "pompoenen (late maand)", "bieten", "prei"] },
  9:  { zaai: ["winterradijs", "sla (late maand)", "spinazie"], plant: ["aardbeien (nieuwe planten)", "winterprei"], oogst: ["pompoenen", "tomaten", "bonen", "koolrabi", "maïs"] },
  10: { zaai: ["winteraandijvie (late maand)"], plant: ["knoflook", "winteruitjes"], oogst: ["pompoenen", "knolselderij", "late koolsoorten", "bieten (voor de vorst)"] },
  11: { zaai: [], plant: ["knoflook (late maand)", "winterprei"], oogst: ["spruitjes", "winterkool", "late prei", "wortelen (voor de vorst)"] },
  12: { zaai: [], plant: [], oogst: ["spruitjes", "winterkool", "prei", "pastinaak (na vorst zoeter)"] }
};

const PLAGEN = [
  {
    naam: "Bladluis",
    herkennen: "Kleine (groene, zwarte of grijze) insecten in dichte groepen op jonge scheuten en bladonderkanten. Blad krult en wordt kleverig (honingdauw).",
    aanpak: "Afspuiten met water, lieveheersbeestjes aanlokken, brandnetel- of zeepoplossing spuiten. Sterke planten houden er minder last van."
  },
  {
    naam: "Slakken (naaktslakken)",
    herkennen: "Zilverkleurige slijmsporen en gaten in blad, vooral na regen en 's nachts. Jonge plantjes kunnen in één nacht kaal worden.",
    aanpak: "'s Avonds of vroeg in de ochtend handmatig rapen, koperlint of scherpe mulch rond gevoelige planten, eendenkroosvijver in de buurt vermijden. Vochtplaatsen opdrogen."
  },
  {
    naam: "Witte vlieg",
    herkennen: "Kleine witte vlindertjes die opvliegen als je het blad raakt, plus witte poppjes op de onderkant van blad. Vaak in kas of serre.",
    aanpak: "Gele plakstrips ophangen, aangetast blad verwijderen, natuurlijke vijanden (Encarsia) inzetten in de kas."
  },
  {
    naam: "Meeldauw",
    herkennen: "Witgrijs poederachtig laagje op de bovenkant van blad. Blad wordt daarna geel en droogt. Vooral bij droog, warm weer.",
    aanpak: "Aangetast blad direct weghalen (niet op de compost), planten meer ruimte en lucht geven, onder i.p.v. bovenop de bladeren gieten. Melkverdunde spray kan helpen."
  },
  {
    naam: "Valse meeldauw",
    herkennen: "Geelachtige vlekken aan de bovenkant van het blad met een paarsgrijze dons aan de onderkant. Komt vooral voor bij nat weer.",
    aanpak: "Aangetaste bladeren verwijderen, regenscherm of overkapping bij gevoelige gewassen (sla, ui), niet 's avonds gieten."
  },
  {
    naam: "Rupsen (koolwitje)",
    herkennen: "Gaten in koolbladeren en kleine zwarte streepjes (poep). Groene rupsen op de bladonderkant; bij kool vaak eitjes in legsel.",
    aanpak: "Eitjes en rupsen handmatig zoeken en verwijderen, insectengaas over de koolbedden, vogels aanlokken. Bt-preparaat is een biologisch middel bij ernstige aantasting."
  },
  {
    naam: "Aardappelziekte (phytophthora)",
    herkennen: "Bruine watervlekken op blad met witte schimmelrand aan de onderkant, vooral vochtig warm weer. Knollen worden bruin en rottend.",
    aanpak: "Aangetaste planten direct verwijderen (afvoeren, niet composteren), resistente rassen kiezen, niet bovenop de bladeren gieten, voldoende plantafstand."
  },
  {
    naam: "Mijnvlieg",
    herkennen: "Windinge, lichtgekleurde gangen (minen) in het blad, gemaakt door kleine larfjes. Vooral bij sla, biet en spinazie.",
    aanpak: "Aangetaste bladeren verwijderen, insectengaas over gevoelige gewassen, niet te dicht op elkaar planten."
  },
  {
    naam: "Egelantierzwam / verticillium (verwelkingsziekte)",
    herkennen: "Plant verwelkt ondanks voldoende water, vaak aan één kant. Vaatbundels in de stengel zijn bruinig door gekleurd hout.",
    aanpak: "Geen remedie: aangetaste planten verwijderen. Voorkom via vruchtwisseling en gezonde bodem. Niet meerdere jaren achter elkaar dezelfde familie op een perk."
  },
  {
    naam: "Mieren met bladluizen",
    herkennen: "Mieren lopen op en neer over planten die ook bladluizen hebben: ze 'melken' de luizen en beschermen ze.",
    aanpak: "Bladluizen bestrijden zodat de mieren geen voedsel meer hebben, mierenhoop verplaatsen met een pot, plakband rond stelen bij fruitbomen."
  }
];

const TAAKSJABLONEN = [
  { naam: "Watergeven", freqDagen: 2 },
  { naam: "Onkruid wieden", freqDagen: 7 },
  { naam: "Bemesten (compost)", freqDagen: 30 },
  { naam: "Mulch aanleggen", freqDagen: 60 }
];

// Companion planting: goede en slechte buren per gewas.
const COMPANION = {
  "tomaat": {
    goed: ["basilicum", "wortel", "selderij", "ui", "peterselie", "afrikaantje", "sla"],
    slecht: ["venkel", "kool", "aardappel", "dille (volgroeid)"]
  },
  "paprika": {
    goed: ["basilicum", "ui", "spinazie", "tomaat", "wortel"],
    slecht: ["venkel", "koolrabi", "venkelzaad"]
  },
  "aubergine": {
    goed: ["bonen", "tijm", "afrikaantje", "paprika"],
    slecht: ["venkel"]
  },
  "sla": {
    goed: ["wortel", "radijs", "aardbei", "komkommer", "ui", "biet"],
    slecht: ["peterselie"]
  },
  "kool": {
    goed: ["ui", "selderij", "biet", "dille", "kamille", "munt", "aardappel"],
    slecht: ["tomaat", "venkel", "aardbei", "stokboon"]
  },
  "broccoli": {
    goed: ["ui", "selderij", "biet", "dille", "kamille"],
    slecht: ["tomaat", "aardbei", "venkel"]
  },
  "boon": {
    goed: ["aardappel", "wortel", "komkommer", "mais", "aardbei", "bonenkruid", "radijs"],
    slecht: ["ui", "knoflook", "venkel", "prei"]
  },
  "erwt": {
    goed: ["wortel", "radijs", "komkommer", "mais", "rapen", "bonenkruid"],
    slecht: ["ui", "knoflook", "prei", "sjalot"]
  },
  "ui": {
    goed: ["wortel", "biet", "aardbei", "sla", "kamille", "paprika"],
    slecht: ["boon", "erwt", "asperge", "salie"]
  },
  "knoflook": {
    goed: ["wortel", "biet", "aardbei", "tomaat", "kamille"],
    slecht: ["boon", "erwt", "prei", "aardappel"]
  },
  "prei": {
    goed: ["wortel", "selderij", "ui", "aardbei"],
    slecht: ["boon", "erwt"]
  },
  "wortel": {
    goed: ["ui", "prei", "sla", "erwt", "tomaat", "salie", "rozemarijn", "radijs"],
    slecht: ["dille", "venkel"]
  },
  "biet": {
    goed: ["ui", "sla", "kool", "koolrabi", "knoflook"],
    slecht: ["stokboon", "mosterd"]
  },
  "aardappel": {
    goed: ["boon", "kool", "mais", "mierikswortel", "afrikaantje", "spinazie"],
    slecht: ["tomaat", "komkommer", "zonnebloem", "venkel", "selderij"]
  },
  "komkommer": {
    goed: ["boon", "erwt", "sla", "ui", "dille", "radijs", "zonnebloem"],
    slecht: ["aardappel", "salie", "venkel"]
  },
  "courgette": {
    goed: ["boon", "erwt", "mais", "bernagie", "afrikaantje"],
    slecht: ["aardappel"]
  },
  "pompoen": {
    goed: ["mais", "boon", "bernagie", "afrikaantje"],
    slecht: ["aardappel"]
  },
  "spinazie": {
    goed: ["aardbei", "erwt", "boon", "bloemkool", "radijs", "paprika"],
    slecht: ["venkel"]
  },
  "aardbei": {
    goed: ["bernagie", "sla", "ui", "spinazie", "boon", "prei"],
    slecht: ["kool", "broccoli", "venkel"]
  },
  "mais": {
    goed: ["boon", "erwt", "komkommer", "meloen", "pompoen", "aardappel"],
    slecht: ["tomaat", "selderij"]
  },
  "radijs": {
    goed: ["sla", "wortel", "erwt", "komkommer", "spinazie", "kervel"],
    slecht: ["hyssop"]
  },
  "venkel": {
    goed: [],
    slecht: ["de meeste gewassen — zet venkel apart"]
  },
  "selderij": {
    goed: ["kool", "prei", "tomaat", "boon", "leek"],
    slecht: ["mais", "aardappel", "pastinaak"]
  },
  "kruiden (basilicum, dille, peterselie)": {
    goed: ["tomaat", "paprika", "kool", "wortel"],
    slecht: ["rue (wijnruit)"]
  }
};

function vindCompanions(naam) {
  const n = (naam || "").toLowerCase();
  for (const [sleutel, info] of Object.entries(COMPANION)) {
    const delen = sleutel.split(",").map(s => s.trim().toLowerCase());
    for (const deel of delen) {
      if (n.includes(deel) || deel.includes(n)) return info;
    }
  }
  return null;
}

// Plantafstanden in cm (ruim genomen, voor moestuin op ruggen/bedden).
const PLANTAFSTAND = {
  "tomaat": 50, "paprika": 40, "aubergine": 50, "peper": 40,
  "kool": 50, "broccoli": 50, "bloemkool": 50, "spruit": 60, "paksoi": 30,
  "koolrabi": 30, "radijs": 5, "rucola": 15,
  "boon": 12, "erwt": 6, "tuinboon": 20,
  "komkommer": 50, "courgette": 90, "pompoen": 120, "meloen": 60,
  "sla": 25, "andijvie": 30, "witlof": 30,
  "ui": 10, "knoflook": 10, "prei": 15, "sjalot": 10,
  "wortel": 5, "pastinaak": 10, "venkel": 25,
  "biet": 10, "spinazie": 12, "snijbiet": 30,
  "aardappel": 35, "aardbei": 30, "mais": 35,
  "basilicum": 25, "dille": 25, "peterselie": 15, "selderij": 30, "munt": 30,
  "kamille": 20, "bernagie": 30, "afrikaantje": 20
};

function plantAfstand(naam) {
  const n = (naam || "").toLowerCase();
  for (const [sleutel, cm] of Object.entries(PLANTAFSTAND)) {
    if (n.includes(sleutel)) return cm;
  }
  return 25;
}
