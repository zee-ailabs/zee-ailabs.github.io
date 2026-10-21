/*
  PORTFOLIO CONTENT
  Every word on the site, and everything the assistant knows, comes from this file.
  Edit, publish, and the site updates. No build step.

  - profile: hero hook, photo, floating proof chips
  - proof: the "Receipts" numbers. viz can be big, ring, bars, blocks, dots, dial or split
  - ships: the six capabilities
  - industries: the sector hub (delivered: true fills the node)
  - plm: the product lifecycle stages and techniques (How I ship)
  - story.timeline: career bar (from and to are decimal years, drawn to scale)
   - cases: the case tiles. video = demo file. Full case studies are shared by email on request
  - credentials, education, toolkit
  - beyond: the four doors (Lab, Playbook, Academy, Advisory) that open full-screen sheets
  - lab, playbook, academy, services, mapper: content inside those sheets
  - aiWork: extra detail the assistant uses when answering
  - assistant: name, greeting, suggested questions, optional LLM endpoint
*/
window.PORTFOLIO = {
  "profile": {
    "name": "Muhammad Zaigham",
    "firstName": "Zaigham",
    "initials": "MZ",
    "role": "AI Product Manager and builder",
    "location": "Milton, Ontario, Canada",
    "photo": "assets/img/profile.jpg",
    "photoSmall": "assets/img/profile-sm.jpg",
    "status": "Open to AI PM roles",
    "hook": [
      "AI that ships.",
      "Numbers that move."
    ],
    "sub": "10+ years across enterprise, government and startup. 11 AI solutions shipped to production with cross-functional teams of 25+.",
    "pills": [
      "Enterprise",
      "Government",
      "Startup",
      "Agentic AI",
      "LLM and RAG",
      "Prototyping"
    ],
    "floating": [
      {
        "value": "11",
        "label": "AI solutions in production"
      },
      {
        "value": "~$3.3M",
        "label": "CAD a year in value"
      },
      {
        "value": "1M+",
        "label": "AI conversations a year"
      },
      {
        "value": "<4%",
        "label": "hallucination"
      }
    ]
  },
  "analytics": {
    "ga4Id": "G-43HNMD514G"
  },
  "contact": {
    "email": "muhammadzaigham697@gmail.com",
    "phone": "+1 (647) 360-2021",
    "phoneHref": "+16473602021",
    "linkedin": "https://www.linkedin.com/in/mzaigham/",
    "github": "",
    "calendly": "https://calendly.com/muh-zaigham/30min",
    "leadsEndpoint": "https://formsubmit.co/ajax/muhammadzaigham697@gmail.com",
    "resume": "assets/docs/Muhammad-Zaigham-Resume.pdf",
    "resumeReady": true
  },
  "proof": [
    {
      "id": "shipped",
      "value": "11",
      "label": "AI solutions shipped to production in 5 years",
      "viz": "split",
      "size": "wide",
      "parts": [
        {
          "n": 4,
          "label": "virtual assistants"
        },
        {
          "n": 3,
          "label": "RAG and AI search"
        },
        {
          "n": 4,
          "label": "agentic and document AI"
        }
      ]
    },
    {
      "id": "value",
      "value": "~$3.3M",
      "label": "CAD a year in savings and client value",
      "viz": "big",
      "size": "wide"
    },
    {
      "id": "team",
      "value": "25+",
      "label": "engineers, data scientists, designers and vendors led",
      "viz": "big"
    },
    {
      "id": "conv",
      "value": "1M+",
      "label": "AI conversations a year, 80%+ contained, 8.5/10 CSAT",
      "viz": "dots"
    },
    {
      "id": "task",
      "value": "92%",
      "label": "task success on a 200-case golden set",
      "viz": "ring",
      "pct": 92
    },
    {
      "id": "hall",
      "value": "<4%",
      "label": "hallucination rate, down from 15%",
      "viz": "bars",
      "before": 15,
      "after": 4,
      "beforeLabel": "Before",
      "afterLabel": "After",
      "tone": "down"
    },
    {
      "id": "cost",
      "value": "−30%",
      "label": "cost per query with LLM routing, same accuracy",
      "viz": "bars",
      "before": 100,
      "after": 70,
      "beforeLabel": "Before",
      "afterLabel": "After",
      "tone": "down"
    },
    {
      "id": "time",
      "value": "−44%",
      "label": "processing time per claim and dispute file, 25 to 14 minutes",
      "viz": "bars",
      "before": 25,
      "after": 14,
      "beforeLabel": "25 min",
      "afterLabel": "14 min",
      "tone": "down"
    },
    {
      "id": "speed",
      "value": "<3s",
      "label": "p95 response time",
      "viz": "dial",
      "pct": 75
    },
    {
      "id": "hours",
      "value": "~450",
      "label": "team hours freed every month",
      "viz": "blocks",
      "count": 12
    }
  ],
  "ships": [
    {
      "id": "agentic",
      "icon": "agent",
      "title": "Agentic workflows",
      "hook": "Agents that resolve the case. People keep every decision.",
      "metric": "92% task success, 28% fewer complaints",
      "where": "Hrudai"
    },
    {
      "id": "assistant",
      "icon": "chat",
      "title": "Virtual assistants",
      "hook": "Answers, actions and clean handoffs.",
      "metric": "1M+ conversations, 80%+ contained",
      "where": "du and Hrudai"
    },
    {
      "id": "rag",
      "icon": "search",
      "title": "RAG and AI search",
      "hook": "Grounded answers, not ten blue links.",
      "metric": "+7% volume to self-service",
      "where": "du"
    },
    {
      "id": "knowledge",
      "icon": "book",
      "title": "GenAI knowledge assistants",
      "hook": "300+ procedure PDFs, turned into answers.",
      "metric": "Answers in <2 min, not 15",
      "where": "RAK Municipality"
    },
    {
      "id": "docai",
      "icon": "doc",
      "title": "Document AI",
      "hook": "IDs, licences and deeds, checked by OCR.",
      "metric": "70% straight-through",
      "where": "RAK Municipality"
    },
    {
      "id": "evals",
      "icon": "gauge",
      "title": "LLM evals and model routing",
      "hook": "Right model. Right cost. Measured.",
      "metric": "−30% cost per query",
      "where": "Hrudai"
    }
  ],
  "industries": {
    "title": "Different logos. Same machinery.",
    "line": "Every organization over 1,000 people runs on customers, cases, documents and approvals. I've shipped AI into all four.",
    "core": [
      "Customers",
      "Cases",
      "Documents",
      "Approvals"
    ],
    "sectors": [
      {
        "name": "Government",
        "delivered": true
      },
      {
        "name": "Insurance",
        "delivered": true
      },
      {
        "name": "Fintech",
        "delivered": true
      },
      {
        "name": "Real estate",
        "delivered": true
      },
      {
        "name": "Telecom",
        "delivered": true
      }
    ]
  },
  "story": {
    "timeline": [
      {
        "org": "Ufone",
        "group": "Etisalat Group",
        "place": "Pakistan",
        "title": "Process Improvement Specialist",
        "dates": "2009 to 2015",
        "from": 2009.2,
        "to": 2015.1,
        "era": "Enterprise",
        "hook": "Fixed the process first.",
        "wins": [
          "ISO 9001 QMS certification for customer operations",
          "CRM modernized for 3,000+ users",
          "−15% average handling time"
        ],
        "text": "Led ISO 9001 quality management certification for customer operations across contact centres, retail and collections, and modernized CRM for 3,000+ users, cutting average handling time by 15%.",
        "tags": [
          "Process redesign",
          "CRM",
          "ISO"
        ]
      },
      {
        "org": "du",
        "group": "Emirates Integrated Telecommunications",
        "place": "UAE",
        "title": "Product Owner",
        "dates": "2015 to 2021",
        "from": 2015.1,
        "to": 2022,
        "era": "Enterprise",
        "hook": "Shipped digital for 9M+ customers.",
        "wins": [
          "80+ journeys, 60+ API integrations",
          "Digital share of transactions 25% to 40%",
          "95%+ on-time releases, 3 Scrum teams"
        ],
        "text": "Owned backlogs for mobile, web, CRM and customer-support products serving 9M+ customers across 3 Scrum teams: 80+ digital journeys, 20+ CRM enhancements and 60+ API integrations, growing the digital share of service transactions from 25% to 40%.",
        "tags": [
          "Digital products",
          "CRM",
          "Integrations"
        ]
      },
      {
        "org": "du",
        "group": "Emirates Integrated Telecommunications",
        "place": "UAE",
        "title": "AI Product Manager",
        "dates": "2022 to 2024",
        "from": 2022,
        "to": 2025,
        "era": "Enterprise",
        "hook": "Put AI in front of millions.",
        "wins": [
          "1M+ AI conversations a year, 80%+ contained, 8.5/10 CSAT",
          "Led 25+ engineers, data scientists, designers and vendors",
          "~CAD $2.4M a year saved in contact centre costs"
        ],
        "text": "Owned 5 AI and digital products and led a cross-functional team of 25+ engineers, data scientists, designers and vendor partners. Scaled the AI virtual assistant to 1M+ conversations a year with 80%+ containment and 8.5/10 CSAT, saving ~CAD $2.4M a year, and cut agent handoffs from 22% to 17%.",
        "tags": [
          "Virtual assistant",
          "RAG",
          "Agentic AI",
          "Search"
        ]
      },
      {
        "org": "RAK Municipality",
        "short": "RAK",
        "group": "Government of Ras Al Khaimah",
        "place": "UAE",
        "title": "Product Manager, Digital Transformation",
        "dates": "2025 to 2026",
        "from": 2025.25,
        "to": 2026.3,
        "era": "Government",
        "hook": "Brought GenAI into government.",
        "wins": [
          "OCR: 70% straight-through, −55% manual checks",
          "GenAI assistant: answers in <2 min, down from ~15",
          "First-pass review accuracy 78% to 90%"
        ],
        "text": "Delivered OCR document AI on Google Cloud (70% straight-through validation, 55% less manual verification), a 0 to 1 GenAI knowledge assistant on Microsoft Copilot Studio over 300+ procedural PDFs for 120+ engineers and inspectors, and a drawing review redesign that cut repeat submissions by 18%.",
        "tags": [
          "GenAI",
          "OCR",
          "Google Cloud",
          "Microsoft Copilot",
          "Governance"
        ]
      },
      {
        "org": "Hrudai",
        "short": "Hrudai",
        "group": "AI startup: intelligent automation for B2B clients",
        "place": "Canada",
        "title": "AI Product Manager",
        "dates": "2026 to now",
        "from": 2026.35,
        "to": 2026.8,
        "era": "Startup",
        "now": true,
        "hook": "Agentic AI for clients, startup speed.",
        "wins": [
          "4 AI solutions, ~CAD $450K a year in client value",
          "Hallucination 15% to <4%, 92% task success",
          "−30% cost per query, p95 under 3s"
        ],
        "text": "Owns a portfolio of 4 AI solutions (agentic workflows and virtual assistants) for insurance, fintech and real estate clients, worth ~CAD $450K a year. Took 2 of 8 scored opportunities to production in 4 months, cut processing time per file by 44%, and freed ~450 team hours a month.",
        "tags": [
          "Agentic AI",
          "Virtual assistants",
          "Azure and AWS",
          "Evals"
        ]
      }
    ],
    "principles": [
      {
        "title": "Outcomes over output",
        "text": "A feature nobody finishes a task with is a cost."
      },
      {
        "title": "Evidence over opinion",
        "text": "A cheap test beats a long meeting."
      },
      {
        "title": "Trust is a feature",
        "text": "Cite sources, admit doubt, hand off cleanly."
      },
      {
        "title": "Cost is a product decision",
        "text": "Latency and cost to serve shape design from day one."
      }
    ],
    "headline": "Enterprise, government, startup. I've seen it all."
  },
  "aiWork": [
    {
      "id": "virtual-agents",
      "family": "Conversational AI",
      "title": "Virtual agents for customer self-service",
      "org": "du",
      "kind": "Delivered",
      "summary": "AI virtual assistant scaled to 1M+ conversations a year with 80%+ containment and 8.5/10 CSAT, growing digital self-service 12%, cutting agent handoffs from 22% to 17% and saving ~CAD $2.4M a year.",
      "my_role": "Owned the journey backlog, intent coverage, containment targets and the handoff design to human agents.",
      "kpis": [
        "Containment rate",
        "CSAT",
        "Handoff with context",
        "Cost per contact"
      ]
    },
    {
      "id": "enterprise-search",
      "family": "Search and knowledge",
      "title": "RAG and intelligent search",
      "org": "du",
      "kind": "Delivered",
      "summary": "RAG troubleshooting journeys grounded in enterprise knowledge and real-time diagnostics, adding 30+ intents and shifting 7% more contact volume to self-service.",
      "my_role": "Owned the search and RAG roadmap: grounding, retrieval quality, guardrails and the handoff when evidence is weak.",
      "kpis": [
        "Search success rate",
        "Zero-result rate",
        "Click-through on first result",
        "Self-service completion"
      ]
    },
    {
      "id": "agentic-billing",
      "family": "Agentic AI",
      "title": "Agentic billing support",
      "org": "du",
      "kind": "Delivered",
      "summary": "Tool-calling assistant flows that use real-time account data to resolve line barring and ID-expiry suspensions end to end, removing ~8,000 agent contacts a month.",
      "my_role": "Owned the journey, data access rules, guardrails and success metrics.",
      "kpis": [
        "Resolution without handoff",
        "Containment rate",
        "CSAT"
      ]
    },
    {
      "id": "agentic-workflows",
      "family": "Agentic AI",
      "title": "Agentic document workflows",
      "org": "Hrudai",
      "kind": "Delivered",
      "summary": "Agentic AI workflows on Azure and AWS with tool calling and human review: 92% task success, 28% fewer complaints, files processed in 14 minutes instead of 25, and ~450 team hours freed a month.",
      "my_role": "Owned strategy, roadmap and delivery, from discovery and use-case validation to evals, UAT and launch.",
      "kpis": [
        "Task success",
        "Complaint reduction",
        "Resolution time",
        "Hallucination rate"
      ]
    },
    {
      "id": "real-estate-va",
      "family": "Virtual assistants",
      "title": "Virtual assistants for real estate",
      "org": "Hrudai",
      "kind": "Delivered",
      "summary": "Real estate virtual assistants that answer property questions, qualify leads and book viewings 24/7, resolving 60% of routine inquiries without an agent.",
      "my_role": "Product owner from discovery to launch: use case selection, conversation design, model and tool choices, and post-launch value tracking.",
      "kpis": [
        "Leads qualified",
        "Response time",
        "Containment rate",
        "Handoff with context"
      ]
    },
    {
      "id": "claims-intake",
      "family": "Insurance",
      "title": "Insurance claims intake and triage agent",
      "org": "Hrudai",
      "kind": "Delivered",
      "summary": "Structures claim evidence and routes it correctly, without ever automating the coverage decision.",
      "my_role": "Owned the product with the client from discovery to delivery: the intake journey, document handling, routing rules, guardrails, evals and rollout.",
      "kpis": [
        "Complete intake rate",
        "Correct routing rate",
        "Repeat contact rate"
      ]
    },
    {
      "id": "dispute-agent",
      "family": "Fintech",
      "title": "Payment dispute resolution agent",
      "org": "Hrudai",
      "kind": "Delivered",
      "summary": "Helps customers describe a disputed transaction and assembles the evidence for investigators, who keep the decision.",
      "my_role": "Owned the product with the client from discovery to delivery: authentication and consent, evidence collection, escalation paths, evals and rollout.",
      "kpis": [
        "Complete packet at first review",
        "Time to decision",
        "Customer effort score"
      ]
    },
    {
      "id": "genai-knowledge",
      "family": "GenAI",
      "title": "GenAI knowledge assistant",
      "org": "RAK Municipality",
      "kind": "Delivered",
      "summary": "A 0 to 1 GenAI assistant on Microsoft Copilot Studio using RAG over 300+ procedural PDFs for 120+ engineers and inspectors, cutting time to find a procedure answer from ~15 minutes to under 2.",
      "my_role": "Took it from idea to launch: discovery, requirements, guardrails, evals and adoption.",
      "kpis": [
        "Productivity",
        "Answer accuracy",
        "Adoption"
      ]
    },
    {
      "id": "ocr-validation",
      "family": "Document intelligence",
      "title": "OCR document validation",
      "org": "RAK Municipality",
      "kind": "Delivered",
      "summary": "OCR document AI on Google Cloud validating trade licences, Emirates IDs, land documents and NOCs, reaching 70% straight-through validation and cutting manual verification time by 55%.",
      "my_role": "Owned requirements, document types and validation rules, acceptance criteria, and the human review path for low-confidence reads.",
      "kpis": [
        "Field extraction accuracy",
        "First-time-right submissions",
        "Manual review rate",
        "Processing time"
      ]
    },
    {
      "id": "model-evaluation",
      "family": "AI platform",
      "title": "LLM benchmarking and model routing",
      "org": "Hrudai",
      "kind": "Delivered",
      "summary": "Benchmarked 6 frontier LLMs and routed tasks by complexity, cutting cost per query by 30% at equal accuracy with p95 response time under 3 seconds.",
      "my_role": "Built evaluation criteria with engineering, ran comparisons, and made the call on quality versus speed versus cost.",
      "kpis": [
        "Cost per query",
        "p95 latency",
        "Accuracy",
        "Task success"
      ]
    }
  ],
  "cases": [
    {
      "id": "intelligent-search",
      "number": "01",
      "cat": "rag",
      "kind": "RAG system",
      "cloud": "Microsoft Azure",
      "org": "du",
      "title": "Intelligent Search",
      "oneLiner": "Turned du self-service search from a list of links into one grounded, cited answer with a next step.",
      "problem": "Customers searched help pages, read several, gave up and called. Click-through looked healthy while tasks failed.",
      "what": "A RAG answer layer over approved help content: query rewrite, hybrid retrieval, one cited answer and one deep-linked action, with clarify or handoff when unsure.",
      "safe": "Hybrid search plus reranker, groundedness check before display, five decision paths, weekly content-gap loop.",
      "stack": [
        "Azure OpenAI GPT (mini and full tier)",
        "Azure AI Search",
        "Azure AI Content Safety"
      ],
      "outcomes": [
        {
          "v": "+4 to 6 pts",
          "l": "task completion"
        },
        {
          "v": "8 to 12%",
          "l": "fewer search-then-contact"
        },
        {
          "v": "92 to 94%",
          "l": "grounded accuracy"
        }
      ],
      "decision": "Exposed only intents with healthy content; coverage grew as owners fixed gaps.",
      "role": "Discovery, business case, PRD, architecture decisions with engineering, evaluation design, guardrail policy, rollout.",
      "scale": "300K+ monthly searches, 5,000+ indexed pages",
      "video": "assets/video/01-intelligent-search.mp4",
      "doc": ""
    },
    {
      "id": "engineering-knowledge",
      "number": "03",
      "cat": "rag",
      "kind": "RAG system",
      "cloud": "Microsoft Copilot",
      "org": "RAK Municipality",
      "title": "Engineering Knowledge Assistant",
      "oneLiner": "A 0 to 1 assistant that answers engineers and inspectors from 300+ procedural PDFs, citing the exact clause.",
      "problem": "Finding the right clause across hundreds of PDFs took about 15 minutes, superseded versions stayed in circulation, and experts were interrupted all day.",
      "what": "A RAG assistant with layout-aware PDF parsing, current-version indexing, hybrid retrieval, cited answers and owner routing when procedures don't cover a question.",
      "safe": "Current approved versions only; every answer cited; no decisions; abstain instead of guessing.",
      "stack": [
        "Copilot Studio",
        "Azure OpenAI GPT-4o family",
        "Azure AI Search",
        "Document Intelligence layout model"
      ],
      "outcomes": [
        {
          "v": "15 to <2 min",
          "l": "time to a procedure answer"
        },
        {
          "v": "120+",
          "l": "engineers and inspectors"
        },
        {
          "v": "94 to 96%",
          "l": "grounded answers"
        }
      ],
      "decision": "Indexed only the current version, so it could never quote a superseded clause.",
      "role": "0 to 1 discovery with engineering and inspection teams, content ownership, PRD, evaluation design, PIA and TRA, rollout and adoption.",
      "video": "assets/video/03-engineering-knowledge-assistant.mp4",
      "doc": ""
    },
    {
      "id": "document-verification",
      "number": "04",
      "cat": "agentic",
      "kind": "Agentic AI workflow",
      "cloud": "Google Cloud",
      "org": "RAK Municipality",
      "title": "Document Verification (OCR)",
      "oneLiner": "Bilingual OCR that reads municipal documents, scores every field and accepts, rejects, reviews or flags fraud.",
      "problem": "Reviewers read every Emirates ID, trade licence, title deed and NOC by hand; fixable issues surfaced days later and fraud detection depended on chance.",
      "what": "An agentic verification workflow: instant upload checks, field extraction with confidence, registry checks, cross-document matching, tamper detection and four confidence bands.",
      "safe": "Rules decide the band; the model normalizes names and assists reviewers on hard images; reviewers own the middle band.",
      "stack": [
        "Google Document AI",
        "Gemini Flash and Pro on Vertex AI",
        "Image forensics model"
      ],
      "outcomes": [
        {
          "v": "70%",
          "l": "straight-through validation"
        },
        {
          "v": "−55%",
          "l": "manual verification time"
        },
        {
          "v": "<0.5%",
          "l": "wrong acceptance"
        }
      ],
      "decision": "Confidence bands instead of one threshold: automate the clear ends, keep people on the uncertain middle.",
      "role": "Rule inventory with departments, confidence band design, matching rules, evals, fraud controls, rollout and reviewer change management.",
      "video": "assets/video/04-document-verification-ocr.mp4",
      "doc": ""
    },
    {
      "id": "insurance-claims",
      "number": "05",
      "cat": "agentic",
      "kind": "Agentic AI workflow",
      "cloud": "AWS",
      "org": "Hrudai",
      "client": "Insurance client",
      "title": "Insurance Claims Intake and Triage",
      "oneLiner": "Agentic claims intake: guided evidence, extraction and an adjuster-ready file, with every decision left to people.",
      "problem": "Policyholders submitted incomplete claims; adjusters chased missing items, re-keyed documents and re-routed claims at a stressful moment for the customer.",
      "what": "An agentic intake workflow: safety screen, guided photo capture with quality checks, field extraction, completeness rules and a route recommendation.",
      "safe": "Hard boundary: no coverage, liability, fraud or settlement language; guardrails and evals enforce it.",
      "stack": [
        "Claude Haiku and Sonnet on Amazon Bedrock",
        "Amazon Textract",
        "Amazon Rekognition",
        "Bedrock Guardrails"
      ],
      "outcomes": [
        {
          "v": "25 to 14 min",
          "l": "processing time per file"
        },
        {
          "v": "15% to <4%",
          "l": "hallucinations"
        },
        {
          "v": "92%",
          "l": "task success on golden set"
        }
      ],
      "decision": "The AI has no decision tools at all; it prepares the file and people decide.",
      "role": "FNOL journey, evidence rules with claims operations, document AI evals, fairness and privacy design, adjuster workflow integration.",
      "video": "assets/video/05-insurance-claims-intake.mp4",
      "doc": ""
    },
    {
      "id": "payment-dispute",
      "number": "06",
      "cat": "agentic",
      "kind": "Agentic AI workflow",
      "cloud": "Microsoft Azure",
      "org": "Hrudai",
      "client": "Fintech client",
      "title": "Payment Dispute Intake",
      "oneLiner": "From \"I don't recognize this charge\" to the right path, with fraud rules always in control.",
      "problem": "Customers filed disputes for legitimate charges, described fraud as merchant problems and were re-contacted for evidence, putting network deadlines at risk.",
      "what": "An agentic intake workflow: enriched transaction explanation, targeted questions, fraud rules, one-tap card lock, path-specific evidence, step-up and explicit confirmation.",
      "safe": "Routing tuned for fraud recall; any fraud signal forces the fraud path; no credits, refunds or verdicts by AI.",
      "stack": [
        "Azure OpenAI GPT mini tier",
        "Azure Machine Learning classifier",
        "Azure AI Content Safety"
      ],
      "outcomes": [
        {
          "v": "25 to 14 min",
          "l": "processing time per file"
        },
        {
          "v": "28 to 30%",
          "l": "evidence re-requests, from 40%"
        },
        {
          "v": "99%+",
          "l": "fraud-path recall"
        }
      ],
      "decision": "Accepted extra escalations to make a missed fraud far rarer.",
      "role": "Path design with disputes operations, PCI scoping, evals and safety, regulatory alignment, operations integration.",
      "video": "assets/video/06-payment-dispute-intake.mp4",
      "doc": ""
    },
    {
      "id": "account-billing-agent",
      "number": "07",
      "cat": "agentic",
      "kind": "AI agent",
      "cloud": "Microsoft Azure",
      "org": "du",
      "title": "Account and Billing Resolution Agent",
      "oneLiner": "An agent inside the du assistant that resolves line barring and ID-expiry suspensions end to end, and explains and fixes bills.",
      "problem": "Barred and suspended lines, and bills customers couldn't understand, needed an agent even when the fix was rule-based.",
      "what": "An AI agent that reads real-time line status, clears the cause (payment or a registry-valid renewed ID), restores service through provisioning, and explains and corrects bills.",
      "safe": "Reactivation only when the reason code is cleared; amounts from a deterministic comparison; one-time confirmation for every action.",
      "stack": [
        "Azure OpenAI GPT with function calling",
        "Azure AI Content Safety",
        "BSS and provisioning APIs"
      ],
      "outcomes": [
        {
          "v": "~8,000",
          "l": "agent contacts removed a month"
        },
        {
          "v": "Hours to minutes",
          "l": "time to reactivation"
        },
        {
          "v": "<1%",
          "l": "credits reversed"
        }
      ],
      "decision": "The model plans and explains; rules decide reactivation and every amount.",
      "role": "Contact discovery, tool contracts with BSS and provisioning, adjustment policy with finance, evals and guardrails, rollout with operations.",
      "video": "assets/video/07-account-and-billing-resolution-agent.mp4",
      "doc": ""
    },
    {
      "id": "du-virtual-assistant",
      "number": "08",
      "cat": "va",
      "kind": "Virtual assistant",
      "cloud": "Microsoft Azure",
      "org": "du",
      "title": "du AI Virtual Assistant",
      "oneLiner": "One assistant for du care: answers, troubleshooting, suspensions, billing, payments and purchases, with clean handoffs.",
      "problem": "A rule-based bot contained few chats and transferred the rest without context, while most contacts had an answer in the customer's own data.",
      "what": "Scaled an assistant with intent routing, RAG answers and tool-calling capabilities on real-time account data, plus agent assist for every handoff.",
      "safe": "Grounding, authentication, sentiment and prompt-failure thresholds; deterministic amounts and prices; confirmation before actions.",
      "stack": [
        "Azure AI Language",
        "Azure OpenAI GPT (mini and full tier)",
        "Azure AI Search",
        "Azure AI Content Safety",
        "Payments on AWS"
      ],
      "outcomes": [
        {
          "v": "1M+",
          "l": "conversations a year"
        },
        {
          "v": "80%+",
          "l": "contained, no agent needed"
        },
        {
          "v": "~CAD 2.4M",
          "l": "saved a year"
        }
      ],
      "decision": "Added capabilities one at a time, each with its own release gate, instead of one big launch.",
      "role": "Strategy, roadmap and backlog; intent discovery; capability design; guardrails and escalation thresholds; evaluation; rollout with 25+ engineers, data scientists, designers and vendors.",
      "video": "assets/video/08-du-ai-virtual-assistant.mp4",
      "doc": "",
      "scale": "1M+ conversations a year at 8.5/10 CSAT; agent handoffs cut from 22% to 17%"
    },
    {
      "id": "property-enquiry",
      "number": "10",
      "cat": "va",
      "kind": "Virtual assistant",
      "cloud": "Microsoft Azure",
      "org": "Hrudai",
      "client": "Real estate client",
      "title": "Property Enquiry and Viewing Assistant",
      "oneLiner": "A 24/7 assistant that answers listing questions, qualifies leads and books viewings into agent calendars.",
      "problem": "A third of enquiries arrived after hours and waited until morning; agents spent their day qualifying leads that never converted.",
      "what": "A hybrid assistant: RAG answers over listings and guides, rules-based qualification, OTP-verified viewing booking and hot-lead handoff.",
      "safe": "Prices and availability only from the listings API; fair-housing and no-advice guardrails.",
      "stack": [
        "Azure OpenAI GPT mini tier",
        "Azure AI Search",
        "WhatsApp Business API"
      ],
      "outcomes": [
        {
          "v": "60%",
          "l": "routine inquiries resolved"
        },
        {
          "v": "+15 to 20%",
          "l": "viewings booked"
        },
        {
          "v": "12 to 14%",
          "l": "no-shows, from ~20%"
        }
      ],
      "decision": "Hand hot leads to people fast instead of trying to contain them.",
      "role": "Discovery with the brokerage, PRD, conversation design, lead-qualification rules with the sales head, evaluation, rollout and client reporting.",
      "video": "assets/video/10-property-enquiry-assistant.mp4",
      "doc": ""
    }
  ],
  "credentials": [
    {
      "code": "PMP",
      "name": "Project Management Professional",
      "issuer": "PMI",
      "logo": "assets/img/certs/pmp.png",
      "date": "Oct 2026",
      "valid": "Valid to Oct 2029",
      "id": "4524667",
      "note": "Scope, risk and governance on large programs.",
      "credentialUrl": "",
      "file": "assets/docs/certs/PMP-Certificate.jpg",
      "image": "assets/docs/certs/PMP-Certificate.jpg"
    },
    {
      "code": "CBAP",
      "name": "Certified Business Analysis Professional",
      "issuer": "IIBA",
      "logo": "assets/img/certs/cbap.png",
      "date": "Jun 2026",
      "valid": "Valid to Jun 2029",
      "id": "184954155",
      "note": "Requirements and stakeholder work at depth.",
      "credentialUrl": "",
      "file": "assets/docs/certs/CBAP-Certificate.pdf",
      "image": "assets/docs/certs/CBAP-Certificate.jpg"
    },
    {
      "code": "POPM",
      "name": "Certified SAFe 6 Product Owner / Product Manager",
      "issuer": "Scaled Agile",
      "logo": "assets/img/certs/safe.png",
      "date": "",
      "valid": "Valid to Jun 2027",
      "id": "12609549-1991",
      "note": "Product ownership inside scaled agile programs.",
      "credentialUrl": "",
      "file": "assets/docs/certs/SAFe-6-POPM-Certificate.pdf",
      "image": "assets/docs/certs/SAFe-6-POPM-Certificate.jpg"
    },
    {
      "code": "SA",
      "name": "Certified SAFe 6 Agilist",
      "issuer": "Scaled Agile",
      "logo": "assets/img/certs/safe.png",
      "date": "",
      "valid": "Valid to Jun 2027",
      "id": "44037584-9748",
      "note": "Leading enterprise-scale agile delivery.",
      "credentialUrl": "",
      "file": "assets/docs/certs/SAFe-6-Agilist-Certificate.pdf",
      "image": "assets/docs/certs/SAFe-6-Agilist-Certificate.jpg"
    },
    {
      "code": "AZ-900",
      "name": "Microsoft Certified: Azure Fundamentals",
      "issuer": "Microsoft",
      "logo": "assets/img/certs/az900.png",
      "date": "Sep 2023",
      "valid": "",
      "id": "FA53E763F6C82FD1",
      "note": "Cloud foundations for AI architecture decisions.",
      "credentialUrl": "",
      "file": "assets/docs/certs/Azure-Fundamentals-Certificate.jpg",
      "image": "assets/docs/certs/Azure-Fundamentals-Certificate.jpg"
    },
    {
      "code": "CSM",
      "name": "Certified ScrumMaster",
      "issuer": "Scrum Alliance",
      "logo": "assets/img/certs/csm.png",
      "date": "Nov 2021",
      "valid": "",
      "id": "001276655",
      "note": "Team-level agile delivery.",
      "credentialUrl": "",
      "file": "assets/docs/certs/CSM-Certificate.pdf",
      "image": "assets/docs/certs/CSM-Certificate.jpg"
    },
    {
      "code": "LSSBB",
      "name": "Lean Six Sigma Black Belt",
      "issuer": "IASSC",
      "logo": "assets/img/certs/lssbb.png",
      "date": "Jul 2019",
      "valid": "",
      "id": "B-6422",
      "note": "Process and data-driven improvement.",
      "credentialUrl": "",
      "file": "assets/docs/certs/Lean-Six-Sigma-Black-Belt-Certificate.jpg",
      "image": "assets/docs/certs/Lean-Six-Sigma-Black-Belt-Certificate.jpg"
    },
    {
      "code": "ISO 9001",
      "name": "IRCA ISO 9001:2015 Auditor (Transition)",
      "issuer": "IRCA, ESENEK Training Centre",
      "logo": "assets/img/certs/iso9001.png",
      "date": "Nov 2015",
      "valid": "",
      "id": "15-8049",
      "note": "Quality management systems and audit.",
      "credentialUrl": "",
      "file": "assets/docs/certs/ISO-9001-Auditor-Certificate.jpg",
      "image": "assets/docs/certs/ISO-9001-Auditor-Certificate.jpg"
    }
  ],
  "education": [
    {
      "title": "Product Management Certificate",
      "org": "York University, Canada",
      "when": "2025"
    },
    {
      "title": "MBA, Marketing",
      "org": "National University of Modern Languages",
      "when": "2008"
    },
    {
      "title": "Bachelor of Science",
      "org": "Punjab University",
      "when": "2006"
    }
  ],
  "toolkit": [
    {
      "group": "AI models",
      "items": [
        "OpenAI GPT",
        "Anthropic Claude",
        "Google Gemini",
        "Azure OpenAI",
        "Amazon Bedrock",
        "Google Document AI"
      ]
    },
    {
      "group": "AI prototyping",
      "items": [
        "Claude Code",
        "Codex",
        "Lovable",
        "Microsoft 365 Copilot",
        "Wispr Flow"
      ]
    },
    {
      "group": "Enterprise systems",
      "items": [
        "SAP",
        "Salesforce",
        "Siebel CRM",
        "BSCS",
        "OpenText"
      ]
    },
    {
      "group": "Cloud",
      "items": [
        "Microsoft Azure",
        "AWS",
        "Google Cloud",
        "REST APIs"
      ]
    },
    {
      "group": "Product and delivery",
      "items": [
        "Jira",
        "Confluence",
        "Azure DevOps",
        "Figma",
        "Miro"
      ]
    },
    {
      "group": "Data",
      "items": [
        "SQL",
        "Power BI",
        "Tableau",
        "Google Analytics"
      ]
    }
  ],
  "impact": [
    {
      "value": "11",
      "label": "AI solutions shipped to production in 5 years",
      "detail": "",
      "area": ""
    },
    {
      "value": "~$3.3M",
      "label": "CAD a year in savings and client value",
      "detail": "",
      "area": ""
    },
    {
      "value": "25+",
      "label": "engineers, data scientists, designers and vendors led",
      "detail": "",
      "area": ""
    },
    {
      "value": "1M+",
      "label": "AI conversations a year, 80%+ contained, 8.5/10 CSAT",
      "detail": "",
      "area": ""
    },
    {
      "value": "92%",
      "label": "task success on a 200-case golden set",
      "detail": "",
      "area": ""
    },
    {
      "value": "<4%",
      "label": "hallucination rate, down from 15%",
      "detail": "",
      "area": ""
    },
    {
      "value": "−30%",
      "label": "cost per query with LLM routing, same accuracy",
      "detail": "",
      "area": ""
    },
    {
      "value": "−44%",
      "label": "processing time per claim and dispute file, 25 to 14 minutes",
      "detail": "",
      "area": ""
    },
    {
      "value": "<3s",
      "label": "p95 response time",
      "detail": "",
      "area": ""
    },
    {
      "value": "~450",
      "label": "team hours freed every month",
      "detail": "",
      "area": ""
    }
  ],
  "lab": [
    {
      "title": "ModelFit",
      "kind": "Product",
      "text": "Decision support for AI model selection: match each use case to the right model on quality, speed and cost to serve.",
      "stack": [
        "Model selection",
        "Cost to serve",
        "Live"
      ],
      "link": "https://zee-ailabs.github.io/ModelFit/",
      "linkLabel": "Open ModelFit"
    },
    {
      "title": "Enterprise AI Architecture Lab",
      "kind": "Enablement",
      "text": "A visual training program that brings delivery teams up to speed on AI foundations, virtual assistants, RAG and agentic AI.",
      "stack": [
        "Team enablement",
        "RAG",
        "Agentic AI"
      ],
      "link": "https://zee-ailabs.github.io/enterprise-ai-lab/",
      "linkLabel": "Open the lab"
    },
    {
      "title": "This portfolio and its AI twin",
      "kind": "Product",
      "text": "A 3D portfolio with an AI twin that answers recruiter questions around the clock, designed and built end to end.",
      "stack": [
        "Three.js",
        "Conversational AI",
        "Static web"
      ],
      "link": "",
      "linkLabel": ""
    },
    {
      "title": "Prototyping stack",
      "kind": "Toolkit",
      "text": "How I take an idea to a clickable prototype in days, so teams react to something real instead of a document.",
      "stack": [
        "Claude Code",
        "Codex",
        "Lovable",
        "Microsoft 365 Copilot",
        "Wispr Flow"
      ],
      "link": "",
      "linkLabel": ""
    },
    {
      "title": "AI product insights",
      "kind": "Thought leadership",
      "text": "Regular posts on evals, guardrails, metrics and what it really takes to ship AI in large organizations.",
      "stack": [
        "LinkedIn"
      ],
      "link": "https://www.linkedin.com/in/mzaigham/",
      "linkLabel": "Follow on LinkedIn"
    }
  ],
  "archive": [
    {
      "title": "Virtual agent conversation design",
      "caption": "Intent map and handoff flows for telecom self-service.",
      "org": "du Telecom",
      "image": ""
    },
    {
      "title": "Search analytics dashboard",
      "caption": "Zero-result tracking and top failed queries that fed the content backlog.",
      "org": "du Telecom",
      "image": ""
    },
    {
      "title": "Plan comparison journey",
      "caption": "Before and after of the plan selection flow behind the conversion uplift.",
      "org": "du Telecom",
      "image": ""
    },
    {
      "title": "Unified agent desktop",
      "caption": "CRM and CTI screen that brought customer context into one view.",
      "org": "du Telecom",
      "image": ""
    },
    {
      "title": "Online drawing review service",
      "caption": "Citizen-facing submission and review flow.",
      "org": "RAK Municipality",
      "image": ""
    },
    {
      "title": "Executive performance dashboards",
      "caption": "Automated operational and executive reporting.",
      "org": "Enterprise",
      "image": ""
    }
  ],
  "playbook": {
    "kpiGroups": [
      {
        "id": "engagement",
        "name": "Engagement",
        "intro": "Are people actually using it, and does using it help them?",
        "kpis": [
          {
            "name": "Task completion rate",
            "what": "Share of sessions where the user finished what they came to do.",
            "how": "Completed tasks / sessions with that intent",
            "watch": "Define completion from the user's side. A closed chat is not a solved problem."
          },
          {
            "name": "Containment rate",
            "what": "Conversations resolved by the AI without a human.",
            "how": "Contained conversations / total conversations",
            "watch": "High containment with low CSAT means you're trapping people. Pair it with satisfaction and repeat contact.",
            "moved": "80%+ containment at 1M+ conversations a year"
          },
          {
            "name": "Stickiness (DAU/MAU)",
            "what": "How habitual the product is.",
            "how": "Daily active users / monthly active users",
            "watch": "Not every product should be daily. Compare against the natural frequency of the job."
          },
          {
            "name": "Feature adoption",
            "what": "Share of eligible users who use a feature at least once in a period.",
            "how": "Users of feature / eligible users",
            "watch": "Eligible users only. Counting everyone hides good features behind bad targeting."
          },
          {
            "name": "Time to first value",
            "what": "How long until a new user gets their first real result.",
            "how": "Median time from sign-up or first visit to first successful task",
            "watch": "Shortening this usually beats adding features."
          },
          {
            "name": "CSAT and thumbs feedback",
            "what": "How people rate the interaction right after it happens.",
            "how": "Positive responses / total responses",
            "watch": "Response rates are low and skew to extremes. Read the comments, not just the score.",
            "moved": "8.5/10 CSAT"
          },
          {
            "name": "Turns to resolution",
            "what": "How many back-and-forth messages a conversation needs.",
            "how": "Median messages per resolved conversation",
            "watch": "Fewer is usually better, unless the AI is skipping clarifying questions it should ask."
          }
        ]
      },
      {
        "id": "growth",
        "name": "Growth",
        "intro": "Is the product bringing in, converting and keeping more of the right people?",
        "kpis": [
          {
            "name": "Activation rate",
            "what": "Share of new users who reach the moment that predicts retention.",
            "how": "Activated users / new users in cohort",
            "watch": "Find your activation event with data. Don't pick the one that's easiest to count."
          },
          {
            "name": "Conversion rate",
            "what": "Share of visitors who complete the commercial goal.",
            "how": "Conversions / unique visitors in the funnel",
            "watch": "Segment by intent and channel. A blended rate hides everything interesting."
          },
          {
            "name": "Funnel drop-off",
            "what": "Where people leave a journey.",
            "how": "Users lost between step N and N+1 / users at step N",
            "watch": "The biggest drop is not always the best target. Look for the cheapest one to fix."
          },
          {
            "name": "Retention cohorts",
            "what": "Share of a cohort still active after D1, D7, D30, or month N.",
            "how": "Active users in period / original cohort size",
            "watch": "Look for the curve flattening. A flat tail is a product people need."
          },
          {
            "name": "Expansion and attach rate",
            "what": "How often customers add products, seats or usage.",
            "how": "Customers who expanded / active customers",
            "watch": "In B2B and agency work this often matters more than new logos."
          },
          {
            "name": "Referral rate",
            "what": "How many new users arrive through existing ones.",
            "how": "Referred sign-ups / total sign-ups",
            "watch": "Rare in enterprise. Watch reference calls and case study approvals instead."
          }
        ]
      },
      {
        "id": "platform",
        "name": "Platform and AI ops",
        "intro": "Is it fast, reliable and affordable enough to run at scale?",
        "kpis": [
          {
            "name": "Latency (p50, p95, time to first token)",
            "what": "How long people wait for a response.",
            "how": "Percentiles of response time per request",
            "watch": "Averages lie. People remember the p95.",
            "moved": "p95 under 3 seconds"
          },
          {
            "name": "Cost to serve per task",
            "what": "What it costs to complete one unit of work with AI.",
            "how": "(Model + infra + human review cost) / completed tasks",
            "watch": "Measure per completed task, not per call. Retries and failures are part of the cost.",
            "moved": "−30% cost per query"
          },
          {
            "name": "Token usage per resolution",
            "what": "How many tokens a successful outcome consumes.",
            "how": "Total tokens / resolved tasks",
            "watch": "Context bloat creeps in quietly. Track it per release."
          },
          {
            "name": "Availability",
            "what": "Share of time the service works as expected.",
            "how": "Successful minutes / total minutes",
            "watch": "Include upstream model and API outages, not just your own servers."
          },
          {
            "name": "API and tool call success rate",
            "what": "How often the agent's tool calls succeed.",
            "how": "Successful calls / total calls",
            "watch": "For agents this is often the real reliability number."
          },
          {
            "name": "Retrieval hit rate",
            "what": "How often search or RAG pulls the passage that contains the answer.",
            "how": "Queries where a relevant passage is in the top k / total eval queries",
            "watch": "Bad retrieval looks like a model problem. Check this first."
          },
          {
            "name": "Content freshness",
            "what": "How current the knowledge behind answers is.",
            "how": "Share of indexed content reviewed within its review window",
            "watch": "Stale content produces confident wrong answers."
          }
        ]
      },
      {
        "id": "business",
        "name": "Business",
        "intro": "Is the work moving the numbers leadership and clients pay for?",
        "kpis": [
          {
            "name": "Revenue contribution",
            "what": "Revenue influenced or generated by the product.",
            "how": "Attributed revenue with a clear attribution rule",
            "watch": "Agree the attribution method with finance before launch, not after.",
            "moved": "~CAD $450K a year in client value"
          },
          {
            "name": "Cost per contact",
            "what": "Average cost to handle a customer interaction.",
            "how": "Total servicing cost / total contacts",
            "watch": "Deflection that creates repeat contacts raises this later.",
            "moved": "~CAD $2.4M a year in contact centre savings"
          },
          {
            "name": "Productivity",
            "what": "Output per person-hour for the team the product serves.",
            "how": "Cases or tasks completed / staff hours",
            "watch": "Make sure quality held while speed went up.",
            "moved": "Procedure answers in under 2 minutes, from ~15"
          },
          {
            "name": "First contact resolution",
            "what": "Issues solved in a single interaction.",
            "how": "Resolved on first contact / total issues",
            "watch": "Track reopen rate alongside it."
          },
          {
            "name": "Average handle time",
            "what": "Time to complete a case or call.",
            "how": "Total handle time / handled contacts",
            "watch": "Never optimize this alone. It punishes thoroughness.",
            "moved": "−15% handling time on a 3,000-user CRM"
          },
          {
            "name": "Hours saved",
            "what": "Manual effort removed by automation.",
            "how": "(Old time per task minus new time per task) x volume",
            "watch": "Validate with the team doing the work. Saved hours nobody can redeploy aren't savings.",
            "moved": "~450 team hours a month"
          },
          {
            "name": "Payback period and ROI",
            "what": "How fast an AI initiative pays back its cost.",
            "how": "Total investment / monthly net benefit",
            "watch": "Include running costs. AI has a real monthly bill."
          },
          {
            "name": "NPS and churn",
            "what": "Loyalty and the rate customers leave.",
            "how": "Promoters minus detractors; lost customers / starting customers",
            "watch": "Slow to move. Use them to confirm a trend, not to steer a sprint."
          }
        ]
      },
      {
        "id": "trust",
        "name": "AI quality and trust",
        "intro": "The numbers you maintain so the AI stays safe, accurate and worth trusting.",
        "kpis": [
          {
            "name": "Groundedness",
            "what": "Share of answers fully supported by the retrieved sources.",
            "how": "Grounded answers / evaluated answers",
            "watch": "Score it with a rubric and spot-check the grader. Automated judges drift too."
          },
          {
            "name": "Hallucination rate",
            "what": "Answers that state things the sources don't support.",
            "how": "Unsupported answers / evaluated answers",
            "watch": "Weight by severity. A wrong price is worse than a wrong greeting.",
            "moved": "15% to under 4%"
          },
          {
            "name": "Eval pass rate",
            "what": "Share of a fixed golden set the system gets right.",
            "how": "Passed cases / total cases",
            "watch": "Refresh the set from real traffic every quarter, or you're testing last year's product.",
            "moved": "92% task success on a 200-case golden set"
          },
          {
            "name": "Human override rate",
            "what": "How often people change or reject the AI's output.",
            "how": "Overridden outputs / total outputs",
            "watch": "Rising overrides are your earliest warning sign of drift."
          },
          {
            "name": "Handoff quality",
            "what": "Whether escalations reach a human with full context.",
            "how": "Handoffs where the human didn't re-ask / total handoffs",
            "watch": "The customer should never have to repeat themselves.",
            "moved": "Agent handoffs 22% to 17%"
          },
          {
            "name": "Guardrail trigger rate",
            "what": "How often safety filters, refusals or policy checks fire.",
            "how": "Triggered events / total requests",
            "watch": "Too high means a bad experience. Too low may mean the guardrails aren't working."
          },
          {
            "name": "Sensitive data incidents",
            "what": "Any exposure of personal information in outputs or logs.",
            "how": "Count of incidents per period",
            "watch": "The target is zero. In Canada, design for PIPEDA from the start."
          }
        ]
      },
      {
        "id": "health",
        "name": "Delivery and compliance",
        "intro": "The quieter numbers that keep a product healthy and shippable.",
        "kpis": [
          {
            "name": "Release frequency and change failure rate",
            "what": "How often you ship and how often a release causes trouble.",
            "how": "Releases per period; failed releases / total releases",
            "watch": "Shipping fast only counts if you aren't rolling back.",
            "moved": "95%+ on-time releases"
          },
          {
            "name": "SLA adherence",
            "what": "Share of commitments met to clients or internal teams.",
            "how": "Met SLAs / total SLAs",
            "watch": "In agency work this is the relationship."
          },
          {
            "name": "Accessibility conformance",
            "what": "How well the product meets WCAG 2.1 AA.",
            "how": "Audit findings closed / found",
            "watch": "Ontario's AODA makes this a legal requirement for many organizations, not a nice to have."
          },
          {
            "name": "Backlog health",
            "what": "Share of the next two sprints that is ready to build.",
            "how": "Ready items / planned items",
            "watch": "A thin ready backlog is the PM's bottleneck, not engineering's."
          },
          {
            "name": "Stakeholder confidence",
            "what": "Whether sponsors trust the roadmap.",
            "how": "Quarterly pulse or decision turnaround time",
            "watch": "Soft but real. Surprises destroy it faster than delays."
          }
        ]
      }
    ],
    "discovery": [
      {
        "name": "User interviews",
        "when": "You need to understand behaviour, context and pain in people's own words.",
        "output": "Patterns, quotes, and a ranked list of problems.",
        "tip": "Ask about the last time it happened, not what they usually do. Specific stories beat opinions.",
        "used": true
      },
      {
        "name": "One-to-one stakeholder sessions",
        "when": "Starting a project, or when goals across teams might conflict.",
        "output": "Goals, constraints, hidden politics and success criteria.",
        "tip": "Ask each stakeholder what would make this a failure. You learn more than asking about success.",
        "used": true
      },
      {
        "name": "Jobs to be Done sessions",
        "when": "You need to know why people switch, buy, or give up.",
        "output": "Job statements, forces of progress, and the real competition.",
        "tip": "Interview recent switchers. Their memory of the struggle is still fresh.",
        "used": true
      },
      {
        "name": "Workshops",
        "when": "Several teams need to agree on a problem, a journey or a plan.",
        "output": "Shared journey maps, service blueprints, decisions and owners.",
        "tip": "Send a one-page pre-read. Workshops fail when people discover the problem in the room.",
        "used": true
      },
      {
        "name": "Brainstorming",
        "when": "The problem is clear and you need many options before narrowing.",
        "output": "A wide set of ideas, clustered and voted.",
        "tip": "Go silent first (Crazy 8s or written ideas), then discuss. Loud voices otherwise win.",
        "used": true
      },
      {
        "name": "Journey mapping and service blueprints",
        "when": "The experience crosses channels, teams or systems.",
        "output": "Moments of truth, failure points, and the backstage work behind them.",
        "tip": "Map the backstage. Most AI opportunities hide in the handoffs customers never see.",
        "used": true
      },
      {
        "name": "Contextual inquiry and shadowing",
        "when": "You're improving work that people do every day, like a contact centre or back office.",
        "output": "Workarounds, swivel-chair moments, and time sinks.",
        "tip": "Sit next to an agent for a full shift. You'll find the copy-paste that a survey never reveals.",
        "used": true
      },
      {
        "name": "Conversation and ticket mining",
        "when": "You have chat logs, search logs or support tickets.",
        "output": "Intent volumes, failure reasons and your first eval set.",
        "tip": "This is the best starting point for any AI product. Real questions beat imagined ones.",
        "used": true
      },
      {
        "name": "Funnel and behaviour analytics",
        "when": "You need to know where and how much, at scale.",
        "output": "Drop-off points, segments and baselines.",
        "tip": "Analytics tells you where. Interviews tell you why. Use both.",
        "used": true
      },
      {
        "name": "Wizard of Oz prototypes",
        "when": "Testing an AI experience before building the AI.",
        "output": "Evidence that people want it and how they phrase things.",
        "tip": "A human behind the curtain for two weeks can save a quarter of model work."
      },
      {
        "name": "Assumption mapping",
        "when": "A plan rests on beliefs nobody has tested.",
        "output": "The riskiest assumptions and a test for each.",
        "tip": "Test the assumption that kills the idea first, not the one that's easy to test.",
        "used": true
      },
      {
        "name": "Surveys",
        "when": "You need to size something you already understand.",
        "output": "Prevalence and priority across a large group.",
        "tip": "Never use a survey to discover. Use it to measure what interviews found."
      }
    ],
    "prioritization": [
      {
        "id": "rice",
        "name": "RICE",
        "formula": "(Reach x Impact x Confidence) / Effort",
        "best": "Comparing many features or experiments when you have usable data on reach.",
        "avoid": "Strategic bets with no data. Confidence becomes a guess.",
        "take": "My default for a feature backlog. The confidence score keeps people honest.",
        "used": true
      },
      {
        "id": "wsjf",
        "name": "WSJF",
        "formula": "Cost of Delay / Job Size",
        "best": "Sequencing epics in SAFe or large programs with many teams and dependencies.",
        "avoid": "Small teams. The ceremony costs more than the decision.",
        "take": "Great for enterprise programs where timing matters as much as value.",
        "used": true
      },
      {
        "id": "moscow",
        "name": "MoSCoW",
        "formula": "Must, Should, Could, Won't",
        "best": "Agreeing MVP scope with stakeholders on a fixed date.",
        "avoid": "Long-term roadmaps. Everything becomes a Must.",
        "take": "Strong for release scoping. Cap Musts at about 60% of capacity.",
        "used": true
      },
      {
        "id": "story-mapping",
        "name": "Story mapping",
        "formula": "Journey backbone, sliced into releases",
        "best": "Finding the thinnest version that still completes the whole journey.",
        "avoid": "Choosing between unrelated features.",
        "take": "The best tool I know for an AI MVP that does one job end to end.",
        "used": true
      },
      {
        "id": "kano",
        "name": "Kano model",
        "formula": "Basic, Performance, Delighter",
        "best": "Understanding which features customers expect, reward, or love.",
        "avoid": "Internal tools where delight isn't the point.",
        "take": "Useful reminder that some features earn no credit, only blame when missing."
      },
      {
        "id": "cost-of-delay",
        "name": "Cost of Delay",
        "formula": "Value lost per week of waiting",
        "best": "When deadlines, regulation or seasonality make timing critical.",
        "avoid": "When value is too uncertain to estimate per week.",
        "take": "Changes the conversation from 'how important' to 'how urgent, in dollars'.",
        "used": true
      },
      {
        "id": "ice",
        "name": "ICE",
        "formula": "Impact x Confidence x Ease",
        "best": "Fast triage of growth experiments.",
        "avoid": "Big investments. It's too light.",
        "take": "Good for a weekly experiment queue, not for a roadmap."
      },
      {
        "id": "value-effort",
        "name": "Value vs effort",
        "formula": "2x2 matrix",
        "best": "Quick alignment in a workshop.",
        "avoid": "Anything needing a defensible audit trail.",
        "take": "A conversation starter. Follow it with something more rigorous.",
        "used": true
      },
      {
        "id": "opportunity",
        "name": "Opportunity scoring",
        "formula": "Importance + (Importance minus Satisfaction)",
        "best": "Finding underserved needs from customer survey data.",
        "avoid": "When you can't survey the users.",
        "take": "Pairs well with Jobs to be Done research."
      },
      {
        "id": "buy-build",
        "name": "Buy vs build vs partner",
        "formula": "Scorecard across fit, cost, risk and time",
        "best": "AI platform, model and vendor decisions.",
        "avoid": "Commodity choices where the answer is obviously buy.",
        "take": "I've run RFI, RFQ and RFP cycles with weighted scorecards. Weight total cost of ownership heavily for AI.",
        "used": true
      },
      {
        "id": "risk-first",
        "name": "Risk first (for AI)",
        "formula": "Riskiest assumption, tested cheapest",
        "best": "New AI capabilities where quality is unproven.",
        "avoid": "Well-understood, low-risk work.",
        "take": "Build the eval before the feature. If you can't measure good, you can't ship it.",
        "used": true
      }
    ],
    "picker": {
      "questions": [
        {
          "id": "context",
          "text": "Where are you working?",
          "options": [
            {
              "value": "enterprise",
              "label": "Large enterprise or SAFe program"
            },
            {
              "value": "startup",
              "label": "Startup or small product team"
            },
            {
              "value": "agency",
              "label": "Agency or client delivery"
            }
          ]
        },
        {
          "id": "decision",
          "text": "What are you deciding?",
          "options": [
            {
              "value": "sequence",
              "label": "The order of big initiatives"
            },
            {
              "value": "mvp",
              "label": "What goes in the first release"
            },
            {
              "value": "features",
              "label": "Which features to build next"
            },
            {
              "value": "ai",
              "label": "Whether an AI idea is ready to build"
            },
            {
              "value": "vendor",
              "label": "Which platform or vendor to use"
            }
          ]
        },
        {
          "id": "data",
          "text": "How much data do you have?",
          "options": [
            {
              "value": "good",
              "label": "Good usage and impact data"
            },
            {
              "value": "some",
              "label": "Some data, lots of opinions"
            },
            {
              "value": "none",
              "label": "Very little"
            }
          ]
        }
      ]
    },
    "method": [
      {
        "title": "Frame the right problem",
        "tools": "Jobs to be Done, journey maps, service blueprints",
        "text": "Get clear on the user's job, today's baseline, where it breaks, and what outcome would count as success."
      },
      {
        "title": "Shape the opportunity",
        "tools": "Opportunity solution trees, assumption mapping, business case",
        "text": "Compare value, feasibility, risk, privacy and cost. Decide whether to build, buy or partner."
      },
      {
        "title": "Define the product",
        "tools": "Story mapping, RICE, WSJF, MoSCoW",
        "text": "Turn the vision into a sequenced roadmap, a ready backlog, acceptance criteria and clear non-goals."
      },
      {
        "title": "Design the whole journey",
        "tools": "Prototypes, accessibility, state design",
        "text": "Design the happy path and every other state: loading, empty, error, retry, low confidence and handoff."
      },
      {
        "title": "Build the evals early",
        "tools": "Golden sets, rubrics, red teaming",
        "text": "Agree what good looks like before the model is chosen. Quality, latency and cost targets go in the definition of done."
      },
      {
        "title": "Release and learn",
        "tools": "Controlled rollout, experiments, North Star, observability",
        "text": "Ship to a slice, watch the numbers and the transcripts, and feed what you learn back into the backlog."
      }
    ]
  },
  "academy": {
    "intro": "A free, practical path for junior product managers and career switchers aiming for PM and AI PM roles. It's what I wish someone had handed me. Work through it in order, tick off lessons as you go, and do the exercises. Your progress is saved in your browser.",
    "modules": [
      {
        "id": "m1",
        "title": "What a product manager actually does",
        "level": "Foundations",
        "lessons": [
          {
            "title": "PM, PO and BA: how the roles differ",
            "body": "A product manager owns the why and the what: the problem, the outcome and the roadmap. A product owner turns that into a ready backlog for a team. A business analyst models the process and requirements in depth. In smaller companies one person does all three."
          },
          {
            "title": "Outcomes, not features",
            "body": "Your job is to change a number that matters to users and the business. Features are just your best guess at how. Write every initiative as: we believe [change] will cause [outcome], measured by [metric]."
          },
          {
            "title": "The weekly rhythm",
            "body": "Talk to users, check the numbers, unblock the team, update stakeholders. If a week passes without a user conversation, you're managing a project, not a product."
          }
        ],
        "exercise": "Pick an app you use every day. Write its north star metric, two input metrics, and one feature you'd cut."
      },
      {
        "id": "m2",
        "title": "AI product fundamentals",
        "level": "AI PM",
        "lessons": [
          {
            "title": "How LLM products really work",
            "body": "A large language model predicts text. Useful products wrap it with instructions, retrieved knowledge (RAG), tools it can call, and checks on what it produces. Most quality problems live in the wrapping, not the model."
          },
          {
            "title": "RAG, agents and workflows",
            "body": "RAG gives the model the right documents. A workflow is a fixed sequence where AI does some steps. An agent decides its own next step and calls tools. Start with the simplest one that does the job. Most business value today comes from workflows."
          },
          {
            "title": "Evals are the new spec",
            "body": "An eval set is a list of real inputs with what good looks like. Build it from real logs before you choose a model. If you can't say what a good answer is, you can't ship."
          },
          {
            "title": "Latency, cost and quality",
            "body": "You can usually have two. A bigger model is smarter but slower and pricier. Measure cost per completed task, and decide the trade-off per use case, not once for the whole product."
          },
          {
            "title": "Guardrails and handoffs",
            "body": "Decide early what the AI must never do, when it should ask for confirmation, and how it hands off to a person with full context. Trust is built in the failure cases."
          }
        ],
        "exercise": "Write 20 real questions a customer might ask a support bot, with the ideal answer for each. That's your first eval set."
      },
      {
        "id": "m3",
        "title": "Discovery that changes decisions",
        "level": "Core skill",
        "lessons": [
          {
            "title": "Interviewing without leading",
            "body": "Ask about specific past events. 'Tell me about the last time you...' beats 'Would you use...'. People are bad at predicting their behaviour and good at describing it."
          },
          {
            "title": "Jobs to be Done in practice",
            "body": "People hire products to make progress. Map the push of the current situation, the pull of the new solution, and the anxiety and habit holding them back."
          },
          {
            "title": "Mining logs and tickets",
            "body": "For AI products, existing chat logs, search queries and tickets are gold. Cluster them by intent and volume to find your first use case and your test data in one go."
          }
        ],
        "exercise": "Interview three people about the last time they tried to get help from a company. Write the top three pain points in their words."
      },
      {
        "id": "m4",
        "title": "Metrics and KPIs",
        "level": "Core skill",
        "lessons": [
          {
            "title": "North star and input metrics",
            "body": "Your north star captures the value users get. Input metrics are the levers your team can pull this quarter. Teams own inputs. Leadership watches the north star."
          },
          {
            "title": "The five families",
            "body": "Engagement (are they using it), growth (are we gaining and keeping users), platform (is it fast and affordable), business (is it paying off) and trust (is it safe and accurate). The Playbook on this site covers each one."
          },
          {
            "title": "Counter-metrics",
            "body": "Every metric you push needs one that tells you if you pushed too hard. Containment with CSAT. Handle time with reopen rate. Conversion with complaints."
          }
        ],
        "exercise": "For a food delivery app, write one north star, three input metrics and one counter-metric for each."
      },
      {
        "id": "m5",
        "title": "Prioritization and roadmaps",
        "level": "Core skill",
        "lessons": [
          {
            "title": "Pick the method for the decision",
            "body": "RICE for a feature backlog. WSJF for sequencing big programs. MoSCoW for fixing MVP scope. Story mapping for finding the thinnest end-to-end release. Try the picker in the Playbook."
          },
          {
            "title": "Now, next, later",
            "body": "Roadmaps with dates far out are fiction. Commit to now, be directional about next, and keep later as themes."
          },
          {
            "title": "Saying no",
            "body": "Every yes is a no to something else. Say no with the trade-off visible: 'We can do this if we delay that. Which matters more?'"
          }
        ],
        "exercise": "Take five feature ideas for a product you know and score them with RICE. Then argue against your own top pick."
      },
      {
        "id": "m6",
        "title": "Writing that ships",
        "level": "Delivery",
        "lessons": [
          {
            "title": "A one-page PRD",
            "body": "Problem, who it's for, evidence, goal metric, scope, non-goals, risks, open questions. If it doesn't fit on a page, you don't understand it yet."
          },
          {
            "title": "User stories and acceptance criteria",
            "body": "As a [user], I want [action] so that [outcome]. Then Given, When, Then for each rule. For AI features, add quality thresholds from your eval set."
          },
          {
            "title": "Definition of ready and done",
            "body": "Ready means the team can start without a meeting. Done means it's tested, measured, documented and in users' hands."
          }
        ],
        "exercise": "Write a one-page PRD for adding an AI summary to a support ticket screen."
      },
      {
        "id": "m7",
        "title": "Working with engineering, data and APIs",
        "level": "Delivery",
        "lessons": [
          {
            "title": "API basics for PMs",
            "body": "Know what an endpoint, request, response, authentication and error code are. Ask about rate limits, timeouts and retries. Your AI agent is only as reliable as the APIs it calls."
          },
          {
            "title": "Trade-offs, not requirements",
            "body": "Bring engineers the problem and constraints, then decide together. The best solutions usually come from the people building them."
          },
          {
            "title": "Testing with the business",
            "body": "SIT checks the systems talk to each other. UAT checks it solves the business problem. Plan UAT with real scenarios, not happy paths."
          }
        ],
        "exercise": "Read the public API docs of any service you use and write three questions you'd ask before building on it."
      },
      {
        "id": "m8",
        "title": "Breaking into PM in Canada",
        "level": "Career",
        "lessons": [
          {
            "title": "Show, don't list",
            "body": "Hiring managers want proof you can think like a PM. Two or three written case studies beat ten bullet points. Show the problem, your decision, the trade-off and the result."
          },
          {
            "title": "Translate your background",
            "body": "Analysts, engineers, designers and support leads all have PM muscles. Rewrite your experience as problems solved and outcomes moved."
          },
          {
            "title": "Canadian market specifics",
            "body": "Keep your résumé to two pages, lead with impact, and expect behavioural interviews in the STAR format. Local references and network matter a lot here. Join product communities and meetups early."
          },
          {
            "title": "Build something small",
            "body": "With today's AI tools you can ship a working prototype in a weekend. It's the fastest way to show product sense and AI fluency at once."
          }
        ],
        "exercise": "Rewrite your three strongest résumé bullets as: problem, action, measurable result."
      }
    ]
  },
  "services": [
    {
      "title": "AI opportunity sprint",
      "duration": "2 weeks",
      "text": "Find and rank your best AI bets, with a pilot plan."
    },
    {
      "title": "Pilot to production",
      "duration": "6 to 10 weeks",
      "text": "One AI workflow or agent, shipped and measured."
    },
    {
      "title": "Evals and guardrails",
      "duration": "2 to 4 weeks",
      "text": "Golden sets, quality gates, cost and latency targets."
    },
    {
      "title": "PM and AI PM coaching",
      "duration": "Ongoing",
      "text": "For PMs moving into AI, and first-time PMs."
    }
  ],
  "mapper": {
    "industries": [
      {
        "value": "health",
        "label": "Healthcare clinic",
        "note": "Keep personal health information out of prompts and logs unless your setup is approved for it, and design with PHIPA and PIPEDA in mind."
      },
      {
        "value": "public",
        "label": "Municipality or public sector",
        "note": "Plain language, accessibility under AODA, and a clear human path for every service are non-negotiable."
      },
      {
        "value": "telecom",
        "label": "Telecom or utilities",
        "note": "High volume makes small gains valuable. Start where intent volume and repeat contacts are highest."
      },
      {
        "value": "retail",
        "label": "Retail or e-commerce",
        "note": "Product and policy data must come from your systems of record, never from the model's memory."
      },
      {
        "value": "services",
        "label": "Professional services",
        "note": "Client confidentiality comes first. Start with internal workflows before anything client-facing."
      },
      {
        "value": "logistics",
        "label": "Logistics or field services",
        "note": "Integrations with scheduling and tracking systems decide success more than the model does."
      }
    ],
    "pains": [
      {
        "value": "inquiries",
        "label": "Too many repetitive inquiries",
        "useCase": "A grounded virtual agent for your top 20 intents, with clean handoff to staff.",
        "northStar": "Inquiries resolved without a staff touch, with CSAT held or improved",
        "pilot": [
          "Mine 3 months of emails, calls or chats for top intents",
          "Build a 50-question eval set from real messages",
          "Launch on one channel for the top 5 intents",
          "Review transcripts weekly and expand intent by intent"
        ]
      },
      {
        "value": "documents",
        "label": "Document-heavy intake",
        "useCase": "AI-assisted intake that extracts and checks documents, flagging gaps for a person.",
        "northStar": "Complete submissions on first try",
        "pilot": [
          "Collect 100 sample documents with known correct fields",
          "Measure extraction accuracy per field",
          "Route low-confidence items to human review",
          "Track rework and turnaround time weekly"
        ]
      },
      {
        "value": "cases",
        "label": "Slow case or ticket resolution",
        "useCase": "A case copilot that summarizes history and suggests next steps for staff to approve.",
        "northStar": "Right-first-time resolution",
        "pilot": [
          "Shadow staff to time the research part of each case",
          "Pilot summaries with one team and a holdout team",
          "Track edits to suggestions as a quality signal",
          "Compare handle time and reopen rate after 4 weeks"
        ]
      },
      {
        "value": "search",
        "label": "People can't find answers",
        "useCase": "Answer search over your approved knowledge, with citations on every answer.",
        "northStar": "Questions answered without escalation",
        "pilot": [
          "Export search logs and find zero-result queries",
          "Clean and own the top 100 source documents",
          "Launch cited answers to internal staff first",
          "Track answer acceptance and escalation rate"
        ]
      },
      {
        "value": "reporting",
        "label": "Manual reporting and admin",
        "useCase": "An agentic workflow that gathers data, drafts the report and asks a person to approve.",
        "northStar": "Hours saved per week, with zero accuracy regressions",
        "pilot": [
          "List every manual step and how long it takes",
          "Automate the gathering first, drafting second",
          "Keep a human approval step for 30 days",
          "Measure hours saved and errors caught"
        ]
      }
    ]
  },
  "beyond": [
    {
      "id": "lab",
      "title": "The Lab",
      "teaser": "Products and prototypes I've built",
      "count": "5 items",
      "icon": "flask"
    },
    {
      "id": "playbook",
      "title": "The Playbook",
      "teaser": "How I run product, end to end",
      "count": "40 KPIs",
      "icon": "compass"
    },
    {
      "id": "academy",
      "title": "PM Academy",
      "teaser": "A free path into product management",
      "count": "8 modules",
      "icon": "grad"
    },
    {
      "id": "advisory",
      "title": "Advisory",
      "teaser": "AI strategy and delivery for your business",
      "count": "4 offers",
      "icon": "spark"
    }
  ],
  "assistant": {
    "name": "Ask my AI twin",
    "greeting": "Hi, I'm Zaigham's AI twin. Ask me for the story behind any of his AI products, his career, or how he runs product.",
    "suggestions": [
      "Tell me his story",
      "What has he shipped?",
      "Is he hands-on?",
      "How do I reach him?"
    ],
    "disclaimer": "Answers come from Zaigham's portfolio and résumé. For anything else, email him.",
    "endpoint": ""
  },
  "plm": {
    "title": "The full product lifecycle, discovery to sunset.",
    "stages": [
      {
        "verb": "Discover",
        "purpose": "Find the real problem before the solution.",
        "techniques": [
          "1:1 user interviews",
          "Workshops",
          "Focus groups",
          "JTBD sessions",
          "CSAT and complaint analysis",
          "Contact-reason mining",
          "Journey mapping"
        ]
      },
      {
        "verb": "Define",
        "purpose": "Turn insight into requirements teams can build.",
        "techniques": [
          "Business case",
          "BRD",
          "PRD",
          "FRD",
          "User stories",
          "Acceptance criteria",
          "Requirement traceability matrix"
        ]
      },
      {
        "verb": "Prioritize",
        "purpose": "Back the bets that move the numbers.",
        "techniques": [
          "RICE",
          "MoSCoW",
          "WSJF",
          "Impact vs effort",
          "Cost of delay"
        ]
      },
      {
        "verb": "Plan",
        "purpose": "Align every team on what ships, and when.",
        "techniques": [
          "Roadmaps and OKRs",
          "PI planning",
          "Sprint planning",
          "Backlog refinement",
          "Definition of ready"
        ]
      },
      {
        "verb": "Build",
        "purpose": "Ship in small, tested increments.",
        "techniques": [
          "Daily stand-ups",
          "Sprint reviews",
          "Retrospectives",
          "Rapid prototyping",
          "AI evals and golden datasets"
        ]
      },
      {
        "verb": "Release",
        "purpose": "Go live safely, every time.",
        "techniques": [
          "SIT and UAT",
          "Release management cycles",
          "Go-live readiness",
          "PIA and TRA",
          "Change management"
        ]
      },
      {
        "verb": "Measure",
        "purpose": "Learn, improve, or sunset.",
        "techniques": [
          "KPIs and OKRs",
          "A/B testing",
          "CSAT and NPS",
          "Drift monitoring",
          "Sunset decisions"
        ]
      }
    ]
  },
  "caseCategories": [
    {
      "id": "rag",
      "label": "RAG and AI search"
    },
    {
      "id": "agentic",
      "label": "Agentic and document AI"
    },
    {
      "id": "va",
      "label": "Virtual assistants"
    }
  ],
  "caseNote": "Demos recreate the live products with dummy data. Client names and data stay confidential.",
  "casesIntro": {
    "kicker": "Selected work",
    "title": "Eight AI products. Real problems. Measured results.",
    "line": "A sample of the work behind the numbers: the problem, the build, the guardrails and the outcome. Watch the demo, then request the full product requirements document by email."
  }
};
