"use client"

import { motion } from "framer-motion"
import { 
  Home,
  Timer, 
  Dumbbell, 
  Calculator,
  Zap,
  BookOpen,
  CalendarDays,
  Activity
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navItems = [
  { id: "home", label: "Dashboard", icon: Home },
  { id: "calories", label: "Calories", icon: Calculator },
  { id: "timer", label: "Timer", icon: Timer },
  { id: "workout", label: "Workout", icon: Dumbbell },
  { id: "exercises", label: "Exercises", icon: BookOpen },
  { id: "schedule", label: "Schedule", icon: CalendarDays },
]

const mobileNavItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "calories", label: "Calc", icon: Calculator },
  { id: "timer", label: "Timer", icon: Timer },
  { id: "workout", label: "Log", icon: Dumbbell },
  { id: "exercises", label: "Lib", icon: BookOpen },
]

export function DesktopSidebar({ activeTab, onTabChange }: NavigationProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 xl:w-72 flex-col border-r border-border/30 bg-gradient-to-b from-card/90 to-card/60 backdrop-blur-2xl lg:flex">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 xl:px-6 py-6 xl:py-8">
        <motion.div 
          className="flex h-10 w-10 xl:h-12 xl:w-12 items-center justify-center rounded-xl xl:rounded-2xl bg-gradient-to-br from-energy-green via-energy-orange to-energy-red shadow-lg shadow-energy-green/30"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Zap className="h-5 w-5 xl:h-7 xl:w-7 text-white" />
        </motion.div>
        <div>
          <h1 className="text-xl xl:text-2xl font-black tracking-tight text-foreground">TitanFlow</h1>
          <p className="text-[10px] xl:text-xs font-medium bg-gradient-to-r from-energy-green to-energy-orange bg-clip-text text-transparent">All-in-One Gym OS</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 xl:px-4 py-4">
        <p className="px-3 xl:px-4 pb-3 text-[10px] xl:text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Main Menu</p>
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            // Cycle through colors for active state
            const colors = ["from-energy-green to-energy-green/80", "from-energy-orange to-energy-orange/80", "from-energy-red to-energy-red/80"]
            const activeColor = colors[index % colors.length]
            return (
              <li key={item.id}>
                <motion.button
                  onClick={() => onTabChange(item.id)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "relative flex w-full items-center gap-3 rounded-xl xl:rounded-2xl px-3 xl:px-4 py-3 text-left text-sm font-medium transition-all duration-300 min-h-[48px]",
                    isActive 
                      ? "text-white shadow-lg" 
                      : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-bg"
                      className={cn("absolute inset-0 rounded-xl xl:rounded-2xl bg-gradient-to-r", activeColor)}
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <Icon className={cn("relative z-10 h-5 w-5", isActive && "text-white")} />
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.div 
                      className="relative z-10 ml-auto h-2 w-2 rounded-full bg-white"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  )}
                </motion.button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Stats Card */}
      <div className="mx-3 xl:mx-4 mb-4 rounded-xl xl:rounded-2xl bg-gradient-to-br from-energy-green/20 via-energy-orange/10 to-transparent p-3 xl:p-4 border border-energy-green/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-9 w-9 xl:h-10 xl:w-10 items-center justify-center rounded-lg xl:rounded-xl bg-energy-green/20">
            <Activity className="h-4 w-4 xl:h-5 xl:w-5 text-energy-green" />
          </div>
          <div>
            <p className="text-[10px] xl:text-xs text-muted-foreground">Today&apos;s Progress</p>
            <p className="text-sm xl:text-base font-bold text-foreground">Keep pushing!</p>
          </div>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-background/50">
          <motion.div 
            className="h-full rounded-full bg-gradient-to-r from-energy-green via-energy-orange to-energy-red"
            initial={{ width: 0 }}
            animate={{ width: "65%" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border/30 px-5 xl:px-6 py-3 xl:py-4">
        <p className="text-[10px] xl:text-xs text-muted-foreground">
          Push your limits every day
        </p>
      </div>
    </aside>
  )
}

export function MobileBottomNav({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/30 bg-card/95 backdrop-blur-2xl safe-area-pb lg:hidden">
      <ul className="flex items-center justify-around px-1 py-1">
        {mobileNavItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          const colors = ["text-energy-green", "text-energy-orange", "text-energy-red", "text-energy-green", "text-energy-orange"]
          const activeColor = colors[index % colors.length]
          const bgColors = ["bg-energy-green/15", "bg-energy-orange/15", "bg-energy-red/15", "bg-energy-green/15", "bg-energy-orange/15"]
          const activeBg = bgColors[index % bgColors.length]
          return (
            <li key={item.id} className="flex-1">
              <motion.button
                onClick={() => onTabChange(item.id)}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "relative flex w-full min-h-[56px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-2 transition-all duration-300",
                  isActive 
                    ? activeColor
                    : "text-muted-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-active-bg"
                    className={cn("absolute inset-1 rounded-lg", activeBg)}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <motion.div
                  animate={isActive ? { y: -2 } : { y: 0 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <Icon className={cn("relative z-10 h-5 w-5 sm:h-6 sm:w-6", isActive && activeColor)} />
                </motion.div>
                <span className={cn(
                  "relative z-10 text-[9px] sm:text-[10px] font-semibold",
                  isActive ? activeColor : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
              </motion.button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
