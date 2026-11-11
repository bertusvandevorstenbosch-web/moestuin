// Cruquius Crafts site: routering en weergave.

function euro(bedrag) {
  return "€ " + bedrag.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function nldatum(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

function whatsappLink(tekst) {
  return "https://wa.me/" + SITE.whatsappNummer + "?text=" + encodeURIComponent(tekst);
}

function productKaart(p) {
  return `
    <div class="kaart">
      <img class="afbeelding" src="${p.afbeelding}" alt="${p.naam}">
      <div class="inhoud">
        <span class="badge ${p.soort === "ceramiek" ? "terracotta" : ""}">${p.soort}</span>
        <h3>${p.naam}</h3>
        <p class="beschrijving">${p.beschrijving}</p>
        <div class="prijs">${euro(p.prijs)}</div>
        ${p.opVoorraad
          ? `<a class="knop groen klein" target="_blank" rel="noopener" href="${whatsappLink("Hallo Cruquius Crafts! Ik wil graag bestellen: " + p.naam + " (" + euro(p.prijs) + ").")}">Bestel via WhatsApp</a>`
          : `<span class="badge uit">uitverkocht</span>`}
      </div>
    </div>`;
}

function workshopKaart(w) {
  return `
    <div class="kaart workshop">
      <img class="afbeelding" src="images/workshop-${w.type}.svg" alt="${w.naam}">
      <div class="inhoud">
        <div class="meta-rij">
          <span class="badge ${w.type === "ceramiek" ? "terracotta" : ""}">${w.type}</span>
          <span class="badge">${nldatum(w.datum)}</span>
          <span class="badge">${w.duur}</span>
        </div>
        <h3>${w.naam}</h3>
        <p class="beschrijving">${w.beschrijving}</p>
        <div class="prijs">${euro(w.prijs)} <small style="color:var(--grijs); font-weight:400;">per persoon · ${w.plekken} plekken</small></div>
        ${w.opVoorraad
          ? `<a class="knop primair klein" target="_blank" rel="noopener" href="${whatsappLink("Hallo! Ik meld me aan voor de workshop '" + w.naam + "' op " + nldatum(w.datum) + ".")}">Meld je aan</a>`
          : `<span class="badge uit">vol</span>`}
      </div>
    </div>`;
}

const views = {};

views.home = function () {
  const laatste = BLOGPOSTS.slice(0, 2);
  const inDeShop = PRODUCTEN.filter(p => p.opVoorraad).slice(0, 3);
  return `
    <section class="banner-sectie">
      <img class="banner" src="images/banner.png" alt="Cruquius Crafts — lokaal, ambachtelijk, met passie">
      <div class="hero-knoppen">
        <a class="knop primair" href="#/winkel">Bekijk de winkel</a>
        <a class="knop groen" href="#/workshops">Workshops</a>
      </div>
    </section>

    <section class="sectie">
      <div class="twee-kolommen">
        <div class="kaart persoon">
          <div class="avatar">🏺</div>
          <h3>Anna — ceramiek</h3>
          <p>Handgedraaid steengoed: mokken, schalen en kommen voor elke dag. Elk stuk uniek, gebakken op hoge temperatuur.</p>
        </div>
        <div class="kaart persoon">
          <div class="avatar">🍅</div>
          <h3>Koken uit de tuin</h3>
          <p>Sauzen, kruidenzout en seizoensproducten — gemaakt van wat de moestuin geeft, in kleine batches.</p>
        </div>
      </div>
    </section>

    <section class="sectie">
      <div class="sectie-kop"><h2>Nieuw in de winkel</h2><a href="#/winkel">alles bekijken →</a></div>
      <div class="grid">${inDeShop.map(productKaart).join("")}</div>
    </section>

    <section class="sectie">
      <div class="sectie-kop"><h2>Van het blog</h2><a href="#/blog">alle verhalen →</a></div>
      <div class="grid">
        ${laatste.map(p => `
          <a class="kaart post-kaart" href="#/blog/${p.slug}" style="text-decoration:none; color:inherit;">
            <img class="afbeelding" src="${p.afbeelding}" alt="">
            <div class="inhoud">
              <div class="datum">${nldatum(p.datum)}</div>
              <h3>${p.titel}</h3>
              <p class="beschrijving">${p.inleiding}</p>
            </div>
          </a>`).join("")}
      </div>
    </section>`;
};

views.winkel = function () {
  const ceramiek = PRODUCTEN.filter(p => p.soort === "ceramiek");
  const keuken = PRODUCTEN.filter(p => p.soort === "keuken");
  return `
    <div class="sectie-kop"><h2>Winkel</h2></div>
    <p style="max-width:640px; color:var(--grijs); margin-bottom:20px;">
      Alles is handgemaakt en in beperkte hoeveelheid. Bestellen doe je via WhatsApp —
      we sturen je dan de betaal- en afhaalmogelijkheden. Ophalen in ${SITE.plaats} of afspreken.</p>
    <h2 style="font-size:1.15rem; margin-bottom:12px;">🏺 Ceramiek</h2>
    <div class="grid">${ceramiek.map(productKaart).join("")}</div>
    <h2 style="font-size:1.15rem; margin:28px 0 12px;">🫙 Uit de keuken</h2>
    <div class="grid">${keuken.map(productKaart).join("")}</div>`;
};

views.workshops = function () {
  return `
    <div class="sectie-kop"><h2>Workshops &amp; evenementen</h2></div>
    <p style="max-width:640px; color:var(--grijs); margin-bottom:20px;">
      Kom langs op de boerderij. Groepen zijn klein, dus meld je op tijd aan via WhatsApp.</p>
    <div class="grid">${WORKSHOPS.map(workshopKaart).join("")}</div>`;
};

views.blog = function () {
  return `
    <div class="sectie-kop"><h2>Blog</h2></div>
    <div class="grid">
      ${BLOGPOSTS.map(p => `
        <a class="kaart post-kaart" href="#/blog/${p.slug}" style="text-decoration:none; color:inherit;">
          <img class="afbeelding" src="${p.afbeelding}" alt="">
          <div class="inhoud">
            <div class="datum">${nldatum(p.datum)} · ${p.auteur}</div>
            <h3>${p.titel}</h3>
            <p class="beschrijving">${p.inleiding}</p>
          </div>
        </a>`).join("")}
    </div>`;
};

views.blogPost = function (slug) {
  const p = BLOGPOSTS.find(x => x.slug === slug);
  if (!p) return '<div class="leeg">Dit verhaal bestaat niet (meer).</div>';
  return `
    <article class="artikel">
      <a class="terug" href="#/blog">← alle verhalen</a>
      <h1>${p.titel}</h1>
      <div class="meta">${nldatum(p.datum)} · ${p.auteur}</div>
      <img class="afbeelding" src="${p.afbeelding}" alt="">
      <div class="tekst">${p.tekst}</div>
    </article>`;
};

views.over = function () {
  return `
    <div class="sectie-kop"><h2>Over ons</h2></div>
    <div class="artikel">
      <p>Cruquius Crafts is een urban boerderij in ${SITE.plaats}. Op een gewone wijk-tuin
      groeit meer dan je denkt: een kas vol tomaten, vier verhoogde bedden, en een keuken
      waar alles terechtkomt.</p>
      <p>Anna is de handen achter het ceramiek: alles wordt zelf gedraaid en gebakken,
      in kleine series en eenmalige stukken. De moestuin levert de rest — en wat we niet
      vers eten, wordt saus, kruidenzout of iets anders lekkers.</p>
      <p>We geloven in seizoensgebonden werken, eerlijke prijzen voor handwerk,
      en dat goed eten op goed servies hoort.</p>
      <div class="contact-blok">
        <strong>Vragen of iets bestellen?</strong><br>
        Stuur een bericht via <a target="_blank" rel="noopener" href="${whatsappLink("Hallo Cruquius Crafts!")}">WhatsApp</a>
        of mail naar <a href="mailto:${SITE.email}">${SITE.email}</a>.
      </div>
    </div>`;
};

views.contact = views.over;

function render() {
  const hash = location.hash.replace(/^#\/?/, "");
  const delen = hash.split("/");
  const app = document.getElementById("app");

  let html;
  if (hash === "") html = views.home();
  else if (delen[0] === "winkel") html = views.winkel();
  else if (delen[0] === "workshops") html = views.workshops();
  else if (delen[0] === "blog" && delen[1]) html = views.blogPost(delen[1]);
  else if (delen[0] === "blog") html = views.blog();
  else if (delen[0] === "over" || delen[0] === "contact") html = views.over();
  else html = '<div class="leeg">Pagina niet gevonden. <a href="#/">Terug naar home</a></div>';

  app.innerHTML = html;
  document.querySelectorAll("#nav a").forEach(a =>
    a.classList.toggle("actief", a.getAttribute("href") === "#/" + (delen[0] || "")));
  if (!(delen[0] === "blog" && delen[1])) window.scrollTo(0, 0);
}

window.addEventListener("hashchange", render);
render();
