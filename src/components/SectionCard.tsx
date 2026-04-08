import React from "react";

export interface SectionCardProps {
  id?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  id,
  title,
  description,
  children
}) => {
  return (
    <div id={id}>
      <h3>{title}</h3>
      <p style={{ color: "var(--gf-color-text)", lineHeight: 1.7, fontSize: "1.1rem" }}>
        {description}
      </p>
      {children}
    </div>
  );
};
