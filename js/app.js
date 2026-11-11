// Moestuin-app: alle logica. Data wordt lokaal op het apparaat bewaard (localStorage).

const OPSLAGSLEUTEL = "moestuin-data-v1";

const legeData = () => ({ perken: [], gewassen: [], taken: [], logboek: [] });

let data = laagData();

function laagData() {
  try {
    const ruw = localStorage.getItem(OPSLAGSLEUTEL);
    if (!ruw) return legeData();
    const parsed = JSON.parse(ruw);
    return Object.assign(legeData(), parsed);
  } catch {
    return legeData();
  }
}

function bewaar() {
  localStorage.setItem(OPSLAGSLEUTEL, JSON.stringify(data));
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ---------- datum helpers ----------
function vandaagISO() {
  return new Date().toISOString().slice(0, 10);
}

function dagenVerschil(iso) {
  const nu = new Date(vandaagISO() + "T00:00:00");
  const dan = new Date(iso + "T00:00:00");
  return Math.round((dan - nu) / 86400000);
}

function mooieDatum(iso) {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("nl-NL", { day: "numeric", month: "short" });
}

function escape(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);
}

// ---------- toast ----------
let toastTimer = null;
function toast(tekst) {
  const el = document.getElementById("toast");
  el.textContent = tekst;
  el.classList.add("zichtbaar");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("zichtbaar"), 2200);
}

// ---------- modal ----------
function openModal(titel, formHtml, bijOpslaan) {
  const modal = document.getElementById("modal");
  modal.innerHTML = `
    <div class="modal-inhoud">
      <h2>${escape(titel)}</h2>
      <form id="modal-form">${formHtml}
        <div class="modal-knoppen">
          <button type="button" class="knop secundair" id="modal-annuleer">Annuleren</button>
          <button type="submit" class="knop">Opslaan</button>
        </div>
      </form>
    </div>`;
  modal.showModal();
  document.getElementById("modal-annuleer").onclick = () => modal.close();
  document.getElementById("modal-form").onsubmit = e => {
    e.preventDefault();
    const waarden = {};
    new FormData(e.target).forEach((v, k) => { waarden[k] = v; });
    bijOpslaan(waarden);
    modal.close();
  };
}

function bevestig(tekst, bijJa) {
  const modal = document.getElementById("modal");
  modal.innerHTML = `
    <div class="modal-inhoud">
      <p style="margin-bottom:14px">${escape(tekst)}</p>
      <div class="modal-knoppen">
        <button class="knop secundair" id="modal-annuleer">Nee</button>
        <button class="knop gevaar" id="modal-ja">Ja, verwijderen</button>
      </div>
    </div>`;
  modal.showModal();
  document.getElementById("modal-annuleer").onclick = () => modal.close();
  document.getElementById("modal-ja").onclick = () => { modal.close(); bijJa(); };
}

// ---------- select opties ----------
function perkOpties(geselecteerd) {
  return data.perken
    .map(p => `<option value="${p.id}" ${p.id === geselecteerd ? "selected" : ""}>${escape(p.naam)}</option>`)
    .join("");
}

function gewasOpties(geselecteerd) {
  return data.gewassen
    .filter(g => g.status !== "klaar")
    .map(g => `<option value="${g.id}" ${g.id === geselecteerd ? "selected" : ""}>${escape(g.naam + (g.ras ? " (" + g.ras + ")" : ""))}</option>`)
    .join("");
}

// ============================================================
// VIEWS
// ============================================================
const views = {};

