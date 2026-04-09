
export type SectionItem = {
  slug: string;
  title: string;
  description?: string;
  path?: string;
  /** Markdown file path relative to content dir, for lazy fetching. */
  file: string;
};

type ManifestEntry = {
  file: string;
  slug: string;
  section: string;
  title: string;
  description?: string;
  path?: string;
};

let bySection: Record<string, SectionItem[]> = {};
let loaded = false;

function ensureLoaded(): void {
  if (loaded) return;
  // In dev and production, the manifest is fetched synchronously via XMLHttpRequest
  // so that existing call sites remain synchronous.
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/content-manifest.json", false); // synchronous
  xhr.send();
  if (xhr.status !== 200) {
    console.error("Failed to load content manifest:", xhr.status);
    loaded = true;
    return;
  }
  const entries: ManifestEntry[] = JSON.parse(xhr.responseText);
  for (const entry of entries) {
    const item: SectionItem = {
      slug: entry.slug,
      title: entry.title,
      description: entry.description,
      path: entry.path,
      file: entry.file,
    };
    if (!bySection[entry.section]) bySection[entry.section] = [];
    bySection[entry.section].push(item);
  }
  for (const arr of Object.values(bySection)) {
    arr.sort((a, b) => (a.path ?? a.slug).localeCompare(b.path ?? b.slug));
  }
  loaded = true;
}

export function getSectionItems(sectionName: string): SectionItem[] {
  ensureLoaded();
  return bySection[sectionName] ?? [];
}

/** Section landing page: item from index.md in the section directory, if present. */
export function getSectionIndexItem(sectionName: string): SectionItem | undefined {
  return getSectionItems(sectionName).find((item) => item.slug === "index");
}

/** Section items to list as links (all items except index.md). */
export function getSectionListItems(sectionName: string): SectionItem[] {
  return getSectionItems(sectionName).filter((item) => item.slug !== "index");
}

export function getSectionItemBySlug(sectionName: string, slug: string): SectionItem | undefined {
  return getSectionItems(sectionName).find((item) => item.slug === slug);
}

export function getSectionItemByPath(sectionName: string, path: string): SectionItem | undefined {
  return getSectionItems(sectionName).find((item) => item.path === path);
}

/** Fetch the markdown body for an item. Returns the body text (without frontmatter). */
export async function fetchItemBody(item: SectionItem): Promise<string> {
  const resp = await fetch(`/content/${item.file}`);
  if (!resp.ok) return "";
  const raw = await resp.text();
  // Strip YAML frontmatter (--- ... ---) without pulling in gray-matter
  const match = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  return match ? raw.slice(match[0].length) : raw;
}
