import pptxgen from "pptxgenjs";

const pptx = new pptxgen();

pptx.layout = "LAYOUT_16x9";
pptx.author = "VEYRAX";
pptx.company = "Smart India Hackathon 2026";
pptx.title = "SIH26233 - Inline Microbial Contamination Detection";

// Slide 1: TITLE PAGE
{
  const slide = pptx.addSlide();
  
  // Header bar
  slide.addText("SMART INDIA HACKATHON 2026", {
    x: 0.5, y: 0.4, w: 8.5, h: 0.6,
    fontSize: 28, bold: true, color: "0F172A", fontFace: "Arial"
  });

  slide.addText("SIH 2026", {
    x: 10.5, y: 0.4, w: 2.0, h: 0.6,
    fontSize: 16, bold: true, color: "1E1B4B", align: "right"
  });

  // Title Box
  slide.addText("TITLE PAGE", {
    x: 0.5, y: 1.1, w: 12.3, h: 0.6,
    fontSize: 24, bold: true, color: "0F172A", align: "center"
  });

  // Line
  slide.addShape(pptx.shapes.LINE, { x: 0.5, y: 1.7, w: 12.3, h: 0, line: { color: "6366F1", width: 2 } });

  // Bullets List
  const bullets = [
    { text: "Problem Statement ID – SIH26233", options: { bold: true, fontSize: 16 } },
    { text: "Problem Statement Title – Inline Microbial Contamination Detection Using Hyperspectral Edge Sensors", options: { fontSize: 15 } },
    { text: "Theme – Agriculture, FoodTech & Rural Development", options: { fontSize: 15 } },
    { text: "PS Category – Hardware", options: { fontSize: 15 } },
    { text: "Team ID – 127059", options: { fontSize: 15 } },
    { text: "Team Name – VEYRAX", options: { bold: true, fontSize: 16, color: "4338CA" } },
  ];

  slide.addText(bullets, { x: 0.6, y: 2.0, w: 7.5, h: 4.8, lineSpacing: 28 });

  // Right Graphic Box
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 8.5, y: 2.2, w: 4.0, h: 4.2,
    fill: { color: "F8FAFC" }, line: { color: "CBD5E1", width: 1.5 }
  });

  slide.addText("SMART INDIA\nHACKATHON\n2026\n\nTEAM VEYRAX", {
    x: 8.5, y: 2.8, w: 4.0, h: 3.0,
    fontSize: 22, bold: true, color: "1E1B4B", align: "center"
  });
}

