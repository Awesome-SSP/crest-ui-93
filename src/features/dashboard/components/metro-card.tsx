"use client"

import { useState, useEffect } from "react"
import { Card } from "./ui/card2"
import { cn } from "../lib/utils"

interface MetroCardProps {
  title: string
  data: Array<{
    label: string
    value: string | number
    trend?: "up" | "down" | "neutral"
    color?: string
  }>
  updateInterval?: number
  className?: string
  size?: "small" | "medium" | "large"
}

export function MetroCard({ title, data, updateInterval = 3000, className, size = "medium" }: MetroCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (data.length <= 1) return

    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % data.length)
        setTimeout(() => setIsTransitioning(false), 200)
      }, 200)
    }, updateInterval)

    return () => clearInterval(interval)
  }, [data.length, updateInterval])

  const currentData = data[currentIndex]

  const sizeClasses = {
    small: "h-32 w-full",
    medium: "h-40 w-full",
    large: "h-48 w-full",
  }

  const getTrendColor = (trend?: string) => {
    switch (trend) {
      case "up":
        return "text-green-500"
      case "down":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case "up":
        return "↗"
      case "down":
        return "↘"
      default:
        return "→"
    }
  }

  return (
    <div className={cn(sizeClasses[size], className)}>
      <Card
        className={cn(
          "relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg h-full",
          isTransitioning && "ring-2 ring-primary/20",
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />

        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-grid-pattern animate-pulse" />
        </div>

        <div className="relative p-6 h-full flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-2 uppercase tracking-wide">{title}</h3>

            <div
              className={cn(
                "transition-all duration-300 ease-in-out",
                isTransitioning ? "opacity-0 transform translate-y-2" : "opacity-100 transform translate-y-0",
              )}
            >
              <div className="text-2xl font-bold mb-1">{currentData?.value}</div>
              <div className="text-sm text-muted-foreground">{currentData?.label}</div>
            </div>
          </div>

          {currentData?.trend && (
            <div
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-all duration-300 ease-in-out",
                getTrendColor(currentData.trend),
                isTransitioning ? "opacity-0 transform translate-y-2" : "opacity-100 transform translate-y-0",
              )}
            >
              <span className="animate-pulse">{getTrendIcon(currentData.trend)}</span>
              <span className="capitalize">{currentData.trend}</span>
            </div>
          )}

          {data.length > 1 && (
            <div className="flex gap-1 mt-2">
              {data.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-300",
                    index === currentIndex ? "bg-primary scale-125" : "bg-muted-foreground/30",
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
