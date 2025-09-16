import { motion } from "framer-motion";
import { Map, DollarSign, TrendingUp, MapPin, Home } from "lucide-react";
import ChartCard from "@/components/ChartCard";
import StatsCard from "@/components/StatsCard";

const stateData = [
  { state: "California", costs: 1250000, collections: 2150000, performance: 85.2 },
  { state: "Texas", costs: 980000, collections: 1820000, performance: 78.9 },
  { state: "Florida", costs: 720000, collections: 1340000, performance: 82.1 },
  { state: "New York", costs: 1100000, collections: 1950000, performance: 77.3 },
  { state: "Illinois", costs: 650000, collections: 1180000, performance: 79.8 },
  { state: "Pennsylvania", costs: 580000, collections: 1050000, performance: 81.2 },
  { state: "Ohio", costs: 520000, collections: 940000, performance: 76.5 },
  { state: "Georgia", costs: 480000, collections: 870000, performance: 83.4 },
];

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  return `$${(value / 1000).toFixed(0)}k`;
};

const HeatMapVisualization = ({ data, title, metric }: { data: any[], title: string, metric: 'costs' | 'collections' | 'performance' }) => {
  const maxValue = Math.max(...data.map(d => d[metric]));
  
  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-4">
        Intensity based on {metric} values - darker colors indicate higher values
      </div>
      {data.map((item, index) => {
        const intensity = (item[metric] / maxValue);
        const bgOpacity = Math.max(0.1, intensity);
        
        return (
          <motion.div
            key={item.state}
            className="relative p-4 rounded-lg border border-card-border"
            style={{
              backgroundColor: metric === 'costs' 
                ? `hsl(var(--chart-1) / ${bgOpacity})` 
                : metric === 'collections'
                ? `hsl(var(--chart-2) / ${bgOpacity})`
                : `hsl(var(--chart-3) / ${bgOpacity})`
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-card-foreground" />
                <span className="font-medium text-card-foreground">{item.state}</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-card-foreground">
                  {metric === 'performance' ? `${item[metric]}%` : formatCurrency(item[metric])}
                </div>
                <div className="text-xs text-muted-foreground">
                  Rank #{index + 1}
                </div>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-3 w-full bg-muted/30 rounded-full h-2">
              <motion.div
                className="h-2 rounded-full"
                style={{
                  backgroundColor: metric === 'costs' 
                    ? 'hsl(var(--chart-1))' 
                    : metric === 'collections'
                    ? 'hsl(var(--chart-2))'
                    : 'hsl(var(--chart-3))'
                }}
                initial={{ width: 0 }}
                animate={{ width: `${intensity * 100}%` }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const HeatMaps = () => {
  const sortedByCosts = [...stateData].sort((a, b) => b.costs - a.costs);
  const sortedByCollections = [...stateData].sort((a, b) => b.collections - a.collections);

  return (
    <div className="min-h-screen bg-content-background">
      {/* Breadcrumb */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Home className="w-4 h-4" />
          <span>Home</span>
          <span>/</span>
          <span className="text-foreground">Heat Maps</span>
        </div>
      </div>
      
      <div className="px-6 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total States"
              value="48"
              change="Active in all states"
              changeType="positive"
              icon={Map}
              delay={0.1}
            />
            <StatsCard
              title="Top Performing State"
              value="California"
              change="85.2% performance rate"
              changeType="positive"
              icon={TrendingUp}
              delay={0.2}
            />
            <StatsCard
              title="Total Costs"
              value="$6.3M"
              change="+8.7% from last quarter"
              changeType="positive"
              icon={DollarSign}
              delay={0.3}
            />
            <StatsCard
              title="Total Collections"
              value="$11.3M"
              change="+12.1% from last quarter"
              changeType="positive"
              icon={MapPin}
              delay={0.4}
            />
          </div>

          {/* Heat Maps */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <ChartCard title="Costs By State" delay={0.5}>
              <HeatMapVisualization 
                data={sortedByCosts} 
                title="Costs By State" 
                metric="costs"
              />
            </ChartCard>
            
            <ChartCard title="Collection By State" delay={0.6}>
              <HeatMapVisualization 
                data={sortedByCollections} 
                title="Collection By State" 
                metric="collections"
              />
            </ChartCard>
          </div>

          {/* Performance Summary */}
          <div className="mt-8">
            <ChartCard title="State Performance Summary" delay={0.7}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stateData.map((state, index) => (
                  <motion.div
                    key={state.state}
                    className="p-4 bg-muted/10 rounded-lg border border-card-border"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-sm font-medium text-card-foreground mb-2">{state.state}</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Costs:</span>
                        <span className="text-chart-1">{formatCurrency(state.costs)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Collections:</span>
                        <span className="text-chart-2">{formatCurrency(state.collections)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Performance:</span>
                        <span className="text-chart-3">{state.performance}%</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ChartCard>
          </div>
        </div>
      </div>
    );
  };

export default HeatMaps;