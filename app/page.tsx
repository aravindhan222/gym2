"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DesktopSidebar, MobileBottomNav } from "@/components/titanflow/navigation"
import { Dashboard } from "@/components/titanflow/dashboard"
import { CalorieEngine } from "@/components/titanflow/calorie-engine"
import { HIITTimer } from "@/components/titanflow/hiit-timer"
import { WorkoutLog } from "@/components/titanflow/workout-log"
import { ExerciseLibrary } from "@/components/titanflow/exercise-library"
import { WeeklySchedule } from "@/components/titanflow/weekly-schedule"
import { Zap, CalendarDays } from "lucide-react"

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

const tabTitles: Record<string, string> = {
  home: "Dashboard",
  calories: "Calorie Calculator",
  timer: "HIIT Timer",
  workout: "Workout Log",
  exercises: "Exercise Library",
  schedule: "Weekly Schedule",
}

export default function TitanFlowPage() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <DesktopSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Mobile Header */}
      <header className="sticky top-0 z-30 border-b border-border/30 bg-card/80 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3">
          <div className="flex items-center gap-2">
            <motion.div 
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-md shadow-primary/30"
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
            </motion.div>
            <div>
              <h1 className="text-sm font-black tracking-tight text-foreground">TitanFlow</h1>
              <p className="text-[9px] sm:text-[10px] text-primary font-medium">{tabTitles[activeTab]}</p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("schedule")}
            className="flex h-9 w-9 items-center justify-center rounded-lg sm:rounded-xl bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5" />
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:pl-64 xl:pl-72">
        <div className="mx-auto max-w-4xl px-3 sm:px-4 py-4 sm:py-6 pb-24 sm:pb-28 lg:px-6 xl:px-8 lg:py-6 xl:py-8 lg:pb-8">
          <AnimatePresence mode="wait">
            {activeTab === "home" && (
              <motion.div
                key="home"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <Dashboard onNavigate={setActiveTab} />
              </motion.div>
            )}

            {activeTab === "calories" && (
              <motion.div
                key="calories"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <CalorieEngine />
              </motion.div>
            )}

            {activeTab === "timer" && (
              <motion.div
                key="timer"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <HIITTimer />
              </motion.div>
            )}

            {activeTab === "workout" && (
              <motion.div
                key="workout"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <WorkoutLog />
              </motion.div>
            )}

            {activeTab === "exercises" && (
              <motion.div
                key="exercises"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <ExerciseLibrary />
              </motion.div>
            )}

            {activeTab === "schedule" && (
              <motion.div
                key="schedule"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <WeeklySchedule />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <MobileBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