// Slide 2: VEYRAX Proposed solution
{
  const slide = pptx.addSlide();

  // Oval Badge
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 0.3, w: 1.6, h: 0.45,
    fill: { color: "EEF2FF" }, line: { color: "4338CA", width: 2 }
  });
  slide.addText("VEYRAX", { x: 0.5, y: 0.3, w: 1.6, h: 0.45, fontSize: 12, bold: true, color: "1E1B4B", align: "center" });

  slide.addText("VEYRAX 2.0 Proposed solution", {
    x: 2.3, y: 0.25, w: 8.0, h: 0.55,
    fontSize: 22, bold: true, color: "0F172A"
  });

  // Left 3 Cards
  const cards = [
    { title: "Real-world issue:", text: "Microorganisms (Salmonella, E. coli, Aflatoxins) infect food processing lines silently, causing severe foodborne illness outbreaks & recalls.", border: "F59E0B" },
    { title: "Why important:", text: "Traditional 24–48hr lab culturing lets infected batches reach consumer markets; manual spot checks miss patchy contamination.", border: "EF4444" },
    { title: "Solution:", text: "VEYRAX fuses 256-band NIR Hyperspectral (900-1700nm), UV 365nm Fluorescence & RGB to detect microbial risk in <10ms and auto-reject item.", border: "10B981" }
  ];

  cards.forEach((c, idx) => {
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: 1.0 + (idx * 1.8), w: 3.8, h: 1.6,
      fill: { color: "1E293B" }, line: { color: c.border, width: 2 }
    });
    slide.addText([
      { text: c.title + "\n", options: { bold: true, fontSize: 12, color: "38BDF8" } },
      { text: c.text, options: { fontSize: 10, color: "F8FAFC" } }
    ], { x: 0.6, y: 1.1 + (idx * 1.8), w: 3.6, h: 1.4 });
  });

  // Center Pyramid Stack
  // Tier 1
  slide.addShape(pptx.shapes.RECTANGLE, { x: 4.8, y: 1.0, w: 3.6, h: 0.8, fill: { color: "F59E0B" } });
  slide.addText("CORE INNOVATION\nEdge AI Node (Jetson Orin)", { x: 4.8, y: 1.0, w: 3.6, h: 0.8, fontSize: 10, bold: true, color: "0F172A", align: "center" });

  // Tier 2
  slide.addShape(pptx.shapes.RECTANGLE, { x: 4.6, y: 1.9, w: 4.0, h: 0.9, fill: { color: "4338CA" } });
  slide.addText("PRIMARY FUNCTIONS\nMulti-Sensor Fusion • Uncertainty Risk Score", { x: 4.6, y: 1.9, w: 4.0, h: 0.9, fontSize: 10, bold: true, color: "FFFFFF", align: "center" });

  // Tier 3
  slide.addShape(pptx.shapes.RECTANGLE, { x: 4.4, y: 2.9, w: 4.4, h: 0.9, fill: { color: "FBBF24" } });
  slide.addText("PROTECTION & RESPONSE\nAuto Air-Jet Eject | Buzzer Alarm | SOS SMS", { x: 4.4, y: 2.9, w: 4.4, h: 0.9, fontSize: 10, bold: true, color: "0F172A", align: "center" });

  // Tier 4 Base
  slide.addShape(pptx.shapes.RECTANGLE, { x: 4.4, y: 3.9, w: 4.4, h: 1.2, fill: { color: "0284C7" } });
  slide.addText("SENSING & MONITORING\nNIR HSI (900-1700nm) | UV 365nm | RGB 4K | ToF 3D | Temp/RH", { x: 4.4, y: 3.9, w: 4.4, h: 1.2, fontSize: 10, bold: true, color: "FFFFFF", align: "center" });

  // Right Side: Risk vs Solution
  slide.addText("Risk vs Solution", { x: 9.1, y: 1.0, w: 3.8, h: 0.4, fontSize: 14, bold: true, color: "0F172A", align: "center" });

  const rows = [
    { risk: "Silent Microbial Spoilage", sol: "Early Spectral Anomaly" },
    { risk: "Batch Recall & Outbreak", sol: "Auto Pneumatic Eject" },
    { risk: "Late 48-Hour Culturing", sol: "Live SCADA Twin & SOS" }
  ];

  rows.forEach((r, idx) => {
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 9.1, y: 1.6 + (idx * 1.1), w: 1.7, h: 0.9, fill: { color: "DC2626" } });
    slide.addText(r.risk, { x: 9.1, y: 1.6 + (idx * 1.1), w: 1.7, h: 0.9, fontSize: 9, bold: true, color: "FFFFFF", align: "center" });

    slide.addText("↔", { x: 10.8, y: 1.6 + (idx * 1.1), w: 0.4, h: 0.9, fontSize: 14, bold: true, color: "64748B", align: "center" });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 11.2, y: 1.6 + (idx * 1.1), w: 1.7, h: 0.9, fill: { color: "059669" } });
    slide.addText(r.sol, { x: 11.2, y: 1.6 + (idx * 1.1), w: 1.7, h: 0.9, fontSize: 9, bold: true, color: "FFFFFF", align: "center" });
  });

  // Link button
  slide.addText("https://github.com/Aravindh-coder/spectraguard-x", {
    x: 4.8, y: 5.3, w: 8.0, h: 0.4,
    fontSize: 10, bold: true, color: "4338CA"
  });
}

