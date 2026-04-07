import { SectionItem } from "./sections";

// Prettify a slug segment or compound slug (e.g. "ai-ml" → "AI/ML", "gen-ai" → "Gen AI").
export function prettifySegment(s: string): string {
  const acronyms = new Set(["ai", "ml", "iam", "vpc", "etl", "k8s", "sdk"]);
  const parts = s.split("-");
  if (parts.every((p) => acronyms.has(p))) {
    return parts.map((p) => p.toUpperCase()).join("/");
  }
  return parts
    .map((part) =>
      acronyms.has(part) ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join(" ");
}

export interface ServiceEntry {
  path: string;
  label: string;
}

const CATALOG_TYPES = new Set(["capabilities", "threats", "controls"]);

// Derive unique service paths grouped by category from published release items.
// Handles both path structures:
//   New: /catalogs/<type>/<category>/<service>/<version>
//   Old: /catalogs/<category>/<service>/<type>/<version>
// Pass typeFilter to restrict to a specific catalog type (capabilities|threats|controls).
export function getServiceGroups(
  items: SectionItem[],
  typeFilter?: string
): Map<string, ServiceEntry[]> {
  const groups = new Map<string, ServiceEntry[]>();
  const seen = new Set<string>();

  for (const item of items) {
    if (!item.path) continue;
    const parts = item.path.split("/").filter(Boolean);
    if (parts.length < 5) continue;

    let type: string, category: string, service: string;
    if (CATALOG_TYPES.has(parts[1])) {
      // New structure: /catalogs/<type>/<category>/<service>/<version>
      [, type, category, service] = parts;
    } else {
      // Old structure: /catalogs/<category>/<service>/<type>/<version>
      [, category, service, type] = parts;
    }

    if (typeFilter && type !== typeFilter) continue;
    const servicePath = `/catalogs/${category}/${service}`;
    if (seen.has(servicePath)) continue;
    seen.add(servicePath);
    if (!groups.has(category)) groups.set(category, []);
    groups.get(category)!.push({ path: servicePath, label: prettifySegment(service) });
  }

  return groups;
}
