import React from "react";
import { useParams, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "../components/markdownComponents";
import { SectionSidebar } from "../components/SectionSidebar";
import { getSectionItemBySlug, getSectionItemByPath } from "../content/sections";
import { useItemBody } from "../content/useItemBody";

export interface SectionItemPageProps {
  section: string;
  path?: string;
  sidebar?: React.ReactNode;
}

export const SectionItemPage: React.FC<SectionItemPageProps> = ({ section, path: pathProp, sidebar }) => {
  const { slug: slugParam } = useParams<{ slug: string }>();
  const item = pathProp
    ? getSectionItemByPath(section, pathProp)
    : slugParam
      ? getSectionItemBySlug(section, slugParam)
      : undefined;
  const body = useItemBody(item);

  if (!item) return <Navigate to={pathProp ? "/" : `/${section}`} replace />;

  return (
    <div className="page-layout">
      {sidebar ?? <SectionSidebar section={section} />}
      <article style={{ flex: 1, minWidth: 0, padding: "0 var(--gf-space-xl) var(--gf-space-xl)" }}>
        <h1 className="page-h1">{item.title}</h1>
        {item.description && (
          <p className="page-description">{item.description}</p>
        )}
        {body.trim() && (
          <div className="library-article-body" style={{ color: "var(--gf-color-text)", lineHeight: 1.8, fontSize: "1.05rem" }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {body}
            </ReactMarkdown>
          </div>
        )}
      </article>
    </div>
  );
};