// Slide 3: Technical Approach
{
  const slide = pptx.addSlide();

  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 0.3, w: 1.6, h: 0.45, fill: { color: "EEF2FF" }, line: { color: "4338CA", width: 2 } });
  slide.addText("VEYRAX", { x: 0.5, y: 0.3, w: 1.6, h: 0.45, fontSize: 12, bold: true, color: "1E1B4B", align: "center" });

  slide.addText("TECHNICAL APPROACH", { x: 2.3, y: 0.25, w: 8.0, h: 0.55, fontSize: 22, bold: true, color: "0F172A" });

  // Column 1: Methodology
  slide.addText("METHODOLOGY & PROCESS", { x: 0.5, y: 1.0, w: 4.0, h: 0.4, fontSize: 12, bold: true, color: "1E1B4B" });
  
  const steps = [
    "1. Sense & Collect: NIR (900-1700nm), UV 365nm, RGB camera & ToF topography.",
    "2. Edge Transmit: ESP32 streams telemetry packets over Wi-Fi / MQTT / OPC-UA.",
    "3. Edge AI Fusion: Jetson Orin fuses 1D spectral + 2D spatial features into risk tensor.",
    "4. Decide & Protect: Dual AI + Physics engine triggers pneumatic air-jet ejection.",
    "5. Monitor & Learn: Live Digital Twin canvas, batch fingerprinting & active learning.",
    "6. Traceability QR: Digital QR passports, signed SHA-256 compliance reports."
  ];

  steps.forEach((s, idx) => {
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.5 + (idx * 0.8), w: 4.0, h: 0.7, fill: { color: "F1F5F9" }, line: { color: "CBD5E1", width: 1 } });
    slide.addText(s, { x: 0.6, y: 1.5 + (idx * 0.8), w: 3.8, h: 0.7, fontSize: 9, color: "0F172A" });
  });

  // Column 2: Hardware & Software Stack
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 4.8, y: 1.0, w: 4.4, h: 2.2, fill: { color: "FEF3C7" }, line: { color: "F59E0B", width: 1.5 } });
  slide.addText("HARDWARE: SENSE > PROCESS > PROTECT\n\n5 Sensors + RGB Camera ➔ ESP32 ➔ Jetson Edge AI ➔ Pneumatic Air Jet Relay", {
    x: 4.9, y: 1.1, w: 4.2, h: 2.0, fontSize: 10, bold: true, color: "78350F", align: "center"
  });

  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 4.8, y: 3.4, w: 4.4, h: 2.8, fill: { color: "EEF2FF" }, line: { color: "4338CA", width: 1.5 } });
  slide.addText("SOFTWARE: BACKEND > RISK ENGINE > DASHBOARD\n\nESP32 + Edge Node ➔ JSON (<10ms) ➔ React SCADA Digital Twin Dashboard\n\n• Dual AI + Physics Safety: Overrides AI to ISOLATE if reference white tile drift >5% or window lens is dirty.", {
    x: 4.9, y: 3.5, w: 4.2, h: 2.6, fontSize: 10, color: "1E1B4B", align: "center"
  });

  // Column 3: Tech Stack
  slide.addText("TECHNOLOGIES USED", { x: 9.5, y: 1.0, w: 3.5, h: 0.4, fontSize: 12, bold: true, color: "0F172A" });

  const tech = [
    { name: "Frontend:", desc: "React 18 + Vite + TypeScript + Tailwind CSS; Recharts & Canvas SCADA twin." },
    { name: "Backend:", desc: "Node.js + Express + Socket.IO real-time stream & risk engine." },
    { name: "Hardware & Edge AI:", desc: "Jetson Orin, ESP32, NIR HSI, UV-A 365nm, ToF 3D sensor, pneumatic relay." }
  ];

  tech.forEach((t, idx) => {
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 9.5, y: 1.5 + (idx * 1.5), w: 3.5, h: 1.3, fill: { color: "1E293B" } });
    slide.addText([
      { text: t.name + "\n", options: { bold: true, fontSize: 10, color: "38BDF8" } },
      { text: t.desc, options: { fontSize: 9, color: "F8FAFC" } }
    ], { x: 9.6, y: 1.6 + (idx * 1.5), w: 3.3, h: 1.1 });
  });
}

