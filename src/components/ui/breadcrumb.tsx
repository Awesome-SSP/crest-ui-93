import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

/**
 * Breadcrumb
 * A small, universal breadcrumb component that reads the current location
 * and renders clickable segments. Add this to the app layout to show the
 * user's path and allow quick navigation between levels.
 *
 * Behavior:
 * - Splits the pathname by `/` and maps each segment to a readable label.
 * - Known routes are translated via the `labelMap` object. Unknown segments
 *   are title-cased and used as labels.
 * - Each breadcrumb (except the last) is a Link to the accumulated path.
 */

const labelMap: Record<string, string> = {
  "": "Home",
  administration: "Administration",
  analytics: "Analytics",
  heatmaps: "Heat Maps",
  timeline: "Timeline",
  settings: "Settings",
  reports: "Reports",
  inventory: "Inventory",
  profile: "Profile",
  dollars: "Dollars",
  "judgment-performance": "Judgment Performance",
  liquidation: "Liquidation",
  notices: "Notices",
};

function titleCase(segment: string) {
  return segment
    .replace(/[-_]/g, " ")
    .replace(/(^|\s)\S/g, (t) => t.toUpperCase());
}

const Breadcrumb = () => {
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);

  const items = ["", ...parts]; // include root as empty segment

  let acc = "";

  return (
    <nav aria-label="Breadcrumb" className="px-4 py-3 border-b border-border bg-card">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        {items.map((seg, idx) => {
          acc = idx === 0 ? "/" : `${acc}/${seg}`;
          const isLast = idx === items.length - 1;
          const key = seg;
          const label = labelMap[seg] ?? titleCase(seg || "home");

          return (
            <li key={acc} className="flex items-center">
              {!isLast ? (
                <>
                  <Link to={acc} className="text-card-foreground hover:underline">
                    {label}
                  </Link>
                  <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
                </>
              ) : (
                <span aria-current="page" className="text-muted-foreground">
                  {label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

