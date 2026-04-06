import React from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { TextSection } from "../components/TextSection";
import { SectionCard } from "../components/SectionCard";

// ─── Data ────────────────────────────────────────────────────────────────────

const benefits = [
  {
    title: "Defining Best Practices Around Cloud Security",
    body: "CCC aims to standardize cloud security controls for the banking sector, providing a common set of controls that CSPs can implement to meet the requirements of FS firms. As multiple FS firms are involved in the project, effort is shared — the controls will be representative of the sector as a whole, and more robust than any one firm could develop on its own."
  },
  {
    title: "One Target For CSPs To Conform To",
    body: "If all FS firms specify their own cloud infrastructure requirements, CSPs will have to conform to multiple standards. CCC aims to provide a single target for CSPs to conform to."
  },
  {
    title: "Sharing The Burden Of A Common Definition",
    body: "CCC aims to reduce the burden of compliance for CSPs by providing a common definition of controls which they can adopt. As CCC controls are specified in a cloud-agnostic way, CSPs can implement them in a way that is consistent with their own infrastructure, while delivering services that FS firms understand and trust."
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
    <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>

      {/* Hero */}
      <section style={{ textAlign: "center", padding: "var(--gf-space-xl) 0" }}>
        <TextSection
          title="Common Cloud Controls"
          subtitle="An open standard for consistent, compliant public cloud deployments in financial services."
          paragraphs={[
            "FINOS CCC is a collaborative project developing a unified set of cybersecurity, resiliency, and compliance controls for common services across the major cloud service providers.",
            "By standardizing controls across the sector, CCC reduces duplication, shares the compliance burden, and gives cloud providers a single, authoritative target to conform to."
          ]}
          centered
          maxWidth="800px"
          lastParagraphMargin="var(--gf-space-xl)"
        />
        <div style={{ display: "flex", gap: "var(--gf-space-md)", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            to="/catalogs"
            style={{
              display: "inline-block",
              padding: "var(--gf-space-md) var(--gf-space-xl)",
              background: "var(--gf-color-accent)",
              color: "#fff",
              fontWeight: 600,
              textDecoration: "none",
              borderRadius: "var(--gf-radius-lg)",
              boxShadow: "var(--gf-shadow-surface)",
              transition: "filter 0.2s, transform 0.2s"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(1.15)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = "none"; e.currentTarget.style.transform = "none"; }}
          >
            Get Started
          </Link>
        </div>
      </section>

      <Divider />

      {/* Benefits */}
      <section style={{ marginBottom: "var(--gf-space-xl)" }}>
        <SectionHeading>What Are the Benefits?</SectionHeading>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "var(--gf-space-lg)" }}>
          {benefits.map((b) => (
            <SectionCard key={b.title} title={b.title} description={b.body} />
          ))}
        </div>
      </section>

      <Divider />

      {/* Videos */}
      <section style={{ marginBottom: "var(--gf-space-xl)" }}>
        <SectionHeading>Learn More</SectionHeading>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "var(--gf-space-lg)" }}>
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
