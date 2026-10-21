// Renders the question and result pages. Answers travel in the URL
// (?q=4&a=021 = question 4, answers so far), so every question is a real
// page load (one ad view each) and nothing depends on browser storage,
// which in-app browsers (Facebook, Instagram) sometimes wipe.
(function () {
  var D = window.QUIZ_DATA, C = window.QUIZ_CONFIG;
  var params = new URLSearchParams(location.search);
  var TOTAL = D.questions.length;

  function $(sel) { return document.querySelector(sel); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // "021" → [0, 2, 1], or null if malformed or an answer is out of range
  function parseAnswers(str) {
    if (!/^[0-3]*$/.test(str) || str.length > TOTAL) return null;
    var out = str.split("").map(Number);
    for (var i = 0; i < out.length; i++) if (out[i] >= D.questions[i].a.length) return null;
    return out;
  }

  function setPhoto(name) {
    document.documentElement.style.setProperty("--photo", "url(../img/" + name + ".jpg)");
  }

  function loadAds() {
    if (!C.ADSENSE_CLIENT || !C.ADSENSE_SLOT) return;
    var box = $(".ad");
    if (!box) return;
    box.hidden = false;
    box.innerHTML = '<small>Publicité</small><ins class="adsbygoogle" data-ad-client="' + esc(C.ADSENSE_CLIENT) +
      '" data-ad-slot="' + esc(C.ADSENSE_SLOT) + '" data-ad-format="horizontal" data-full-width-responsive="true"></ins>';
    var s = document.createElement("script");
    s.async = true;
    s.crossOrigin = "anonymous";
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(C.ADSENSE_CLIENT);
    document.head.appendChild(s);
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  function questionPage() {
    var n = parseInt(params.get("q"), 10);
    var prev = parseAnswers(params.get("a") || "");
    if (!(n >= 1 && n <= TOTAL) || !prev || prev.length !== n - 1) return location.replace("../");

    var q = D.questions[n - 1], before = params.get("a") || "";
    document.title = "Question " + n + "/" + TOTAL + " · Quelle province est faite pour vous ?";
    setPhoto(q.img);
    $(".count").innerHTML = "Question <b>" + n + "</b>/" + TOTAL;
    $(".progress span").style.setProperty("--p", (n / TOTAL) * 100 + "%");
    $(".photo img").src = "../img/" + q.img + ".jpg";
    $(".photo img").alt = q.place;
    $(".place").textContent = "📍 " + q.place;
    $(".question").textContent = q.q;
    $(".answers").innerHTML = q.a.map(function (a, i) {
      return '<button class="answer" type="button" data-i="' + i + '"><span class="letter">' + "ABCD"[i] + "</span>" + esc(a[0]) + "</button>";
    }).join("");

    var back = $(".back");
    back.href = n > 1 ? "?q=" + (n - 1) + "&a=" + before.slice(0, -1) : "../";
    back.textContent = n > 1 ? "← Question précédente" : "← Accueil";

    var busy = false;
    $(".answers").addEventListener("click", function (e) {
      var btn = e.target.closest(".answer");
      if (!btn || busy) return;
      busy = true;
      btn.classList.add("picked");
      var a = before + btn.dataset.i;
      var next = n < TOTAL ? "?q=" + (n + 1) + "&a=" + a : "../resultat/?a=" + a;
      setTimeout(function () { location.href = next; }, 180);
    });

    // Warm the cache with the next photo so the next page appears instantly.
    if (n < TOTAL) {
      var link = document.createElement("link");
      link.rel = "prefetch";
      link.href = "../img/" + D.questions[n].img + ".jpg";
      document.head.appendChild(link);
    }
    loadAds();
  }

  function ctaHref(url, slug) {
    if (!url) return "#";
    return url + (url.indexOf("?") < 0 ? "?" : "&") + "utm_source=quiz&utm_content=" + encodeURIComponent(slug);
  }

  function resultPage() {
    var answers = parseAnswers(params.get("a") || "");
    if (!answers || answers.length !== TOTAL) return location.replace("../");

    var ranks = window.QUIZ_SCORE(answers);
    var top = ranks[0], p = D.provinces[top.id];
    var shareUrl = C.SITE_URL + "/p/" + p.slug + "/";
    var ebook = (C.EBOOK_URLS || {})[top.id];
    var shareText = "Je suis fait(e) pour " + p.art + " 🇨🇦 Et vous ? Faites le quiz :";
    document.title = "Vous êtes fait(e) pour " + p.art + " !";
    setPhoto(p.img);

    var others = ranks.slice(1, 4).map(function (r) {
      var o = D.provinces[r.id];
      return '<div class="other"><span>' + esc(o.name) + "</span><em>" + r.pct + ' %</em><div class="track"><span style="--pct:' + r.pct + '%"></span></div></div>';
    }).join("");

    $("#result").innerHTML =
      '<div class="result-hero">' +
        '<img src="../img/' + p.img + '.jpg" alt="' + esc(p.name) + '">' +
        '<div class="match" style="--pct:' + top.pct + '"><div><span><b>' + top.pct + ' %</b><small>compatible</small></span></div></div>' +
        '<p class="eyebrow">Vous êtes fait(e) pour…</p>' +
        "<h1>" + esc(p.name) + "</h1>" +
        '<p class="tagline">' + esc(p.tag) + "</p>" +
      "</div>" +
      '<div class="section"><p>' + esc(p.desc) + '</p><ul class="facts">' +
        p.facts.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul></div>" +
      '<div class="immig"><h2>Côté immigration</h2><p>' + esc(p.immig) + "</p>" +
        (top.id === "qc" ? "" : "<p>Partout hors Québec, les francophones profitent des tirages Entrée express réservés au français et du permis Mobilité francophone (sans EIMT).</p>") +
        "<p>Les programmes changent souvent : faites vérifier votre situation.</p></div>" +
      '<div class="ctas">' +
        '<a class="btn btn-red" data-cta="booking" href="' + esc(ctaHref(C.BOOKING_URL, p.slug)) + '"><span class="ico">📅</span><span class="txt">Prendre rendez-vous<small>Consultation en immigration canadienne (60 min)</small></span><span class="arrow">→</span></a>' +
        '<a class="btn btn-ink" data-cta="audit" href="' + esc(ctaHref(C.AUDIT_URL, p.slug)) + '"><span class="ico">🔎</span><span class="txt">Faire auditer mon dossier<small>Analyse complète de mon admissibilité</small></span><span class="arrow">→</span></a>' +
        (ebook ? '<a class="btn btn-line" data-cta="ebook" href="' + esc(ctaHref(ebook, p.slug)) + '"><span class="ico">📘</span><span class="txt">Obtenir le guide ' + esc(p.name) + '<small>Tout pour immigrer ' + esc(p.to) + '</small></span><span class="arrow">→</span></a>' : "") +
      "</div>" +
      '<div class="section"><h2>Vos autres coups de cœur</h2><div class="others">' + others + "</div></div>" +
      '<div class="section"><h2>Partagez votre résultat</h2><div class="share">' +
        '<a href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareUrl) + '" target="_blank" rel="noopener">' + ICONS.fb + "Facebook</a>" +
        '<a href="https://wa.me/?text=' + encodeURIComponent(shareText + " " + shareUrl) + '" target="_blank" rel="noopener">' + ICONS.wa + "WhatsApp</a>" +
        '<button type="button" class="share-more">' + ICONS.link + "<span>" + (navigator.share ? "Partager" : "Copier le lien") + "</span></button>" +
      "</div></div>" +
      '<div class="footer">' +
        '<a class="btn btn-line" href="../question/?q=1&amp;a=">↻ Refaire le quiz</a>' +
        '<p class="note">Résultat indicatif, à titre de divertissement. Ne constitue pas un avis juridique.</p>' +
        '<a class="credits-link" href="../credits/">Crédits photos</a>' +
      "</div>";

    $(".share-more").addEventListener("click", function () {
      var label = this.querySelector("span");
      if (navigator.share) {
        navigator.share({ title: document.title, text: shareText, url: shareUrl }).catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl).then(function () { label.textContent = "Lien copié !"; });
      }
    });
    // Placeholder links (not configured yet) do nothing.
    document.querySelectorAll("[data-cta]").forEach(function (a) {
      if (a.getAttribute("href") === "#") a.addEventListener("click", function (e) { e.preventDefault(); });
    });
    leaves();
  }

  function leaves() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (var i = 0; i < 16; i++) {
      var s = document.createElement("span");
      s.className = "leaf";
      s.textContent = "🍁";
      s.style.left = Math.random() * 100 + "vw";
      s.style.fontSize = 14 + Math.random() * 18 + "px";
      s.style.animationDuration = 2.5 + Math.random() * 2.5 + "s";
      s.style.animationDelay = Math.random() * 1.2 + "s";
      document.body.appendChild(s);
      setTimeout(s.remove.bind(s), 6000);
    }
  }

  var ICONS = {
    fb: '<svg viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true"><path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="#25D366" aria-hidden="true"><path d="M12 0a12 12 0 0 0-10.4 18L0 24l6.2-1.6A12 12 0 1 0 12 0zm6.9 17c-.3.8-1.7 1.6-2.4 1.7-.6.1-1.4.1-2.2-.1a20 20 0 0 1-2-.8 15.7 15.7 0 0 1-6-5.3c-.5-.6-1.5-2-1.5-3.8S5.7 6 6 5.6c.4-.4.8-.5 1-.5h.8c.2 0 .6 0 .9.7l1.2 2.9c.1.2.2.5 0 .8l-.4.7-.6.6c-.2.2-.4.4-.2.8.2.4 1 1.6 2.1 2.6 1.4 1.3 2.6 1.7 3 1.9.4.2.6.1.8-.1l1.2-1.4c.3-.4.5-.3.9-.2l2.8 1.3c.4.2.6.3.7.5.1.1.1.8-.2 1.6z"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>'
  };

  var page = document.body.dataset.page;
  if (page === "question") questionPage();
  else if (page === "result") resultPage();
})();
