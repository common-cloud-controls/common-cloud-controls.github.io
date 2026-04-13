import React from "react";
import { Link } from "react-router-dom";

const ReactPlayer = React.lazy(() => import("react-player/lazy"));

// ─── Data ────────────────────────────────────────────────────────────────────

const journey = [
  {
    verb: "Research",
    title: "System Capabilities",
    body: "Capabilities Examine your specific technology stack to pinpoint exactly where you are exposed to negative impacts. By identifying specific threats, you can seamlessly apply precise, actionable controls to mitigate those exact vulnerabilities.",
  },
  {
    verb: "Import",
    title: "Reusable Definitions",
    body: "Establish a foundational baseline of reusable, technology-agnostic threat and control definitions. This prevents your team from needing to write arbitrary security rules from scratch and ensures interoperability."
  },
  {
    verb: "Define",
    title: "Risk-Informed Policies",
    body: "Create clearly scoped rules tailored to your organization's specific risk appetite. Instead of treating compliance as abstract suggestions, use your selected controls as executable design requirements that guide safe implementation.",
  },
  {
    verb: "Automate",
    title: "Compliance Evaluations",
    body: "Translate your controls' specific assessment requirements into automated configuration scans and behavioral tests. This allows your tools to continuously measure reality against expectations without slowing down your development pipelines.",
  },
  {
    verb: "Enforce",
    title: "Control Objectives",
    body: "Wire these automated evaluations directly into your software development lifecycle as deployment gates. This automated enforcement blocks non-compliant resources and misconfigurations before they ever reach production.",
  },
  {
    verb: "Monitor",
    title: "Production Systems",
    body: "Establish a continuous, policy-driven process that harnesses multiple systems to gather immutable logs and artifacts automatically. This guarantees ongoing compliance and vastly simplifies formal audits by providing highly verifiable, easily accessible evidence.",
  },
];

const videos = [
  {
    url: "https://www.finos.org/hubfs/OSFF%202025%20(Open%20Source%20in%20Finance%20Forum)/OSFF%20London%202025/Video/Breakout%20Talks/Mutualizing%20Risk%20and%20Compliance%20in%20the%20Open/Taming%20Multi-Cloud%20Security_%20Progress%20on%20Common%20Cloud%20Controls%20-%20Michael%20Lysaght%20%26%20Sonali%20Mendis.mp4",
    caption: "Taming Multi-Cloud Security: Progress on Common Cloud Controls — Michael Lysaght & Sonali Mendis"
  },
  {
    url: "https://www.finos.org/hubfs/OSFF%202025%20(Open%20Source%20in%20Finance%20Forum)/OSFF%20New%20York%20NYC%202025/OSFF%20NYC%202025%20Videos/The%20Launchpad%20Incubating%20FINOS%20Projects/Before%20You%20Build%2C%20Check%20What%20You%20Have_%20Practical%20Approaches%20To%20Assess%20Compliance%20B...%20Santosh%20Maurya.mp4",
    caption: "Before You Build, Check What You Have: Practical Approaches To Assess Compliance — Santosh Maurya"
  },
  {
    url: "https://www.youtube.com/watch?v=XjBXGHK2a9c",
    caption: "Turn CCC into Real Checks: Multi-Cloud Security with Prowler + AI (OSFF NY Preview)"
  },
  {
    url: "https://youtu.be/8hMRahzwK3k",
    caption: "Damien Burks (Citi) and Gupta Rudra (Krumware) discuss CCC at OSFF New York 2024."
  },
  {
    url: "https://youtu.be/t0gksHTRTVw",
    caption: "Jared Lambert (Microsoft) talks about the compliance landscape at OSFF New York 2024."
  },
  {
    url: "https://youtu.be/AoGH_uw5M2Y",
    caption: "Eddie Knight (Sonatype)'s vertical slice demo of CCC at OSFF New York 2023."
  },
  {
    url: "https://youtu.be/dE6eOYvpauU",
    caption: "Jim Adams (Citi) and others discuss the need for CCC at OSFF New York 2023."
  },
  {
    url: "https://youtu.be/ITFNeStAebs",
    caption: "Naseer Mohammed (Google) and Simon Zhang (BMO) discuss CCC at OSFF New York 2023."
  },
  {
    url: "https://youtu.be/cg3I53R59Iw",
    caption: "Kim Prado (BMO)'s keynote session on Cloud Controls at OSFF 2023."
  }
];

function videoThumbnail(url: string): string | true {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  // For non-YouTube videos, return true to enable light mode with a generic
  // play button overlay. This prevents eager video downloads that block page load.
  return true;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--gf-color-accent)", marginBottom: "var(--gf-space-lg)", textAlign: "center" }}>
    {children}
  </h2>
);

