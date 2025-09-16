import { useEffect, useMemo, useState, useRef } from "react";
// @ts-expect-error: No types for react-simple-maps
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";

const HeatMaps = () => {
  useEffect(() => {
    document.title = "Heat | Pipeway";
  }, []);


  // US states topojson (publicly available, small)
  const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

  // Sample state data for demo (single snapshot)
  const stateData = {
    AL: 120, AK: 30, AZ: 80, AR: 60, CA: 200, CO: 90, CT: 40, DE: 20, FL: 180, GA: 140, HI: 10, ID: 25, IL: 160, IN: 100, IA: 50, KS: 45, KY: 70, LA: 65, ME: 15, MD: 85, MA: 95, MI: 110, MN: 75, MS: 55, MO: 105, MT: 12, NE: 22, NV: 35, NH: 18, NJ: 130, NM: 28, NY: 190, NC: 150, ND: 8, OH: 170, OK: 58, OR: 77, PA: 175, RI: 13, SC: 88, SD: 9, TN: 112, TX: 210, UT: 38, VT: 7, VA: 120, WA: 98, WV: 19, WI: 92, WY: 6
  };

  // Time series sample data: 12 months, random variance around the base
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const timeSeries = useMemo(() => {
    return months.map((m, i) => {
      const values = Object.fromEntries(
        Object.entries(stateData).map(([k, v]) => [k, Math.max(0, Math.round(v * (0.6 + Math.random() * 0.8) * (1 + i * 0.02)))])
      );
      return { label: m, values };
    });
  }, []);

  // Color scales
  const maxValue = 300;
  // d3-scale typings are sometimes strict about range generics; cast to any for simplicity
  const colorScaleRed = (scaleLinear<number, number>() as any).domain([0, maxValue]).range(["#fff5f5", "#e11d48"]);
  const colorScaleGreen = (scaleLinear<number, number>() as any).domain([0, maxValue]).range(["#f0fdf4", "#22c55e"]);

  // Timeline state
  const [timeIndex, setTimeIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<number | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null);

  useEffect(() => {
    if (playing) {
      timerRef.current = window.setInterval(() => {
        setTimeIndex((t) => (t + 1) % timeSeries.length);
      }, 900);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing, timeSeries.length]);

  return (
    <div className="min-h-screen bg-content-background flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Heat</h1>
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Costs By State */}
        <div className="bg-card rounded-2xl shadow-card border border-card-border p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Heat</h2>
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
            <h2 className="text-lg font-semibold">Heat</h2>
          </div>
          <div className="flex-1 flex flex-row items-center">
            <div className="flex-1">
              <ComposableMap projection="geoAlbersUsa" width={420} height={260} style={{ width: "100%", height: "auto" }}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const stateAbbr = geo.properties?.postal;
                      const value = timeSeries[timeIndex].values[stateAbbr] || 0;
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