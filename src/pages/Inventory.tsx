import { motion } from "framer-motion";
import { Package, BarChart3, TrendingUp, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import SubNavbar from "@/components/SubNavbar";
import ChartCard from "@/components/ChartCard";
import StatsCard from "@/components/StatsCard";

const EmptyChart = ({ title, message }: { title: string, message: string }) => (
  <div className="h-80 flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-16 h-16 mx-auto bg-muted/20 rounded-full flex items-center justify-center">
        <BarChart3 className="w-8 h-8 text-muted-foreground/50" />
      </div>
      <div>
        <h3 className="text-lg font-medium text-card-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground">{message}</p>
      </div>
      <motion.div
        className="flex items-center justify-center space-x-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="w-2 h-2 bg-chart-1 rounded-full animate-pulse" />
        <div className="w-2 h-2 bg-chart-2 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
        <div className="w-2 h-2 bg-chart-3 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
        <div className="w-2 h-2 bg-chart-4 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
      </motion.div>
    </div>
  </div>
);

const ConversionMetric = ({ title, percentage, change, delay }: { 
  title: string, 
  percentage: number, 
  change: string, 
  delay: number 
}) => (
  <motion.div
    className="p-6 bg-gradient-card border border-card-border rounded-xl"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
      <TrendingUp className="w-5 h-5 text-chart-2" />
    </div>
    
    <div className="space-y-3">
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-bold text-card-foreground">{percentage}%</span>
        <span className="text-sm text-chart-2">{change}</span>
      </div>
      
      <div className="w-full bg-muted/30 rounded-full h-3">
        <motion.div
          className="h-3 bg-gradient-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay: delay + 0.3, duration: 1 }}
        />
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
        <div className="text-center">
          <div className="font-medium text-card-foreground">Target</div>
          <div>75%</div>
        </div>
        <div className="text-center">
          <div className="font-medium text-card-foreground">Current</div>
          <div>{percentage}%</div>
        </div>
        <div className="text-center">
          <div className="font-medium text-card-foreground">Goal</div>
          <div>85%</div>
        </div>
      </div>
    </div>
  </motion.div>
);

const Inventory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="bg-content-background min-h-screen">
        <SubNavbar section="inventory" />
        
        <div className="px-6 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Inventory"
              value="15,234"
              change="+342 from last month"
              changeType="positive"
              icon={Package}
              delay={0.1}
            />
            <StatsCard
              title="Active Suits"
              value="3,456"
              change="+89 from last month"
              changeType="positive"
              icon={FileText}
              delay={0.2}
            />
            <StatsCard
              title="Conversion Rate"
              value="78.3%"
              change="+2.1% from last month"
              changeType="positive"
              icon={TrendingUp}
              delay={0.3}
            />
            <StatsCard
              title="Processing Queue"
              value="892"
              change="-45 from yesterday"
              changeType="positive"
              icon={BarChart3}
              delay={0.4}
            />
          </div>

          {/* Main Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            <ChartCard title="Inventory Snapshot" delay={0.5}>
              <EmptyChart 
                title="No Data to Display" 
                message="Please refine your filters to view inventory data" 
              />
            </ChartCard>
            
            <ChartCard title="Suit Status" delay={0.6}>
              <EmptyChart 
                title="No Data to Display" 
                message="Please refine your filters to view suit status data" 
              />
            </ChartCard>
          </div>

          {/* Conversion Ratios */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            <ChartCard title="Inventory Conversion Ratios" delay={0.7}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ConversionMetric
                  title="Lead to Prospect"
                  percentage={78}
                  change="+2.3%"
                  delay={0.8}
                />
                <ConversionMetric
                  title="Prospect to Customer"
                  percentage={65}
                  change="+1.8%"
                  delay={0.9}
                />
                <ConversionMetric
                  title="Customer Retention"
                  percentage={89}
                  change="+0.5%"
                  delay={1.0}
                />
                <ConversionMetric
                  title="Upsell Success"
                  percentage={42}
                  change="+3.2%"
                  delay={1.1}
                />
              </div>
            </ChartCard>
            
            <ChartCard title="Suit Conversion Ratios" delay={0.8}>
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-muted/10 rounded-lg">
                    <div className="text-2xl font-bold text-chart-2">67%</div>
                    <div className="text-sm text-muted-foreground">Filed Successfully</div>
                  </div>
                  <div className="p-4 bg-muted/10 rounded-lg">
                    <div className="text-2xl font-bold text-chart-3">23%</div>
                    <div className="text-sm text-muted-foreground">In Progress</div>
                  </div>
                  <div className="p-4 bg-muted/10 rounded-lg">
                    <div className="text-2xl font-bold text-chart-1">10%</div>
                    <div className="text-sm text-muted-foreground">Rejected</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Pre-litigation to Suit", value: 67, color: "chart-2" },
                    { label: "Suit to Judgment", value: 78, color: "chart-3" },
                    { label: "Judgment to Collection", value: 85, color: "chart-4" },
                    { label: "Overall Success Rate", value: 72, color: "chart-5" },
                  ].map((item, index) => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-card-foreground">{item.label}</span>
                        <span className="text-sm font-medium text-card-foreground">{item.value}%</span>
                      </div>
                      <div className="w-full bg-muted/30 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full bg-${item.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ChartCard>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChartCard title="Inventory Aging" delay={0.9}>
              <div className="space-y-4">
                {[
                  { range: "0-30 days", count: 4567, percentage: 45 },
                  { range: "31-60 days", count: 2890, percentage: 28 },
                  { range: "61-90 days", count: 1823, percentage: 18 },
                  { range: "90+ days", count: 954, percentage: 9 },
                ].map((item, index) => (
                  <motion.div
                    key={item.range}
                    className="flex items-center justify-between p-3 bg-muted/10 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    <div>
                      <div className="font-medium text-card-foreground">{item.range}</div>
                      <div className="text-sm text-muted-foreground">{item.count} items</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-card-foreground">{item.percentage}%</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ChartCard>

            <ChartCard title="Priority Queue" delay={1.0} className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-card-foreground">High Priority Items</h4>
                  {[
                    { id: "INV-2024-001", status: "Urgent Review", value: "$45,000" },
                    { id: "INV-2024-002", status: "Legal Action", value: "$32,000" },
                    { id: "INV-2024-003", status: "Settlement Due", value: "$28,500" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="p-3 bg-chart-1/10 border border-chart-1/20 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 + index * 0.1 }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-card-foreground">{item.id}</div>
                          <div className="text-sm text-chart-1">{item.status}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-card-foreground">{item.value}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-card-foreground">Recent Updates</h4>
                  {[
                    { action: "Status Changed", item: "INV-2024-045", time: "2 hours ago" },
                    { action: "Payment Received", item: "INV-2024-032", time: "4 hours ago" },
                    { action: "New Assignment", item: "INV-2024-078", time: "6 hours ago" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.item}
                      className="p-3 bg-chart-2/10 border border-chart-2/20 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-card-foreground">{item.action}</div>
                          <div className="text-sm text-chart-2">{item.item}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">{item.time}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ChartCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Inventory;