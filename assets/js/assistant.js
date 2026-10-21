/*
  Portfolio assistant.
  Answers questions about Zaigham from content.js, entirely in the browser. No API key, no server.
  Optional: set PORTFOLIO.assistant.endpoint to your own serverless function (see extras/assistant-worker.js)
  to answer with a large language model, with this engine as the fallback.
*/
(function () {
  var P = window.PORTFOLIO;
  if (!P) return;
  var A = P.assistant || {};
  var C = P.contact || {};
  var first = (P.profile && P.profile.firstName) || "Zaigham";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- text helpers ---------- */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function p(s) { return "<p>" + s + "</p>"; }
  function ul(items) { return "<ul>" + items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul>"; }
  function b(s) { return "<strong>" + esc(s) + "</strong>"; }
  var SYN = {
    certification: ["cert", "certs", "certificate", "certificates", "certified", "certifications", "credential", "credentials", "qualification", "qualifications", "accreditation"],
    contact: ["email", "mail", "reach", "connect", "touch", "message"],
    book: ["calendly", "schedule", "meeting", "call", "appointment", "invite", "calendar"],
    experience: ["experienced", "background", "career", "history", "worked", "expertise"],
    ai: ["genai", "llm", "llms", "gpt", "artificial", "intelligence", "ml", "machine"],
    agentic: ["agents", "agent", "automation", "automations", "workflow", "workflows", "autonomous"],
    chatbot: ["bot", "bots", "chatbots", "conversational", "virtual", "assistant", "assistants", "va"],
    salary: ["compensation", "pay", "wage", "wages", "ctc", "package"],
    hire: ["hiring", "recruit", "recruiter", "candidate", "fit", "why"],
    resume: ["cv", "résumé"],
    tools: ["tool", "toolkit", "stack", "software", "tech", "technology", "technologies"],
    available: ["availability", "open", "looking", "opportunity", "opportunities", "seeking", "role", "roles", "job", "jobs"],
    location: ["where", "based", "live", "lives", "city", "relocate", "relocation", "remote", "hybrid", "onsite"]
  };
  var SYN_MAP = {};
  Object.keys(SYN).forEach(function (k) { SYN[k].forEach(function (w) { SYN_MAP[w] = k; }); });
  var STOP = "a an the is are was were be been of to in on for and or with about me tell his he him does do did can could would you your what which who how why when where it this that please any some there have has had i we our my know more much".split(" ");
  function stem(w) {
    if (w.length > 5 && /ies$/.test(w)) return w.slice(0, -3) + "y";
    if (w.length > 5 && /ing$/.test(w)) return w.slice(0, -3);
    if (w.length > 4 && /ed$/.test(w)) return w.slice(0, -2);
    if (w.length > 3 && /s$/.test(w) && !/ss$/.test(w)) return w.slice(0, -1);
    return w;
  }
  function norm(s) { return " " + String(s).toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9.+\- ]+/g, " ").replace(/\s+/g, " ").trim() + " "; }
  function tokens(s) {
    var out = [];
    norm(s).trim().split(" ").forEach(function (w) {
      if (!w || STOP.indexOf(w) > -1) return;
      out.push(w); out.push(stem(w));
      if (SYN_MAP[w]) out.push(SYN_MAP[w]);
    });
    return out;
  }

  /* ---------- content shortcuts ---------- */
  var tl = (P.story && P.story.timeline) || [];
  function role(org) { return tl.filter(function (t) { return t.org.toLowerCase().indexOf(org) > -1; })[0]; }
  function work(id) { return (P.aiWork || []).filter(function (w) { return w.id === id; })[0]; }
  var GO = function (label, hash) { return { label: label, href: "#" + hash }; };
  var EMAIL = C.email ? { label: "Email " + first, href: "mailto:" + C.email } : null;
  var BOOK = C.calendly ? { label: "Book a call", href: C.calendly, ext: true } : (C.email ? { label: "Request a call", href: "mailto:" + C.email + "?subject=" + encodeURIComponent("Let's set up a call") } : null);
  var LINKEDIN = C.linkedin ? { label: "LinkedIn", href: C.linkedin, ext: true } : null;
  function acts() { return Array.prototype.slice.call(arguments).filter(Boolean); }

  /* ---------- knowledge base: answers told as stories ---------- */
  function caseBy(id) { return (P.cases || []).filter(function (c) { return c.id === id; })[0]; }
  function outs(c) { return c.outcomes.map(function (o) { return b(o.v) + " " + esc(o.l); }).join(", "); }
  function caseLine(c) { return b(c.number + " " + c.title) + " (" + esc(c.org) + "): " + outs(c); }
  var KB = [
    { id: "greet", keys: ["hi", "hello", "hey", "salam", "good morning", "good evening"], answer: function () {
      return { html: p("Hi! I'm " + first + "'s AI twin. I can tell you the story behind his AI products, walk you through his career from enterprise to government to startup, or explain how he runs product. Where should we start?"), follow: A.suggestions };
    } },
    { id: "thanks", keys: ["thanks", "thank", "appreciate", "great", "awesome", "cool"], answer: function () {
      return { html: p("Glad that helped. The best stories are even better first-hand, and " + first + " is easy to reach."), actions: acts(BOOK, EMAIL), follow: ["Tell me his story", "What has he shipped?"] };
    } },
    { id: "self", keys: ["who are you", "are you ai", "are you real", "how do you work", "are you a bot", "are you human"], answer: function () {
      return { html: p("I'm an AI twin " + first + " built into this portfolio. I only tell stories that are on this site: his career, his AI products, his certifications and how he works. If I don't know something, I'll say so and point you to him. Fun fact: building me is part of why he calls himself a builder now."), follow: A.suggestions };
    } },
    { id: "who", keys: ["who is", "about him", "introduce", "summary", "overview", "profile", "zaigham", "muhammad", "himself", "elevator pitch", "quick intro", "his story", "tell me his story", "story", "background"], answer: function () {
      return { html: p(first + "'s story runs across three worlds.") +
        p(b("Enterprise first.") + " He started in 2009 fixing processes on contact-centre floors at Ufone, then spent ten years at du, a telecom with 9M+ customers. There he went from owning digital journeys to running AI: he scaled a virtual assistant to 1M+ conversations a year at 8.5/10 CSAT, leading a cross-functional team of 25+.") +
        p(b("Then government.") + " At RAK Municipality he brought GenAI and document AI into public services: engineers went from 15 minutes to under 2 to find a procedure, and 70% of documents now validate straight through.") +
        p(b("Now a startup.") + " At Hrudai, an AI startup in Canada, he builds agentic AI for insurance, fintech and real estate clients.") +
        p("Along the way: 11 AI solutions in production, worth ~CAD $3.3M a year. And he prototypes what he ships himself."),
        actions: acts(GO("See the journey", "journey")), follow: ["What has he shipped?", "Is he hands-on?", "Why hire him?"] };
    } },
    { id: "hrud", keys: ["hrud", "hrudai", "hrud.ai", "startup", "current", "currently", "now", "today", "present", "current role", "current job", "employer", "company"], answer: function () {
      var cs = ["insurance-claims", "payment-dispute", "property-enquiry"].map(caseBy).filter(Boolean);
      return { html: p("In May 2026 " + first + " traded the big-company machine for startup speed. At " + b("Hrudai") + ", an AI and intelligent automation startup in Canada, he owns a portfolio of 4 AI solutions for B2B clients, worth ~CAD $450K a year.") +
        p("He scored 8 automation ideas and took the best 2 to production in 4 months. Then he did the unglamorous work that makes AI trustworthy: he benchmarked 6 frontier LLMs and routed tasks by complexity (30% cheaper per query, p95 under 3 seconds), and he built a 200-case golden dataset that cut hallucinations from 15% to under 4%. The agentic workflows hit 92% task success and cut complaints by 28%.") +
        p("Featured here:") + ul(cs.map(caseLine)),
        actions: acts(GO("See the case studies", "cases")), follow: ["Tell me about the insurance claims workflow", "Tell me about the property assistant", "Is he hands-on?"] };
    } },
    { id: "du", keys: ["du", "du telecom", "telecom", "telco", "uae", "enterprise"], answer: function () {
      return { html: p("du is where " + first + " learned to ship at scale. For seven years he was a Product Owner across mobile, web and CRM for 9M+ customers: 80+ digital journeys, 60+ API integrations, and the digital share of transactions grew from 25% to 40%.") +
        p("In 2022 he moved into AI. The old rule-based bot handed most chats to agents without context, so he rebuilt it as one AI assistant that answers, troubleshoots, fixes suspensions, explains bills and takes payments. He added each capability behind its own release gate, and led 25+ engineers, data scientists, designers and vendors to do it.") +
        p("The result: 1M+ conversations a year, 80%+ contained without an agent, 8.5/10 CSAT, agent handoffs down from 22% to 17%, ~8,000 agent contacts removed every month, and ~CAD $2.4M a year saved."),
        actions: acts(GO("See the case studies", "cases")), follow: ["Tell me about the du AI Virtual Assistant", "Tell me about the billing agent", "What is containment rate?"] };
    } },
    { id: "rak", keys: ["rak", "municipality", "government", "govtech", "public sector", "ras al khaimah", "citizen"], answer: function () {
      return { html: p("In 2025 " + first + " took his playbook into government at RAK Municipality. The problem there wasn't technology. It was paper: engineers dug through 300+ PDFs for a single clause, and reviewers read every ID and title deed by hand.") +
        p("He shipped two things. A 0 to 1 GenAI knowledge assistant took procedure answers from ~15 minutes to under 2 for 120+ engineers and inspectors, always citing the exact clause. And OCR document AI now validates 70% of documents straight through, with 55% less manual checking and under 0.5% wrong acceptance.") +
        p("Being government, every release cleared Privacy Impact and Threat and Risk Assessments first."),
        actions: acts(GO("See the case studies", "cases")), follow: ["Tell me about the engineering knowledge assistant", "Tell me about document verification"] };
    } },
    { id: "ufone", keys: ["ufone", "pakistan", "early career", "first job", "start his career", "started"], answer: function () {
      return { html: p("It started in 2009 at Ufone, part of Etisalat Group, as a Process Improvement Specialist. He led ISO 9001 quality certification for customer operations and moved CRM for 3,000+ users to the web, cutting handling time by 15%.") +
        p("That's where the habit formed: fix the process first, then the product. He still starts every AI project the same way."),
        actions: acts(GO("See the journey", "journey")), follow: ["What did he do at du?", "Tell me his story"] };
    } },
    { id: "years", keys: ["years", "how long", "how many years", "seniority", "senior", "experience"], answer: function () {
      return { html: p(first + " has " + b("10+ years in product management") + ", B2C and B2B, in Canada and the UAE. And he's seen it from every side:") +
        ul([b("Enterprise") + ": Ufone and du, 2009 to 2024", b("Government") + ": RAK Municipality, 2025 to 2026", b("Startup") + ": Hrudai, 2026 to now"]),
        actions: acts(GO("See the journey", "journey")), follow: ["Tell me his story", "What has he shipped?"] };
    } },
    { id: "ai", keys: ["ai", "ai experience", "ai product", "ai products", "shipped", "delivered", "use case", "use cases", "production", "projects", "what has he shipped", "solutions"], answer: function () {
      var groups = (P.caseCategories || []).map(function (cat) {
        var items = P.cases.filter(function (c) { return c.cat === cat.id; });
        return b(cat.label + " (" + items.length + ")") + ": " + items.map(function (c) { return esc(c.title); }).join(", ");
      });
      return { html: p("Eleven AI products in production, worth ~CAD $3.3M a year in savings and client value. Eight are featured as case studies:") + ul(groups) +
        p("Pick any one and I'll tell you its story: the problem, what he built, the guardrail that mattered and the result."),
        actions: acts(GO("See the case studies", "cases")), follow: ["Tell me about the insurance claims workflow", "Tell me about the du AI Virtual Assistant", "Tell me about document verification"] };
    } },
    { id: "builder", keys: ["ai tools", "ai stack", "builder", "lovable", "claude code", "codex", "copilot", "wispr", "hands on", "hands-on", "is he hands-on", "does he code", "can he code", "build himself", "prototype", "prototypes", "prototyping", "vibe coding", "demos", "demo"], answer: function () {
      var B = { tools: ((P.toolkit || []).filter(function (g) { return g.group === "AI prototyping"; })[0] || { items: [] }).items };
      return { html: p("Yes, and that's his edge. Most PMs hand over a document. " + first + " hands over something you can click.") +
        p("He prototypes with " + esc(B.tools.join(", ")) + ". ModelFit, the Enterprise AI Architecture Lab, this portfolio and I are all his builds.") +
        p("It changes the conversation: teams react to a working product in days, not a spec in weeks."),
        actions: acts(GO("Watch the demos", "cases"), GO("Open the lab", "lab")), follow: ["What is ModelFit?", "Tell me about the insurance claims workflow"] };
    } },
    { id: "cloud", keys: ["cloud", "azure", "aws", "google cloud", "gcp", "model evaluation", "evaluate models", "which model", "llm selection", "latency", "cost to serve", "evals", "evaluation", "model routing", "bedrock", "vertex"], answer: function () {
      return { html: p("He's shipped on all three major clouds: Azure for du and most client work, Google Cloud (Document AI, Vertex AI) for RAK Municipality's document verification, Microsoft Copilot Studio on Azure for its knowledge assistant, and AWS (Bedrock, Textract) for insurance and property clients.") +
        p("On model choice, his story is simple: don't pay for the biggest model on every task. At Hrudai he benchmarked 6 frontier LLMs and routed each task by complexity, cutting cost per query by 30% at equal accuracy, with p95 responses under 3 seconds."),
        actions: acts(GO("Credentials and tools", "credentials")), follow: ["What guardrails does he use?", "What is ModelFit?"] };
    } },
    { id: "certs", keys: ["certification", "certifications", "certified", "pmp cbap", "accreditation"], answer: function () {
      var list = (P.credentials || []).map(function (c) { return b(c.code) + ", " + esc(c.name) + " (" + esc(c.issuer) + (c.date ? ", " + esc(c.date) : "") + ")"; });
      return { html: p(first + " backs the practice with " + list.length + " credentials:") + ul(list), actions: acts(GO("See the credentials", "credentials")), follow: ["Education?", "How does he run product?"] };
    } },
    { id: "edu", keys: ["education", "degree", "university", "study", "studied", "college", "masters", "mba", "bachelor", "york"], answer: function () {
      return { html: p("Most recent first:") + ul((P.education || []).map(function (e) { return b(e.title) + ", " + esc(e.org) + (e.when ? " (" + esc(e.when) + ")" : ""); })) + p("The York certificate was his first Canadian credential, earned in 2025."),
        actions: acts(GO("See credentials", "credentials")), follow: ["Which certifications?"] };
    } },
    { id: "tools", keys: ["tools", "jira", "figma", "confluence", "power bi", "tableau", "analytics", "miro", "devops", "sap", "salesforce", "siebel", "bscs", "opentext", "systems", "enterprise systems"], answer: function () {
      var g = (P.toolkit || []).map(function (t) { return b(t.group) + ": " + esc(t.items.join(", ")); });
      return { html: p("His toolkit spans the systems big organizations actually run on, and the AI tools he builds with:") + ul(g), actions: acts(GO("Systems and tools", "credentials")), follow: ["Is he hands-on?", "How does he run product?"] };
    } },
    { id: "hire", keys: ["hire", "why hire", "strength", "strengths", "different", "unique", "stand out", "good at", "best at", "value", "superpower", "weakness"], answer: function () {
      return { html: p("Three reasons teams call " + first + ":") +
        ul([b("He ships.") + " 11 AI products in production in 5 years, worth ~CAD $3.3M a year.", b("He proves it.") + " Golden datasets, guardrails and release gates before launch: hallucinations from 15% to under 4%, 92% task success.", b("He builds.") + " He prototypes what he proposes, so teams react to something real in days."]) +
        p("And he's done it in an enterprise with 9M+ customers, a government, and a startup."),
        actions: acts(BOOK, EMAIL), follow: ["Tell me his story", "Is he open to new roles?"] };
    } },
    { id: "stakeholders", keys: ["stakeholder", "stakeholders", "leadership", "lead", "team", "teams", "led", "engineering", "engineers", "collaborate", "communication", "manage", "cross functional", "cross-functional"], answer: function () {
      return { html: p("At du he led a cross-functional team of 25+ engineers, data scientists, designers and vendor partners across 5 AI and digital products. His style: bring engineers the problem and the constraints, not a fixed solution, then make trade-offs together.") +
        p("He also runs the ceremonies that keep big teams moving: PI planning, sprint planning, refinement, stand-ups and retrospectives, with 200+ SIT and UAT cycles and a 95%+ on-time release rate behind him."),
        actions: acts(GO("How I ship", "method")), follow: ["How does he run product?", "How does he prioritize?"] };
    } },
    { id: "process", keys: ["process", "approach", "method", "methodology", "framework", "how does he work", "how he builds", "how does he run product", "lifecycle", "plm", "end to end"], answer: function () {
      var st = (P.plm && P.plm.stages) || [];
      return { html: p("He runs the full product lifecycle, discovery to sunset:") + ul(st.map(function (x) { return b(x.verb) + ": " + esc(x.techniques.slice(0, 4).join(", ")); })) +
        p("The thread through all of it: evidence over opinion. Even prioritization is scored, with RICE, MoSCoW or WSJF depending on the decision."),
        actions: acts(GO("How I ship", "method")), follow: ["How does he prioritize?", "How does he run discovery?"] };
    } },
    { id: "requirements", keys: ["prd", "brd", "frd", "requirements", "user stories", "acceptance criteria", "traceability", "rtm", "documentation"], answer: function () {
      return { html: p("He writes the documents that turn a decision into a build: business cases, BRDs, PRDs and FRDs, then user stories with acceptance criteria, all tied together in a requirement traceability matrix so nothing gets lost between sign-off and UAT.") +
        p("At RAK Municipality alone he defined 100+ requirements for the qualification and inspection modules. Every case study here has a full PRD behind it."),
        actions: acts(GO("Case studies", "cases")), follow: ["How does he prioritize?", "How does he release?"] };
    } },
    { id: "agile", keys: ["agile", "scrum", "safe", "pi planning", "sprint", "sprints", "standup", "stand-up", "retrospective", "retro", "refinement", "ceremonies", "release management", "release", "releases"], answer: function () {
      return { html: p("He's run delivery at scaled-agile size: PI planning, sprint planning, backlog refinement, daily stand-ups, reviews and retrospectives across 3 Scrum teams at du.") +
        p("On release, he runs the full cycle: SIT and UAT, go-live readiness and change management. That's 200+ SIT and UAT cycles with a 95%+ on-time release rate. He's certified SAFe POPM, SAFe Agilist and ScrumMaster."),
        actions: acts(GO("How I ship", "method")), follow: ["How does he prioritize?", "Which certifications?"] };
    } },
    { id: "kpis", keys: ["kpi", "kpis", "metric", "metrics", "measure", "measurement", "north star", "okr", "okrs"], answer: function () {
      var g = P.playbook.kpiGroups.map(function (x) { return b(x.name) + ": " + esc(x.intro); });
      return { html: p("Every product he ships has a north star and counter-metrics. He tracks six families:") + ul(g) + p("Ask me about any one, like containment, p95 latency or groundedness."), actions: acts(GO("The playbook", "playbook")), follow: ["What is containment rate?", "What is groundedness?"] };
    } },
    { id: "discovery", keys: ["discovery", "user research", "research", "interview", "interviews", "jtbd", "jobs to be done", "workshop", "workshops", "focus group", "focus groups", "brainstorm", "complaint analysis", "csat analysis", "one to one", "1:1"], answer: function () {
      return { html: p("Discovery is where he spends the most time, because it's the cheapest place to be wrong. His toolkit: 1:1 user interviews, workshops, focus groups, JTBD sessions, and CSAT and complaint analysis.") +
        p("For AI products he adds one more: mining real contact reasons and chat logs. At du that's how 200+ initiatives were ranked, and it's how the first intents for the virtual assistant were chosen."),
        actions: acts(GO("How I ship", "method")), follow: ["How does he prioritize?", "What is RICE?"] };
    } },
    { id: "prioritization", keys: ["prioritize", "prioritization", "prioritise", "prioritisation", "roadmap", "backlog", "trade off", "trade-off", "moscow"], answer: function () {
      return { html: p("He picks the technique to fit the decision. RICE for a feature backlog, MoSCoW to lock MVP scope with stakeholders, WSJF when big programs compete for the same teams, and impact vs effort for a quick workshop call.") +
        p("At du he prioritized 200+ initiatives this way. The rule he lives by: if confidence is low, the score is low, however loud the request."),
        actions: acts(GO("The playbook", "playbook")), follow: ["What is WSJF?", "What is RICE?"] };
    } },
    { id: "impact", keys: ["impact", "results", "best results", "achievements", "achievement", "numbers", "outcomes", "accomplishment", "kpis improved", "receipts", "metrics achieved"], answer: function () {
      return { html: p("The headline: 11 AI products in production, worth ~CAD $3.3M a year. Some of the receipts behind it:") + ul((P.proof || []).slice(0, 8).map(function (x) { return b(x.value) + " " + esc(x.label); })), actions: acts(GO("See the receipts", "proof")), follow: ["Tell me about the du AI Virtual Assistant", "What guardrails does he use?"] };
    } },
    { id: "cases", keys: ["case study", "case studies", "portfolio", "examples", "work samples", "full case study", "download", "request", "pdf"], answer: function () {
      return { html: p("Eight featured case studies, a sample of the eleven AI products he has in production: RAG and AI search, agentic and document AI, and virtual assistants. Each tile shows the problem, the guardrail and three measured outcomes, with a demo. Want the full write-up in PRD format? Hit \"Request full case study\" on any tile, leave your email, and he'll send it to you personally.") +
        p("Want me to tell you one? Try the insurance claims workflow or the du assistant."),
        actions: acts(GO("See the case studies", "cases")), follow: ["Tell me about the insurance claims workflow", "Tell me about the du AI Virtual Assistant"] };
    } },
    { id: "lab", keys: ["what else is in his lab", "lab", "side project", "side projects", "personal project", "personal projects", "github", "builds", "modelfit", "hobby"], answer: function () {
      var l = (P.lab || []).map(function (x) { return b(x.title) + ": " + esc(x.text); });
      return { html: p("Beyond client work, he keeps building:") + ul(l), actions: acts(GO("Open the lab", "lab"), C.github ? { label: "GitHub", href: C.github, ext: true } : null), follow: ["Is he hands-on?", "Does he mentor PMs?"] };
    } },
    { id: "training", keys: ["training", "teach", "teaching", "mentor", "mentoring", "coach", "coaching", "architecture lab", "enable", "enablement"], answer: function () {
      return { html: p("He built the " + b("Enterprise AI Architecture Lab") + " to get delivery teams fluent in AI foundations, virtual assistants, RAG and agentic AI, and he runs a free " + b("PM Academy") + " on this site for people breaking into product.") ,
        actions: acts(GO("Open the academy", "academy")), follow: ["What services does he offer?"] };
    } },
    { id: "academy", keys: ["junior", "beginner", "career switch", "break into", "become a pm", "learn product", "course", "academy", "lessons", "new pm"], answer: function () {
      var m = P.academy.modules.map(function (x) { return esc(x.title); });
      return { html: p("The free PM Academy has " + m.length + " modules, each ending with a real exercise:") + ul(m), actions: acts(GO("Start the academy", "academy")), follow: ["Does he offer coaching?"] };
    } },
    { id: "services", keys: ["consult", "consulting", "consultant", "advisory", "freelance", "contract", "agency", "services", "engagement", "help my company", "work with him", "project"], answer: function () {
      var s = (P.services || []).map(function (x) { return b(x.title) + " (" + esc(x.duration) + "): " + esc(x.text); });
      return { html: p("Alongside his full-time role, " + first + " takes on a few advisory projects a year:") + ul(s), actions: acts(GO("Advisory", "advisory"), BOOK), follow: ["How do I reach him?"] };
    } },
    { id: "available", keys: ["available", "open to", "looking for", "new role", "hiring him", "opportunity", "start date", "notice period", "job"], answer: function () {
      return { html: p(esc(P.profile.status) + " in Canada and North America, plus select advisory work. The fastest path is a 30-minute call.") , actions: acts(BOOK, EMAIL, LINKEDIN), follow: ["Why hire him?", "Where is he based?"] };
    } },
    { id: "location", keys: ["location", "based", "where", "remote", "relocate", "relocation", "hybrid", "onsite", "canada", "ontario", "windsor", "toronto", "milton"], answer: function () {
      return { html: p(first + " is based in " + b(P.profile.location) + ". For remote, hybrid or relocation questions, he's happy to talk specifics.") , actions: acts(BOOK, EMAIL), follow: ["Is he open to new roles?"] };
    } },
    { id: "contact", keys: ["contact", "email", "reach", "get in touch", "connect", "phone", "number", "how do i reach him"], answer: function () {
      return { html: p("Here's how to reach " + first + ":") + ul([
          C.email ? b("Email: ") + "<a href=\"mailto:" + esc(C.email) + "\">" + esc(C.email) + "</a>" : "",
          C.phone ? b("Phone: ") + "<a href=\"tel:" + esc(C.phoneHref || C.phone) + "\">" + esc(C.phone) + "</a>" : "",
          C.calendly ? b("Book a call: ") + "<a href=\"" + esc(C.calendly) + "\" target=\"_blank\" rel=\"noopener\">" + esc(C.calendly.replace(/^https?:\/\//, "")) + "</a>" : "",
          C.linkedin ? b("LinkedIn: ") + "<a href=\"" + esc(C.linkedin) + "\" target=\"_blank\" rel=\"noopener\">" + esc(C.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")) + "</a>" : ""
        ].filter(Boolean)), actions: acts(BOOK, EMAIL, LINKEDIN), follow: ["Is he open to new roles?"] };
    } },
    { id: "book", keys: ["book", "calendly", "schedule", "meeting", "call", "appointment", "calendar", "chat with him", "talk to him"], answer: function () {
      return { html: p(C.calendly ? "Pick a time that suits you on " + first + "'s calendar. Thirty minutes is usually plenty to see if there's a fit." : "Send " + first + " a quick email with a couple of times that suit you."), actions: acts(BOOK, EMAIL) };
    } },
    { id: "linkedin", keys: ["linkedin", "social", "twitter", "x.com"], answer: function () {
      return { html: p(first + " writes about shipping AI in large organizations on LinkedIn."), actions: acts(LINKEDIN) };
    } },
    { id: "resume", keys: ["resume", "cv", "résumé"], answer: function () {
      return { html: p(C.resumeReady ? "Here's " + first + "'s résumé. The case studies on this site go deeper than any résumé can." : "Email him for the latest version."), actions: acts(C.resumeReady ? { label: "Open résumé", href: C.resume, ext: true } : EMAIL) };
    } },
    { id: "salary", keys: ["salary", "compensation", "expected salary", "rate", "rates", "pricing", "price", "cost of hiring", "hourly"], answer: function () {
      return { html: p("That's one for " + first + " directly, since it depends on the role or project.") , actions: acts(BOOK, EMAIL) };
    } },
    { id: "status", keys: ["visa", "work permit", "authorization", "authorised", "authorized", "sponsorship", "sponsor", "citizen", "citizenship", "permanent resident"], answer: function () {
      return { html: p("I don't have details on that. " + first + " will gladly answer eligibility questions directly.") , actions: acts(EMAIL) };
    } },
    { id: "industries", keys: ["industry", "industries", "sector", "sectors", "domain", "domains"], answer: function () {
      var on = P.industries.sectors.map(function (x) { return x.name; });
      return { html: p("Here's the thing he noticed: every organization over 1,000 people runs on the same machinery. Customers, cases, documents and approvals. Only the vocabulary changes.") +
        p("He's shipped AI into " + b(on.join(", ")) + ". A claims file and a dispute packet are cousins; a municipal permit and a telecom suspension follow the same rules-plus-evidence pattern."),
        actions: acts(GO("Any industry", "industries")), follow: ["Why hire him?", "What has he shipped?"] };
    } },
    { id: "otherindustries", keys: ["banking", "bank", "banks", "healthcare", "health", "hospital", "utilities", "utility", "energy"], answer: function () {
      return { html: p("Not directly yet, and he'd rather tell you that straight. The closest he's shipped is fintech: payment dispute intake for a client at Hrudai, built around fraud rules, PCI scoping and regulatory deadlines.") +
        p("The machinery carries over, though. Banks, hospitals and utilities run on the same customers, cases, documents and approvals he's automated in telecom, government, insurance and real estate."),
        actions: acts(GO("Payment dispute case", "cases")), follow: ["Tell me about payment dispute intake", "What industries?"] };
    } },
    { id: "guardrails", keys: ["guardrail", "guardrails", "safety", "responsible ai", "hallucination", "hallucinations", "privacy", "pipeda", "compliance", "trust", "risk", "governance"], answer: function () {
      return { html: p("His rule: the model can explain and prepare, but rules and people decide. Every one of his products has a hard boundary: no coverage decisions in claims, no refunds in disputes, no amounts from the model in billing, current-version clauses only in the knowledge assistant.") +
        p("Then he proves it. A 200-case golden dataset with LLM-as-a-judge and grounding checks cut hallucinations from 15% to under 4%. His designs also map to Canadian frameworks like PIPEDA, OSFI E-23 and the federal Directive on Automated Decision-Making."),
        actions: acts(GO("Case studies", "cases")), follow: ["What is groundedness?", "Tell me about payment dispute intake"] };
    } },
    { id: "languages", keys: ["language", "languages", "speak", "arabic", "urdu", "french", "english", "bilingual"], answer: function () {
      return { html: p("Several of his products were bilingual (Arabic and English), with separate eval thresholds per language, a pattern that carries straight over to English and French in Canada. For the languages he speaks himself, ask him directly.") , actions: acts(EMAIL) };
    } }
  ];

  // Weight rare keys more
  var df = {};
  KB.forEach(function (e) { var seen = {}; e.keys.forEach(function (k) { tokens(k).forEach(function (t) { if (!seen[t]) { df[t] = (df[t] || 0) + 1; seen[t] = 1; } }); }); });
  function idf(t) { return Math.log(1 + KB.length / (df[t] || 1)); }

  /* ---------- dynamic lookups ---------- */
  var GENERIC = "rate time per score cost first total users user tasks task share contact customer".split(" ");
  var KPI_INDEX = [];
  P.playbook.kpiGroups.forEach(function (g) {
    g.kpis.forEach(function (k) {
      var base = k.name.split("(")[0].toLowerCase();
      var words = base.replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(function (w) { return w && w.length > 2 && GENERIC.indexOf(w) < 0 && STOP.indexOf(w) < 0; });
      var alias = [];
      if (/dau/.test(k.name)) alias.push("dau", "mau", "stickiness");
      if (/latency/i.test(k.name)) alias.push("latency", "p95", "ttft", "speed");
      if (/csat/i.test(k.name)) alias.push("csat", "satisfaction");
      if (/nps/i.test(k.name)) alias.push("nps", "churn", "net promoter");
      if (/payback/i.test(k.name)) alias.push("roi", "payback");
      if (/cost to serve/i.test(k.name)) alias.push("cost to serve", "cost per task");
      if (/token/i.test(k.name)) alias.push("tokens", "token");
      KPI_INDEX.push({ k: k, g: g, words: words, alias: alias, full: base.trim() });
    });
  });
  function findKpi(q) {
    var best = null, bs = 0;
    KPI_INDEX.forEach(function (e) {
      var s = 0;
      if (q.indexOf(" " + e.full + " ") > -1) s += 5;
      e.alias.forEach(function (a) { if (q.indexOf(" " + a + " ") > -1) s += 3; });
      var hit = e.words.filter(function (w) { return q.indexOf(" " + w) > -1; }).length;
      if (e.words.length && hit === e.words.length) s += 2 + hit;
      else if (hit) s += hit * 0.8;
      if (s > bs) { bs = s; best = e; }
    });
    return bs >= 2.4 ? { e: best, score: bs } : null;
  }
  function kpiAnswer(e) {
    var k = e.k;
    return { html: p(b(k.name) + " (" + esc(e.g.name) + " KPI). " + esc(k.what)) + p("<span class=\"formula\">" + esc(k.how) + "</span>") + p(b("Watch out: ") + esc(k.watch)) +
      (k.moved ? p(first + " has moved this one on shipped work: " + esc(k.moved) + ".") : ""),
      actions: acts(GO("All " + e.g.name.toLowerCase() + " KPIs", "playbook")), follow: ["What KPIs does he use?", "How does he prioritize?"] };
  }
  var CERT_ALIAS = { CBAP: ["cbap", "business analysis professional", "iiba"], PMP: ["pmp", "project management professional", "pmi"], POPM: ["popm", "safe popm", "product owner product manager", "safe product owner"], SA: ["safe agilist", "agilist"], CSM: ["csm", "scrummaster", "scrum master", "scrum"], LSSBB: ["six sigma", "black belt", "lean", "lssbb"], "AZ-900": ["az-900", "az900", "azure fundamentals"], York: ["york"], "ISO 9001": ["iso 9001 auditor", "irca", "lead auditor", "auditor"] };
  function findCert(q) {
    var hit = null;
    (P.credentials || []).forEach(function (c) { (CERT_ALIAS[c.code] || [c.code.toLowerCase()]).forEach(function (a) { if (!hit && q.indexOf(" " + a) > -1) hit = c; }); });
    return hit;
  }
  var CASE_ALIAS = {
    "intelligent-search": ["intelligent search", "rag search", "search work", "self-service search", "help search"],
    "engineering-knowledge": ["engineering knowledge", "knowledge assistant", "genai knowledge", "knowledge tool", "procedure", "procedures", "pdfs"],
    "document-verification": ["document verification", "ocr", "document ai", "emirates id", "trade licence", "trade license", "title deed", "documents"],
    "insurance-claims": ["insurance", "claims", "claim", "fnol"],
    "payment-dispute": ["payment dispute", "dispute", "disputes", "fintech", "chargeback"],
    "account-billing-agent": ["billing agent", "billing", "account and billing", "line barring", "suspension", "suspensions", "reactivation"],
    "du-virtual-assistant": ["du ai virtual assistant", "du assistant", "du virtual assistant", "virtual assistant at scale", "the virtual assistant", "1m conversations"],
    "property-enquiry": ["property enquiry", "property assistant", "real estate", "viewing", "viewings", "leads"]
  };
  function findCase(q) {
    var hit = null;
    (P.cases || []).forEach(function (c) { (CASE_ALIAS[c.id] || []).forEach(function (a) { if (!hit && q.indexOf(" " + a) > -1) hit = c; }); });
    return hit;
  }
  function lc(t) { return t.charAt(0).toLowerCase() + t.slice(1); }
  function caseAnswer(c) {
    var where = c.client ? "Hrudai, for " + (/^[aeiou]/i.test(c.client) ? "an " : "a ") + lc(c.client) : c.org;
    var html = p(b(c.title) + ", built at " + esc(where) + ". " + esc(c.oneLiner)) +
      p(b("The problem. ") + esc(c.problem)) +
      p(b("What he built. ") + esc(c.what)) +
      p(b("The guardrail that mattered. ") + esc(c.safe) + " " + esc(c.decision)) +
      p(b("The result. ") + outs(c) + ".");
    return { html: html, actions: acts({ label: "Open case " + c.number, caseId: c.id }, c.video ? { label: "Watch the demo", play: c.id } : null), follow: ["What guardrails does he use?", "What has he shipped?"] };
  }
  function findLab(q) {
    var hit = null;
    (P.lab || []).forEach(function (l) {
      var t = norm(l.title).trim(), short = t.replace(/^enterprise /, "").replace(/ same-day delivery intake$/, "");
      if (!hit && (q.indexOf(" " + t) > -1 || (short.length > 5 && q.indexOf(" " + short) > -1))) hit = l;
    });
    return hit;
  }
  function certAnswer(c) {
    return { html: p(b(c.code) + ", " + esc(c.name) + ", issued by " + esc(c.issuer) + (c.date ? " in " + esc(c.date) : "") + (c.valid ? " (" + esc(c.valid.toLowerCase()) + ")" : "") + ". " + esc(c.note)), actions: acts(GO("All credentials", "credentials")), follow: ["Which certifications does he hold?"] };
  }
  function findNamed(list, q, extra) {
    var hit = null;
    list.forEach(function (x) {
      var names = [x.name.toLowerCase()].concat((extra && extra[x.id || x.name]) || []);
      names.forEach(function (n) { if (!hit && q.indexOf(" " + n + " ") > -1) hit = x; });
    });
    return hit;
  }
  var PRIO_ALIAS = { "story-mapping": ["story map"], "cost-of-delay": ["cost of delay", "cod"], "value-effort": ["value effort", "value vs effort", "2x2"], "buy-build": ["buy vs build", "build vs buy", "buy or build"], "risk-first": ["risk first"], opportunity: ["opportunity scoring"], kano: ["kano"] };
  var DISC_ALIAS = { "Jobs to be Done sessions": ["jtbd", "jobs to be done"], "Wizard of Oz prototypes": ["wizard of oz"], "Journey mapping and service blueprints": ["journey map", "service blueprint"], "Contextual inquiry and shadowing": ["shadowing", "contextual inquiry"], "Conversation and ticket mining": ["log mining", "ticket mining", "chat logs"], "One-to-one stakeholder sessions": ["one to one", "1 1 sessions", "one-to-one"] };

  /* ---------- engine ---------- */
  function local(question) {
    var q = norm(question), tk = tokens(question), qset = {};
    tk.forEach(function (t) { qset[t] = 1; });

    var prio = findNamed(P.playbook.prioritization, q, PRIO_ALIAS);
    if (prio) return { html: p(b(prio.name) + " (" + esc(prio.formula) + ").") + p(b("Best for: ") + esc(prio.best)) + p(b("Avoid when: ") + esc(prio.avoid)) + p(b(first + "'s take: ") + esc(prio.take)), actions: acts(GO("Prioritization picker", "playbook")), follow: ["How does he prioritize?"] };
    var disc = findNamed(P.playbook.discovery, q, DISC_ALIAS);
    if (disc && !/how does he run discovery|discovery methods/.test(q)) return { html: p(b(disc.name) + ". Use it when " + esc(disc.when.charAt(0).toLowerCase() + disc.when.slice(1))) + p(b("You walk away with: ") + esc(disc.output)) + p(b("What he's learned: ") + esc(disc.tip)), actions: acts(GO("All discovery methods", "playbook")), follow: ["How does he run discovery?"] };
    var cert = /( safe )/.test(q) && !/ agilist /.test(q) ? (P.credentials || []).filter(function (c) { return c.code === "POPM"; })[0] : findCert(q);
    if (cert && !/ (certifications|certificates|certs|credentials) /.test(q)) return certAnswer(cert);
    var cs = findCase(q);
    if (cs) return caseAnswer(cs);
    var lab = findLab(q);
    if (lab) return { html: p(b(lab.title) + ". In his words: \"" + esc(lab.text) + "\""), actions: acts(lab.link ? { label: lab.linkLabel || "Open", href: lab.link, ext: true } : GO("Visit the lab", "lab")), follow: ["What else is in his lab?", "Does he mentor junior PMs?"] };

    var best = null, bs = 0;
    KB.forEach(function (e) {
      var s = 0;
      e.keys.forEach(function (k) {
        var nk = norm(k).trim();
        if (nk.indexOf(" ") > -1) { if (q.indexOf(" " + nk + " ") > -1) s += 6; }
        else if (q.indexOf(" " + nk + " ") > -1) s += 1.2 * idf(nk);
        else if (qset[stem(nk)] || qset[SYN_MAP[nk]] || (SYN[nk] && qset[nk])) s += 0.7 * idf(stem(nk));
      });
      if (s > bs) { bs = s; best = e; }
    });
    var kpi = findKpi(q);
    var metricish = /( what is | define | meaning | formula | kpi | metric | measure | how do you calculate )/.test(q);
    if (kpi && (metricish || kpi.score >= bs || bs < 2.5)) return kpiAnswer(kpi.e);
    if (best && bs >= 1.1) return best.answer();
    return { html: p("I don't have that one in " + first + "'s portfolio. I can tell you about his AI work, career, certifications, case studies or playbook, or you can ask him directly."), actions: acts(EMAIL, BOOK), follow: A.suggestions, miss: true };
  }

  function contextText() {
    var pr = P.profile;
    return [pr.name + ", " + pr.role + ", " + pr.location + ". " + pr.sub,
      "Career: " + tl.map(function (t) { return t.org + " (" + t.title + "): " + t.text; }).join(" "),
      "AI products: " + P.cases.map(function (c) { return c.number + " " + c.title + " (" + c.org + "): " + c.oneLiner + " Outcomes: " + c.outcomes.map(function (o) { return o.v + " " + o.l; }).join(", "); }).join(" "),
      "Results: " + (P.proof || []).map(function (i) { return i.value + " " + i.label; }).join("; ") + "\nEducation: " + (P.education || []).map(function (e) { return e.title + ", " + e.org; }).join("; "),
      "Certifications: " + P.credentials.map(function (c) { return c.code + " " + c.name; }).join("; "),
      "Contact: " + C.email].join("\n");
  }

  /* ---------- UI ---------- */
  var root = document.documentElement;
  var agent = document.getElementById("agent"), log = document.getElementById("agent-log");
  var form = document.getElementById("agent-form"), input = document.getElementById("agent-input");
  var sug = document.getElementById("agent-suggest"), launch = document.getElementById("agent-launch");
  if (!agent) return;
  document.getElementById("agent-name").textContent = A.name || "Portfolio assistant";
  document.getElementById("agent-note").textContent = A.disclaimer || "";
  var history = [];

  function save() { try { sessionStorage.setItem("mz-chat", JSON.stringify(history.slice(-30))); } catch (e) {} }
  function scrollDown() { log.scrollTop = log.scrollHeight; }
  function setSuggest(list) {
    sug.innerHTML = (list || []).slice(0, 4).map(function (s) { return "<button type=\"button\">" + esc(s) + "</button>"; }).join("");
  }
  function actionsHtml(list) {
    if (!list || !list.length) return "";
    return "<div class=\"msg-src\">" + list.map(function (a) {
      if (a.play) return "<button type=\"button\" data-play=\"" + esc(a.play) + "\">" + esc(a.label) + "</button>";
      if (a.caseId) return "<button type=\"button\" data-case-open=\"" + esc(a.caseId) + "\">" + esc(a.label) + "</button>";
      return "<a href=\"" + esc(a.href) + "\"" + (a.ext ? " target=\"_blank\" rel=\"noopener\"" : "") + ">" + esc(a.label) + "</a>";
    }).join("") + "</div>";
  }
  function addMsg(role, html, instant) {
    var el = document.createElement("div");
    el.className = "msg " + (role === "me" ? "msg-me" : "msg-bot");
    el.innerHTML = html;
    log.appendChild(el);
    if (role === "bot" && !instant && !reduce) stream(el);
    scrollDown();
    return el;
  }
  function stream(el) {
    var words = [], walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null), nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (tn) {
      var frag = document.createDocumentFragment();
      tn.textContent.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        var s = document.createElement("span"); s.textContent = part; s.style.opacity = "0"; s.style.transition = "opacity .25s"; words.push(s); frag.appendChild(s);
      });
      tn.parentNode.replaceChild(frag, tn);
    });
    var src = el.querySelector(".msg-src"); if (src) src.style.opacity = "0";
    var i = 0;
    (function next() {
      for (var k = 0; k < 3 && i < words.length; k++, i++) words[i].style.opacity = "1";
      if (i < words.length) { if (i % 12 === 0) scrollDown(); setTimeout(next, 22); }
      else { if (src) { src.style.transition = "opacity .3s"; src.style.opacity = "1"; } scrollDown(); }
    })();
  }
  function typing(on) {
    agent.classList.toggle("thinking", on);
    var t = log.querySelector(".typing-wrap");
    if (on && !t) { t = document.createElement("div"); t.className = "msg msg-bot typing-wrap"; t.innerHTML = "<span class=\"typing\" aria-label=\"Typing\"><i></i><i></i><i></i></span>"; log.appendChild(t); scrollDown(); }
    if (!on && t) t.remove();
  }
  function remote(question) {
    return fetch(A.endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: question, history: history.slice(-8), context: contextText() }) })
      .then(function (r) { if (!r.ok) throw new Error("bad status"); return r.json(); })
      .then(function (d) { if (!d || !d.answer) throw new Error("empty"); return { html: String(d.answer).split(/\n{2,}/).map(function (x) { return p(esc(x)); }).join(""), actions: acts(EMAIL), follow: A.suggestions }; });
  }
  var busy = false;
  function ask(question) {
    question = String(question || "").trim();
    if (!question || busy) return;
    busy = true;
    addMsg("me", esc(question), true);
    try { if (window.mzTrack) window.mzTrack("twin_question"); } catch (e) {}
    history.push({ role: "user", text: question });
    input.value = "";
    typing(true);
    if (window.PortfolioScene) window.PortfolioScene.pulse();
    var started = Date.now();
    var job = A.endpoint ? remote(question).catch(function () { return local(question); }) : Promise.resolve(local(question));
    job.then(function (res) {
      var wait = Math.max(0, (reduce ? 0 : 550 + Math.min(question.length * 8, 500)) - (Date.now() - started));
      setTimeout(function () {
        typing(false);
        var html = res.html + actionsHtml(res.actions);
        addMsg("bot", html);
        history.push({ role: "bot", html: html });
        setSuggest(res.follow && res.follow.length ? res.follow : A.suggestions);
        save(); busy = false;
      }, wait);
    });
  }

  form.addEventListener("submit", function (e) { e.preventDefault(); ask(input.value); });
  sug.addEventListener("click", function (e) { var bt = e.target.closest("button"); if (bt) ask(bt.textContent); });
  log.addEventListener("click", function (e) {
    var c = e.target.closest("[data-case-open]");
    if (c && window.PortfolioApp) { window.PortfolioApp.openCase(c.getAttribute("data-case-open")); return; }
    var a = e.target.closest("a[href^='#']");
    if (a && window.PortfolioApp && document.getElementById("sheet-" + a.getAttribute("href").slice(1))) { e.preventDefault(); window.PortfolioApp.openSheet("sheet-" + a.getAttribute("href").slice(1)); if (window.innerWidth < 1180) close(); return; }
    if (a && window.innerWidth < 1180) close();
  });

  function isDocked() { return window.innerWidth >= 1180; }
  function open() {
    if (isDocked()) { root.classList.remove("agent-collapsed"); try { localStorage.setItem("mz-agent", "open"); } catch (e) {} }
    else root.classList.add("agent-open");
    launch.setAttribute("aria-expanded", "true");
    window.dispatchEvent(new Event("resize"));
  }
  function close() {
    if (isDocked()) { root.classList.add("agent-collapsed"); try { localStorage.setItem("mz-agent", "collapsed"); } catch (e) {} }
    root.classList.remove("agent-open");
    launch.setAttribute("aria-expanded", "false");
    window.dispatchEvent(new Event("resize"));
  }
  launch.addEventListener("click", function () { open(); setTimeout(function () { input.focus(); }, 350); });
  document.getElementById("agent-min").addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && root.classList.contains("agent-open")) close(); });
  try { if (localStorage.getItem("mz-agent") === "collapsed") root.classList.add("agent-collapsed"); } catch (e) {}

  // Restore or greet
  var restored = null;
  try { restored = JSON.parse(sessionStorage.getItem("mz-chat") || "null"); } catch (e) {}
  addMsg("bot", p(esc(A.greeting)), true);
  if (restored && restored.length) {
    // Rebuild answers from the questions instead of trusting stored HTML.
    restored.filter(function (m) { return m && m.role === "user" && typeof m.text === "string"; }).slice(-10).forEach(function (m) {
      var q = m.text.slice(0, 300), r = local(q), html = r.html + actionsHtml(r.actions);
      addMsg("me", esc(q), true); addMsg("bot", html, true);
      history.push({ role: "user", text: q }, { role: "bot", html: html });
    });
  }
  setSuggest(A.suggestions);

  window.Assistant = {
    open: open, close: close, ask: function (q) { open(); ask(q); },
    focus: function () { open(); setTimeout(function () { input.focus({ preventScroll: true }); }, 300); },
    _local: local
  };
})();
