import { Bell, Settings, User, ChevronDown, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const TopNavbar = () => {
  return (
    <motion.nav 
      className="bg-primary shadow-navbar border-b border-primary/20 relative z-40"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Filters */}
          <div className="hidden xl:flex items-center space-x-4 text-sm text-primary-foreground/90">
            <span>Track Type: ALL</span>
            <span>Start Batch: 2024-10</span>
            <span>End Batch: 2025-09</span>
            <span>Attorney Code: ALL</span>
            <span>Client Code: ALL</span>
            <span>Portfolio Code: ALL</span>
            <span>Product Code: ALL</span>
            <span>State Code: ALL</span>
            <span>Account Type: ALL</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 ml-2"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10">
                <Bell className="w-5 h-5" />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10">
                <Settings className="w-5 h-5" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10">
                <Search className="w-5 h-5" />
              </Button>
            </motion.div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button variant="ghost" className="flex items-center space-x-2 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-white/20 text-primary-foreground">BD</AvatarFallback>
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

        {/* Dropdown Navigation */}
        <div className="mt-3">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Dashboards</NavigationMenuTrigger>
                <NavigationMenuContent className="p-3">
                  <div className="grid grid-cols-2 gap-2 min-w-[320px]">
                    <NavigationMenuLink asChild>
                      <Link to="/" className="px-3 py-2 rounded-md hover:bg-muted/30">Dashboard</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="/dollars" className="px-3 py-2 rounded-md hover:bg-muted/30">Dollars</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="/liquidation" className="px-3 py-2 rounded-md hover:bg-muted/30">Liquidation</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="/heatmaps" className="px-3 py-2 rounded-md hover:bg-muted/30">Heat Maps</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="/inv-chart-batches" className="px-3 py-2 rounded-md hover:bg-muted/30">Inv Chart Batches</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="/timeline" className="px-3 py-2 rounded-md hover:bg-muted/30">Timeline</Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
                <NavigationMenuContent className="p-3">
                  <div className="grid grid-cols-2 gap-2 min-w-[320px]">
                    <NavigationMenuLink asChild>
                      <Link to="/reports" className="px-3 py-2 rounded-md hover:bg-muted/30">Reports</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="/faq" className="px-3 py-2 rounded-md hover:bg-muted/30">FAQ</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="/notices" className="px-3 py-2 rounded-md hover:bg-muted/30">Notices</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="/client-guide" className="px-3 py-2 rounded-md hover:bg-muted/30">Client Guide</Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Operations</NavigationMenuTrigger>
                <NavigationMenuContent className="p-3">
                  <div className="grid grid-cols-2 gap-2 min-w-[320px]">
                    <NavigationMenuLink asChild>
                      <Link to="/state-issues" className="px-3 py-2 rounded-md hover:bg-muted/30">State Issues</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="/schedule-batch-report" className="px-3 py-2 rounded-md hover:bg-muted/30">Schedule Batch Report</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="/document-transfer" className="px-3 py-2 rounded-md hover:bg-muted/30">Document Transfer</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="/administration" className="px-3 py-2 rounded-md hover:bg-muted/30">Administration</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="/judgment-performance" className="px-3 py-2 rounded-md hover:bg-muted/30">Judgment Performance</Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </motion.nav>
  );
};

export default TopNavbar;