// ---------- START ----------
views.start = function () {
  const vandaag = vandaagISO();
  const taken = data.taken.slice().sort((a, b) => a.volgendeDatum.localeCompare(b.volgendeDatum));
  const achterstall = taken.filter(t => t.volgendeDatum < vandaag);
  const vandaagMorgen = taken.filter(t => t.volgendeDatum === vandaag);
  const actieveGewassen = data.gewassen.filter(g => g.status !== "klaar").length;
  const maand = new Date().getMonth() + 1;
  const schema = ZAAISCHEMA[maand];

  const taakRij = t => {
    const cls = t.volgendeDatum < vandaag ? "achterstall" : t.volgendeDatum === vandaag ? "vandaag" : "";
    const verschild = dagenVerschil(t.volgendeDatum);
    const label = verschild < 0 ? `${-verschild} d. te laat` : verschild === 0 ? "vandaag" : `over ${verschild} d.`;
    const badge = verschild < 0 ? '<span class="badge rood">te laat</span>'
      : verschild === 0 ? '<span class="badge oranje">vandaag</span>' : "";
    return `
      <div class="taak ${cls}">
        <input type="checkbox" data-afvink="${t.id}">
        <div class="info">
          <div class="naam">${escape(t.naam)}</div>
          <div class="meta">${escape(perkNaam(t.perkId))} · elke ${t.freqDagen} d. · volgende: ${mooieDatum(t.volgendeDatum)} · ${label}</div>
        </div>
        ${badge}
      </div>`;
  };

  return `
    ${toonInstallHint()}
    <div class="tegels">
      <div class="tegel"><div class="getal">${achterstall.length}</div><div class="label">taken te laat</div></div>
      <div class="tegel"><div class="getal">${vandaagMorgen.length}</div><div class="label">taken vandaag</div></div>
      <div class="tegel"><div class="getal">${actieveGewassen}</div><div class="label">gewassen actief</div></div>
    </div>

    <div class="kaart">
      <h2>Nu in de tuin (${MAANDNAMEN[maand - 1]})</h2>
      <div class="kalender-groep"><span class="kop zaai">Zaaien</span>
        <ul>${schema.zaai.length ? schema.zaai.map(x => `<li>${x}</li>`).join("") : "<li>—</li>"}</ul></div>
      <div class="kalender-groep"><span class="kop oogst">Oogsten</span>
        <ul>${schema.oogst.length ? schema.oogst.map(x => `<li>${x}</li>`).join("") : "<li>—</li>"}</ul></div>
    </div>

    <div class="kaart">
      <div class="sectie-kop"><h2>Taken</h2>
        <button class="knop klein secundair" data-ga="taken">Alles bekijken</button></div>
      ${taken.length ? taken.slice(0, 6).map(taakRij).join("") : '<div class="leeg">Nog geen taken. Voeg ze toe via het tabblad Taken.</div>'}
    </div>`;
};

function toonInstallHint() {
  if (window.matchMedia("(display-mode: standalone)").matches || navigator.standalone) return "";
  return `<div class="install-hint">
    <strong>Tip:</strong> installeer deze app op je telefoon via het menu van je browser
    → <em>"Toevoegen aan startscherm"</em>. Daarna werkt hij ook offline.
  </div>`;
}

// ---------- PERKEN ----------
function perkNaam(perkId) {
  const p = data.perken.find(x => x.id === perkId);
  return p ? p.naam : "hele tuin";
}

views.perken = function () {
  const lijst = data.perken.map(p => {
    const gewassen = data.gewassen.filter(g => g.perkId === p.id && g.status !== "klaar");
    const waarschuwingen = vruchtwisselingsCheck(p.id);
    return `
      <div class="kaart">
        <div class="item">
          <div class="info">
            <div class="titel">${escape(p.naam)}</div>
            <div class="sub">${gewassen.length ? gewassen.map(g => escape(g.naam)).join(", ") : "leeg"}${p.opmerking ? " · " + escape(p.opmerking) : ""}</div>
          </div>
          <div class="acties">
            <button class="knop klein secundair" data-bewerk-perk="${p.id}">Bewerk</button>
            <button class="knop klein gevaar" data-verwijder-perk="${p.id}">×</button>
          </div>
        </div>
        ${waarschuwingen.map(w => `<div class="waarschuwing">⚠️ ${escape(w)}</div>`).join("")}
      </div>`;
  }).join("");

  return `
    <div class="sectie-kop"><h2>Mijn perken</h2>
      <button class="knop klein" data-nieuw-perk>+ Nieuw perk</button></div>
    ${lijst || '<div class="kaart"><div class="leeg">Nog geen perken. Begin met het aanmaken van je eerste perk (bijv. "Perk 1" of "Kas").</div></div>'}`;
};

