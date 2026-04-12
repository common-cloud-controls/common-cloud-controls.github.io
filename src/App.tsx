import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Banner } from "./components/Banner";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BackgroundArcs } from "./components/BackgroundArcs";
import { ScrollToTop } from "./components/ScrollToTop";
import { HomePage } from "./pages/HomePage";
import { SectionIndexPage } from "./pages/SectionIndexPage";
import { SectionItemPage } from "./pages/SectionItemPage";
import { CatalogItemPage } from "./pages/CatalogItemPage";
import { CatalogBrowsePage } from "./pages/CatalogBrowsePage";
import { CatalogsIndexPage } from "./pages/CatalogsIndexPage";
import { CatalogTypeOverviewPage } from "./pages/CatalogTypeOverviewPage";
import { useTheme } from "./theme";
import { siteConfig } from "./config/site";
import { getSectionItems, loadManifest } from "./content/sections";

export const App: React.FC = () => {
  useTheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadManifest().then(() => setReady(true));
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div
        className="slam-theme"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          fontFamily: "var(--gf-font-body)",
          background: "var(--gf-color-background)",
          color: "var(--gf-color-text)",
          position: "relative"
        }}
      >
        <BackgroundArcs />
        <Banner />
        <Header />
        <main
          className="main-content"
          style={{ flex: 1, padding: "var(--gf-space-lg)", paddingTop: "var(--gf-space-md)", overflowX: "hidden" }}
        >
          {ready ? (
            <Routes>
              <Route path="/" element={<HomePage />} />
              {Object.entries(siteConfig.contentSections).map(([section, config]) =>
                config.enabled ? (
                  <React.Fragment key={section}>
                    <Route path={`/${section}`} element={section === "catalogs" ? <CatalogsIndexPage /> : <SectionIndexPage section={section} />} />
                    {section === "catalogs" && (
                      <>
                        <Route path="/catalogs/capabilities" element={<CatalogTypeOverviewPage type="capabilities" />} />
                        <Route path="/catalogs/threats" element={<CatalogTypeOverviewPage type="threats" />} />
                        <Route path="/catalogs/controls" element={<CatalogTypeOverviewPage type="controls" />} />
                      </>
                    )}
                    {getSectionItems(section)
                      .filter((item) => item.path && (section !== "catalogs" || item.path.split("/").filter(Boolean).length >= 5))
                      .map((item) => (
                        <Route
                          key={item.path}
                          path={item.path!}
                          element={
                            section === "catalogs"
                              ? <CatalogItemPage path={item.path!} />
                              : <SectionItemPage section={section} path={item.path} />
                          }
                        />
                      ))}

                  </React.Fragment>
                ) : null
              )}
              <Route path="/catalogs/*" element={<CatalogBrowsePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          ) : null}
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