// Slide 4: Feasibility and Viability
{
  const slide = pptx.addSlide();

  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 0.3, w: 1.6, h: 0.45, fill: { color: "EEF2FF" }, line: { color: "4338CA", width: 2 } });
  slide.addText("VEYRAX", { x: 0.5, y: 0.3, w: 1.6, h: 0.45, fontSize: 12, bold: true, color: "1E1B4B", align: "center" });

  slide.addText("FEASIBILITY AND VIABILITY", { x: 2.3, y: 0.25, w: 8.0, h: 0.55, fontSize: 22, bold: true, color: "0F172A" });

  const cols = [
    {
      title: "FEASIBILITY ANALYSIS",
      fill: "FEF3C7", border: "F59E0B",
      items: [
        "Technological: Off-the-shelf edge sensors & AI. Retrofit-ready conveyor clip.",
        "Economic: $250-$400 prototype cost vs $50,000 lab hyperspectral cameras.",
        "Operational: Inline plug-and-play installation with zero line downtime.",
        "Scalability: Deployable across grain mills, dairy, fruit sorters, & meat plants."
      ]
    },
    {
      title: "CHALLENGES AND RISKS",
      fill: "F1F5F9", border: "94A3B8",
      items: [
        "Harsh Environment: Steam, flour dust, humidity & oil splash affect optics.",
        "Data Imbalance: Novel or rare microbial mutations missing in training data.",
        "Connectivity Loss: Unstable factory Wi-Fi delaying cloud alerts.",
        "False Positives: Surface dust specks causing unnecessary food waste.",
        "Safety Failures: Ejection failure leading to food poisoning outbreak."
      ]
    },
    {
      title: "STRATEGIES FOR OVERCOMING",
      fill: "EEF2FF", border: "6366F1",
      items: [
        "Ruggedized Enclosure: IP65 sealed chassis + pneumatic optical air-knife.",
        "Open-Set AI: Mahalanobis distance flags unknown microbes as UNKNOWN ANOMALY.",
        "Offline-First Edge: Direct microsecond hardware relay trigger sub-10ms.",
        "AI + Physics Safety: White tile self-calibration overrides AI if drift occurs.",
        "Closed-Loop Confirmation: Post-eject optical sensor verifies isolation."
      ]
    }
  ];

  cols.forEach((col, idx) => {
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5 + (idx * 4.1), y: 1.0, w: 3.9, h: 5.4, fill: { color: col.fill }, line: { color: col.border, width: 1.5 } });
    
    slide.addText(col.title, { x: 0.6 + (idx * 4.1), y: 1.1, w: 3.7, h: 0.4, fontSize: 11, bold: true, color: "0F172A", align: "center" });

    const txt = col.items.map(it => ({ text: "• " + it + "\n\n", options: { fontSize: 9, color: "1E293B" } }));
    slide.addText(txt, { x: 0.6 + (idx * 4.1), y: 1.6, w: 3.7, h: 4.6 });
  });
}

// Slide 5: Impact and Benefits
{
  const slide = pptx.addSlide();

  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 0.3, w: 1.6, h: 0.45, fill: { color: "EEF2FF" }, line: { color: "4338CA", width: 2 } });
  slide.addText("VEYRAX", { x: 0.5, y: 0.3, w: 1.6, h: 0.45, fontSize: 12, bold: true, color: "1E1B4B", align: "center" });

  slide.addText("IMPACT AND BENEFITS", { x: 2.3, y: 0.25, w: 8.0, h: 0.55, fontSize: 22, bold: true, color: "0F172A" });

  // Left: Key Benefits Box
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.0, w: 6.0, h: 4.2, fill: { color: "F8FAFC" }, line: { color: "CBD5E1", width: 1.5 } });
  slide.addText("KEY BENEFITS", { x: 0.5, y: 1.1, w: 6.0, h: 0.4, fontSize: 12, bold: true, color: "0F172A", align: "center" });

  const benefits = [
    { title: "Enhanced Food Safety", desc: "Real-time non-destructive microbial scanning protects consumers from Salmonella & E. coli outbreaks." },
    { title: "Zero Line Downtime", desc: "Instant inline <10ms decisioning eliminates 24-48hr lab incubation delays." },
    { title: "Cost Savings", desc: "Prevents multi-million dollar product recalls, brand damage, & regulatory fines." },
    { title: "Sustainability", desc: "Eliminates food waste by isolating only specific contaminated items." }
  ];

  benefits.forEach((b, idx) => {
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.7, y: 1.6 + (idx * 0.85), w: 5.6, h: 0.75, fill: { color: "FFFFFF" }, line: { color: "E2E8F0", width: 1 } });
    slide.addText([
      { text: b.title + ": ", options: { bold: true, fontSize: 10, color: "4338CA" } },
      { text: b.desc, options: { fontSize: 9, color: "334155" } }
    ], { x: 0.8, y: 1.65 + (idx * 0.85), w: 5.4, h: 0.65 });
  });

  // Right: Impact on Target Audience
  slide.addText("IMPACT ON TARGET AUDIENCE", { x: 6.8, y: 1.0, w: 5.8, h: 0.4, fontSize: 12, bold: true, color: "0F172A" });

  const audience = [
    { role: "Food Processors & MSMEs:", text: "Higher throughput, zero recall risk, 100% inspection compliance guarantee." },
    { role: "Line Operators & Quality Staff:", text: "Automated alerts, intuitive digital twin visualizer, reduced manual sampling workload." },
    { role: "MoFPI & Regulatory Bodies (FSSAI):", text: "Auditable digital QR passports, alignment with Make in India & FSSAI regulations." }
  ];

  audience.forEach((a, idx) => {
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 6.8, y: 1.5 + (idx * 1.2), w: 5.8, h: 1.0, fill: { color: "1E293B" } });
    slide.addText([
      { text: a.role + "\n", options: { bold: true, fontSize: 10, color: "38BDF8" } },
      { text: a.text, options: { fontSize: 9, color: "F8FAFC" } }
    ], { x: 6.9, y: 1.6 + (idx * 1.2), w: 5.6, h: 0.8 });
  });

  // Bottom Summary Bar
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 5.4, w: 12.1, h: 1.0, fill: { color: "ECFDF5" }, line: { color: "059669", width: 1.5 } });
  slide.addText("OVERALL IMPACT: SAFER FOOD SUPPLY CHAIN • ZERO-RECALL FACTORY OPERATIONS • SUSTAINABLE GREEN FOODTECH", {
    x: 0.5, y: 5.4, w: 12.1, h: 1.0, fontSize: 11, bold: true, color: "065F46", align: "center"
  });
}