function perkFormulier(perk) {
  perk = perk || {};
  return `
    <label class="veld">Naam<input name="naam" required value="${escape(perk.naam || "")}" placeholder="bijv. Perk 1"></label>
    <label class="veld">Opmerking (optioneel)<input name="opmerking" value="${escape(perk.opmerking || "")}" placeholder="bijv. zandgrond, halfdag zon"></label>`;
}

// vruchtwisseling: zelfde familie twee jaar achter elkaar op hetzelfde perk
function vruchtwisselingsCheck(perkId) {
  const waarschuwingen = [];
  const perJaar = {};
  for (const g of data.gewassen) {
    if (g.perkId !== perkId) continue;
    const jaar = g.jaar || new Date().getFullYear();
    (perJaar[jaar] = perJaar[jaar] || []).push(gewasFamilie(g.naam));
  }
  const jaren = Object.keys(perJaar).sort().reverse();
  for (let i = 0; i < jaren.length - 1; i++) {
    const dit = new Set(perJaar[jaren[i]]);
    const vorig = new Set(perJaar[jaren[i + 1]]);
    for (const fam of dit) {
      if (fam !== "overig" && vorig.has(fam)) {
        waarschuwingen.push(`${fam} stond hier ook in ${jaren[i + 1]} — kies volgend jaar een ander perk voor deze familie (vruchtwisseling).`);
      }
    }
  }
  return waarschuwingen;
}

// ---------- GEWASSEN ----------
views.gewassen = function () {
  const lijst = data.gewassen.slice().sort((a, b) => (b.jaar || 0) - (a.jaar || 0)).map(g => {
    const familie = gewasFamilie(g.naam);
    const statusKleur = g.status === "klaar" ? "groen" : g.status === "oogsten" ? "oranje" : "groen";
    const comp = vindCompanions(g.naam);
    const compRegel = comp
      ? `<div class="sub" style="margin-top:6px;"><span style="color:var(--groen);">✓ goed bij:</span> ${comp.goed.map(escape).join(", ") || "—"}<br><span style="color:var(--rood);">✗ vermijd:</span> ${comp.slecht.map(escape).join(", ")}</div>`
      : "";
    return `
      <div class="kaart">
        <div class="item">
          <div class="info">
            <div class="titel">${escape(g.naam)}${g.ras ? ` <small>(${escape(g.ras)})</small>` : ""}</div>
            <div class="sub">${escape(perkNaam(g.perkId))} · ${escape(familie)} · ${g.jaar || new Date().getFullYear()}
              ${g.zaaidatum ? " · gezaaid " + mooieDatum(g.zaaidatum) : ""}${g.oogstDatum ? " · oogst " + mooieDatum(g.oogstDatum) : ""}</div>
          </div>
          <span class="badge ${statusKleur}">${escape(g.status)}</span>
        </div>
        ${compRegel}
        <div class="acties" style="justify-content:flex-end; display:flex; gap:6px;">
          <button class="knop klein secundair" data-log-gewas="${g.id}">+ Log</button>
          <button class="knop klein secundair" data-bewerk-gewas="${g.id}">Bewerk</button>
          <button class="knop klein gevaar" data-verwijder-gewas="${g.id}">×</button>
        </div>
      </div>`;
  }).join("");

  return `
    <div class="sectie-kop"><h2>Gewassen</h2>
      <button class="knop klein" data-nieuw-gewas>+ Nieuw gewas</button></div>
    ${lijst || '<div class="kaart"><div class="leeg">Nog geen gewassen. Voeg je eerste gewas toe!</div></div>'}`;
};

