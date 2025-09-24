import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  DollarSign, 
  TrendingDown, 
  FileText, 
  Map, 
  Clock, 
  AlertTriangle, 
  BookOpen,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Users,
  Settings,
  FileQuestion,
  MessageSquare,
  Calendar,
  Download,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationItem {
  name: string;
  icon: any;
  path?: string;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  {
    name: "Dashboard",
    icon: BarChart3,
    children: [
      { name: "Overview", icon: BarChart3, path: "/" },
      { name: "Analytics", icon: BarChart3, path: "/" },
    ]
  },
  { name: "Dollars", icon: DollarSign, path: "/dollars" },
  { name: "Liquidation", icon: TrendingDown, path: "/liquidation" },
  { name: "Heat-Maps", icon: Map, path: "/heatmaps" },
  { name: "Inv Chart Batches", icon: BarChart3, path: "/inv-chart-batches" },
  { name: "Inventory", icon: BookOpen, path: "/inventory" },
  { name: "Judgment Performance", icon: ShieldCheck, path: "/judgment-performance" },
  { name: "Timeline", icon: Clock, path: "/timeline" },
  { name: "Reports", icon: FileText, path: "/reports" },
  { name: "FAQ", icon: FileQuestion, path: "/faq" },
  { name: "Notices", icon: MessageSquare, path: "/notices" },
  { name: "State Issues", icon: AlertTriangle, path: "/state-issues" },
  { name: "Client Guide", icon: Users, path: "/client-guide" },
  { name: "Schedule Batch Report", icon: Calendar, path: "/schedule-batch-report" },
  { name: "Document Transfer", icon: Download, path: "/document-transfer" },
  { name: "Administration", icon: Settings, path: "/administration" },
];

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(["Dashboard"]);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.name);
    const isActive = item.path ? isActivePath(item.path) : false;

    return (
      <div key={item.name} className="w-full">
        <motion.div
          whileHover={{ x: collapsed ? 0 : 2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start px-3 py-2 h-auto font-normal text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              level > 0 && "ml-6 text-sm",
              isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
              collapsed && "justify-center px-2"
            )}
            onClick={() => {
              if (hasChildren) {
                toggleExpanded(item.name);
              } else if (item.path) {
                handleNavigation(item.path);
              }
            }}
          >
            <item.icon className={cn("h-4 w-4", collapsed ? "" : "mr-3")} />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">{item.name}</span>
                {hasChildren && (
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      isExpanded ? "rotate-180" : ""
                    )}
                  />
                )}
              </>
            )}
          </Button>
        </motion.div>
        
        {hasChildren && !collapsed && (
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="py-1 space-y-1">
                  {item.children?.map(child => renderNavigationItem(child, level + 1))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className={cn(
        "h-screen bg-sidebar-background border-r border-sidebar-border flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-sidebar-foreground">Pipeway</span>
            </motion.div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-2">
        <nav className="space-y-1">
          {navigationItems.map(item => renderNavigationItem(item))}
        </nav>
      </div>

      {/* Bottom section with tabs */}
      {!collapsed && (
        <div className="border-t border-sidebar-border p-2">
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" className="flex-1 text-xs text-sidebar-foreground hover:bg-sidebar-accent">
              Advance
            </Button>
            <Button variant="ghost" size="sm" className="flex-1 text-xs text-sidebar-foreground hover:bg-sidebar-accent">
              Name
            </Button>
            <Button variant="ghost" size="sm" className="flex-1 text-xs text-sidebar-foreground hover:bg-sidebar-accent">
              Account
            </Button>
          </div>
          <Button className="w-full mt-2 bg-primary text-primary-foreground hover:bg-primary/90">
            Submit
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;