import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "node:fs";
import path from "node:path";

function catalogYamlPlugin() {
  return {
    name: "catalog-yaml",

    // Dev: rewrite /catalogs/**/*.yaml → /data/catalogs/**/*.yaml
    configureServer(server: { middlewares: { use: (fn: (req: { url?: string }, res: unknown, next: () => void) => void) => void } }) {
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
  plugins: [react(), catalogYamlPlugin()],
  base: "/",
  build: {
    outDir: "dist"
  }
});
