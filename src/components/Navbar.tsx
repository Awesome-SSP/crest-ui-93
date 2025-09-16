import { Bell, Settings, User, ChevronDown, BarChart3, DollarSign, TrendingDown, FileText, Map, Clock, AlertTriangle, BookOpen, ShieldCheck, FileQuestion, MessageSquare, Users, Calendar, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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
  const [theme, setTheme] = useState<'dark' | 'light'>(
    () => (typeof window !== 'undefined' && document.documentElement.classList.contains('light')) ? 'light' : 'dark'
  );
  const navigate = useNavigate();
  const location = useLocation();
  // Theme toggle logic
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.body.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.body.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Split navigation: main visible, overflow in 'More'
  const mainNavItems = [
    {
      name: "Dashboard",
      icon: BarChart3,
      path: "/",
      dropdown: [
        { label: "Dollars", icon: DollarSign, path: "/dollars" },
        { label: "Liquidation", icon: TrendingDown, path: "/liquidation" },
        { label: "Heat-Maps", icon: Map, path: "/heatmaps" },
        { label: "Inv Chart Batches", icon: BarChart3, path: "/inv-chart-batches" },
        { label: "Inventory", icon: BookOpen, path: "/inventory" },
        { label: "Judgment Performance", icon: ShieldCheck, path: "/judgment-performance" },
        { label: "Timeline", icon: Clock, path: "/timeline" },
      ],
    },
    { name: "Reports", icon: FileText, path: "/reports" },
    { name: "FAQ", icon: FileQuestion, path: "/faq" },
    { name: "Notices", icon: MessageSquare, path: "/notices" },
    { name: "State Issues", icon: AlertTriangle, path: "/state-issues" },
  ];
  const moreNavItems = [
    { name: "Client Guide", icon: Users, path: "/client-guide" },
    { name: "Schedule Batch Report", icon: Calendar, path: "/schedule-batch-report" },
    { name: "Document Transfer", icon: Download, path: "/document-transfer" },
    { name: "Administration", icon: Settings, path: "/administration" },
  ];


  // Render nav item as dropdown if it has dropdown items
  // (Removed duplicate renderNavItem declaration)
  const renderNavItem = (item: any) => {
    // Use theme-aware text color
    const activeClass = theme === 'light'
      ? 'bg-gray-200 text-navbar-foreground'
      : 'bg-white/20 text-white';
    const inactiveClass = theme === 'light'
      ? 'text-navbar-foreground hover:bg-gray-100'
      : 'text-white hover:bg-white/10';

    if (item.dropdown && item.dropdown.length > 0) {
      return (
        <DropdownMenu key={item.name}>
          <DropdownMenuTrigger asChild>
            <button
              className={`flex items-center gap-2 px-4 py-2 font-semibold text-base rounded-md transition-colors duration-200 ${isActivePage(item.path) ? activeClass : inactiveClass}`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 bg-white shadow-xl rounded-xl mt-2 p-2">
            {item.dropdown.map((drop: any) => (
              <DropdownMenuItem
                key={drop.label}
                onClick={() => handleNavClick(drop.path, drop.label)}
                className={`px-4 py-2 rounded-md text-gray-800 hover:bg-blue-50 font-medium flex items-center`}
              >
                {drop.icon && <drop.icon className="w-4 h-4 mr-2 text-primary" />} {drop.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    return (
      <button
        key={item.name}
        onClick={() => handleNavClick(item.path, item.name)}
        className={`flex items-center gap-2 px-4 py-2 font-semibold text-base rounded-md transition-colors duration-200 ${isActivePage(item.path) ? activeClass : inactiveClass}`}
      >
        <item.icon className="w-5 h-5" />
        <span>{item.name}</span>
      </button>
    );
  };

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


  // UI components grouped for dropdown
  const uiComponentGroups = [
    {
      group: "Forms",
      items: ["input", "checkbox", "radio-group", "switch", "textarea", "form", "select", "slider", "input-otp", "toggle", "toggle-group", "label"],
    },
    {
      group: "Data Display",
      items: ["card", "badge", "avatar", "table", "progress", "skeleton", "calendar", "chart", "carousel", "tabs", "pagination", "separator"],
    },
    {
      group: "Navigation",
      items: ["breadcrumb", "menubar", "navigation-menu", "sidebar", "collapsible", "resizable", "scroll-area"],
    },
    {
      group: "Feedback",
      items: ["alert", "alert-dialog", "toast", "toaster", "sonner", "dialog", "drawer", "popover", "hover-card", "tooltip", "context-menu", "sheet", "command"],
    },
  ];

  return (
    <div>
      <motion.nav
        className="bg-gradient-navbar text-navbar-foreground shadow-navbar border-b border-navbar-border relative z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-2 py-1 md:px-4 md:py-2">
          <div className="flex items-center justify-between">
            {/* Logo and Navigation */}
            <div className="flex items-center gap-1 md:gap-2">
              <div className="flex items-center gap-1 md:gap-2 mr-2 md:mr-6">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center shadow-md">
                  <BarChart3 className="w-5 h-5 text-navbar-foreground" />
                </div>
                <span className="text-lg md:text-2xl font-extrabold text-navbar-foreground tracking-tight">Pipeway</span>
              </div>
              <nav className="flex items-center gap-1 flex-wrap">
                {mainNavItems.map((item) => renderNavItem(item))}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 px-3 py-2 font-semibold text-base rounded-md text-white hover:bg-white/10 transition-colors duration-200">
                      <span>More</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 bg-white shadow-xl rounded-xl mt-2 p-2">
                    {moreNavItems.map((item) => (
                      <DropdownMenuItem
                        key={item.name}
                        onClick={() => handleNavClick(item.path, item.name)}
                        className="px-4 py-2 rounded-md text-gray-800 hover:bg-blue-50 font-medium flex items-center"
                      >
                        {item.icon && <item.icon className="w-4 h-4 mr-2 text-primary" />} {item.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Theme toggle button */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Toggle theme"
                  className="text-navbar-foreground/80 hover:text-navbar-foreground hover:bg-white/10"
                  onClick={toggleTheme}
                >
                  {theme === 'dark' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
                  )}
                </Button>
              </motion.div>
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
                    <Button variant="ghost" className="flex items-center space-x-1 md:space-x-2 text-navbar-foreground/80 hover:text-navbar-foreground hover:bg-white/10 px-2 md:px-3">
                      <Avatar className="w-7 h-7 md:w-8 md:h-8">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback className="bg-white/20 text-navbar-foreground">BD</AvatarFallback>
                      </Avatar>
                      <span className="hidden md:block text-sm">Bandana</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 md:w-56">
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