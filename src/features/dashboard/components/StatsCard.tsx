import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/**
 * StatsCard
 * ----------
 * Compact statistic card used throughout the dashboard to display a single
 * metric and change indicator.
 *
 * Props:
 * - title: label for the metric
 * - value: formatted value (string) to display prominently
 * - change: small text describing delta (e.g., +4.2%)
 * - changeType: determines color for the change indicator
 * - icon: Lucide icon component to render
 *
 * TODO: consider accepting a `trend` numeric value and derive the color and
 * accessibility-friendly annotations (aria-live) automatically.
 */

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  delay?: number;
}

const StatsCard = ({ title, value, change, changeType, icon: Icon, delay = 0 }: StatsCardProps) => {
  const changeColor = {
    positive: "text-accent",
    negative: "text-destructive",
    neutral: "text-muted-foreground"
  }[changeType];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="bg-gradient-card border-card-border shadow-card hover:shadow-elegant transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium">{title}</p>
              <p className="text-2xl font-bold text-card-foreground">{value}</p>
              <p className={`text-sm ${changeColor}`}>{change}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-xl">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsCard;