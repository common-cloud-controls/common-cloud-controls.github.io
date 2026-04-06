import React from "react";
import { useLocation, Navigate, Link } from "react-router-dom";
import { SectionCard } from "../components/SectionCard";
import { getSectionItems } from "../content/sections";

export const CatalogBrowsePage: React.FC = () => {
  const { pathname } = useLocation();
  const allItems = getSectionItems("catalogs");

  const prefix = pathname.replace(/\/$/, "") + "/";
  const matches = allItems.filter((item) => item.path?.startsWith(prefix));

  if (matches.length === 0) return <Navigate to="/catalogs" replace />;

  const label = pathname.split("/").filter(Boolean).pop() ?? "Catalogs";

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "var(--gf-space-md)", color: "var(--gf-color-accent)", lineHeight: 1.2 }}>
        {label}
      </h1>
      <div className="catalog-grid">
        {matches.map((item) => (
          <Link key={item.path} to={item.path!} style={{ textDecoration: "none", color: "inherit" }}>
            <SectionCard title={item.title} description={item.description ?? ""} />
          </Link>
        ))}
      </div>
    </div>
  );
};
