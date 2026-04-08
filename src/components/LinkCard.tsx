import React from "react";

export interface LinkCardProps {
  title: string;
  description: string;
  href: string;
  ariaLabel?: string;
}

export const LinkCard: React.FC<LinkCardProps> = ({
  title,
  description,
  href,
  ariaLabel
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ?? title}
      className="link-card surface-card"
      style={{ display: "block", textDecoration: "none", color: "inherit", cursor: "pointer" }}
    >
      <h3 style={{ marginTop: 0, marginBottom: "var(--gf-space-md)" }}>{title}</h3>
      <p
        style={{
          color: "var(--gf-color-text)",
          lineHeight: 1.7,
          fontSize: "1.1rem",
          margin: 0
        }}
      >
        {description}
      </p>
    </a>
  );
};
