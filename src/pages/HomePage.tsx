import React from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

// ─── Data ────────────────────────────────────────────────────────────────────

const journey = [
  {
    verb: "Integrate",
    title: "Core Catalogs",
    body: "Access a foundational repository of technology-agnostic threat and control definitions designed for seamless import into your specific environments."
  },
  {
    verb: "Target",
    title: "Specific Threats",
    body: "Move past abstract recommendations. Utilize specifically-scoped threats to pinpoint exactly where your organization is exposed to negative impacts."
  },
  {
    verb: "Deploy",
    title: "Actionable Controls",
    body: "Implement clear safeguards equipped with precise assessment requirements, allowing your evaluators and automated tools to measure reality against expectations."
  },
  {
    verb: "Adopt",
    title: "GRC Engineering",
    body: "Follow a structured methodology to secure your systems: assess capabilities, identify threats, and apply the exact controls needed to mitigate them."
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
          Automated Governance is Waiting.
        </h1>
        <img
          src="/diagrams/ccc-diagram.svg"
          alt="CCC architecture diagram"
          style={{ maxWidth: "100%", width: "720px", maxHeight: "340px", objectFit: "contain", marginBottom: "var(--gf-space-lg)" }}
        />
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

      {/* Benefits + Videos side-by-side */}
      <section style={{ marginBottom: "var(--gf-space-xl)" }}>
        <div style={{ display: "flex", gap: "var(--gf-space-xl)", alignItems: "flex-start", flexWrap: "wrap" }}>

          {/* Journey timeline */}
          <div style={{ flex: 1, minWidth: "280px" }}>
            <SectionHeading>Start Your Automated Governance Journey</SectionHeading>
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
          <div style={{ width: "350px", flexShrink: 0, minWidth: "280px" }}>
            <SectionHeading>Learn More</SectionHeading>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--gf-space-lg)" }}>
              {videos.map((v) => (
                <figure key={v.url} style={{ margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{
                    borderRadius: "var(--gf-radius-lg)",
                    overflow: "hidden",
                    background: "var(--gf-color-surface)",
                    border: "1px solid var(--gf-color-border-strong)",
                    aspectRatio: "16/9",
                    position: "relative"
                  }}>
                    <ReactPlayer url={v.url} width="100%" height="100%" controls style={{ position: "absolute", top: 0, left: 0 }} />
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "var(--gf-space-md)", maxWidth: "900px", margin: "0 auto" }}>
          {[
            { href: "https://github.com/finos/common-cloud-controls", label: "View on GitHub", desc: "Browse source, open issues, and submit pull requests." },
            { href: "https://github.com/finos#common-cloud-controls", label: "Join a CCC Meeting", desc: "Attend a community meeting and meet the team." },
            { href: "https://www.finos.org/common-cloud-controls-project", label: "FINOS Project Page", desc: "Learn more about the project on the FINOS website." },
            { href: "https://github.com/finos/common-cloud-controls/issues", label: "Open an Issue", desc: "Report a bug, request a feature, or start a discussion." }
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card"
              style={{
                display: "block",
                padding: "var(--gf-space-lg)",
                backgroundColor: "var(--gf-color-surface)",
                borderRadius: "var(--gf-radius-xl)",
                boxShadow: "var(--gf-shadow-surface)",
                backdropFilter: "var(--gf-glass-blur)",
                WebkitBackdropFilter: "var(--gf-glass-blur)",
                border: "1px solid var(--gf-color-border-strong)",
                textDecoration: "none",
                color: "inherit",
                textAlign: "left"
              }}
            >
              <div style={{ fontWeight: 600, color: "var(--gf-color-accent)", marginBottom: "0.5rem" }}>{link.label}</div>
              <div style={{ fontSize: "0.95rem", color: "var(--gf-color-text-subtle)", lineHeight: 1.5 }}>{link.desc}</div>
            </a>
          ))}
        </div>
      </section>

    </div>
  );
};
