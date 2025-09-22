interface CommandNavigationProps {
  isOpen: boolean
  onClose: () => void
}
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  ChevronRight,
  BarChart3,
  FileText,
  HelpCircle,
  MapPin,
  BookOpen,
  Calendar,
  FolderOpen,
  Settings,
  Command,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useNavigate } from "react-router-dom"

// Menu data structure based on the uploaded image
const menuData = {
  Dashboard: {
    icon: BarChart3,
    color: "bg-blue-500",
    items: [
      "Dollars",
      "Liquidation",
      "Heat-Maps",
      "Inv Chart Batches",
      "Inventory",
      "Judgement Performance",
      "Timeline",
    ],
  },
  Report: {
    icon: FileText,
    color: "bg-green-500",
    items: [],
  },
  FAQ: {
    icon: HelpCircle,
    color: "bg-purple-500",
    items: [],
  },
  "State Issues": {
    icon: MapPin,
    color: "bg-red-500",
    items: ["View State"],
  },
  "Client Guide": {
    icon: BookOpen,
    color: "bg-orange-500",
    items: ["ViewEdits", "View Client Guide"],
  },
  "Schedule Batch Report": {
    icon: Calendar,
    color: "bg-teal-500",
    items: ["Manual report Run", "SFTP Details", "View Query Report", "View Scheduled Report", "Schedular Logs"],
  },
  "Document Transfer": {
    icon: FolderOpen,
    color: "bg-indigo-500",
    items: ["My uploads", "my Downloads", "Company Upload/Download"],
  },
  Administration: {
    icon: Settings,
    color: "bg-gray-500",
    items: {
      "Manage State Issuess": [],
      "document Request Log": [],
      "Manage Settlements": [],
      "Manage FAQ": [],
      "Manage Notice": [],
      "Manage Company": ["Company Register", "View Bill of Sale", "View License Matrix", "Add Company"],
      "Manage Contact": ["Add Contact", "Manage User", "View Contact"],
      "Control File": {
        "SIF Form Control": ["Manage Email Content", "Manage SIF Parameters"],
        "Client Guide Text": [],
        "Media Scrub": [],
        "Client Status": [],
        Report: [],
      },
      "Client Onboarding": [],
      "Invoicing Tool": [],
    },
  },
}

interface CommandNavigationProps {
  isOpen: boolean
  onClose: () => void
}