function gewasFormulier(gewas) {
  gewas = gewas || {};
  const statusOpties = ["gezaaid", "groeit", "oogsten", "klaar"]
    .map(s => `<option ${s === (gewas.status || "gezaaid") ? "selected" : ""}>${s}</option>`).join("");
  return `
    <label class="veld">Gewas<input name="naam" required value="${escape(gewas.naam || "")}" placeholder="bijv. tomaat"></label>
    <label class="veld">Ras (optioneel)<input name="ras" value="${escape(gewas.ras || "")}" placeholder="bijv. San Marzano"></label>
    <label class="veld">Perk<select name="perkId"><option value="">— geen —</option>${perkOpties(gewas.perkId)}</select></label>
    <div class="form-rij">
      <label class="veld">Zaaidatum<input type="date" name="zaaidatum" value="${escape(gewas.zaaidatum || "")}"></label>
      <label class="veld">Oogstdatum<input type="date" name="oogstDatum" value="${escape(gewas.oogstDatum || "")}"></label>
    </div>
    <label class="veld">Status<select name="status">${statusOpties}</select></label>
    <label class="veld">Opmerking<textarea name="opmerking">${escape(gewas.opmerking || "")}</textarea></label>`;
}

// ---------- TAKEN ----------
views.taken = function () {
  const vandaag = vandaagISO();
  const lijst = data.taken.slice().sort((a, b) => a.volgendeDatum.localeCompare(b.volgendeDatum)).map(t => {
    const verschild = dagenVerschil(t.volgendeDatum);
    const cls = verschild < 0 ? "achterstall" : verschild === 0 ? "vandaag" : "";
    const badge = verschild < 0 ? '<span class="badge rood">te laat</span>'
      : verschild === 0 ? '<span class="badge oranje">vandaag</span>'
      : `<span class="badge groen">over ${verschild} d.</span>`;
    return `
      <div class="taak ${cls}">
        <input type="checkbox" data-afvink="${t.id}">
        <div class="info">
          <div class="naam">${escape(t.naam)}</div>
          <div class="meta">${escape(perkNaam(t.perkId))} · elke ${t.freqDagen} d. · volgende: ${mooieDatum(t.volgendeDatum)}</div>
        </div>
        ${badge}
        <div class="acties">
          <button class="knop klein secundair" data-bewerk-taak="${t.id}">✎</button>
          <button class="knop klein gevaar" data-verwijder-taak="${t.id}">×</button>
        </div>
      </div>`;
  }).join("");

  return `
    <div class="sectie-kop"><h2>Taken</h2>
      <button class="knop klein" data-nieuw-taak>+ Nieuwe taak</button></div>
    <div class="kaart">${lijst || '<div class="leeg">Nog geen taken.</div>'}</div>
    <div class="kaart">
      <h2>Snel toevoegen</h2>
      ${TAAKSJABLONEN.map((s, i) => `<button class="knop klein secundair" data-sjabloon="${i}" style="margin:0 6px 6px 0;">${s.naam}</button>`).join("")}
    </div>`;
};

function taakFormulier(taak) {
  taak = taak || {};
  return `
    <label class="veld">Taak<input name="naam" required value="${escape(taak.naam || "")}" placeholder="bijv. Watergeven"></label>
    <label class="veld">Perk<select name="perkId"><option value="">— hele tuin —</option>${perkOpties(taak.perkId)}</select></label>
    <div class="form-rij">
      <label class="veld">Elke … dagen<input type="number" name="freqDagen" min="1" required value="${taak.freqDagen || 2}"></label>
      <label class="veld">Volgende keer<input type="date" name="volgendeDatum" required value="${escape(taak.volgendeDatum || vandaagISO())}"></label>
    </div>`;
}

// ---------- LOGBOEK ----------
views.logboek = function () {
  const lijst = data.logboek.slice().sort((a, b) => b.datum.localeCompare(a.datum)).map(l => {
    const gewas = data.gewassen.find(g => g.id === l.cropId);
    return `
      <div class="log-item">
        <div class="datum-klein">${mooieDatum(l.datum)}${gewas ? " · " + escape(gewas.naam) : ""}</div>
        <span class="type">${escape(l.type)}</span>${escape(l.tekst)}
        <div style="text-align:right"><button class="knop klein gevaar" data-verwijder-log="${l.id}">×</button></div>
      </div>`;
  }).join("");

  return `
    <div class="sectie-kop"><h2>Groei-logboek</h2>
      <button class="knop klein" data-nieuw-log>+ Nieuwe notitie</button></div>
    <div class="kaart">${lijst || '<div class="leeg">Nog geen notities. Leg vast wanneer je zaait, wat kiemt en wat je oogst!</div>'}</div>`;
};

