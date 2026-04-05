/**
 * CCC site configuration — single source of truth for identity, nav, and footer.
 * Edit this file to update site content without touching component logic.
 *
 * contentSections: each key maps to src/content/<key>/ directory of markdown files.
 * Add a new section by creating the directory and adding an entry here.
 */

export type FooterLink = { href: string; label: string };

export type ContentSectionConfig = {
  enabled: boolean;
  label?: string;
  /** Set false to hide from header nav even when enabled. */
  inNav?: boolean;
};

export type NavLink = {
  path: string;
  label: string;
  children?: NavLink[];
};

export type SiteConfig = {
  siteName: string;
  tagline: string;
  footer: { copyrightText: string; links: FooterLink[] };
  contentSections: Record<string, ContentSectionConfig>;
  customNavLinks?: NavLink[];
};

export const siteConfig: SiteConfig = {
  siteName: "Common Cloud Controls",
  tagline: "Consistent controls for compliant public cloud deployments in financial services.",

  footer: {
    copyrightText: "FINOS Common Cloud Controls is a FINOS open standard project.",
    links: [
      { href: "https://www.finos.org/common-cloud-controls-project", label: "FINOS Project Page" },
      { href: "https://github.com/finos/common-cloud-controls", label: "GitHub" },
      { href: "https://github.com/finos/common-cloud-controls/issues", label: "Issues" }
    ]
  },

  // Each key maps to src/content/<key>/. Index at /<key>, detail pages at /<key>/:slug.
  contentSections: {
    catalogs: { enabled: true, label: "Catalogs", inNav: false }
  },

  customNavLinks: [
    {
      path: "/catalogs",
      label: "Catalogs",
      children: [
        { path: "/catalogs/core", label: "Core" },
        { path: "/catalogs/capabilities", label: "Capabilities" },
        { path: "/catalogs/threats", label: "Threats" },
        { path: "/catalogs/controls", label: "Controls" }
      ]
    },
  ]
};