export function CommandNavigation({ isOpen, onClose }: CommandNavigationProps) {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [filteredItems, setFilteredItems] = useState<any[]>([])

  // Flatten menu structure for search
  const flattenMenu = (obj: any, path: string[] = []): any[] => {
    const items: any[] = []

    Object.entries(obj).forEach(([key, value]) => {
      const currentPath = [...path, key]
      items.push({ name: key, path: currentPath, type: "menu" })

      if (Array.isArray(value)) {
        value.forEach((item) => {
          items.push({ name: item, path: [...currentPath, item], type: "item" })
        })
      } else if (typeof value === "object" && value !== null && !value.icon) {
        items.push(...flattenMenu(value, currentPath))
      }
    })

    return items
  }

  const allMenuItems = flattenMenu(menuData)

  useEffect(() => {
    if (searchTerm) {
      const filtered = allMenuItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.path.some((p: string) => p.toLowerCase().includes(searchTerm.toLowerCase())),
      )
      setFilteredItems(filtered)
    } else {
      setFilteredItems([])
    }
  }, [searchTerm])

  const getCurrentLevel = () => {
    let current: any = menuData
    for (const pathItem of currentPath) {
      current = current[pathItem]
      if (current?.items) current = current.items
    }
    return current
  }

  const handleNavigation = (item: string) => {
    const newPath = [...currentPath, item]
    setCurrentPath(newPath)
    setSearchTerm("")
  }

  const handleBack = () => {
    setCurrentPath(currentPath.slice(0, -1))
  }

  const handleItemClick = (item: any) => {
    if (item.type === "item") {
      // Build a kebab-cased route from the path and navigate
      const nameToRoute = (parts: string[]) => {
        // Known overrides for special names
        const overrides: Record<string, string> = {
          "Dollars": "/dollars",
          "Liquidation": "/liquidation",
          "Heat-Maps": "/heatmaps",
          "Inv Chart Batches": "/inv-chart-batches",
          "Inventory": "/inventory",
          "Judgement Performance": "/judgment-performance",
          "Timeline": "/timeline",
          "Schedule Batch Report": "/schedule-batch-report",
          "Document Transfer": "/document-transfer",
          "State Issues": "/state-issues",
          "Client Guide": "/client-guide",
          "Reports": "/reports",
        }

        // If the final part matches an override, return that
        const final = parts[parts.length - 1]
        if (overrides[final]) return overrides[final]

        // Otherwise build a kebab-cased path from the full parts
        const kebab = parts
          .map((p) =>
            p
              .replace(/\s+/g, "-")
              .replace(/[^a-zA-Z0-9\-]/g, "")
              .replace(/--+/g, "-")
              .toLowerCase(),
          )
          .join("/")

        // Prepend with a leading slash. If it starts with administration, keep it under /administration
        if (kebab.startsWith("administration")) return `/${kebab}`
        return `/${kebab}`
      }

      const route = nameToRoute(item.path)
      try {
        navigate(route)
      } catch (e) {
        // fallback: close dialog and log
        console.warn("Navigation failed", e)
      }
      onClose()
    } else {
      setCurrentPath(item.path)
      setSearchTerm("")
    }
  }

  const renderBreadcrumb = () => {
    if (currentPath.length === 0) return null

    return (
      <div className="flex items-center space-x-2 mb-4 text-sm text-muted-foreground">
        <Button variant="ghost" size="sm" onClick={() => setCurrentPath([])}>
          Home
        </Button>
        {currentPath.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight className="h-3 w-3" />
            <Button variant="ghost" size="sm" onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}>
              {item}
            </Button>
          </div>
        ))}
      </div>
    )
  }

  const renderCurrentLevel = () => {
    const current = getCurrentLevel()

    if (currentPath.length === 0) {
      // Show main menu cards
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(menuData).map(([key, value]) => {
            const IconComponent = value.icon
            return (
              <Button
                key={key}
                variant="outline"
                className="h-24 flex flex-col items-center justify-center space-y-2 hover:scale-105 transition-transform bg-transparent"
                onClick={() => handleNavigation(key)}
              >
                <div className={`w-8 h-8 rounded-lg ${value.color} flex items-center justify-center`}>
                  <IconComponent className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-center">{key}</span>
              </Button>
            )
          })}
        </div>
      )
    }

    // Show current level items
    if (Array.isArray(current)) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {current.map((item, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start h-12 hover:bg-accent bg-transparent"
              onClick={() => console.log(`[v0] Navigating to: ${[...currentPath, item].join(" > ")}`)}
            >
              <ChevronRight className="h-4 w-4 mr-2" />
              {item}
            </Button>
          ))}
        </div>
      )
    }

    // Show object items
    if (typeof current === "object") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {Object.entries(current).map(([key, value]) => (
            <Button
              key={key}
              variant="outline"
              className="justify-between h-12 hover:bg-accent bg-transparent"
              onClick={() => handleNavigation(key)}
            >
              <span>{key}</span>
              {(Array.isArray(value) && value.length > 0) ||
                (typeof value === "object" && Object.keys(value).length > 0) ? (
                <Badge variant="secondary" className="ml-2">
                  {Array.isArray(value) ? value.length : Object.keys(value).length}
                </Badge>
              ) : null}
            </Button>
          ))}
        </div>
      )
    }

    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Command className="h-5 w-5" />
            <span>Navigation Command Center</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for any menu item... (e.g., 'manage email', 'inventory', 'company register')"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Search Results */}
          {searchTerm && filteredItems.length > 0 && (
            <div className="max-h-60 overflow-y-auto space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Search Results</h3>
              {filteredItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start h-auto py-2 px-3"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-xs text-muted-foreground">{item.path.join(" > ")}</span>
                  </div>
                </Button>
              ))}
            </div>
          )}

          {/* Navigation Area */}
          {!searchTerm && (
            <div className="space-y-4">
              {/* Breadcrumb */}
              {renderBreadcrumb()}

              {/* Back Button */}
              {currentPath.length > 0 && (
                <Button variant="outline" onClick={handleBack} className="mb-4 bg-transparent">
                  ← Back
                </Button>
              )}

              {/* Current Level */}
              <div className="max-h-96 overflow-y-auto">{renderCurrentLevel()}</div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