const Divider: React.FC = () => (
  <hr style={{ border: "none", borderTop: "1px solid var(--gf-color-border-strong)", margin: "var(--gf-space-xl) 0" }} />
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export const HomePage: React.FC = () => {
  return (
    <div style={{ maxWidth: "1440px", margin: "0 auto", width: "100%" }}>

      {/* SVG clip-path: full-width rectangle, bottom edge curves down at centre */}
      <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }}>
        <defs>
          <clipPath id="hero-wave-clip" clipPathUnits="objectBoundingBox">
            <path d="M0,0 L1,0 L1,0.82 Q0.5,1 0,0.82 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Hero — light panel, bleeds to main edges, wave clip at bottom */}
      <section style={{
        background: "#dbeafe",
        marginTop: "calc(-1 * var(--gf-space-md))",
        marginLeft: "calc(-1 * var(--gf-space-lg))",
        marginRight: "calc(-1 * var(--gf-space-lg))",
        padding: "var(--gf-space-xl) var(--gf-space-xl) 9rem",
        clipPath: "url(#hero-wave-clip)",
        textAlign: "center",
        marginBottom: "var(--gf-space-xl)",
      }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#1e3a8a", lineHeight: 1.2, marginBottom: "var(--gf-space-md)" }}>
          Automated Governance is Within Reach.
        </h1>
        <img
          src="/diagrams/ccc-diagram.svg"
          alt="CCC architecture diagram"
          style={{ maxWidth: "100%", width: "720px", maxHeight: "340px", objectFit: "contain", marginBottom: "var(--gf-space-lg)" }}
        />
        <p style={{ fontSize: "1.15rem", color: "#1e40af", marginBottom: "var(--gf-space-md)", maxWidth: "640px", margin: "0 auto var(--gf-space-md)", lineHeight: 1.6 }}>
          Technology-agnostic security controls for public and private cloud.
        </p>
        <div>
          <Link
            to="/catalogs"
            style={{
              display: "inline-block",
              padding: "var(--gf-space-md) var(--gf-space-xl)",
              background: "#1e3a8a",
              color: "#fff",
              fontWeight: 600,
              textDecoration: "none",
              borderRadius: "var(--gf-radius-lg)",
              boxShadow: "0 4px 14px rgba(30,58,138,0.4)",
              transition: "filter 0.2s, transform 0.2s"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(1.2)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = "none"; e.currentTarget.style.transform = "none"; }}
          >
            Explore the Catalogs
          </Link>
        </div>
      </section>

      {/* Strategy section */}
      <section style={{ marginBottom: "var(--gf-space-xl)" }}>
        <SectionHeading>Level Up Your Process</SectionHeading>
        <p style={{ color: "var(--gf-color-text-subtle)", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: "780px", margin: "0 auto var(--gf-space-xl)", textAlign: "center" }}>
          Achieving fully automated governance requires moving from static compliance documents to executable design requirements. Here is how your team can leverage the CCC project to build a robust GRC Engineering pipeline.
        </p>

        {/* Horizontal process flow */}
        <div style={{ display: "flex", alignItems: "flex-start", flexWrap: "wrap", gap: "0", maxWidth: "1000px", margin: "0 auto", justifyContent: "center" }}>
          {[
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "2rem", height: "2rem" }}>
                  <path d="M12 2v13M8 11l4 4 4-4M4 18h16" />
                </svg>
              ),
              title: "Import the Core Catalog",
              body: "Pull in the FINOS CCC Core Catalog — a foundational baseline of reusable, technology-agnostic threat and control definitions. A shared, authoritative starting point your whole team can build from."
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "2rem", height: "2rem" }}>
                  <circle cx="6" cy="12" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="18" cy="18" r="2" />
                  <path d="M8 12h4m2-4.5L10 10m4 2.5L10 15" />
                </svg>
              ),
              title: "Build Technology-Specific Catalogs",
              body: "Import core definitions into your organization's environments, or extend our technology-specific catalogs to fit your needs. Assess capabilities, map threats, and applying precise mitigation controls where they matter."
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "2rem", height: "2rem" }}>
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                </svg>
              ),
              title: "Automate Tests Using Assessment Requirements",
              body: "Every control ships with tightly scoped, verifiable assessment requirements. Translate them into scans, code analyses, or behavioral checks — wired into your pipelines as gates that block non-compliant resources before production."
            }
          ].map((step, i, arr) => (
            <React.Fragment key={step.title}>
              <div style={{
                flex: "1",
                minWidth: "220px",
                maxWidth: "360px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "var(--gf-space-lg)",
                background: "var(--gf-color-surface)",
                borderRadius: "var(--gf-radius-xl)",
                border: "1px solid var(--gf-color-border-strong)",
                boxShadow: "var(--gf-shadow-surface)",
              }}>
                <div style={{
                  color: "var(--gf-color-accent)",
                  marginBottom: "var(--gf-space-md)",
                  background: "var(--gf-color-accent-soft)",
                  borderRadius: "50%",
                  width: "3.5rem",
                  height: "3.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {step.icon}
                </div>
                <p style={{ margin: "0 0 0.5rem", fontWeight: 700, fontSize: "1rem", color: "var(--gf-color-text)" }}>{step.title}</p>
                <p style={{ margin: 0, color: "var(--gf-color-text-subtle)", lineHeight: 1.7, fontSize: "0.9rem" }}>{step.body}</p>
              </div>
              {i < arr.length - 1 && (
                <>
                  <div className="process-arrow-lr">→</div>
                  <div className="process-arrow-tb">↓</div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      <Divider />

      {/* Benefits + Videos side-by-side */}
      <section style={{ marginBottom: "var(--gf-space-xl)" }}>
        <div style={{ display: "flex", gap: "var(--gf-space-xl)", alignItems: "flex-start", flexWrap: "wrap", justifyContent: "center" }}>

          {/* Journey timeline */}
          <div style={{ flex: 1, minWidth: "280px", maxWidth: "650px" }}>
            <SectionHeading>Advance Your Automated Governance</SectionHeading>
            <div style={{ position: "relative", paddingLeft: "2rem" }}>
              {/* vertical line */}
              <div style={{
                position: "absolute",
                left: "0.45rem",
                top: "0.6rem",
                bottom: "0.6rem",
                width: "2px",
                background: "linear-gradient(to bottom, var(--gf-color-accent), var(--gf-color-complement))",
                borderRadius: "1px",
                opacity: 0.4,
              }} />
              {journey.map((step, i) => (
                <div key={step.verb} style={{ position: "relative", marginBottom: i < journey.length - 1 ? "var(--gf-space-xl)" : 0 }}>
                  {/* node dot */}
                  <div style={{
                    position: "absolute",
                    left: "-2rem",
                    top: "0.35rem",
                    width: "0.85rem",
                    height: "0.85rem",
                    borderRadius: "50%",
                    background: "var(--gf-color-accent)",
                    boxShadow: "0 0 8px var(--gf-accent-glow)",
                  }} />
                  <p style={{ margin: "0 0 0.35rem", fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.2 }}>
                    <span style={{ color: "var(--gf-color-accent)" }}>{step.verb} </span>
                    <span style={{ color: "var(--gf-color-text)" }}>{step.title}</span>
                  </p>
                  <p style={{ margin: 0, color: "var(--gf-color-text-subtle)", lineHeight: 1.7, fontSize: "0.975rem" }}>
                    {step.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Bridge: where CCC fits */}
            <div style={{ marginTop: "var(--gf-space-xl)", paddingTop: "var(--gf-space-xl)", borderTop: "1px solid var(--gf-color-border-strong)" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--gf-color-accent)", marginBottom: "var(--gf-space-md)" }}>
                Where CCC Fits In
              </h3>
              <p style={{ color: "var(--gf-color-text-subtle)", lineHeight: 1.75, marginBottom: "var(--gf-space-md)", fontSize: "0.975rem" }}>
                Automated governance pipelines are built in layers, and FINOS Common Cloud Controls (CCC) operates at <strong style={{ color: "var(--gf-color-text)" }}>Layer 2</strong> of the{" "}
                <a href="https://github.com/gemaraproj/go-gemara" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gf-color-accent)" }}>Gemara</a>
                {" "}model: Threats and Controls. Sitting above high-level guidance (Layer 1) and below your organization's specific policies (Layer 3), CCC acts as the vital bridge that translates abstract best practices into actionable, threat-informed safeguards.
              </p>
              <p style={{ color: "var(--gf-color-text-subtle)", lineHeight: 1.75, marginBottom: "var(--gf-space-md)", fontSize: "0.975rem" }}>
                At this layer, your team defines what a secure system looks like in a reusable, technology-agnostic way. By focusing on specifically scoped threats and controls with clear assessment requirements, CCC empowers you to build interoperable resources that seamlessly inform your policies and guide automated evaluation tools across different environments.
              </p>
              <p style={{ color: "var(--gf-color-text-subtle)", lineHeight: 1.75, fontSize: "0.975rem" }}>
                Furthermore, the practical needs of projects like CCC actually helped form the genesis of the Gemara model itself. Because real-world automated governance requires separating high-level concepts from specific implementations, Gemara provides the machine-optimized document schemas that allow CCC's layered artifacts to interoperate flawlessly throughout your secure software factory.
              </p>
            </div>

            {/* Catalog structure */}
            <div style={{ marginTop: "var(--gf-space-xl)" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--gf-color-accent)", marginBottom: "var(--gf-space-md)" }}>
                Three Catalogs, One Complete Picture
              </h3>
              <p style={{ color: "var(--gf-color-text-subtle)", lineHeight: 1.75, marginBottom: "var(--gf-space-md)", fontSize: "0.975rem" }}>
                Each cloud service is covered by three interlocking catalog types — Capabilities, Threats, and Controls — because real-world governance requires all three layers to be explicit and independently reusable.
              </p>
              <p style={{ color: "var(--gf-color-text-subtle)", lineHeight: 1.75, marginBottom: "var(--gf-space-lg)", fontSize: "0.975rem" }}>
                Keeping them separate means your team can import only what is relevant, compose new service catalogs from existing building blocks, and map controls directly to the threats they mitigate — without carrying the weight of definitions you don't need.
              </p>
              <img
                src="/diagrams/catalogs-diagram.svg"
                alt="CCC catalog structure diagram"
                style={{ display: "block", maxWidth: "350px", width: "100%", height: "auto", borderRadius: "var(--gf-radius-lg)", margin: "0 auto" }}
              />
            </div>
          </div>

          {/* Videos */}
          <div className="scroll-hint">
            <span className="scroll-hint-arrow">›</span>
            <span className="scroll-hint-arrow">›</span>
            <span className="scroll-hint-arrow">›</span>
          </div>

          <div style={{ width: "300px", flexShrink: 0, minWidth: "280px" }}>
            <SectionHeading>_____</SectionHeading>
            <div className="video-list">
              {videos.map((v) => (
                <figure key={v.url} className="video-item" style={{ margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{
                    borderRadius: "var(--gf-radius-lg)",
                    overflow: "hidden",
                    background: "var(--gf-color-surface)",
                    border: "1px solid var(--gf-color-border-strong)",
                    aspectRatio: "16/9",
                    position: "relative"
                  }}>
                    <React.Suspense fallback={<div style={{ width: "100%", height: "100%", background: "var(--gf-color-surface)" }} />}>
                      <ReactPlayer url={v.url} width="100%" height="100%" controls light={videoThumbnail(v.url)} style={{ position: "absolute", top: 0, left: 0 }} />
                    </React.Suspense>
                  </div>
                  <figcaption style={{ fontSize: "0.9rem", color: "var(--gf-color-text-subtle)", lineHeight: 1.5 }}>
                    {v.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
            <p style={{ textAlign: "center", marginTop: "var(--gf-space-lg)", color: "var(--gf-color-text-subtle)" }}>
              Further videos on the{" "}
              <a
                href="https://www.youtube.com/watch?v=8hMRahzwK3k&list=PLmPXh6nBuhJuWoOHDqG4AMPVerlWYDacD"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--gf-color-accent)" }}
              >
                YouTube playlist
              </a>.
            </p>
          </div>

        </div>
      </section>

      <Divider />

      {/* Get Involved */}
      <section style={{ textAlign: "center", marginBottom: "var(--gf-space-xl)" }}>
        <SectionHeading>Get Involved</SectionHeading>
        <p style={{ color: "var(--gf-color-text-subtle)", fontSize: "1.1rem", marginBottom: "var(--gf-space-lg)", lineHeight: 1.7, maxWidth: "700px", margin: "0 auto var(--gf-space-lg)" }}>
          Common Cloud Controls is an open project — contributions, feedback, and participation are welcome.
        </p>
        <ul className="get-involved-list" style={{ maxWidth: "900px", margin: "0 auto" }}>
          {[
            { href: "https://github.com/common-cloud-controls", label: "View on GitHub", desc: "Browse source, open issues, and submit pull requests." },
            { href: "https://github.com/common-cloud-controls#common-cloud-controls", label: "Join a CCC Meeting", desc: "Attend a community meeting and meet the team." },
            { href: "https://www.finos.org/common-cloud-controls-project", label: "FINOS Project Page", desc: "Learn more about the project on the FINOS website." },
            { href: "https://github.com/common-cloud-controls/common-cloud-controls.github.io/issues", label: "Report a Website Issue", desc: "Report a bug, request a feature, or start a discussion." }
          ].map((link) => (
            <li key={link.href} className="get-involved-item">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="get-involved-link link-card"
              >
                <span className="get-involved-label">{link.label}</span>
                <span className="get-involved-desc">{link.desc}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
};
