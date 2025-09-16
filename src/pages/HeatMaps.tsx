import { Map } from "lucide-react";
import { useEffect } from "react";

const HeatMaps = () => {
  useEffect(() => {
    document.title = "Heat-Maps | Pipeway";
  }, []);

  return (
    <div className="min-h-screen bg-content-background flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Heat-Maps</h1>
      <div className="w-full max-w-5xl bg-card rounded-2xl shadow-card border border-card-border p-6 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-6">US Map Visualization</h2>
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-3xl aspect-[16/9] bg-gradient-to-br from-blue-100 to-pink-100 rounded-xl border-2 border-dashed border-primary flex items-center justify-center overflow-hidden">
            {/* Replace this SVG with a real map/chart when ready */}
            <svg viewBox="0 0 600 350" className="w-5/6 h-5/6 opacity-80">
              <rect x="40" y="40" width="520" height="270" rx="32" fill="#e5e7eb" stroke="#cbd5e1" strokeWidth="4" />
              <text x="50%" y="50%" textAnchor="middle" fill="#64748b" fontSize="32" dy=".3em">US Map / Heatmap</text>
            </svg>
            <div className="absolute bottom-4 right-4 bg-white/80 px-4 py-1 rounded shadow text-xs text-primary font-semibold">Interactive Map Coming Soon</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatMaps;