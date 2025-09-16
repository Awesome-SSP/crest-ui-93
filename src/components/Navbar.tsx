import { Bell, Settings, User, ChevronDown, BarChart3, DollarSign, TrendingDown, FileText, Map, Clock, AlertTriangle, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SubNavbar from "./SubNavbar";

interface NavbarProps {
  onNavigationHover?: (section: string | null) => void;
}

const Navbar = ({ onNavigationHover }: NavbarProps) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { name: "Dashboard", icon: BarChart3, section: "dashboard", path: "/" },
    { name: "Dollars", icon: DollarSign, section: "dollars", path: "/" },
    { name: "Liquidation", icon: TrendingDown, section: "liquidation", path: "/liquidation" },
    { name: "Reports", icon: FileText, section: "reports", path: "/" },
    { name: "Heat Maps", icon: Map, section: "heatmaps", path: "/heatmaps" },
    { name: "Inv Chart Batches", icon: BarChart3, section: "invchartbatches", path: "/inv-chart-batches" },
    { name: "Inventory", icon: BookOpen, section: "inventory", path: "/inventory" },
    { name: "Timeline", icon: Clock, section: "timeline", path: "/timeline" },
    { name: "State Issues", icon: AlertTriangle, section: "stateissues", path: "/" },
  ];

  const handleNavHover = (section: string | null) => {
    setHoveredSection(section);
    onNavigationHover?.(section);
  };

  const handleNavClick = (path: string, section: string) => {
    navigate(path);
    setHoveredSection(null);
  };

  const isActivePage = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div>
      <motion.nav 
        className="bg-gradient-navbar shadow-navbar border-b border-navbar-border relative z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-navbar-foreground" />
                </div>
                <span className="text-xl font-bold text-navbar-foreground">Pipeway</span>
              </motion.div>
              
              <nav className="hidden md:flex items-center space-x-1">
                {navigationItems.map((item) => (
                  <motion.div 
                    key={item.name} 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => handleNavHover(item.section)}
                    onMouseLeave={() => handleNavHover(null)}
                  >
                    <Button
                      onClick={() => handleNavClick(item.path, item.section)}
                      variant={isActivePage(item.path) ? "secondary" : "ghost"}
                      size="sm"
                      className={`flex items-center space-x-2 px-4 py-2 cursor-pointer ${
                        isActivePage(item.path) 
                          ? "bg-white/20 text-navbar-foreground font-medium" 
                          : "text-navbar-foreground/80 hover:text-navbar-foreground hover:bg-white/10"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Button>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" className="text-navbar-foreground/80 hover:text-navbar-foreground hover:bg-white/10">
                  <Bell className="w-5 h-5" />
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" className="text-navbar-foreground/80 hover:text-navbar-foreground hover:bg-white/10">
                  <Settings className="w-5 h-5" />
                </Button>
              </motion.div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Button variant="ghost" className="flex items-center space-x-2 text-navbar-foreground/80 hover:text-navbar-foreground hover:bg-white/10">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback className="bg-white/20 text-navbar-foreground">BD</AvatarFallback>
                      </Avatar>
                      <span className="hidden md:block">Bandana</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Dynamic SubNavbar */}
      <AnimatePresence>
        {hoveredSection && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-40"
            onMouseEnter={() => handleNavHover(hoveredSection)}
            onMouseLeave={() => handleNavHover(null)}
          >
            <SubNavbar section={hoveredSection} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;