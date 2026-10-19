/*
  Optional Google Analytics 4.
  Off until you put your Measurement ID (G-XXXXXXXXXX) in PORTFOLIO.analytics.ga4Id in content.js.
  Respects Do Not Track and Global Privacy Control. Never sends emails, names or chat text.
*/
(function () {
  var P = window.PORTFOLIO || {}, cfg = P.analytics || {}, id = String(cfg.ga4Id || "").trim();
  window.mzTrack = function () {};
  if (!/^G-[A-Z0-9]{4,}$/.test(id)) return;
  var nav = window.navigator || {};
  if (nav.globalPrivacyControl || nav.doNotTrack === "1" || window.doNotTrack === "1") return;
  if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", id, { allow_google_signals: false, allow_ad_personalization_signals: false });
  var s = document.createElement("script"); s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
  document.head.appendChild(s);

  window.mzTrack = function (name, params) { window.gtag("event", name, params || {}); };
  var fp = document.getElementById("footer-privacy");
  if (fp) fp.textContent = "Designed and built by Zaigham. Anonymous visit stats via Google Analytics; no ads, no data sold.";

  // Clicks worth counting: booking, email, résumé, LinkedIn, GitHub, lab links
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]"); if (!a) return;
    var h = a.getAttribute("href") || "";
    if (/calendly\.com/.test(h)) window.mzTrack("book_call_click");
    else if (/^mailto:/.test(h)) window.mzTrack("email_click");
    else if (/^tel:/.test(h)) window.mzTrack("phone_click");
    else if (/Resume\.pdf$/i.test(h)) window.mzTrack("resume_open");
    else if (/linkedin\.com/.test(h)) window.mzTrack("linkedin_click");
    else if (/github\.com/.test(h)) window.mzTrack("github_click");
    else if (/^https?:/.test(h)) window.mzTrack("outbound_click", { link_url: h });
  }, { passive: true });
})();
