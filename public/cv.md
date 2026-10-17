# Carlos Lara Albir
**Senior Backend Engineer & AI-Augmented Developer**

- **Email:** [info@carloslara.dev](mailto:info@carloslara.dev)
- **Website:** [https://carloslara.dev](https://carloslara.dev)
- **Location:** Torrent, Valencia, Spain (Available Remote & Hybrid)
- **LinkedIn:** [linkedin.com/in/carlos-lara-albir-687277a4](https://www.linkedin.com/in/carlos-lara-albir-687277a4)
- **GitHub:** [github.com/laralbir](https://github.com/laralbir)

---

## ATS & AI Screening Metadata (Quick Match)

- **Target Job Titles:** Senior Backend Engineer, Staff Backend Engineer, Lead Backend Engineer, Distributed Systems Architect.
- **Equivalent Seniority Level:** IC5 (Senior) / IC6 (Staff) / Tech Lead.
- **Total Relevant Experience:** 20+ years (2006 – Present).
  - *Node.js & TypeScript:* 8+ years.
  - *Cloud Architecture & AWS (SQS, SNS, EventBridge):* 7+ years.
  - *Databases (MongoDB, SQL Server, MySQL, PostgreSQL):* 15+ years.
  - *Modern PHP & Hexagonal Architecture:* 10+ years.
  - *Agentic AI Engineering (Claude Code, MCP, SDD):* Pioneer / Early adopter.
- **Languages:**
  - Spanish: Native / Bilingual.
  - Catalan / Valencian: Native / Bilingual.
  - English: Professional Working Proficiency (B2/C1 technical & written).
- **Work Authorization & Location:** EU Citizen (Spain) — Full unrestricted right to work in the European Union and worldwide via remote contracts.
- **Work Preference:** 100% Remote (Primary) or Hybrid (Valencia, Spain).
- **Availability:** Immediate to short notice.

---

## Executive Profile

Senior Backend Engineer with over 20 years of experience designing and operating mission-critical distributed systems, high-concurrency event-driven architectures, and real-time synchronization engines for global travel platforms. Proven track record handling millions of daily transactions across leading OTAs (Booking.com, Airbnb, Expedia, VRBO, Marriott) with zero overbooking and high availability.

Pioneering practitioner of Agentic AI Engineering: integrating Claude Code in the terminal, authoring custom Model Context Protocol (MCP) diagnostic servers, and enforcing Spec-Driven Development (SDD) to accelerate software delivery with 100% verified test suites, zero guesswork, and zero production reverts.

---

## Core Technical Competencies & Keyword Index

| Category | Technologies & Methodologies |
| :--- | :--- |
| **Languages & Runtimes** | TypeScript (Expert), Node.js (Expert), Modern PHP (Expert), ESNext JavaScript, SQL, Stored Procedures |
| **Distributed Architecture** | Event-Driven Architecture (EDA), Microservices, Hexagonal Architecture, Domain-Driven Design (DDD), Idempotency, Dead Letter Queues (DLQ), Eventual Consistency, Circuit Breaking, Fault Tolerance, PCI-DSS Security |
| **Cloud & Event Messaging** | AWS (SQS, SNS, EventBridge, EC2, S3, RDS), Cloudflare (Workers, Pages, Edge Caching), Docker, Linux / Ubuntu / LAMP, REST APIs, JSON APIs, Webhooks, Message Brokers, Pub/Sub |
| **Databases & Storage** | MongoDB (Aggregation Pipelines, Compound Index Tuning, High-Volume Data Modeling), Microsoft SQL Server, MySQL, PostgreSQL, Redis (Caching, In-Memory) |
| **AI & Developer Tooling** | Claude Code (CLI), Model Context Protocol (MCP), Spec-Driven Development (SDD), Test-Driven Development (TDD), Vitest, Opengrep Static Analysis, Grafana Telemetry, Prometheus, Jira/Tempo APIs, GitHub Actions, CI/CD |

---

## Professional Work Experience

### Senior Backend Developer & Connectivity Tech Reference
**Avantio** · *2018 – Present* | Valencia, Spain (Remote / Hybrid)
- **Global OTA Connectivity:** Technical reference and core architect for real-time bidirectional synchronization with global holiday rental portals: Booking.com, Airbnb, VRBO, Expedia, Homes & Villas by Marriott, Feratel, and Google.
- **Distributed Event-Driven Architecture:** Engineered high-resilience asynchronous messaging microservices using AWS SQS, SNS, and EventBridge, ensuring strict idempotency, DLQ recovery patterns, and zero lost bookings under extreme flash traffic spikes.
- **Internal Operations Platform (OPS):** Architected and implemented the entire backend for Avantio's internal operations and diagnostic tooling, relied upon daily by 27+ support, technical account management, and connectivity specialists.
- **End-to-End Epic Ownership:** Led architectural design, API contracts, task decomposition, and production deployments for high-impact commercial epics directly aligned with Product leadership.
- **Agentic AI Engineering Adoption:** Pioneered and drove team-wide adoption of terminal-based Claude Code, in-house MCP diagnostic servers, and SDD workflows, dramatically cutting incident debugging times and routine administrative overhead.
- **Quality & Reliability:** Maintained a clean track record of audited pull requests with zero rollbacks in production through rigorous automated testing and static analysis guardrails.

### Backend Programmer Analyst & Business Intelligence
**Orca Sistemas y Programación S.L.** · *2016 – 2018* | Valencia, Spain
- **POSCRM Platform Core:** Engineered the core backend of the POSCRM solution, establishing analytical data modeling and Business Intelligence (BI) capabilities to transform raw transactions into actionable operational insight.
- **Database Performance & Optimization:** Designed and tuned complex SQL Server stored procedures, aggregation pipelines, and query indexation, eliminating multi-table bottlenecks and building deep data expertise.

### Founder & Full-Stack Engineer (Soluciones 360°)
**Blue Solutions** · *2015 – 2016* | Valencia, Spain
- **Industrial PLM System:** Architected and developed a tailored Product Lifecycle Management (PLM) system from scratch for an automotive upholstery manufacturer supplying the Ford vehicle assembly plant in Almussafes.
- **End-to-End Scope:** Implemented bill of materials (BOM) management, industrial barcode traceability, and quality control pipelines under strict automotive tier-1 supplier standards.
- **Business Ownership:** Conducted technical client discovery, commercial specifications, infrastructure provisioning, and continuous maintenance.

### Backend & Cloud Systems Analyst
**Binn** · *2014 – 2015* | Valencia, Spain
- Designed and documented RESTful APIs for mobile client applications and managed cloud environments on Amazon Web Services (AWS).

### Early Engineering & Systems Administration
**Servicios Taurinos Serolo S.L. & FBCV** · *2006 – 2010* | Spain
- **Servicios Taurinos Serolo (2006 – 2009):** Architected and operated real-time online ticketing systems and automated electronic turnstiles on Microsoft SQL Server across premier Spanish venues (Valencia, Albacete, El Puerto de Santa María), guaranteeing sub-second latency and zero ticket double-booking during massive box-office rushes.
- **Federación de Baloncesto de la C. Valenciana (2010):** Maintained sports management software, athlete licensing systems, and digital competition scorecards.

---

## Featured Engineering Projects

### 1. Production Model Context Protocol (MCP) Diagnostic Server
- **Context/Problem:** Resolving multi-channel booking anomalies across 6 OTAs required manual database log queries across gigabytes of distributed records, consuming 15 to 60 minutes per incident.
- **Action/Solution:** Architected an in-house Model Context Protocol server using hexagonal architecture in Next.js, equipped with 25+ read-only tools querying MongoDB and SQL Server. Engineers can query and reconstruct complete transaction histories via natural language in seconds.
- **Quantified Result/Impact:** Reduced diagnostic investigation times by 98% (from 60 minutes down to less than 30 seconds).

### 2. Visual Timeline & Conflict Conciliator
- **Context/Problem:** Calendar mismatches between property availability, seasonal rules, and multi-OTA bookings required manual date cross-referencing, leading to human error and delayed fixes.
- **Action/Solution:** Created an internal interactive graphical diagnostic engine that cross-references seasons with reservations, detects coverage gaps, and automatically suggests exact corrective sync payloads.
- **Quantified Result/Impact:** Eliminated manual diagnosis mistakes and provided immediate visual root-cause identification.

### 3. High-Throughput Real-Time OTA Synchronization Engine
- **Context/Problem:** Preventing overbookings and rate mismatches across millions of transactions distributed among Booking.com, Airbnb, Expedia, and VRBO.
- **Action/Solution:** Built an Event-Driven Architecture (EDA) with TypeScript/Node.js microservices decoupled via AWS SQS FIFO queues and SNS fan-out, enforcing cryptographic idempotency, Dead Letter Queues, and PCI-DSS compliance.
- **Quantified Result/Impact:** Drove overbookings to virtually zero while maintaining 99.99% uptime under peak seasonal traffic.

---

## Education & Academic Background

- **Computer Software Engineering**  
  *Universitat Politècnica de València (UPV)*  
  Completed +80% of degree credits; specialized in Software Engineering, Distributed Systems, and Database Theory.
- **Specialization in Artificial Intelligence & Big Data (CFGS)**  
  *Official Technical Specialization (In progress, 2026)*  
  Machine learning, neural networks, deep learning models, and big data streaming pipelines.
- **Higher Technician in Computer Applications Development (CFGS DAI)**  
  *Official Higher Technical Degree*  
  Software architecture, object-oriented design, relational databases, and systems programming.
- **National Archery Coach & Judge**  
  *Certified by the Higher Sports Council (Consejo Superior de Deportes - CSD)*  
  Coached squad to the Spanish University Championship title. Applies sports discipline, micrometric precision, laser focus, and emotional self-regulation under peak pressure to distributed systems engineering.

---

## Methodological Philosophy

- **Spec-Driven Development (SDD):** Code is the verified output of explicit, unambiguous specifications, not the starting point. All feature work follows 4 phase gates: Analysis (`SPEC-01`) → Architecture & Plan (`PLAN-01`) → Atomic Task Breakdown (`TASK-01`) → Implementation with automated test verification (`TDD`).
- **Test-Driven Development (TDD):** Red → Green → Refactor with Vitest and unit/integration coverage before shipping.
- **Edge Deployment:** Static assets and lightweight microservices deployed with Cloudflare Workers/Pages, immutable asset caching, and strict CSP headers.