function logFormulier(log) {
  log = log || {};
  const types = ["zaai", "kieming", "uitplanten", "oogst", "plaag", "opmerking", "anders"]
    .map(t => `<option ${t === (log.type || "opmerking") ? "selected" : ""}>${t}</option>`).join("");
  return `
    <label class="veld">Gewas (optioneel)<select name="cropId"><option value="">— geen —</option>${gewasOpties(log.cropId)}</select></label>
    <div class="form-rij">
      <label class="veld">Datum<input type="date" name="datum" required value="${escape(log.datum || vandaagISO())}"></label>
      <label class="veld">Type<select name="type">${types}</select></label>
    </div>
    <label class="veld">Notitie<textarea name="tekst" required>${escape(log.tekst || "")}</textarea></label>`;
}

// ---------- KALENDER ----------
let kalenderMaand = new Date().getMonth() + 1;

views.kalender = function () {
  const schema = ZAAISCHEMA[kalenderMaand];
  const groep = (label, cls, items) => `
    <div class="kalender-groep">
      <span class="kop ${cls}">${label}</span>
      <ul>${items.length ? items.map(x => `<li>${x}</li>`).join("") : "<li>—</li>"}</ul>
    </div>`;

  return `
    <div class="maand-navigatie">
      <button class="knop klein secundair" data-maand="-1">←</button>
      <h2>${MAANDNAMEN[kalenderMaand - 1]}</h2>
      <button class="knop klein secundair" data-maand="1">→</button>
    </div>
    <div class="kaart kalender-lijst">
      ${groep("Zaaien", "zaai", schema.zaai)}
      ${groep("Planten", "plant", schema.plant)}
      ${groep("Oogsten", "oogst", schema.oogst)}
    </div>
    <div class="kaart"><p style="font-size:0.82rem; color:var(--grijs); line-height:1.5;">
      Dit schema is gebaseerd op het gemiddelde Nederlandse klimaat. Pas in jouw regio of bij een kas
      kan alles een paar weken verschuiven.</p></div>`;
};

// ---------- BUREN (companion planting) ----------
views.buren = function () {
  const kaart = (sleutel, info) => `
    <div class="kaart plaag">
      <h3>${escape(sleutel)}</h3>
      ${info.goed.length ? `<p><span style="color:var(--groen); font-weight:600;">✓ Goede buren:</span> ${info.goed.map(escape).join(", ")}</p>` : ""}
      ${info.slecht.length ? `<p><span style="color:var(--rood); font-weight:600;">✗ Vermijd:</span> ${info.slecht.map(escape).join(", ")}</p>` : ""}
    </div>`;
  return `
    <div class="sectie-kop"><h2>Companion planting</h2></div>
    <div class="kaart"><p style="font-size:0.85rem; color:var(--grijs); line-height:1.5;">
      Sommige gewassen versterken elkaar (betere groei, minder plagen), anderen remmen elkaar af.
      Zet goede buren naast elkaar op hetzelfde perk en houd slechte combinaties uit elkaar.</p></div>
    ${Object.entries(COMPANION).map(([s, i]) => kaart(s, i)).join("")}`;
};

// ---------- PLAGEN ----------
views.plagen = function () {
  return `
    <div class="sectie-kop"><h2>Plagen & ziektes</h2></div>
    ${PLAGEN.map(p => `
      <div class="kaart plaag">
        <div class="kop-rij"><h3>${escape(p.naam)}</h3></div>
        <p><strong>Herkennen:</strong> ${escape(p.herkennen)}</p>
        <p class="aanpak">${escape(p.aanpak)}</p>
      </div>`).join("")}`;
};

