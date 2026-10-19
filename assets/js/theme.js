/* Applies the saved theme before first paint. */
try { var t = localStorage.getItem("mz-theme"); if (t === "dark" || t === "light") document.documentElement.setAttribute("data-theme", t); } catch (e) {}