// Slide 6: Research and References
{
  const slide = pptx.addSlide();

  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 0.3, w: 1.6, h: 0.45, fill: { color: "EEF2FF" }, line: { color: "4338CA", width: 2 } });
  slide.addText("VEYRAX", { x: 0.5, y: 0.3, w: 1.6, h: 0.45, fontSize: 12, bold: true, color: "1E1B4B", align: "center" });

  slide.addText("RESEARCH AND REFERENCES", { x: 2.3, y: 0.25, w: 8.0, h: 0.55, fontSize: 22, bold: true, color: "0F172A" });

  // Top Process Flow
  const flow = ["Monitor Surface", "Analyze Data", "Detect Anomaly", "Predict Risk", "Pneumatic Eject"];
  flow.forEach((f, idx) => {
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5 + (idx * 2.45), y: 1.1, w: 2.2, h: 0.7, fill: { color: "EEF2FF" }, line: { color: "4338CA", width: 1 } });
    slide.addText(f, { x: 0.5 + (idx * 2.45), y: 1.1, w: 2.2, h: 0.7, fontSize: 9, bold: true, color: "1E1B4B", align: "center" });
  });

  // Repository Link Box
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 2.1, w: 12.1, h: 1.2, fill: { color: "1E293B" } });
  slide.addText("PROJECT CODEBASE & INTERACTIVE SCADA DIGITAL TWIN REPOSITORY:\n\nhttps://github.com/Aravindh-coder/spectraguard-x", {
    x: 0.5, y: 2.1, w: 12.1, h: 1.2, fontSize: 12, bold: true, color: "38BDF8", align: "center"
  });

  // Feature Cards Bottom
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 3.6, w: 5.9, h: 2.8, fill: { color: "F8FAFC" }, line: { color: "CBD5E1", width: 1 } });
  slide.addText("LIVE SCADA DIGITAL TWIN DASHBOARD\n\n• Real-Time Conveyor 2D Canvas Engine\n• 8 Multi-Modal Sensing Modalities Telemetry\n• Closed-Loop Pneumatic Reject Confirmation", {
    x: 0.6, y: 3.7, w: 5.7, h: 2.6, fontSize: 10, bold: true, color: "0F172A", align: "center"
  });

  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 6.7, y: 3.6, w: 5.9, h: 2.8, fill: { color: "F8FAFC" }, line: { color: "CBD5E1", width: 1 } });
  slide.addText("AI + PHYSICS SAFETY ENGINE & XAI\n\n• 256-Band NIR Hyperspectral Absorbance Curve\n• Open-Set Uncertainty (Mahalanobis Distance)\n• Reference White-Tile Auto Self-Calibration", {
    x: 6.8, y: 3.7, w: 5.7, h: 2.6, fontSize: 10, bold: true, color: "0F172A", align: "center"
  });
}

// Export Presentation File
pptx.writeFile({ fileName: "public/SIH2026_VEYRAX_SIH26233.pptx" }).then((fileName) => {
  console.log(`✅ PowerPoint Presentation successfully generated: ${fileName}`);
}).catch((err) => {
  console.error("Error generating PowerPoint presentation:", err);
});
