import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, Home, DollarSign, BarChart3, TrendingDown, FileText, Map, Clock, AlertTriangle, BookOpen } from "lucide-react";

interface SubNavbarProps {
  section?: string;
}

const SubNavbar = ({ section = "dashboard" }: SubNavbarProps) => {
  const getFilterItems = (sectionType: string) => {
    const baseFilters = [
      { label: "Track Type", value: "ALL", options: ["ALL", "Pre-Suit", "Pre-Judg", "Post-Judg"] },
      { label: "Start Batch", value: "2023-01", options: ["2023-01", "2023-02", "2023-03"] },
      { label: "End Batch", value: "2025-09", options: ["2025-09", "2025-10", "2025-11"] },
      { label: "Client Code", value: "ALL", options: ["ALL", "CLI001", "CLI002"] },
    ];

    switch (sectionType) {
      case "dollars":
        return [
          ...baseFilters,
          { label: "Currency Type", value: "USD", options: ["USD", "EUR", "GBP"] },
          { label: "Payment Method", value: "ALL", options: ["ALL", "Credit Card", "Bank Transfer", "Check"] },
        ];
      case "liquidation":
        return [
          ...baseFilters,
          { label: "Liquidation Status", value: "ALL", options: ["ALL", "Pending", "Completed", "Failed"] },
          { label: "Recovery Type", value: "ALL", options: ["ALL", "Full", "Partial", "None"] },
        ];
      case "reports":
        return [
          ...baseFilters,
          { label: "Report Type", value: "ALL", options: ["ALL", "Monthly", "Quarterly", "Annual"] },
          { label: "Format", value: "PDF", options: ["PDF", "Excel", "CSV"] },
        ];
      case "heatmaps":
        return [
          ...baseFilters,
          { label: "Region", value: "ALL", options: ["ALL", "West", "East", "Central", "South"] },
          { label: "Metric", value: "Collections", options: ["Collections", "Volume", "Performance"] },
        ];
      case "timeline":
        return [
          ...baseFilters,
          { label: "Event Type", value: "ALL", options: ["ALL", "Payment", "Contact", "Legal"] },
          { label: "Priority", value: "ALL", options: ["ALL", "High", "Medium", "Low"] },
        ];
      case "invchartbatches":
        return [
          ...baseFilters,
          { label: "Batch Status", value: "ALL", options: ["ALL", "Active", "Completed", "Pending"] },
          { label: "Chart Type", value: "ALL", options: ["ALL", "Pie", "Bar", "Line"] },
        ];
      case "inventory":
        return [
          ...baseFilters,
          { label: "Inventory Type", value: "ALL", options: ["ALL", "Active", "Inactive", "Pending"] },
          { label: "Status", value: "ALL", options: ["ALL", "In Stock", "Low Stock", "Out of Stock"] },
        ];
      default:
        return [
          ...baseFilters,
          { label: "Portfolio Code", value: "ALL", options: ["ALL", "POR001", "POR002"] },
          { label: "Product Code", value: "ALL", options: ["ALL", "PRO001", "PRO002"] },
          { label: "State Code", value: "ALL", options: ["ALL", "CA", "NY", "TX"] },
          { label: "Account Type", value: "ALL", options: ["ALL", "Individual", "Business"] },
        ];
    }
  };

  const getSectionIcon = (sectionType: string) => {
    const icons = {
      dashboard: BarChart3,
      dollars: DollarSign,
      liquidation: TrendingDown,
      reports: FileText,
      heatmaps: Map,
      timeline: Clock,
      stateissues: AlertTriangle,
      clientguide: BookOpen,
      invchartbatches: BarChart3,
      inventory: BookOpen,
    };
    return icons[sectionType as keyof typeof icons] || BarChart3;
  };

  const filterItems = getFilterItems(section);
  const SectionIcon = getSectionIcon(section);

  return (
    <motion.div
      className="bg-sub-navbar border-b border-sub-navbar-border shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Filters */}
          <div className="flex items-center space-x-4 flex-wrap gap-y-2">
            <div className="flex items-center space-x-2 text-sub-navbar-foreground">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            <div className="flex items-center space-x-3 flex-wrap gap-y-2">
              {filterItems.map((filter) => (
                <motion.div
                  key={filter.label}
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-xs text-sub-navbar-foreground/70 min-w-fit">
                    {filter.label}:
                  </span>
                  <Select defaultValue={filter.value}>
                    <SelectTrigger className="h-8 min-w-24 bg-card border-card-border text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {filter.options.map((option) => (
                        <SelectItem key={option} value={option} className="text-xs">
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              ))}
            </div>
          </div>

          {/* breadcrumb removed - use universal breadcrumb in Layout */}
        </div>
      </div>
    </motion.div>
  );
};

export default SubNavbar;