// ---------- MEER ----------
views.meer = function () {
  return `
    <div class="sectie-kop"><h2>Meer</h2></div>
    <div class="kaart">
      <h2>Back-up maken</h2>
      <p style="font-size:0.85rem; color:var(--grijs); margin-bottom:10px;">
        Je gegevens staan op dit apparaat. Maak regelmatig een back-upbestand
        en bewaar het bijv. in je e-mail of op Google Drive.</p>
      <button class="knop" data-export>⬇ Back-up downloaden</button>
    </div>
    <div class="kaart">
      <h2>Terugzetten</h2>
      <p style="font-size:0.85rem; color:var(--grijs); margin-bottom:10px;">
        Let op: dit vervangt de huidige gegevens.</p>
      <input type="file" id="import-bestand" accept=".json" style="font-size:0.85rem;">
    </div>
    <div class="kaart">
      <h2>Alles wissen</h2>
      <button class="knop gevaar" data-wis-alles>Alle gegevens wissen</button>
    </div>`;
};

// ============================================================
// RENDERING & EVENTS
// ============================================================
let huidigeTab = "start";

function render() {
  document.getElementById("inhoud").innerHTML = views[huidigeTab]();
  document.querySelectorAll("#tabs button").forEach(b =>
    b.classList.toggle("active", b.dataset.tab === huidigeTab));
}

function gaNaar(tab) {
  huidigeTab = tab;
  render();
  window.scrollTo(0, 0);
}

document.getElementById("tabs").addEventListener("click", e => {
  const btn = e.target.closest("button[data-tab]");
  if (btn) gaNaar(btn.dataset.tab);
});

document.getElementById("datum-vandaag").textContent =
  new Date().toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" });

// centrale klik-afhandeling
document.getElementById("inhoud").addEventListener("click", e => {
  const d = e.target.dataset;

  if (d.ga) return gaNaar(d.ga);

  if (d.afvink !== undefined || e.target.matches('input[data-afvink]')) return; // via change-event

  if (d.nieuwPerk !== undefined || d.nieuwPerk === "") {
    return openModal("Nieuw perk", perkFormulier(), w => {
      data.perken.push({ id: uid(), naam: w.naam, opmerking: w.opmerking });
      bewaar(); render(); toast("Perk toegevoegd");
    });
  }
  if (d.bewerkPerk) {
    const perk = data.perken.find(p => p.id === d.bewerkPerk);
    return openModal("Perk bewerken", perkFormulier(perk), w => {
      Object.assign(perk, { naam: w.naam, opmerking: w.opmerking });
      bewaar(); render(); toast("Perk bijgewerkt");
    });
  }
  if (d.verwijderPerk) {
    return bevestig("Perk verwijderen? Gewassen die eraan hangen blijven bestaan.", () => {
      data.perken = data.perken.filter(p => p.id !== d.verwijderPerk);
      bewaar(); render(); toast("Perk verwijderd");
    });
  }

  if (d.nieuwGewas !== undefined) {
    return openModal("Nieuw gewas", gewasFormulier(), w => {
      data.gewassen.push({
        id: uid(), naam: w.naam, ras: w.ras, perkId: w.perkId || null,
        zaaidatum: w.zaaidatum || null, oogstDatum: w.oogstDatum || null,
        status: w.status, opmerking: w.opmerking,
        jaar: new Date().getFullYear()
      });
      bewaar(); render(); toast("Gewas toegevoegd");
    });
  }
  if (d.bewerkGewas) {
    const g = data.gewassen.find(x => x.id === d.bewerkGewas);
    return openModal("Gewas bewerken", gewasFormulier(g), w => {
      Object.assign(g, {
        naam: w.naam, ras: w.ras, perkId: w.perkId || null,
        zaaidatum: w.zaaidatum || null, oogstDatum: w.oogstDatum || null,
        status: w.status, opmerking: w.opmerking
      });
      bewaar(); render(); toast("Gewas bijgewerkt");
    });
  }
  if (d.verwijderGewas) {
    return bevestig("Gewas verwijderen? Ook de logboeknotities blijven staan.", () => {
      data.gewassen = data.gewassen.filter(g => g.id !== d.verwijderGewas);
      bewaar(); render(); toast("Gewas verwijderd");
    });
  }

  if (d.nieuwTaak !== undefined) {
    return openModal("Nieuwe taak", taakFormulier(), w => {
      data.taken.push({
        id: uid(), naam: w.naam, perkId: w.perkId || null,
        freqDagen: Math.max(1, parseInt(w.freqDagen, 10) || 1),
        volgendeDatum: w.volgendeDatum
      });
      bewaar(); render(); toast("Taak toegevoegd");
    });
  }
  if (d.sjabloon !== undefined) {
    const s = TAAKSJABLONEN[parseInt(d.sjabloon, 10)];
    return openModal("Nieuwe taak: " + s.naam, taakFormulier({ naam: s.naam, freqDagen: s.freqDagen }), w => {
      data.taken.push({
        id: uid(), naam: w.naam, perkId: w.perkId || null,
        freqDagen: Math.max(1, parseInt(w.freqDagen, 10) || 1),
        volgendeDatum: w.volgendeDatum
      });
      bewaar(); render(); toast("Taak toegevoegd");
    });
  }
  if (d.bewerkTaak) {
    const t = data.taken.find(x => x.id === d.bewerkTaak);
    return openModal("Taak bewerken", taakFormulier(t), w => {
      Object.assign(t, {
        naam: w.naam, perkId: w.perkId || null,
        freqDagen: Math.max(1, parseInt(w.freqDagen, 10) || 1),
        volgendeDatum: w.volgendeDatum
      });
      bewaar(); render(); toast("Taak bijgewerkt");
    });
  }
  if (d.verwijderTaak) {
    return bevestig("Taak verwijderen?", () => {
      data.taken = data.taken.filter(t => t.id !== d.verwijderTaak);
      bewaar(); render(); toast("Taak verwijderd");
    });
  }

  if (d.nieuwLog !== undefined || d.logGewas) {
    const voorGewas = d.logGewas || "";
    return openModal("Nieuwe notitie", logFormulier({ cropId: voorGewas }), w => {
      data.logboek.push({
        id: uid(), cropId: w.cropId || null, datum: w.datum,
        type: w.type, tekst: w.tekst
      });
      bewaar(); render(); toast("Notitie toegevoegd");
    });
  }
  if (d.verwijderLog) {
    return bevestig("Notitie verwijderen?", () => {
      data.logboek = data.logboek.filter(l => l.id !== d.verwijderLog);
      bewaar(); render(); toast("Notitie verwijderd");
    });
  }

  if (d.maand) {
    kalenderMaand = ((kalenderMaand - 1 + parseInt(d.maand, 10) + 12) % 12) + 1;
    return render();
  }

  if (d.export !== undefined) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "moestuin-backup-" + vandaagISO() + ".json";
    a.click();
    URL.revokeObjectURL(a.href);
    return toast("Back-up gedownload");
  }

  if (d.wisAlles !== undefined) {
    return bevestig("Alles wissen? Dit kan niet ongedaan gemaakt worden. Maak eerst een back-up!", () => {
      data = legeData();
      bewaar(); render(); toast("Alle gegevens gewist");
    });
  }
});

