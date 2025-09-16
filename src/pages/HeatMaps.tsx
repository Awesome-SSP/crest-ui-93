import { useEffect } from "react";
// @ts-expect-error: No types for react-simple-maps
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";

const HeatMaps = () => {
  useEffect(() => {
    document.title = "Heat-Maps | Pipeway";
  }, []);


  // US states topojson (publicly available, small)
  const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

  // Sample state data for demo
  const stateData = {
    AL: 120, AK: 30, AZ: 80, AR: 60, CA: 200, CO: 90, CT: 40, DE: 20, FL: 180, GA: 140, HI: 10, ID: 25, IL: 160, IN: 100, IA: 50, KS: 45, KY: 70, LA: 65, ME: 15, MD: 85, MA: 95, MI: 110, MN: 75, MS: 55, MO: 105, MT: 12, NE: 22, NV: 35, NH: 18, NJ: 130, NM: 28, NY: 190, NC: 150, ND: 8, OH: 170, OK: 58, OR: 77, PA: 175, RI: 13, SC: 88, SD: 9, TN: 112, TX: 210, UT: 38, VT: 7, VA: 120, WA: 98, WV: 19, WI: 92, WY: 6
  };
  const stateData2 = Object.fromEntries(Object.entries(stateData).map(([k, v]) => [k, Math.round((v / 210) * 100 + Math.random() * 30)]));

  // Color scales
  const colorScaleRed = scaleLinear<number, string>().domain([0, 210]).range(["#fff5f5", "#e11d48"]) as any;
  const colorScaleGreen = scaleLinear<number, string>().domain([0, 210]).range(["#f0fdf4", "#22c55e"]) as any;

  return (
    <div className="min-h-screen bg-content-background flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Heat-Maps</h1>
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Costs By State */}
        <div className="bg-card rounded-2xl shadow-card border border-card-border p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Costs By State</h2>
          </div>
          <div className="flex-1 flex flex-row items-center">
            <div className="flex-1">
              <ComposableMap projection="geoAlbersUsa" width={420} height={260} style={{ width: "100%", height: "auto" }}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const stateAbbr = geo.properties?.postal;
                      const value = stateData[stateAbbr] || 0;
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={colorScaleRed(value)}
                          stroke="#e5e7eb"
                          style={{ outline: "none" }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>
            </div>
            {/* Legend */}
            <div className="flex flex-col items-center ml-2">
              <div className="h-40 w-3 bg-gradient-to-b from-[#e11d48] to-[#fff5f5] rounded-full mb-2 border border-[#e5e7eb]" />
              <span className="text-xs text-muted-foreground">Low</span>
              <span className="text-xs text-muted-foreground mt-auto">High</span>
            </div>
          </div>
        </div>
        {/* Collection By State */}
        <div className="bg-card rounded-2xl shadow-card border border-card-border p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Collection By State</h2>
          </div>
          <div className="flex-1 flex flex-row items-center">
            <div className="flex-1">
              <ComposableMap projection="geoAlbersUsa" width={420} height={260} style={{ width: "100%", height: "auto" }}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const stateAbbr = geo.properties?.postal;
                      const value = stateData2[stateAbbr] || 0;
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={colorScaleGreen(value)}
                          stroke="#e5e7eb"
                          style={{ outline: "none" }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>
            </div>
            {/* Legend */}
            <div className="flex flex-col items-center ml-2">
              <div className="h-40 w-3 bg-gradient-to-b from-[#22c55e] to-[#f0fdf4] rounded-full mb-2 border border-[#e5e7eb]" />
              <span className="text-xs text-muted-foreground">Low</span>
              <span className="text-xs text-muted-foreground mt-auto">High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatMaps;