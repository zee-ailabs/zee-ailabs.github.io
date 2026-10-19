/* Renders content.js into the page and wires up every interaction. */
(function () {
  var P = window.PORTFOLIO;
  if (!P) return;
  var root = document.documentElement;
  root.classList.add("js");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function store(key, val) {
    try { if (val === undefined) return JSON.parse(localStorage.getItem(key) || "null"); localStorage.setItem(key, JSON.stringify(val)); }
    catch (e) { return null; }
  }
  var toastTimer;
  function toast(msg) { var t = $("toast"); t.textContent = msg; t.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.hidden = true; }, Math.max(2600, msg.length * 55)); }
  function tags(list) { return "<ul class=\"tags\">" + (list || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"; }
  function statusChip(s) { var k = /deliver/i.test(s) ? "delivered" : "studio"; return "<span class=\"status status-" + k + "\">" + esc(s) + "</span>"; }

  var pr = P.profile, C = P.contact || {};
  var mailHref = C.email ? "mailto:" + C.email : "#contact";
  var bookHref = C.calendly || (C.email ? "mailto:" + C.email + "?subject=" + encodeURIComponent("Let's set up a call") : "#contact");
  var bookAttrs = C.calendly ? " target=\"_blank\" rel=\"noopener\"" : "";

  var ICON = {
    agent: "<svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1\"/></svg>",
    chat: "<svg viewBox=\"0 0 24 24\"><path d=\"M4 5h16v11H9l-5 4V5Z\"/><path d=\"M8 10h8M8 13h5\"/></svg>",
    search: "<svg viewBox=\"0 0 24 24\"><circle cx=\"10.5\" cy=\"10.5\" r=\"6.5\"/><path d=\"m20 20-4.8-4.8M8 10.5h5\"/></svg>",
    book: "<svg viewBox=\"0 0 24 24\"><path d=\"M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z\"/><path d=\"M4 19a2 2 0 0 1 2-2h13M9 8h6\"/></svg>",
    doc: "<svg viewBox=\"0 0 24 24\"><path d=\"M6 3h9l4 4v14H6V3Z\"/><path d=\"M15 3v4h4M9 13l2 2 4-4\"/></svg>",
    gauge: "<svg viewBox=\"0 0 24 24\"><path d=\"M4 17a8 8 0 1 1 16 0\"/><path d=\"m12 17 4-5\"/><circle cx=\"12\" cy=\"17\" r=\"1.5\"/></svg>",
    flask: "<svg viewBox=\"0 0 24 24\"><path d=\"M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3\"/><path d=\"M7.5 15h9\"/></svg>",
    compass: "<svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"m15.5 8.5-2 5-5 2 2-5 5-2Z\"/></svg>",
    grad: "<svg viewBox=\"0 0 24 24\"><path d=\"m2 9 10-5 10 5-10 5L2 9Z\"/><path d=\"M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6\"/></svg>",
    spark: "<svg viewBox=\"0 0 24 24\"><path d=\"M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6\"/></svg>",
    arrow: "<svg viewBox=\"0 0 24 24\"><path d=\"M5 12h13M13 6l6 6-6 6\"/></svg>"
  };

  /* Theme */
  function currentTheme() { return root.getAttribute("data-theme") || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); }
  function syncThemeLabels() {
    var next = currentTheme() === "dark" ? "day" : "night";
    ["theme-toggle", "theme-toggle-m"].forEach(function (id) { var b = $(id); if (b) b.setAttribute("aria-label", "Switch to " + next + " mode"); });
    var meta = document.querySelector("meta[name=theme-color]"); if (meta) meta.setAttribute("content", currentTheme() === "dark" ? "#07080d" : "#eceef2");
  }
  function toggleTheme() {
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("mz-theme", next); } catch (e) {}
    syncThemeLabels(); window.dispatchEvent(new Event("themechange"));
  }
  ["theme-toggle", "theme-toggle-m"].forEach(function (id) { var b = $(id); if (b) b.addEventListener("click", toggleTheme); });
  syncThemeLabels();

  /* Hero */
  $("rail-initials").textContent = pr.initials;
  $("topbar-name").textContent = pr.name;
  $("hero-status").textContent = pr.status;
  $("hero-hook").innerHTML = pr.hook.map(function (line, i) {
    var inner = esc(line);
    if (i === 1) inner = inner.replace(/(\w+)\.$/, "<span class=\"glow\">$1.</span>");
    return "<span class=\"line\"><span>" + inner + "</span></span>";
  }).join("");
  $("hero-hook").setAttribute("aria-label", pr.hook.join(" "));
  $("hero-name").textContent = pr.name;
  $("hero-role").textContent = pr.role;
  $("hero-sub").textContent = pr.sub;
  $("hero-pills").innerHTML = pr.pills.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("");
  $("float-chips").innerHTML = pr.floating.map(function (f) { return "<li><b>" + esc(f.value) + "</b><span>" + esc(f.label) + "</span></li>"; }).join("");
  var hb = $("hero-book"); hb.href = bookHref; if (C.calendly) { hb.target = "_blank"; hb.rel = "noopener"; }
  $("portrait-img").src = pr.photo;
  var ai = $("agent-img");
  if (ai && (pr.photoSmall || pr.photo)) { ai.addEventListener("load", function () { ai.hidden = false; }); ai.src = pr.photoSmall || pr.photo; }
  $("ask-cta").addEventListener("click", function () { if (window.Assistant) window.Assistant.focus(); });

  /* Marquee: toolkit */
  var mq = [];
  (P.toolkit || []).forEach(function (g) { g.items.forEach(function (x) { mq.push(x); }); });
  var mqHtml = mq.map(function (x) { return "<span>" + esc(x) + "</span>"; }).join("");
  $("marquee").innerHTML = mqHtml + mqHtml;

  /* Receipts bento */
  function ring(pct, warm) {
    var c = 2 * Math.PI * 40;
    return "<svg class=\"gauge" + (warm ? " warm" : "") + "\" viewBox=\"0 0 100 100\" aria-hidden=\"true\" style=\"--full:" + c.toFixed(1) + "\"><circle class=\"g-track\" cx=\"50\" cy=\"50\" r=\"40\"/><circle class=\"g-fill\" cx=\"50\" cy=\"50\" r=\"40\" transform=\"rotate(-90 50 50)\" stroke-dasharray=\"" + c.toFixed(1) + "\" stroke-dashoffset=\"" + (c * (1 - pct / 100)).toFixed(1) + "\"/></svg>";
  }
  function dial(pct) {
    var len = Math.PI * 50;
    return "<svg class=\"dial\" viewBox=\"0 0 120 70\" aria-hidden=\"true\" style=\"--full:" + len.toFixed(1) + "\"><path class=\"d-track\" d=\"M10 62a50 50 0 0 1 100 0\"/><path class=\"d-fill\" d=\"M10 62a50 50 0 0 1 100 0\" stroke-dasharray=\"" + len.toFixed(1) + "\" stroke-dashoffset=\"" + (len * (1 - pct / 100)).toFixed(1) + "\"/></svg>";
  }
  $("bento").innerHTML = P.proof.map(function (t) {
    var viz = "", cls = "tile reveal-viz" + (t.size === "wide" ? " wide" : "");
    if (t.viz === "ring") viz = ring(t.pct, t.tone === "warm");
    if (t.viz === "dial") viz = dial(t.pct);
    if (t.viz === "bars") {
      var max = Math.max(t.before, t.after);
      viz = "<div class=\"bars\" aria-hidden=\"true\"><div class=\"bar\"><span>" + esc(t.beforeLabel) + "</span><i style=\"transform:scaleX(" + (t.before / max) + ")\"></i></div><div class=\"bar after\"><span>" + esc(t.afterLabel) + "</span><i style=\"transform:scaleX(" + (t.after / max) + ")\"></i></div></div>";
    }
    if (t.viz === "blocks") { var b = ""; for (var i = 0; i < t.count; i++) b += "<i style=\"transition-delay:" + (i * 60) + "ms\"></i>"; viz = "<div class=\"blocks\" aria-hidden=\"true\">" + b + "</div>"; }
    if (t.viz === "dots") { var d = ""; for (var k = 0; k < 90; k++) d += "<i style=\"--o:" + (Math.abs(Math.sin(k * 1.7)) * 0.85).toFixed(2) + "\"></i>"; viz = "<div class=\"dots\" aria-hidden=\"true\">" + d + "</div>"; }
    if (t.viz === "big") viz = "<span class=\"big-glow\" aria-hidden=\"true\"></span>";
    if (t.viz === "split") viz = "<div class=\"split-bar\" aria-hidden=\"true\">" + t.parts.map(function (pt, k) { return "<span style=\"flex:" + pt.n + ";--k:" + k + "\"><b>" + pt.n + "</b> " + esc(pt.label) + "</span>"; }).join("") + "</div>";
    var head = "<span class=\"tile-value\" data-count=\"" + esc(t.value) + "\">" + esc(t.value) + "</span>";
    var body = (t.viz === "ring" || t.viz === "dial") ? "<div class=\"tile-row\">" + viz + "<div>" + head + "</div></div>" : head + (t.viz === "bars" || t.viz === "blocks" || t.viz === "split" ? viz : "");
    var extra = (t.viz === "dots" || t.viz === "big") ? viz : "";
    return "<div class=\"" + cls + "\">" + extra + body + "<span class=\"tile-label\">" + esc(t.label) + (t.note ? "<br><span class=\"tile-note\">" + esc(t.note) + "</span>" : "") + "</span></div>";
  }).join("");

  function countUp(el) {
    var raw = el.getAttribute("data-count"), m = raw.match(/^([^\d]*)([\d.]+)(.*)$/);
    if (!m || reduce) return;
    var pre = m[1], num = parseFloat(m[2]), post = m[3], dec = (m[2].split(".")[1] || "").length, t0 = null;
    (function step(ts) {
      if (t0 === null) t0 = ts;
      var k = Math.min((ts - t0) / 1300, 1), e = 1 - Math.pow(1 - k, 3);
      el.textContent = pre + (num * e).toFixed(dec) + post;
      if (k < 1) requestAnimationFrame(step); else el.textContent = raw;
    })(performance.now());
  }

  /* What I ship */
  $("ships-grid").innerHTML = P.ships.map(function (s) {
    return "<article class=\"ship tilt-card reveal\"><span class=\"ship-icon\" aria-hidden=\"true\">" + (ICON[s.icon] || "") + "</span><h3>" + esc(s.title) + "</h3><p>" + esc(s.hook) + "</p>" +
      "<div class=\"ship-metric\"><b>" + esc(s.metric) + "</b><span>" + esc(s.where) + "</span></div></article>";
  }).join("");

  /* Industries hub */
  var IND = P.industries;
  $("ind-title").textContent = IND.title;
  $("ind-line").textContent = IND.line;
  (function hub() {
    var cx = 260, cy = 260, R = 196, n = IND.sectors.length, svg = "";
    var nodes = IND.sectors.map(function (s, i) { var a = -Math.PI / 2 + i * 2 * Math.PI / n; return { s: s, x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) }; });
    nodes.forEach(function (nd, i) {
      svg += "<line class=\"spoke" + (nd.s.delivered ? " on" : "") + "\" x1=\"" + cx + "\" y1=\"" + cy + "\" x2=\"" + nd.x.toFixed(1) + "\" y2=\"" + nd.y.toFixed(1) + "\"/>";
      if (nd.s.delivered) svg += "<line class=\"pulse\" style=\"animation-delay:" + (-i * 0.55) + "s\" x1=\"" + cx + "\" y1=\"" + cy + "\" x2=\"" + nd.x.toFixed(1) + "\" y2=\"" + nd.y.toFixed(1) + "\"/>";
    });
    svg += "<circle class=\"core-ring\" cx=\"" + cx + "\" cy=\"" + cy + "\" r=\"104\"/>";
    svg += "<circle class=\"core-c\" cx=\"" + cx + "\" cy=\"" + cy + "\" r=\"86\"/>";
    svg += "<text class=\"core-t\" x=\"" + cx + "\" y=\"" + (cy - 22) + "\">Same machinery</text>";
    IND.core.forEach(function (w, i) { svg += "<text class=\"core-s\" x=\"" + cx + "\" y=\"" + (cy + 4 + i * 17) + "\">" + esc(w) + "</text>"; });
    nodes.forEach(function (nd) {
      var w = Math.max(84, nd.s.name.length * 8.6 + 26);
      svg += "<g class=\"sector\"><rect class=\"node" + (nd.s.delivered ? " on" : "") + "\" x=\"" + (nd.x - w / 2).toFixed(1) + "\" y=\"" + (nd.y - 19).toFixed(1) + "\" width=\"" + w.toFixed(1) + "\" height=\"38\" rx=\"19\" style=\"transform-origin:" + nd.x.toFixed(1) + "px " + nd.y.toFixed(1) + "px\"/>" +
        "<text class=\"node-t" + (nd.s.delivered ? " on" : "") + "\" x=\"" + nd.x.toFixed(1) + "\" y=\"" + (nd.y + 5).toFixed(1) + "\">" + esc(nd.s.name) + "</text></g>";
    });
    $("hub").innerHTML = "<svg viewBox=\"-40 0 600 520\" aria-hidden=\"true\">" + svg + "</svg>";
    var on = IND.sectors.filter(function (s) { return s.delivered; }).map(function (s) { return s.name; });
    $("hub").setAttribute("aria-label", "Shipped AI in " + on.join(", ") + ". Ready for " + IND.sectors.filter(function (s) { return !s.delivered; }).map(function (s) { return s.name; }).join(", ") + ".");
  })();

  /* Product lifecycle */
  if (P.plm) {
    $("plm-title").textContent = P.plm.title;
    $("plm").innerHTML = P.plm.stages.map(function (st) {
      return "<li class=\"plm-stage glass reveal\"><div class=\"plm-head\"><span class=\"plm-verb\">" + esc(st.verb) + "</span></div><p>" + esc(st.purpose) + "</p><ul class=\"tags\">" + st.techniques.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></li>";
    }).join("") + "<li class=\"plm-loop\" aria-hidden=\"true\"><span>Then the loop starts again</span><svg viewBox=\"0 0 24 24\"><path d=\"M20 12a8 8 0 1 1-2.3-5.6M20 4v4h-4\"/></svg></li>";
  }

  /* Journey bar, to scale */
  if (P.story.headline) $("journey-title").textContent = P.story.headline;
  var TL = P.story.timeline, start = TL[0].from, end = TL[TL.length - 1].to;
  $("tbar").innerHTML = TL.map(function (t, i) {
    return "<button type=\"button\" role=\"tab\" id=\"tl-" + i + "\" data-i=\"" + i + "\" data-era=\"" + esc(t.era) + "\" style=\"--years:" + (t.to - t.from).toFixed(2) + "\" aria-selected=\"false\" aria-controls=\"role-card\" title=\"" + esc(t.org + ", " + t.title) + "\"><b>" + esc(t.short || t.org) + "</b><small>" + esc(t.dates) + "</small></button>";
  }).join("");
  var ticks = []; for (var y = Math.ceil(start); y <= Math.floor(end); y += 3) ticks.push(y); ticks.push("Now");
  $("tbar-axis").innerHTML = ticks.map(function (y) { return "<span>" + y + "</span>"; }).join("");
  function showRole(i) {
    var t = TL[i];
    $("tbar").querySelectorAll("button").forEach(function (b, k) { b.setAttribute("aria-selected", k === i); b.tabIndex = k === i ? 0 : -1; });
    $("role-card").setAttribute("aria-labelledby", "tl-" + i);
    var tw = document.querySelector(".tbar-wrap"), tbtn = $("tl-" + i); if (tw && tw.scrollWidth > tw.clientWidth + 2) tw.scrollLeft = tbtn.offsetLeft - (tw.clientWidth - tbtn.offsetWidth) / 2;
    $("role-card").innerHTML = "<div><span class=\"role-meta\">" + esc(t.era) + ", " + esc(t.dates) + ", " + esc(t.place) + "</span><h3 class=\"role-hook\">" + esc(t.hook) + "</h3><p class=\"role-title\">" + esc(t.title) + ", " + esc(t.org) + "</p></div>" +
      "<ul class=\"wins\">" + t.wins.map(function (w) { return "<li>" + esc(w) + "</li>"; }).join("") + "</ul>";
  }
  $("tbar").addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) showRole(+b.getAttribute("data-i")); });
  $("tbar").addEventListener("keydown", function (e) {
    var cur = +(document.activeElement.getAttribute("data-i") || 0);
    if (e.key === "ArrowRight") { e.preventDefault(); var n = Math.min(TL.length - 1, cur + 1); showRole(n); $("tl-" + n).focus(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); var p = Math.max(0, cur - 1); showRole(p); $("tl-" + p).focus(); }
  });
  showRole(TL.length - 1);

  /* Case tiles, demo player and gated downloads */
  var CAT = {}; (P.caseCategories || []).forEach(function (c) { CAT[c.id] = c.label; });
  var caseFilter = "all";
  var CI = P.casesIntro || {};
  if (CI.kicker) $("cases-kicker").textContent = CI.kicker;
  if (CI.title) $("cases-title").textContent = CI.title;
  $("builder-line").textContent = CI.line || "";
  $("case-note").textContent = P.caseNote || "";
  function caseOrg(c) { return c.client ? c.org + ", " + c.client.toLowerCase() : c.org; }
  function renderCaseFilters() {
    var chips = [{ id: "all", label: "All", n: P.cases.length }].concat((P.caseCategories || []).map(function (c) { return { id: c.id, label: c.label, n: P.cases.filter(function (x) { return x.cat === c.id; }).length }; }));
    $("case-filters").innerHTML = chips.map(function (c) { return "<button class=\"chip\" type=\"button\" data-cf=\"" + c.id + "\" aria-pressed=\"" + (c.id === caseFilter) + "\">" + esc(c.label) + "<span class=\"count\">" + c.n + "</span></button>"; }).join("");
  }
  function thumbOf(c) { return c.thumb || c.video.replace(/\.mp4$/, "-thumb.jpg"); }
  var PLAY = "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M8 5v14l11-7L8 5Z\"/></svg>";
  var MAIL = "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M4 6h16v12H4z\"/><path d=\"m4 7 8 6 8-6\"/></svg>";
  var DL = "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 4v11m0 0-4-4m4 4 4-4M5 20h14\"/></svg>";
  function caseButtons(c, inDrawer) {
    return (c.video && inDrawer ? "<button class=\"btn btn-glass btn-sm\" type=\"button\" data-play=\"" + esc(c.id) + "\">" + PLAY + "Watch demo</button>" : "") +
      "<button class=\"btn " + (inDrawer ? "btn-solid" : "btn-glass") + " btn-sm\" type=\"button\" data-get=\"" + esc(c.id) + "\">" + MAIL + "Request full case study</button>" +
      (inDrawer ? "" : "<button class=\"btn btn-glass btn-sm\" type=\"button\" data-case=\"" + esc(c.id) + "\">Details</button>");
  }
  function renderCases() {
    var list = P.cases.filter(function (c) { return caseFilter === "all" || c.cat === caseFilter; });
    $("case-grid").innerHTML = list.map(function (c) {
      return "<article class=\"tile-case glass\" data-cat=\"" + esc(c.cat) + "\">" +
        (c.video ? "<button class=\"tc-media\" type=\"button\" data-play=\"" + esc(c.id) + "\" aria-label=\"Watch the demo: " + esc(c.title) + "\"><img src=\"" + esc(thumbOf(c)) + "\" alt=\"\" loading=\"lazy\" decoding=\"async\" width=\"800\" height=\"450\"><span class=\"tc-play\">" + PLAY + "<span>Watch demo</span></span></button>" : "") +
        "<div class=\"tc-top\"><span class=\"tc-num\">" + esc(c.number) + "</span><span class=\"tc-chip\">" + esc(c.kind) + "</span><span class=\"tc-chip tc-cloud\">" + esc(c.cloud) + "</span></div>" +
        "<h3 class=\"tc-title\">" + esc(c.title) + "</h3><p class=\"tc-org\">" + esc(caseOrg(c)) + "</p>" +
        "<p class=\"tc-one\">" + esc(c.oneLiner) + "</p>" +
        "<dl class=\"tc-out\">" + c.outcomes.map(function (o) { return "<div><dt>" + esc(o.l) + "</dt><dd>" + esc(o.v) + "</dd></div>"; }).join("") + "</dl>" +
        "<p class=\"tc-safe\"><b>Guardrail.</b> " + esc(c.safe) + "</p>" +
        "<div class=\"tc-actions\">" + caseButtons(c) + "</div></article>";
    }).join("");
  }
  $("case-filters").addEventListener("click", function (e) { var b = e.target.closest("[data-cf]"); if (!b) return; caseFilter = b.getAttribute("data-cf"); renderCaseFilters(); renderCases(); });
  renderCaseFilters(); renderCases();

  var drawer = $("case-drawer"), lastFocus = null;
  function openDialog(d) { lastFocus = document.activeElement; if (d.showModal) d.showModal(); else d.setAttribute("open", ""); d.scrollTop = 0; }
  function closeDialog(d) { if (d.close) d.close(); else d.removeAttribute("open"); }
  function caseById(id) { return P.cases.filter(function (x) { return x.id === id; })[0]; }
  function openCase(id) {
    var c = caseById(id); if (!c) return;
    var sec = function (h, t) { return "<div class=\"d-sec\"><h3>" + esc(h) + "</h3><p>" + esc(t) + "</p></div>"; };
    $("drawer-body").innerHTML =
      (c.video ? "<button class=\"d-video\" type=\"button\" data-play=\"" + esc(c.id) + "\" aria-label=\"Play the demo\"><img src=\"" + esc(thumbOf(c)) + "\" alt=\"\"><span class=\"d-play\">" + PLAY + "</span></button>" : "") +
      "<div class=\"case-meta\"><span class=\"tc-chip\">" + esc(c.kind) + "</span><span class=\"tc-chip tc-cloud\">" + esc(c.cloud) + "</span><span>Case " + esc(c.number) + ", " + esc(caseOrg(c)) + "</span></div>" +
      "<h2 class=\"d-title\" id=\"drawer-title\">" + esc(c.title) + "</h2><p class=\"d-tag\">" + esc(c.oneLiner) + "</p>" +
      "<dl class=\"tc-out tc-out-lg\">" + c.outcomes.map(function (o) { return "<div><dt>" + esc(o.l) + "</dt><dd>" + esc(o.v) + "</dd></div>"; }).join("") + "</dl>" +
      sec("The problem", c.problem) + sec("What we built", c.what) +
      "<div class=\"d-two\">" + sec("How it stays safe", c.safe) + sec("Key decision", c.decision) + "</div>" +
      sec("My role", "AI Product Manager" + (c.org === "Hrudai" ? " at Hrudai" : "") + ": " + c.role) +
      (c.scale ? sec("Scale", c.scale) : "") +
      "<div class=\"d-sec\"><h3>Stack</h3>" + tags(c.stack) + "</div>" +
      "<div class=\"d-actions\">" + caseButtons(c, true) + "<button class=\"btn btn-glass btn-sm\" type=\"button\" data-ask-case=\"" + esc(c.id) + "\"><span class=\"mini-orb\" aria-hidden=\"true\"></span>Ask my AI twin</button></div>";
    openDialog(drawer); $("drawer-close").focus();
  }
  drawer.addEventListener("close", function () { if (lastFocus) lastFocus.focus({ preventScroll: true }); });
  $("drawer-close").addEventListener("click", function () { closeDialog(drawer); });
  drawer.addEventListener("click", function (e) {
    if (e.target === drawer) { closeDialog(drawer); return; }
    var ask = e.target.closest("[data-ask-case]");
    if (ask) { var c = caseById(ask.getAttribute("data-ask-case")); closeDialog(drawer); if (window.Assistant) window.Assistant.ask("Tell me the story of " + c.title); }
  });

  /* Demo player */
  var vbox = $("vbox"), vid = $("vbox-video");
  function playDemo(id) {
    var c = caseById(id); if (!c || !c.video) return;
    $("vbox-kicker").textContent = "Case " + c.number + ", " + c.kind;
    $("vbox-title").textContent = c.title;
    vid.poster = c.video.replace(/\.mp4$/, ".jpg"); vid.src = c.video;
    openDialog(vbox); track("demo_play", { case_id: c.id });
    var pr = vid.play(); if (pr && pr.catch) pr.catch(function () {});
  }
  function stopDemo() { try { vid.pause(); } catch (e) {} closeDialog(vbox); }
  $("vbox-close").addEventListener("click", stopDemo);
  vbox.addEventListener("close", function () { try { vid.pause(); } catch (e) {} });
  vbox.addEventListener("click", function (e) { if (e.target === vbox) stopDemo(); });

  /* Case study requests: the visitor leaves an email, Zaigham is notified and shares the PDF himself */
  function track(name, params) { try { if (window.mzTrack) window.mzTrack(name, params || {}); } catch (e) {} }
  var gate = $("gate"), gateCase = null;
  var EMAIL_RE = /^[^@\s<>"]+@[^@\s<>"]+\.[^@\s<>"]{2,}$/;
  function openGate(id) {
    gateCase = caseById(id); if (!gateCase) return;
    $("gate-case").textContent = "Case " + gateCase.number + ": " + gateCase.title;
    $("gate-submit").textContent = "Request case study"; $("gate-submit").disabled = false;
    $("gate-err").hidden = true;
    openDialog(gate); setTimeout(function () { $("gate-email").focus(); }, 60);
  }
  function notify(data) {
    var url = C.leadsEndpoint;
    if (!url) return Promise.reject(new Error("no endpoint"));
    var req = fetch(url, { method: "POST", mode: "cors", credentials: "omit", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data) }).then(function (r) { if (!r.ok) throw new Error("bad status " + r.status); return r; });
    return Promise.race([req, new Promise(function (ok) { setTimeout(function () { ok("pending"); }, 6000); })]); /* FormSubmit can take 30s+ but still delivers: never abort, treat a slow answer as sent */
  }
  function overLimit(key, max) { var n = store(key) || 0; if (n >= max) return true; store(key, n + 1); return false; }
  $("gate-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var email = $("gate-email").value.trim().slice(0, 120);
    if ($("gate-hp").value) { closeDialog(gate); return; }
    if (!EMAIL_RE.test(email)) { $("gate-err").textContent = "Please enter a valid email address."; $("gate-err").hidden = false; return; }
    if (overLimit("mz-gate-n", 20)) { $("gate-err").textContent = "Thanks for the interest. Please email Zaigham directly for more case studies."; $("gate-err").hidden = false; return; }
    var c = gateCase, btn = $("gate-submit"); btn.disabled = true; btn.textContent = "Sending";
    var data = { email: email, case_study: "Case " + c.number + ": " + c.title, page: location.href.split("#")[0], _subject: "Case study request: " + c.title, _replyto: email, _captcha: "false" };
    notify(data).then(function () { return true; }, function () { return false; }).then(function (ok) {
      btn.disabled = false; btn.textContent = "Request case study";
      if (ok) { closeDialog(gate); $("gate-email").value = ""; toast("Request sent to Zaigham. He'll share the case study to your email."); track("case_request", { case_id: c.id }); }
      else { $("gate-err").innerHTML = "Couldn't send the request. Email <a href=\"" + esc(mailHref) + "?subject=" + encodeURIComponent("Case study request: " + c.title) + "\">" + esc(C.email) + "</a> instead."; $("gate-err").hidden = false; }
    });
  });
  $("gate-close").addEventListener("click", function () { closeDialog(gate); });

  /* Feedback */
  (function () {
    var f = $("fb-form"); if (!f) return;
    var msg = $("fb-msg"), cnt = $("fb-count"), err = $("fb-err"), btn = $("fb-submit");
    msg.addEventListener("input", function () { cnt.textContent = msg.value.length + " / 2000"; });
    f.addEventListener("submit", function (e) {
      e.preventDefault(); err.hidden = true;
      if ($("fb-hp").value) { f.reset(); return; }
      var text = msg.value.trim().slice(0, 2000), name = $("fb-name").value.trim().slice(0, 80), email = $("fb-email").value.trim().slice(0, 120);
      if (text.length < 3) { err.textContent = "Please write a little feedback first."; err.hidden = false; msg.focus(); return; }
      if (email && !EMAIL_RE.test(email)) { err.textContent = "That email doesn't look right. Fix it or leave it empty."; err.hidden = false; return; }
      if (overLimit("mz-fb-n", 10)) { err.textContent = "Thanks, that's plenty for today. Email Zaigham for anything else."; err.hidden = false; return; }
      btn.disabled = true; btn.textContent = "Sending";
      var data = { name: name || "Anonymous", email: email || "Not given", feedback: text, page: location.href.split("#")[0], _subject: "Portfolio feedback" + (name ? " from " + name : ""), _captcha: "false" };
      if (email) data._replyto = email;
      notify(data).then(function () { return true; }, function () { return false; }).then(function (ok) {
        btn.disabled = false; btn.textContent = "Send feedback";
        if (ok) { f.reset(); cnt.textContent = "0 / 2000"; toast("Thank you. Your feedback reached Zaigham."); track("feedback_sent", {}); }
        else { err.innerHTML = "Couldn't send it right now. Email <a href=\"" + esc(mailHref) + "?subject=" + encodeURIComponent("Portfolio feedback") + "\">" + esc(C.email) + "</a> instead."; err.hidden = false; }
      });
    });
  })();
  gate.addEventListener("click", function (e) { if (e.target === gate) closeDialog(gate); });

  document.addEventListener("click", function (e) {
    var pl = e.target.closest("[data-play]"); if (pl) { if (drawer.open) closeDialog(drawer); playDemo(pl.getAttribute("data-play")); return; }
    var g = e.target.closest("[data-get]"); if (g) { if (drawer.open) closeDialog(drawer); openGate(g.getAttribute("data-get")); return; }
    var d = e.target.closest("#case-grid [data-case]"); if (d) openCase(d.getAttribute("data-case"));
  });

  /* Credentials: one grid of verifiable badges, each opens its certificate */
  var SEAL = "<svg viewBox=\"0 0 24 24\"><path d=\"M12 3l2.5 2 3.2-.3.9 3.1 2.6 1.9-1.2 3 1.2 3-2.6 1.9-.9 3.1-3.2-.3L12 21l-2.5-2-3.2.3-.9-3.1-2.6-1.9 1.2-3-1.2-3 2.6-1.9.9-3.1 3.2.3Z\"/><path d=\"m9 12 2 2 4-4\"/></svg>";
  function credBadge(c, big) { return "<span class=\"cred-seal" + (c.logo ? " has-logo" : "") + (big ? " big" : "") + "\">" + (c.logo ? "<img src=\"" + esc(c.logo) + "\" alt=\"\" loading=\"lazy\" decoding=\"async\">" : SEAL) + "</span>"; }
  var creds = P.credentials || [];
  if ($("cred-count")) $("cred-count").textContent = creds.length + " certifications, each one verifiable. Tap any card to see the certificate.";
  $("cert-grid").innerHTML = creds.map(function (c, i) {
    var when = c.valid ? c.valid : (c.date ? "Earned " + c.date : "");
    return "<li><button class=\"cert-card\" type=\"button\" data-ci=\"" + i + "\" aria-label=\"" + esc(c.name + ", view certificate") + "\">" + credBadge(c) +
      "<span class=\"cert-body\"><b class=\"cert-code\">" + esc(c.code) + "</b><span class=\"cert-name\">" + esc(c.name) + "</span><span class=\"cert-meta\">" + esc(c.issuer) + (when ? " · " + esc(when) : "") + "</span></span>" +
      "<span class=\"cert-view\" aria-hidden=\"true\">View</span></button></li>";
  }).join("");
  var certbox = $("certbox");
  function openCert(i) {
    var c = creds[i]; if (!c) return;
    $("certbox-id").innerHTML = credBadge(c, true) + "<div><span class=\"cert-code\">" + esc(c.code) + "</span><h2 id=\"certbox-title\">" + esc(c.name) + "</h2><span class=\"mono muted\">" + esc(c.issuer) + "</span></div>";
    $("certbox-facts").innerHTML = (c.date ? "<div><dt>Earned</dt><dd>" + esc(c.date) + "</dd></div>" : "") + (c.valid ? "<div><dt>Status</dt><dd>" + esc(c.valid) + "</dd></div>" : "") + (c.id ? "<div><dt>Credential ID</dt><dd class=\"mono\">" + esc(c.id) + "</dd></div>" : "");
    var img = $("certbox-img"), src = c.image || "";
    img.hidden = !src; img.alt = src ? c.name + " certificate" : ""; if (src) img.src = src; else img.removeAttribute("src");
    var open = $("certbox-open"), href = c.credentialUrl || c.file || c.image;
    open.hidden = !href; if (href) open.href = href;
    openDialog(certbox); $("certbox-close").focus({ preventScroll: true });
    track("cert_view", { cert: c.code });
  }
  $("cert-grid").addEventListener("click", function (e) { var b = e.target.closest("[data-ci]"); if (b) openCert(+b.getAttribute("data-ci")); });
  $("certbox-close").addEventListener("click", function () { closeDialog(certbox); });
  certbox.addEventListener("click", function (e) { if (e.target === certbox) closeDialog(certbox); });
  $("edu").innerHTML = (P.education || []).map(function (e) { return "<li><b>" + esc(e.title) + "</b><span>" + esc(e.org) + (e.when ? ", " + esc(e.when) : "") + "</span></li>"; }).join("");
  $("toolkit-grid").innerHTML = (P.toolkit || []).map(function (g) { return "<div class=\"tk-group glass\"><h4>" + esc(g.group) + "</h4>" + tags(g.items) + "</div>"; }).join("");

  /* Doors and sheets */
  $("doors").innerHTML = P.beyond.map(function (d) {
    return "<button class=\"door\" type=\"button\" data-sheet=\"sheet-" + d.id + "\"><span class=\"door-icon\" aria-hidden=\"true\">" + (ICON[d.icon] || "") + "</span><div><h3>" + esc(d.title) + "</h3><p>" + esc(d.teaser) + "</p></div><span class=\"door-count\">" + esc(d.count) + ICON.arrow + "</span></button>";
  }).join("");
  function openSheet(id) { var s = $(id); if (s) openDialog(s); }
  $("doors").addEventListener("click", function (e) { var b = e.target.closest("[data-sheet]"); if (b) openSheet(b.getAttribute("data-sheet")); });
  document.querySelectorAll(".sheet").forEach(function (s) {
    s.querySelector(".sheet-close").addEventListener("click", function () { closeDialog(s); });
    s.addEventListener("close", function () { if (lastFocus) lastFocus.focus({ preventScroll: true }); });
  });

  /* Lab sheet */
  $("lab-grid").innerHTML = P.lab.map(function (l) {
    var link = l.link ? "<a class=\"lab-link\" href=\"" + esc(l.link) + "\" target=\"_blank\" rel=\"noopener\">" + esc(l.linkLabel || "Open") + "</a>" : (l.linkLabel ? "<span class=\"lab-soon\">" + esc(l.linkLabel) + "</span>" : "");
    return "<article class=\"lab-item glass\"><span class=\"lab-kind\">" + esc(l.kind) + "</span><h3>" + esc(l.title) + "</h3><p>" + esc(l.text) + "</p>" + tags(l.stack) + link + "</article>";
  }).join("");

  /* Playbook sheet */
  var tabs = Array.prototype.slice.call(document.querySelectorAll("#pb-tabs [role=tab]"));
  function selectTab(tab, focus) {
    tabs.forEach(function (t) { var on = t === tab; t.setAttribute("aria-selected", on); t.tabIndex = on ? 0 : -1; $(t.getAttribute("aria-controls")).hidden = !on; });
    if (focus) tab.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { selectTab(t); });
    t.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") selectTab(tabs[(i + 1) % tabs.length], true);
      if (e.key === "ArrowLeft") selectTab(tabs[(i - 1 + tabs.length) % tabs.length], true);
    });
  });
  var groups = P.playbook.kpiGroups, activeGroup = "all", query = "", allKpis = [];
  groups.forEach(function (g) { g.kpis.forEach(function (k) { allKpis.push({ k: k, g: g }); }); });
  function renderGroups() {
    var chips = [{ id: "all", name: "All", n: allKpis.length }].concat(groups.map(function (g) { return { id: g.id, name: g.name, n: g.kpis.length }; }));
    $("kpi-groups").innerHTML = chips.map(function (c) { return "<button class=\"chip\" type=\"button\" data-group=\"" + c.id + "\" aria-pressed=\"" + (c.id === activeGroup) + "\">" + esc(c.name) + "<span class=\"count\">" + c.n + "</span></button>"; }).join("");
    var g = groups.filter(function (x) { return x.id === activeGroup; })[0];
    $("kpi-intro").textContent = g ? g.intro : "Every KPI I use, in six families. Green ones I've moved on shipped work.";
  }
  function renderKpis() {
    var q = query.trim().toLowerCase();
    var rows = allKpis.filter(function (r) { if (activeGroup !== "all" && r.g.id !== activeGroup) return false; return !q || (r.k.name + " " + r.k.what + " " + r.g.name).toLowerCase().indexOf(q) > -1; });
    $("kpi-list").innerHTML = rows.length ? rows.map(function (r) {
      var k = r.k;
      return "<article class=\"kpi glass" + (k.moved ? " moved" : "") + "\"><div class=\"kpi-head\"><h3>" + esc(k.name) + "</h3><span class=\"kpi-group\">" + esc(r.g.name) + "</span></div><p>" + esc(k.what) + "</p><p class=\"formula\">" + esc(k.how) + "</p><p class=\"watch\"><b>Watch out.</b> " + esc(k.watch) + "</p>" + (k.moved ? "<span class=\"moved-tag\">I moved this: " + esc(k.moved) + "</span>" : "") + "</article>";
    }).join("") : "<p class=\"empty\">No KPI matches \"" + esc(query) + "\". Try latency, retention or cost.</p>";
  }
  $("kpi-groups").addEventListener("click", function (e) { var b = e.target.closest("[data-group]"); if (!b) return; activeGroup = b.getAttribute("data-group"); renderGroups(); renderKpis(); });
  $("kpi-search").addEventListener("input", function (e) { query = e.target.value; renderKpis(); });
  renderGroups(); renderKpis();
  $("discovery-list").innerHTML = P.playbook.discovery.map(function (d) {
    return "<article class=\"mcard glass\"><div class=\"kpi-head\"><h3>" + esc(d.name) + "</h3>" + (d.used ? "<span class=\"used\">I use this</span>" : "") + "</div><dl><div><dt>Use it when</dt><dd>" + esc(d.when) + "</dd></div><div><dt>You get</dt><dd>" + esc(d.output) + "</dd></div><div><dt>Lesson</dt><dd>" + esc(d.tip) + "</dd></div></dl></article>";
  }).join("");
  var prio = P.playbook.prioritization;
  function prioById(id) { return prio.filter(function (x) { return x.id === id; })[0]; }
  function renderPrio(hl) {
    $("prio-list").innerHTML = prio.map(function (x) {
      return "<article class=\"mcard glass" + (x.id === hl ? " hl" : "") + "\" id=\"prio-" + x.id + "\"><div class=\"kpi-head\"><h3>" + esc(x.name) + "</h3>" + (x.used ? "<span class=\"used\">I use this</span>" : "") + "</div><p class=\"formula\">" + esc(x.formula) + "</p><dl><div><dt>Best for</dt><dd>" + esc(x.best) + "</dd></div><div><dt>Avoid when</dt><dd>" + esc(x.avoid) + "</dd></div><div><dt>My take</dt><dd>" + esc(x.take) + "</dd></div></dl></article>";
    }).join("");
  }
  var answers = { context: "enterprise", decision: "features", data: "some" };
  $("picker-questions").innerHTML = "<h3 style=\"margin-bottom:16px\">Which technique fits your decision?</h3>" + P.playbook.picker.questions.map(function (q) {
    return "<fieldset><legend>" + esc(q.text) + "</legend><div class=\"chips\">" + q.options.map(function (o) { return "<button class=\"chip\" type=\"button\" data-q=\"" + q.id + "\" data-v=\"" + o.value + "\" aria-pressed=\"" + (answers[q.id] === o.value) + "\">" + esc(o.label) + "</button>"; }).join("") + "</div></fieldset>";
  }).join("");
  function recommend(a) {
    var main, pair, why;
    if (a.decision === "ai") { main = "risk-first"; pair = "story-mapping"; why = "With AI the biggest unknown is quality. Prove it on real examples first."; }
    else if (a.decision === "vendor") { main = "buy-build"; pair = "cost-of-delay"; why = "Platform choices are expensive to undo. Score the trade-offs openly."; }
    else if (a.decision === "mvp") { main = "story-mapping"; pair = "moscow"; why = "Slice the thinnest release that still finishes the job, then lock scope."; }
    else if (a.decision === "sequence") { main = a.context === "enterprise" ? "wsjf" : "cost-of-delay"; pair = "rice"; why = a.context === "enterprise" ? "In big programs, timing and dependencies matter as much as value." : "Ask what each week of waiting costs. It reorders roadmaps fast."; }
    else if (a.data === "good") { main = "rice"; pair = "kano"; why = "You have the reach and impact data RICE needs."; }
    else if (a.data === "some") { main = "rice"; pair = "value-effort"; why = "RICE's confidence score is your defence against loud opinions."; }
    else { main = "value-effort"; pair = "opportunity"; why = "Align fast on a 2x2, then go get evidence."; }
    if (a.context === "agency" && a.decision !== "ai") why += " In client work, share the scoring openly.";
    return { main: prioById(main), pair: prioById(pair), why: why };
  }
  function renderPick() {
    var r = recommend(answers);
    $("picker-result").innerHTML = "<span class=\"module-level\">Start with</span><h3>" + esc(r.main.name) + "</h3><p>" + esc(r.why) + "</p><p>Pair it with <strong>" + esc(r.pair.name) + "</strong>.</p>";
    renderPrio(r.main.id);
  }
  $("picker-questions").addEventListener("click", function (e) {
    var b = e.target.closest("[data-q]"); if (!b) return;
    var q = b.getAttribute("data-q"); answers[q] = b.getAttribute("data-v");
    document.querySelectorAll("[data-q=\"" + q + "\"]").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
    renderPick();
  });
  renderPick();
  $("method-list").innerHTML = P.playbook.method.map(function (m) { return "<li class=\"glass\"><h3>" + esc(m.title) + "</h3><span class=\"tools\">" + esc(m.tools) + "</span><p>" + esc(m.text) + "</p></li>"; }).join("");

  /* Academy sheet */
  var AC = P.academy, done = store("mz-academy") || {}, activeModule = store("mz-module") || AC.modules[0].id;
  $("academy-intro").textContent = AC.intro;
  var totalLessons = 0; AC.modules.forEach(function (m) { totalLessons += m.lessons.length; });
  function key(m, i) { return m.id + ":" + i; }
  function renderAcademy() {
    var count = 0; Object.keys(done).forEach(function (k) { if (done[k]) count++; });
    var pct = Math.round(count / totalLessons * 100);
    $("ring-pct").textContent = pct + "%"; $("ring-fill").style.strokeDashoffset = String(326.7 * (1 - pct / 100));
    $("academy-ring").setAttribute("aria-label", "Course progress " + pct + " percent");
    $("module-nav").innerHTML = AC.modules.map(function (m, i) {
      var d = 0; m.lessons.forEach(function (_, j) { if (done[key(m, j)]) d++; });
      return "<li><button type=\"button\" data-module=\"" + m.id + "\" aria-current=\"" + (m.id === activeModule) + "\"><span class=\"mn-no\">" + String(i + 1).padStart(2, "0") + "</span><span>" + esc(m.title) + "</span><span class=\"mn-done\">" + d + "/" + m.lessons.length + "</span></button></li>";
    }).join("");
    var idx = 0; AC.modules.forEach(function (m, i) { if (m.id === activeModule) idx = i; });
    var m = AC.modules[idx];
    $("module-view").innerHTML = "<span class=\"module-level\">Module " + (idx + 1) + " of " + AC.modules.length + ", " + esc(m.level) + "</span><h3>" + esc(m.title) + "</h3>" +
      m.lessons.map(function (l, i) { var k = key(m, i), cid = "lesson-" + m.id + "-" + i; return "<div class=\"lesson\"><input type=\"checkbox\" id=\"" + cid + "\" data-key=\"" + k + "\"" + (done[k] ? " checked" : "") + "><div><label for=\"" + cid + "\">" + esc(l.title) + "</label><p>" + esc(l.body) + "</p></div></div>"; }).join("") +
      "<div class=\"exercise\"><strong>Try it</strong><p>" + esc(m.exercise) + "</p></div>" +
      "<div class=\"module-foot\">" + (idx > 0 ? "<button class=\"btn btn-glass\" type=\"button\" data-module=\"" + AC.modules[idx - 1].id + "\">Previous module</button>" : "<span></span>") +
      (idx < AC.modules.length - 1 ? "<button class=\"btn btn-solid\" type=\"button\" data-module=\"" + AC.modules[idx + 1].id + "\">Next module</button>" : "<button class=\"btn btn-solid\" type=\"button\" data-sheet-go=\"sheet-advisory\">Want coaching?</button>") + "</div>";
  }
  document.querySelector(".academy").addEventListener("click", function (e) {
    var go = e.target.closest("[data-sheet-go]"); if (go) { closeDialog($("sheet-academy")); openSheet(go.getAttribute("data-sheet-go")); return; }
    var b = e.target.closest("[data-module]"); if (!b) return;
    activeModule = b.getAttribute("data-module"); store("mz-module", activeModule); renderAcademy();
    if (b.closest(".module-foot")) $("module-view").scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
  });
  $("module-view").addEventListener("change", function (e) {
    var k = e.target.getAttribute("data-key"); if (!k) return;
    done[k] = e.target.checked; store("mz-academy", done); renderAcademy();
    if (AC.modules.every(function (m) { return m.lessons.every(function (_, i) { return done[key(m, i)]; }); })) toast("All modules done. Go build something.");
  });
  $("academy-reset").addEventListener("click", function () { done = {}; store("mz-academy", done); renderAcademy(); toast("Progress reset"); });
  renderAcademy();

  /* Advisory sheet */
  $("services").innerHTML = P.services.map(function (s) { return "<div class=\"service glass\"><span class=\"dur\">" + esc(s.duration) + "</span><h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></div>"; }).join("");
  var M = P.mapper;
  $("mapper-industry").innerHTML = M.industries.map(function (i) { return "<option value=\"" + i.value + "\">" + esc(i.label) + "</option>"; }).join("");
  $("mapper-pain").innerHTML = M.pains.map(function (x) { return "<option value=\"" + x.value + "\">" + esc(x.label) + "</option>"; }).join("");
  $("mapper-industry").value = "public"; $("mapper-pain").value = "documents";
  function renderMapper() {
    var ind = M.industries.filter(function (i) { return i.value === $("mapper-industry").value; })[0];
    var pain = M.pains.filter(function (x) { return x.value === $("mapper-pain").value; })[0];
    $("mapper-out").innerHTML = "<span class=\"label\">Starting brief for " + esc(ind.label.toLowerCase()) + "</span><h4>" + esc(pain.useCase) + "</h4>" +
      "<span class=\"label\">The metric that proves it</span><p>" + esc(pain.northStar) + "</p><span class=\"label\">A 30-day pilot</span><ol>" + pain.pilot.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>" +
      "<span class=\"label\">For your industry</span><p>" + esc(ind.note) + "</p><a class=\"btn btn-solid\" href=\"" + esc(bookHref) + "\"" + bookAttrs + ">Talk it through with me</a>";
  }
  $("mapper-industry").addEventListener("change", renderMapper); $("mapper-pain").addEventListener("change", renderMapper); renderMapper();

  /* Contact */
  var ce = $("contact-email"); ce.textContent = C.email || ""; ce.href = mailHref;
  function short(u) { return String(u || "").replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""); }
  var cardRows = [
    C.email ? ["Email", "<a href=\"" + esc(mailHref) + "\">" + esc(C.email) + "</a>"] : null,
    C.phone ? ["Phone", "<a href=\"tel:" + esc(C.phoneHref || C.phone) + "\">" + esc(C.phone) + "</a>"] : null,
    C.calendly ? ["Book a call", "<a href=\"" + esc(C.calendly) + "\" target=\"_blank\" rel=\"noopener\">" + esc(short(C.calendly)) + "</a>"] : null,
    C.linkedin ? ["LinkedIn", "<a href=\"" + esc(C.linkedin) + "\" target=\"_blank\" rel=\"noopener\">" + esc(short(C.linkedin)) + "</a>"] : null,
    ["Based in", esc(pr.location)]
  ].filter(Boolean);
  $("contact-card").innerHTML = cardRows.map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + r[1] + "</dd></div>"; }).join("");
  $("hero-contact").innerHTML = (C.email ? "<a href=\"" + esc(mailHref) + "\">" + esc(C.email) + "</a>" : "") +
    (C.phone ? "<a href=\"tel:" + esc(C.phoneHref || C.phone) + "\">" + esc(C.phone) + "</a>" : "") +
    (C.linkedin ? "<a href=\"" + esc(C.linkedin) + "\" target=\"_blank\" rel=\"noopener\">LinkedIn</a>" : "");
  $("footer-contact").innerHTML = (C.email ? "<a href=\"" + esc(mailHref) + "\">" + esc(C.email) + "</a>" : "") + (C.phone ? "<a href=\"tel:" + esc(C.phoneHref || C.phone) + "\">" + esc(C.phone) + "</a>" : "");
  $("contact-row").innerHTML =
    "<a class=\"btn btn-solid magnetic\" href=\"" + esc(bookHref) + "\"" + bookAttrs + ">Book a call</a>" +
    "<a class=\"btn btn-glass magnetic\" href=\"" + esc(mailHref) + "\">Email me</a>" +
    (C.linkedin ? "<a class=\"btn btn-glass magnetic\" href=\"" + esc(C.linkedin) + "\" target=\"_blank\" rel=\"noopener\">LinkedIn</a>" : "") +
    (C.resumeReady ? "<a class=\"btn btn-glass magnetic\" href=\"" + esc(C.resume) + "\" download=\"Muhammad-Zaigham-Resume.pdf\">Download résumé</a>" : "") +
    (C.email ? "<button class=\"btn btn-glass\" type=\"button\" id=\"copy-email\">Copy email</button>" : "");
  var cp = $("copy-email");
  if (cp) cp.addEventListener("click", function () {
    var fallback = function () { var r = document.createRange(); r.selectNodeContents(ce); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); toast("Selected. Press Ctrl+C to copy"); };
    try { navigator.clipboard.writeText(C.email).then(function () { toast("Email copied"); }, fallback); } catch (e) { fallback(); }
  });
  $("footer-name").textContent = "© " + new Date().getFullYear() + " " + pr.name;

  /* Scroll progress */
  (function () {
    var bar = $("progress"); if (!bar) return; var ticking = false;
    function upd() { ticking = false; var h = document.documentElement.scrollHeight - window.innerHeight; bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, window.scrollY / h) : 0) + ")"; }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true }); upd();
  })();

  /* Chapter rail */
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[data-chapter]"));
  $("rail-dots").innerHTML = sections.map(function (s) { return "<li><a href=\"#" + s.id + "\" aria-label=\"" + esc(s.getAttribute("data-chapter")) + "\"><span>" + esc(s.getAttribute("data-chapter")) + "</span></a></li>"; }).join("");
  var TAB_LABEL = { Intro: "Home", Receipts: "Results" };
  $("secnav-list").innerHTML = sections.filter(function (s) { return s.id !== "hero"; }).map(function (s) { var l = s.getAttribute("data-chapter"); return "<li><a href=\"#" + s.id + "\">" + esc(TAB_LABEL[l] || l) + "</a></li>"; }).join("");
  var secTabs = Array.prototype.slice.call(document.querySelectorAll("#secnav-list a"));
  function markTab(id) {
    secTabs.forEach(function (a) { var on = a.getAttribute("href") === "#" + id; a.classList.toggle("active", on); if (on) { a.setAttribute("aria-current", "true"); var ul = $("secnav-list"); var x = a.offsetLeft - (ul.clientWidth - a.offsetWidth) / 2; if (ul.scrollWidth > ul.clientWidth) ul.scrollTo({ left: x, behavior: reduce ? "auto" : "smooth" }); } else a.removeAttribute("aria-current"); });
  }
  if (C.resume) { $("secnav-cv").href = C.resume; } else { $("secnav-cv").hidden = true; }
  function fitTabs() { var ul = $("secnav-list"); ul.classList.toggle("overflowing", ul.scrollWidth > ul.clientWidth + 2); }
  window.addEventListener("resize", fitTabs); setTimeout(fitTabs, 300);
  var dots = Array.prototype.slice.call(document.querySelectorAll(".rail-dots a"));

  /* Jump palette */
  var jumpItems = [];
  sections.forEach(function (s) { jumpItems.push({ label: s.getAttribute("data-chapter"), kind: "Chapter", go: function () { s.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); } }); });
  P.cases.forEach(function (c) { jumpItems.push({ label: c.title, kind: "Case study", go: function () { openCase(c.id); } }); });
  creds.forEach(function (c, i) { jumpItems.push({ label: c.code + ", " + c.name, kind: "Credential", go: function () { openCert(i); } }); });
  P.beyond.forEach(function (d) { jumpItems.push({ label: d.title, kind: "Open", go: function () { openSheet("sheet-" + d.id); } }); });
  allKpis.forEach(function (r) { jumpItems.push({ label: r.k.name, kind: r.g.name + " KPI", go: function () { openSheet("sheet-playbook"); selectTab($("tab-metrics")); activeGroup = r.g.id; query = ""; $("kpi-search").value = ""; renderGroups(); renderKpis(); } }); });
  AC.modules.forEach(function (m) { jumpItems.push({ label: m.title, kind: "Academy", go: function () { activeModule = m.id; renderAcademy(); openSheet("sheet-academy"); } }); });
  jumpItems.push({ label: "Ask my AI twin", kind: "Assistant", go: function () { if (window.Assistant) window.Assistant.focus(); } });
  var jump = $("jump"), jumpSel = 0, jumpRows = [];
  function renderJump() {
    var q = $("jump-input").value.trim().toLowerCase();
    jumpRows = jumpItems.filter(function (i) { return !q || (i.label + " " + i.kind).toLowerCase().indexOf(q) > -1; }).slice(0, 40);
    if (jumpSel >= jumpRows.length) jumpSel = 0;
    $("jump-list").innerHTML = jumpRows.length ? jumpRows.map(function (i, n) { return "<li role=\"option\" data-n=\"" + n + "\" aria-selected=\"" + (n === jumpSel) + "\"><span>" + esc(i.label) + "</span><span>" + esc(i.kind) + "</span></li>"; }).join("")
      : "<li aria-disabled=\"true\"><span>Nothing matches. Try a KPI or ask my AI twin.</span><span></span></li>";
  }
  function openJump() { $("jump-input").value = ""; jumpSel = 0; renderJump(); if (jump.showModal) jump.showModal(); else jump.setAttribute("open", ""); $("jump-input").focus(); }
  function closeJump() { if (jump.close) jump.close(); else jump.removeAttribute("open"); }
  function runJump(n) { var it = jumpRows[n]; if (!it) return; closeJump(); setTimeout(it.go, 40); }
  ["jump-open", "jump-open-m"].forEach(function (id) { var b = $(id); if (b) b.addEventListener("click", openJump); });
  $("jump-input").addEventListener("input", function () { jumpSel = 0; renderJump(); });
  $("jump-input").addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); jumpSel = Math.min(jumpSel + 1, jumpRows.length - 1); renderJump(); }
    if (e.key === "ArrowUp") { e.preventDefault(); jumpSel = Math.max(jumpSel - 1, 0); renderJump(); }
    if (e.key === "Enter") { e.preventDefault(); runJump(jumpSel); }
    if (e.key === "Escape") { e.preventDefault(); closeJump(); return; }
    var li = $("jump-list").querySelector("[aria-selected=true]"); if (li) li.scrollIntoView({ block: "nearest" });
  });
  $("jump-list").addEventListener("click", function (e) { var li = e.target.closest("[data-n]"); if (li) runJump(+li.getAttribute("data-n")); });
  jump.addEventListener("click", function (e) { if (e.target === jump) closeJump(); });
  document.addEventListener("keydown", function (e) {
    var typing = /input|textarea|select/i.test(e.target.tagName || "") || e.target.isContentEditable;
    var anyOpen = document.querySelector("dialog[open]");
    if ((e.key === "/" && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) { if (!anyOpen) { e.preventDefault(); openJump(); } }
  });

  /* Chapter numbers on kickers */
  document.querySelectorAll("main section.chapter").forEach(function (sec, i) {
    var k = sec.querySelector(".kicker"); if (!k || k.querySelector(".k-num")) return;
    var n = document.createElement("span"); n.className = "k-num"; n.setAttribute("aria-hidden", "true"); n.textContent = String(i + 1).padStart(2, "0");
    k.insertBefore(n, k.firstChild);
  });

  /* Split headings into words */
  document.querySelectorAll(".split").forEach(function (h) {
    var text = h.textContent; h.setAttribute("aria-label", text);
    h.innerHTML = text.split(/(\s+)/).map(function (w, i) { return /^\s+$/.test(w) ? w : "<span class=\"w\" aria-hidden=\"true\" style=\"--i:" + i + "\">" + esc(w) + "</span>"; }).join("");
  });

  /* Scroll choreography */
  if ("IntersectionObserver" in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var s = en.target;
        if (window.PortfolioScene) window.PortfolioScene.setState(s.getAttribute("data-state"));
        dots.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + s.id); });
        markTab(s.id);
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { so.observe(s); });
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.classList.remove("pending"); el.classList.remove("pending-viz");
        el.querySelectorAll("[data-count]").forEach(countUp);
        ro.unobserve(el);
      });
    }, { threshold: 0.2 });
    if (!reduce) {
      document.querySelectorAll(".reveal, .split").forEach(function (el) { if (el.getBoundingClientRect().top > window.innerHeight * 0.9) { el.classList.add("pending"); ro.observe(el); } });
      document.querySelectorAll(".reveal-viz").forEach(function (el) { if (el.getBoundingClientRect().top > window.innerHeight * 0.9) { el.classList.add("pending-viz"); ro.observe(el); } });
    }
  }

  /* Hero entrance */
  if (!reduce) {
    document.querySelectorAll(".hero-hook .line > span").forEach(function (s, i) {
      s.animate([{ transform: "translateY(110%)" }, { transform: "none" }], { duration: 1100, delay: 100 + i * 160, easing: "cubic-bezier(.2,.8,.2,1)", fill: "backwards" });
    });
    $("portrait").animate([{ opacity: 0, transform: "translateY(40px) scale(.96)" }, { opacity: 1, transform: "none" }], { duration: 1300, delay: 250, easing: "cubic-bezier(.2,.8,.2,1)", fill: "backwards" });
    document.querySelectorAll(".float-chips li").forEach(function (li, i) {
      li.animate([{ opacity: 0, transform: "scale(.6)" }, { opacity: 1, transform: "scale(1)" }], { duration: 700, delay: 900 + i * 140, easing: "cubic-bezier(.2,.8,.2,1.4)", fill: "backwards" });
    });
  }

  /* 3D tilt with glare */
  function bindTilt(scope) {
    if (reduce || !finePointer) return;
    (scope || document).querySelectorAll(".tilt-card").forEach(function (card) {
      if (card._tilt) return; card._tilt = true;
      var max = card.id === "portrait" ? 8 : 5;
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.transform = "perspective(1000px) rotateY(" + ((x - 0.5) * max * 2) + "deg) rotateX(" + (-(y - 0.5) * max * 2) + "deg)";
        card.style.setProperty("--gx", (x * 100) + "%"); card.style.setProperty("--gy", (y * 100) + "%");
      });
      card.addEventListener("pointerleave", function () { card.style.transform = ""; });
    });
  }
  bindTilt(document);

  /* Cursor and magnetic buttons */
  if (finePointer && !reduce) {
    root.classList.add("has-cursor");
    var cur = $("cursor"), cx = 0, cy = 0, tx = 0, ty = 0;
    window.addEventListener("pointermove", function (e) { tx = e.clientX; ty = e.clientY; if (!root.classList.contains("cursor-live")) { cx = tx; cy = ty; root.classList.add("cursor-live"); } }, { passive: true });
    document.addEventListener("pointerleave", function () { root.classList.remove("cursor-live"); });
    (function loop() { cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2; cur.style.transform = "translate(" + cx + "px," + cy + "px)"; requestAnimationFrame(loop); })();
    document.addEventListener("pointerover", function (e) { cur.classList.toggle("hot", !!e.target.closest("a, button, input, select, .cred-card")); });
    document.addEventListener("pointerover", function (e) {
      var m = e.target.closest(".magnetic"); if (!m || m._mag) return; m._mag = true;
      m.addEventListener("pointermove", function (ev) { var r = m.getBoundingClientRect(); m.style.transform = "translate(" + ((ev.clientX - r.left - r.width / 2) * 0.25) + "px," + ((ev.clientY - r.top - r.height / 2) * 0.35) + "px)"; });
      m.addEventListener("pointerleave", function () { m.style.transform = ""; });
    });
  }

  /* Deep links: #case-id opens a case, #playbook #academy #lab #advisory open their sheet */
  function fromHash() {
    var id = location.hash.slice(1);
    if (P.cases.some(function (c) { return c.id === id; })) openCase(id);
    else if ($("sheet-" + id)) openSheet("sheet-" + id);
  }
  window.addEventListener("hashchange", fromHash); fromHash();

  window.PortfolioApp = { openCase: openCase, openSheet: openSheet };
})();
