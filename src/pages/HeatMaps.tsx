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
        {/* Timeline Map */}
        <div className="bg-card rounded-2xl shadow-card border border-card-border p-6 flex flex-col relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Heat</h2>
              <p className="text-xs text-muted-foreground">Interactive timeline — hover a state for details</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPlaying((p) => !p)}
                className="px-3 py-1 rounded-md bg-primary text-primary-foreground hover:opacity-90"
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? 'Pause' : 'Play'}
              </button>
              <div className="text-xs text-muted-foreground">{timeSeries[timeIndex].label}</div>
            </div>
          </div>

          <div className="flex-1 flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1" style={{ minWidth: 0 }}>
              <ComposableMap projection="geoAlbersUsa" width={720} height={380} style={{ width: '100%', height: 'auto' }}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const stateAbbr = geo.properties?.postal;
                      const value = timeSeries[timeIndex].values[stateAbbr] || 0;
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={(evt) => {
                            const rect = (evt.target as SVGElement).getBoundingClientRect();
                            setTooltip({ x: rect.x + rect.width / 2, y: rect.y, content: `${geo.properties.name}: ${value}` });
                          }}
                          onMouseMove={(evt) => {
                            setTooltip({ x: (evt as any).clientX + 12, y: (evt as any).clientY + 12, content: `${geo.properties.name}: ${value}` });
                          }}
                          onMouseLeave={() => setTooltip(null)}
                          fill={colorScaleGreen(value)}
                          stroke="#e5e7eb"
                          style={{ outline: 'none', transition: 'fill 300ms linear' }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>
            </div>

            {/* Right controls */}
            <div className="w-40 flex flex-col items-center">
              {/* Horizontal Legend */}
              <div className="w-full mb-3">
                <div className="h-3 rounded-md overflow-hidden" style={{ background: 'linear-gradient(90deg, #f0fdf4 0%, #22c55e 100%)' }} />
                <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
                  <span>0</span>
                  <span>{Math.round(maxValue / 2)}</span>
                  <span>{maxValue}</span>
                </div>
              </div>

              {/* Timeline slider */}
              <input
                type="range"
                min={0}
                max={timeSeries.length - 1}
                value={timeIndex}
                onChange={(e) => setTimeIndex(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground mt-2">{timeSeries[timeIndex].label}</div>

              {/* Compact stats */}
              <div className="mt-4 text-sm text-center">
                <div className="font-semibold">Top state</div>
                <div className="text-muted-foreground">{Object.entries(timeSeries[timeIndex].values).sort((a: any, b: any) => b[1] - a[1])[0][0]}</div>
              </div>
            </div>
          </div>

          {/* Tooltip */}
          {tooltip && (
            <div style={{ position: 'fixed', left: tooltip.x, top: tooltip.y, transform: 'translate(-50%, -120%)', pointerEvents: 'none' }}>
              <div className="bg-card/95 backdrop-blur-md px-3 py-1 rounded-md shadow-md text-sm border border-card-border">
                {tooltip.content}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeatMaps;