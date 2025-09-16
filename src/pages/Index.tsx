import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, Users, Target, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import SubNavbar from "@/components/SubNavbar";
import ChartCard from "@/components/ChartCard";
import StatsCard from "@/components/StatsCard";
import PaymentsByBucketChart from "@/components/PaymentsByBucketChart";
import CostsCollectionsChart from "@/components/CostsCollectionsChart";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="bg-content-background min-h-screen">{/* Default SubNavbar for Dashboard */}
        <SubNavbar section="dashboard" />
        <div className="px-6 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Collections"
              value="$2.6M"
              change="+12.5% from last month"
              changeType="positive"
              icon={DollarSign}
              delay={0.1}
            />
            <StatsCard
              title="Active Accounts"
              value="1,234"
              change="+5.2% from last month"
              changeType="positive"
              icon={Users}
              delay={0.2}
            />
            <StatsCard
              title="Recovery Rate"
              value="68.4%"
              change="-2.1% from last month"
              changeType="negative"
              icon={Target}
              delay={0.3}
            />
            <StatsCard
              title="Portfolio Performance"
              value="94.2%"
              change="+1.8% from last month"
              changeType="positive"
              icon={TrendingUp}
              delay={0.4}
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            <ChartCard title="Payments by Bucket" delay={0.5}>
              <PaymentsByBucketChart />
            </ChartCard>
            
            <ChartCard title="Costs & Collections" delay={0.6}>
              <CostsCollectionsChart />
            </ChartCard>
          </div>

          {/* Additional Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChartCard title="Performance Metrics" delay={0.7} className="lg:col-span-2">
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center space-y-2">
                  <BarChart3 className="w-12 h-12 mx-auto opacity-50" />
                  <p>Performance metrics chart coming soon</p>
                </div>
              </div>
            </ChartCard>
            
            <ChartCard title="Top Performing States" delay={0.8}>
              <div className="space-y-4">
                {[
                  { state: "California", amount: "$845K", percentage: "32%" },
                  { state: "Texas", amount: "$623K", percentage: "24%" },
                  { state: "New York", amount: "$512K", percentage: "19%" },
                  { state: "Florida", amount: "$398K", percentage: "15%" },
                  { state: "Illinois", amount: "$267K", percentage: "10%" },
                ].map((item, index) => (
                  <motion.div 
                    key={item.state}
                    className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <span className="text-sm font-medium text-card-foreground">{item.state}</span>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-card-foreground">{item.amount}</p>
                      <p className="text-xs text-muted-foreground">{item.percentage}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ChartCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
