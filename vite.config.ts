import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/** Scans src/content at build time, emits content-manifest.json and copies .md files to dist/content/. */
function contentManifestPlugin(): Plugin {
  const contentDir = path.resolve("src/content");

  function scanMarkdown(dir: string, base: string): Array<{ file: string; slug: string; section: string; title: string; description?: string; path?: string }> {
    const results: Array<{ file: string; slug: string; section: string; title: string; description?: string; path?: string }> = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...scanMarkdown(full, base));
      } else if (entry.name.endsWith(".md")) {
        const rel = path.relative(base, full);
        const parts = rel.split(path.sep);
        const section = parts[0];
        const slug = entry.name.replace(/\.md$/, "");
        const raw = fs.readFileSync(full, "utf-8");
        const { data } = matter(raw);
        results.push({
          file: rel.split(path.sep).join("/"),
          slug,
          section,
          title: (data as { title?: string }).title ?? "Untitled",
          description: (data as { description?: string }).description,
          path: (data as { path?: string }).path,
        });
      }
    }
    return results;
  }

  return {
    name: "content-manifest",

    // Dev: serve manifest and raw .md files
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url === "/content-manifest.json") {
          const items = scanMarkdown(contentDir, contentDir);
          _res.setHeader("Content-Type", "application/json");
          (_res as import("http").ServerResponse).end(JSON.stringify(items));
          return;
        }
        if (req.url?.startsWith("/content/") && req.url.endsWith(".md")) {
          const filePath = path.join(contentDir, req.url.replace(/^\/content\//, ""));
          if (fs.existsSync(filePath)) {
            _res.setHeader("Content-Type", "text/markdown");
            (_res as import("http").ServerResponse).end(fs.readFileSync(filePath, "utf-8"));
            return;
          }
        }
        next();
      });
    },

    // Build: emit manifest and copy .md files
    generateBundle() {
      const items = scanMarkdown(contentDir, contentDir);
      this.emitFile({
        type: "asset",
        fileName: "content-manifest.json",
        source: JSON.stringify(items),
      });
      // Copy each .md file as a static asset
      for (const item of items) {
        const full = path.join(contentDir, item.file);
        this.emitFile({
          type: "asset",
          fileName: `content/${item.file}`,
          source: fs.readFileSync(full, "utf-8"),
        });
      }
    },
  };
}

function catalogYamlPlugin(): Plugin {
  return {
    name: "catalog-yaml",

    // Dev: rewrite /catalogs/**/*.yaml → /data/catalogs/**/*.yaml
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url?.match(/^\/catalogs\/.*\.yaml(\?.*)?$/)) {
          req.url = "/data" + req.url;
        }
        next();
      });
    },

    // Build: copy dist/data/catalogs/**/*.yaml → dist/catalogs/**/*.yaml
    closeBundle() {
      const src = path.resolve("dist/data/catalogs");
      const dest = path.resolve("dist/catalogs");
      if (!fs.existsSync(src)) return;
      copyYamlFiles(src, dest, src);
    },
  };
}

function copyYamlFiles(srcDir: string, destBase: string, srcBase: string) {
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const rel = path.relative(srcBase, srcPath);
    const destPath = path.join(destBase, rel);
    if (entry.isDirectory()) {
      copyYamlFiles(srcPath, destBase, srcBase);
    } else if (entry.name.endsWith(".yaml")) {
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

export default defineConfig({
  plugins: [react(), contentManifestPlugin(), catalogYamlPlugin()],
  base: "/",
  build: {
    outDir: "dist"
  }
});
