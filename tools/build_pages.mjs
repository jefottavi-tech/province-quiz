// Generates the static pages that need absolute URLs or per-province
// Open Graph tags (social previews can't run JavaScript):
//   index.html, p/<slug>/index.html (13 share pages), credits/index.html
// Run after editing js/config.js (SITE_URL), js/data.js or img/credits.json:
//   node tools/build_pages.mjs
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import vm from "node:vm";
import { createHash } from "node:crypto";

const root = new URL("../", import.meta.url);
const read = (f) => readFileSync(new URL(f, root), "utf8");
const write = (f, s) => { mkdirSync(new URL(f.replace(/[^/]*$/, ""), root), { recursive: true }); writeFileSync(new URL(f, root), s); };

const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ["js/config.js", "js/data.js"]) vm.runInContext(read(f), ctx);
const { QUIZ_CONFIG: C, QUIZ_DATA: D } = ctx.window;
const credits = JSON.parse(read("img/credits.json"));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const TITLE = "Quelle province canadienne est faite pour vous ?";
const DESC = "20 questions, 3 minutes : découvrez la province ou le territoire du Canada qui vous correspond.";

function page({ base, title, desc, url, image, body, page = "home" }) {
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#d52b1e">
<meta property="og:type" content="website">
<meta property="og:locale" content="fr_FR">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${C.SITE_URL}/img/${image}.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${base}img/flag.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&display=swap">
<link rel="stylesheet" href="${base}css/style.css">
<style>:root { --photo: url(${base}img/${image}.jpg); }</style>
</head>
<body data-page="${page}">
<div class="backdrop"></div>
<main class="app">
${body}
</main>
</body>
</html>
`;
}

const provinceChips = Object.values(D.provinces).map((p) => `<span>${esc(p.name)}</span>`).join("");

function landing({ base, image, kicker, heading }) {
  return `  <section class="hero">
    <img class="bg" src="${base}img/${image}.jpg" alt="" fetchpriority="high">
    <img class="flag" src="${base}img/flag.svg" alt="Drapeau du Canada">
    ${kicker ? `<p class="eyebrow">${kicker}</p>` : ""}
    <h1>${heading}</h1>
    <p>Climat, travail, langue, mode de vie : trouvez la région du Canada qui vous ressemble.</p>
    <div class="chips"><span class="chip">⏱ 3 minutes</span><span class="chip">20 questions</span><span class="chip">🇨🇦 13 régions</span></div>
  </section>
  <div class="start">
    <a class="btn btn-red pulse" href="${base}question/?q=1&amp;a=">Commencer le quiz →</a>
    <p class="note">Gratuit, sans inscription. Résultat immédiat.</p>
  </div>
  <div class="provinces">${provinceChips}</div>`;
}

// Landing page
write("index.html", page({
  base: "", title: TITLE, desc: DESC, url: `${C.SITE_URL}/`, image: "ab-moraine",
  body: landing({ base: "", image: "ab-moraine", heading: "Quelle province canadienne est faite <em>pour vous</em> ?" }),
}));

// Share pages: what friends land on from a shared result
rmSync(new URL("p/", root), { recursive: true, force: true });
for (const p of Object.values(D.provinces)) {
  const title = `Je suis fait(e) pour ${p.art} ! Et vous ?`;
  write(`p/${p.slug}/index.html`, page({
    base: "../../", title, desc: `${p.tag}. ${DESC}`, url: `${C.SITE_URL}/p/${p.slug}/`, image: p.img,
    body: landing({
      base: "../../", image: p.img,
      kicker: `Votre ami(e) est fait(e) pour ${esc(p.art)} 🇨🇦`,
      heading: "Et vous, quelle province est faite <em>pour vous</em> ?",
    }),
  }));
}

// Photo credits (required by the CC BY / CC BY-SA licences)
const items = Object.entries(credits).map(([key, c]) =>
  `<li><a href="${esc(c.page)}" target="_blank" rel="noopener">${esc(c.title)}</a>, ${esc(c.artist || "auteur inconnu")}, ` +
  (c.licenseUrl ? `<a href="${esc(c.licenseUrl)}" target="_blank" rel="noopener">${esc(c.license)}</a>` : esc(c.license)) +
  `. Recadrée et compressée.</li>`).join("\n      ");
write("credits/index.html", page({
  base: "../", title: "Crédits photos", desc: DESC, url: `${C.SITE_URL}/credits/`, image: "qc-frontenac", page: "credits",
  body: `  <header class="bar"><img class="flag" src="../img/flag.svg" alt=""><a class="brand" href="../">Quiz Canada</a></header>
  <section class="credits">
    <h1>Crédits photos</h1>
    <p>Photos issues de Wikimedia Commons, utilisées selon leur licence.</p>
    <ul>
      ${items}
    </ul>
    <p><a href="../">← Retour au quiz</a></p>
  </section>`,
}));

// Cache busting: browsers keep css/js for 10 minutes (GitHub Pages), so a
// visitor could mix a new quiz.js with an old score.js and get a blank page.
// Every css/js link gets ?v=<content hash>, so a page always loads one
// consistent set of files.
const version = Object.fromEntries(["css/style.css", "js/config.js", "js/data.js", "js/score.js", "js/quiz.js"]
  .map((f) => [f, createHash("sha1").update(read(f)).digest("hex").slice(0, 8)]));
const pages = ["index.html", "question/index.html", "resultat/index.html", "credits/index.html",
  ...Object.values(D.provinces).map((p) => `p/${p.slug}/index.html`)];
for (const f of pages) {
  write(f, read(f).replace(/((?:css|js)\/[a-z]+\.(?:css|js))(\?v=[0-9a-f]+)?"/g, (m, file) => `${file}?v=${version[file]}"`));
}

console.log(`Built index.html, ${Object.keys(D.provinces).length} share pages, credits/; versioned css/js in ${pages.length} pages`);