// taak afvinken (change-event)
document.getElementById("inhoud").addEventListener("change", e => {
  if (e.target.matches("input[data-afvink]")) {
    const taak = data.taken.find(t => t.id === e.target.dataset.afvink);
    if (!taak) return;
    const laatste = new Date(taak.volgendeDatum + "T00:00:00");
    const nu = new Date(vandaagISO() + "T00:00:00");
    const basis = laatste > nu ? laatste : nu;
    basis.setDate(basis.getDate() + taak.freqDagen);
    taak.volgendeDatum = basis.toISOString().slice(0, 10);
    bewaar();
    toast(`"${taak.naam}" gedaan — volgende keer ${mooieDatum(taak.volgendeDatum)}`);
    render();
  }
});

// importeren
document.addEventListener("change", e => {
  if (e.target.id !== "import-bestand") return;
  const bestand = e.target.files[0];
  if (!bestand) return;
  const lezer = new FileReader();
  lezer.onload = () => {
    try {
      const nieuw = JSON.parse(lezer.result);
      if (!Array.isArray(nieuw.perken) || !Array.isArray(nieuw.gewassen)) throw new Error("onjuist formaat");
      data = Object.assign(legeData(), nieuw);
      bewaar(); render(); toast("Back-up teruggezet");
    } catch {
      toast("Ongeldig back-upbestand");
    }
  };
  lezer.readAsText(bestand);
});

// service worker registreren (offline gebruik)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

render();
