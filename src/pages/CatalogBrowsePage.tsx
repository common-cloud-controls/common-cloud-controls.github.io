import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { CATALOG_TYPES } from "../content/catalogUtils";
import { CatalogCategoryPage } from "./CatalogCategoryPage";
import { CatalogVersionsPage } from "./CatalogVersionsPage";

export const CatalogBrowsePage: React.FC = () => {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);
  // segments[0] === "catalogs"

  // /catalogs/<type>  — handled by CatalogTypeOverviewPage, but catch stray trailing slashes
  if (segments.length === 2 && CATALOG_TYPES.has(segments[1])) {
    return <Navigate to={`/catalogs/${segments[1]}`} replace />;
  }

  // /catalogs/<category>  — category overview page
  if (segments.length === 2) {
    return <CatalogCategoryPage category={segments[1]} />;
  }

  // /catalogs/<category>/<service>  — redirect up to category page
  if (segments.length === 3) {
    return <Navigate to={`/catalogs/${segments[1]}`} replace />;
  }

  // /catalogs/<category>/<service>/<type>  — versions list
  if (segments.length === 4 && CATALOG_TYPES.has(segments[3])) {
    return <CatalogVersionsPage category={segments[1]} service={segments[2]} type={segments[3]} />;
  }

  return <Navigate to="/catalogs" replace />;
};
