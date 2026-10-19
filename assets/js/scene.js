/*
  The living core. One iridescent form that changes shape, position and mood per chapter.
  Each <section data-state="..."> picks a state from STATES below.
*/
(function () {
  var canvas = document.getElementById("scene");
  if (!canvas) return;
  if (typeof THREE === "undefined") { document.documentElement.classList.add("no-webgl"); canvas.hidden = true; return; }

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: "high-performance" }); }
  catch (e) { document.documentElement.classList.add("no-webgl"); canvas.hidden = true; return; }

  var small = window.innerWidth < 760;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75));
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 7);

  var NOISE = [
    "vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}",
    "vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}",
    "vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}",
    "vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}",
    "float snoise(vec3 v){const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);",
    "vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;",
    "vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;",
    "i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));",
    "float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);",
    "vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);",
    "vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;",
    "vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);",
    "vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;",
    "vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;",
    "return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}"
  ].join("\n");

  var vert = [
    "uniform float uTime; uniform float uAmp; uniform float uFreq;",
    "varying vec3 vN; varying vec3 vV; varying float vNoise; varying vec3 vPos;",
    NOISE,
    "float field(vec3 p){ return snoise(p*uFreq + vec3(uTime*0.18, uTime*0.12, -uTime*0.1)) + 0.45*snoise(p*uFreq*2.3 - uTime*0.15); }",
    "vec3 displace(vec3 p){ vec3 n = normalize(p); return n * (1.0 + uAmp * field(n)); }",
    "void main(){",
    "  vec3 p = displace(position);",
    "  vec3 n0 = normalize(position);",
    "  vec3 t = normalize(cross(n0, abs(n0.y) < 0.99 ? vec3(0.0,1.0,0.0) : vec3(1.0,0.0,0.0)));",
    "  vec3 b = normalize(cross(n0, t));",
    "  float e = 0.012;",
    "  vec3 pt = displace(normalize(n0 + t*e));",
    "  vec3 pb = displace(normalize(n0 + b*e));",
    "  vec3 nrm = normalize(cross(pt - p, pb - p));",
    "  if (dot(nrm, n0) < 0.0) nrm = -nrm;",
    "  vNoise = field(n0);",
    "  vec4 mv = modelViewMatrix * vec4(p, 1.0);",
    "  vN = normalize(normalMatrix * nrm); vV = normalize(-mv.xyz); vPos = p;",
    "  gl_Position = projectionMatrix * mv;",
    "}"
  ].join("\n");

  var frag = [
    "uniform float uTime; uniform float uDark; uniform float uAlpha; uniform float uWire; uniform vec3 uAccent; uniform vec3 uBase;",
    "varying vec3 vN; varying vec3 vV; varying float vNoise; varying vec3 vPos;",
    "vec3 pal(float t){ return 0.55 + 0.45*cos(6.28318*(vec3(1.0,1.0,1.0)*t + vec3(0.0,0.33,0.67))); }",
    "void main(){",
    "  if (uWire > 0.5) { gl_FragColor = vec4(uAccent, uAlpha); return; }",
    "  vec3 n = normalize(vN); vec3 v = normalize(vV);",
    "  float fr = pow(1.0 - max(dot(n, v), 0.0), 2.2);",
    "  vec3 irid = pal(fr*0.9 + vNoise*0.22 + vPos.y*0.08 + uTime*0.025);",
    "  vec3 L = normalize(vec3(0.6, 0.8, 0.9));",
    "  float diff = max(dot(n, L), 0.0);",
    "  float spec = pow(max(dot(reflect(-L, n), v), 0.0), 40.0);",
    "  vec3 lightCol = mix(uBase*(0.72+0.28*diff), irid, 0.35 + 0.55*fr) + spec*0.55;",
    "  vec3 darkCol = mix(uBase + irid*0.06*diff, irid*1.15, fr) + spec*0.35 + uAccent*0.12*diff;",
    "  vec3 col = mix(lightCol, darkCol, uDark);",
    "  gl_FragColor = vec4(col, uAlpha);",
    "}"
  ].join("\n");

  var uniforms = {
    uTime: { value: 0 }, uAmp: { value: 0.2 }, uFreq: { value: 1.1 }, uDark: { value: 0 },
    uAlpha: { value: 1 }, uWire: { value: 0 }, uAccent: { value: new THREE.Color("#2c3bf5") }, uBase: { value: new THREE.Color("#eef0f6") }
  };
  var geo = new THREE.IcosahedronGeometry(1, small ? 40 : 64);
  var solidMat = new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms: uniforms, transparent: true });
  var wireUniforms = THREE.UniformsUtils.clone(uniforms);
  wireUniforms.uWire.value = 1; wireUniforms.uAlpha.value = 0;
  var wireGeo = new THREE.IcosahedronGeometry(1.002, small ? 10 : 14);
  var wireMat = new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms: wireUniforms, transparent: true, wireframe: true, depthWrite: false });

  var core = new THREE.Group();
  var solid = new THREE.Mesh(geo, solidMat);
  var wire = new THREE.Mesh(wireGeo, wireMat);
  core.add(solid); core.add(wire);
  scene.add(core);

  // Orbits with satellites
  var orbits = new THREE.Group();
  var orbitMats = [];
  var satGeo = new THREE.BufferGeometry();
  var satPos = [], satMeta = [];
  [1.7, 2.15, 2.6].forEach(function (r, k) {
    var pts = [];
    for (var i = 0; i <= 160; i++) { var a = i / 160 * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r)); }
    var m = new THREE.LineBasicMaterial({ color: 0x2c3bf5, transparent: true, opacity: 0.22 });
    orbitMats.push(m);
    var line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), m);
    var holder = new THREE.Group();
    holder.rotation.set([1.25, 1.05, 1.4][k], [0.2, -0.5, 0.9][k], [0.3, -0.25, 0.1][k]);
    holder.add(line);
    holder.userData = { r: r, speed: [0.22, -0.16, 0.12][k] };
    orbits.add(holder);
    for (var s = 0; s < 3 + k; s++) { satMeta.push({ holder: holder, phase: Math.random() * Math.PI * 2 }); satPos.push(0, 0, 0); }
  });
  satGeo.setAttribute("position", new THREE.Float32BufferAttribute(satPos, 3));
  var satMat = new THREE.PointsMaterial({ color: 0x2c3bf5, size: 0.075, transparent: true, opacity: 0.9, depthWrite: false });
  var sats = new THREE.Points(satGeo, satMat);
  core.add(orbits);
  scene.add(sats);

  // Dust field
  var D = small ? 500 : 1100, dpos = new Float32Array(D * 3);
  for (var i = 0; i < D; i++) {
    var rr = 3 + Math.random() * 9, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    dpos[i * 3] = rr * Math.sin(ph) * Math.cos(th) * 1.6; dpos[i * 3 + 1] = rr * Math.cos(ph) * 0.9; dpos[i * 3 + 2] = rr * Math.sin(ph) * Math.sin(th) - 4;
  }
  var dustGeo = new THREE.BufferGeometry(); dustGeo.setAttribute("position", new THREE.BufferAttribute(dpos, 3));
  var dustMat = new THREE.PointsMaterial({ color: 0x0e121c, size: 0.022, transparent: true, opacity: 0.35, depthWrite: false });
  var dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  // Chapter states: x and y are fractions of half the visible width/height
  var STATES = {
    hero:        { x: 0.52, y: 0.14,  s: 1.15, amp: 0.20, freq: 1.05, wire: 0,    solid: 1,    orbit: 1,   op: 1 },
    about:       { x: 0.62, y: 0.30,  s: 0.62, amp: 0.26, freq: 1.4,  wire: 0,    solid: 1,    orbit: 0.4, op: 0.55 },
    journey:     { x: -0.62, y: -0.3, s: 0.72, amp: 0.32, freq: 1.6,  wire: 0,    solid: 1,    orbit: 1,   op: 0.5 },
    aiwork:      { x: 0.66, y: -0.2,  s: 0.8,  amp: 0.48, freq: 2.1,  wire: 0,    solid: 1,    orbit: 0.6, op: 0.5 },
    impact:      { x: 0,    y: 0,     s: 1.5,  amp: 0.14, freq: 0.9,  wire: 0,    solid: 1,    orbit: 0.3, op: 0.28 },
    cases:       { x: 0.6,  y: 0.15,  s: 0.95, amp: 0.10, freq: 0.9,  wire: 1,    solid: 0.06, orbit: 0.5, op: 0.7 },
    lab:         { x: -0.64, y: 0.2,  s: 0.7,  amp: 0.38, freq: 1.8,  wire: 0.35, solid: 1,    orbit: 0.7, op: 0.5 },
    credentials: { x: 0.64, y: -0.25, s: 0.7,  amp: 0.16, freq: 1.0,  wire: 0,    solid: 1,    orbit: 1,   op: 0.5 },
    playbook:    { x: -0.66, y: 0.1,  s: 0.65, amp: 0.3,  freq: 1.5,  wire: 0,    solid: 1,    orbit: 0.5, op: 0.4 },
    academy:     { x: 0.66, y: 0.2,   s: 0.6,  amp: 0.22, freq: 1.2,  wire: 0,    solid: 1,    orbit: 0.5, op: 0.4 },
    services:    { x: -0.6, y: -0.15, s: 0.75, amp: 0.28, freq: 1.3,  wire: 0.2,  solid: 1,    orbit: 0.8, op: 0.5 },
    hub:         { x: 0.6,  y: 0.0,   s: 0.55, amp: 0.18, freq: 1.1,  wire: 0.6,  solid: 0.5,  orbit: 1,   op: 0.3 },
    contact:     { x: 0.9,  y: -0.3,  s: 0.72,  amp: 0.24, freq: 1.1,  wire: 0,    solid: 1,    orbit: 1,   op: 0.85 }
  };
  var cur = Object.assign({}, STATES.hero), target = STATES.hero;
  var mouse = { x: 0, y: 0, sx: 0, sy: 0 }, scrollV = 0, lastY = window.scrollY;

  function visible() {
    var h = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    return { w: h * camera.aspect, h: h };
  }
  // Read layout variables only on resize, never per frame (avoids style recalculation every frame)
  var bias = { center: 0, span: 1 };
  function measureBias() {
    var cs = getComputedStyle(document.documentElement);
    var agent = parseFloat(cs.getPropertyValue("--agent-w")) || 0, rail = parseFloat(cs.getPropertyValue("--rail-w")) || 0;
    bias = { center: (rail - agent) / 2 / window.innerWidth, span: (window.innerWidth - agent - rail) / window.innerWidth };
  }
  function layoutBias() { return bias; }

  function theme() {
    var t = document.documentElement.getAttribute("data-theme");
    if (!t) t = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    return t;
  }
  var darkGoal = 0;
  function applyTheme() {
    var dark = theme() === "dark";
    darkGoal = dark ? 1 : 0;
    var acc = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#2c3bf5";
    uniforms.uAccent.value.set(acc); wireUniforms.uAccent.value.set(acc);
    uniforms.uBase.value.set(dark ? "#0a0c16" : "#eef0f6");
    orbitMats.forEach(function (m) { m.color.set(acc); });
    satMat.color.set(acc);
    dustMat.color.set(dark ? "#b9c2ff" : "#0e121c");
    dustMat.opacity = dark ? 0.5 : 0.3;
    if (reduce) { uniforms.uDark.value = darkGoal; render(0); }
  }
  window.addEventListener("themechange", applyTheme);
  if (window.matchMedia) { var mq = window.matchMedia("(prefers-color-scheme: dark)"); if (mq.addEventListener) mq.addEventListener("change", applyTheme); }

  window.PortfolioScene = {
    setState: function (name) {
      if (!STATES[name]) return;
      target = STATES[name];
      document.documentElement.style.setProperty("--scene-opacity", String(target.op));
      if (reduce) { cur = Object.assign({}, target); render(0); }
    },
    pulse: function () { cur.amp += 0.25; }
  };

  window.addEventListener("pointermove", function (e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1; mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });
  window.addEventListener("scroll", function () { scrollV += Math.abs(window.scrollY - lastY); lastY = window.scrollY; }, { passive: true });

  function resize() {
    var w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h;
    camera.position.z = w < 760 ? 9.5 : 7;
    camera.updateProjectionMatrix();
    measureBias();
    if (reduce) render(0);
  }
  window.addEventListener("resize", resize);

  function lerp(a, b, k) { return a + (b - a) * k; }
  var t0 = performance.now(), last = t0;
  function render(dt) {
    var k = reduce ? 1 : Math.min(1, dt * 2.2);
    ["x", "y", "s", "amp", "freq", "wire", "solid", "orbit"].forEach(function (key) { cur[key] = lerp(cur[key], target[key], k); });
    var vis = visible(), lb = layoutBias(), narrow = window.innerWidth < 1080;
    // On narrow screens the core parks in the top-right corner so it never sits under running text
    var xFrac = narrow ? 0.8 : cur.x;
    var px = (lb.center + xFrac * lb.span * 0.5) * vis.w;
    var py = (narrow ? 0.8 : cur.y) * vis.h * 0.5;
    core.position.set(px, py, 0);
    sats.position.copy(core.position);
    var sc = narrow ? Math.min(cur.s, 0.9) * 0.5 : cur.s;
    core.scale.setScalar(sc); sats.scale.setScalar(sc);
    uniforms.uAmp.value = cur.amp; uniforms.uFreq.value = cur.freq; wireUniforms.uAmp.value = cur.amp; wireUniforms.uFreq.value = cur.freq;
    uniforms.uAlpha.value = cur.solid; wireUniforms.uAlpha.value = cur.wire * 0.55;
    solid.visible = cur.solid > 0.02; wire.visible = cur.wire > 0.02;
    orbitMats.forEach(function (m) { m.opacity = 0.22 * cur.orbit; }); satMat.opacity = 0.9 * cur.orbit;
    uniforms.uDark.value = lerp(uniforms.uDark.value, darkGoal, reduce ? 1 : Math.min(1, dt * 3));
    renderer.render(scene, camera);
  }

  // Adaptive quality: if this device renders slowly, lower the resolution, then switch to a lighter page
  var perf = { n: 0, sum: 0, level: 0 }, skip = false;
  function governor(rawDt) {
    if (perf.level >= 2 || rawDt > 0.5) return;
    perf.n++; perf.sum += rawDt;
    if (perf.n < 30 && perf.sum < 1.5) return;
    var avg = perf.sum / perf.n; perf.n = 0; perf.sum = 0;
    if (avg > 0.034) {
      perf.level++;
      if (perf.level === 1) { renderer.setPixelRatio(1); resize(); }
      if (perf.level === 2) { document.documentElement.classList.add("lite"); }
    }
  }
  function tick(now) {
    if (document.hidden) { last = now; requestAnimationFrame(tick); return; }
    var rawDt = (now - last) / 1000; governor(rawDt);
    if (perf.level >= 2) { skip = !skip; if (skip) { requestAnimationFrame(tick); return; } }
    var dt = Math.min(rawDt, 0.05); last = now;
    var t = (now - t0) / 1000;
    uniforms.uTime.value = t; wireUniforms.uTime.value = t;
    mouse.sx = lerp(mouse.sx, mouse.x, 0.05); mouse.sy = lerp(mouse.sy, mouse.y, 0.05);
    scrollV *= 0.9;
    cur.amp = lerp(cur.amp, target.amp + Math.min(scrollV, 120) / 900, Math.min(1, dt * 2));
    core.rotation.y = t * 0.12 + mouse.sx * 0.5;
    core.rotation.x = mouse.sy * 0.3 + Math.sin(t * 0.2) * 0.08;
    orbits.children.forEach(function (o) { o.rotation.y += o.userData.speed * dt; });
    var arr = satGeo.attributes.position.array, v = new THREE.Vector3();
    satMeta.forEach(function (m, i) {
      var a = m.phase + t * (0.35 + i * 0.03), r = m.holder.userData.r;
      v.set(Math.cos(a) * r, 0, Math.sin(a) * r).applyEuler(m.holder.rotation).applyEuler(core.rotation);
      arr[i * 3] = v.x; arr[i * 3 + 1] = v.y; arr[i * 3 + 2] = v.z;
    });
    satGeo.attributes.position.needsUpdate = true;
    dust.rotation.y = t * 0.012 + mouse.sx * 0.05; dust.rotation.x = mouse.sy * 0.04;
    render(dt);
    requestAnimationFrame(tick);
  }

  resize(); applyTheme();
  if (reduce) { render(0); } else { requestAnimationFrame(tick); }
})();
