"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { 
  Flame, 
  Timer,
  Dumbbell,
  TrendingUp,
  Target,
  Zap,
  Award,
  Scale,
  Ruler,
  ChevronRight
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DashboardProps {
  onNavigate: (tab: string) => void
}

const quickActions = [
  { id: "timer", label: "Start HIIT", icon: Timer, color: "bg-energy-red", description: "Interval training" },
  { id: "workout", label: "Log Workout", icon: Dumbbell, color: "bg-energy-green", description: "Track lifts" },
  { id: "calories", label: "Calories", icon: Flame, color: "bg-energy-orange", description: "Calculate TDEE" },
]

const weeklyStats = [
  { day: "M", completed: true },
  { day: "T", completed: true },
  { day: "W", completed: true },
  { day: "T", completed: false },
  { day: "F", completed: false },
  { day: "S", completed: false },
  { day: "S", completed: false },
]

export function Dashboard({ onNavigate }: DashboardProps) {
  const [weight, setWeight] = useState(70)
  const [height, setHeight] = useState(175)

  const bmi = useMemo(() => {
    const heightInMeters = height / 100
    return weight / (heightInMeters * heightInMeters)
  }, [weight, height])

  const bmiCategory = useMemo(() => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-chart-4" }
    if (bmi < 25) return { label: "Normal", color: "text-energy-green" }
    if (bmi < 30) return { label: "Overweight", color: "text-energy-orange" }
    return { label: "Obese", color: "text-energy-red" }
  }, [bmi])

  const currentStreak = 3

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      className="space-y-4 sm:space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-energy-green/20 via-energy-orange/10 to-energy-red/5">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <motion.h1 
                  className="text-xl sm:text-2xl lg:text-3xl font-black text-foreground text-balance"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Track Your Fitness Journey
                </motion.h1>
                <p className="mt-1 text-sm sm:text-base text-muted-foreground">Push your limits. Achieve greatness.</p>
              </div>
              <motion.button
                onClick={() => onNavigate("workout")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-energy-green to-energy-green/80 px-4 sm:px-6 py-3 sm:py-4 font-bold text-white shadow-lg shadow-energy-green/30 min-h-[48px] w-full sm:w-auto"
              >
                <Zap className="h-5 w-5" />
                Start Workout
              </motion.button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Row */}
      <motion.div variants={itemVariants} className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Streak", value: `${currentStreak}d`, icon: Flame, color: "text-energy-red", bg: "bg-energy-red/15" },
          { label: "Workouts", value: "12", icon: Dumbbell, color: "text-energy-green", bg: "bg-energy-green/15" },
          { label: "Calories", value: "8.4k", icon: TrendingUp, color: "text-energy-orange", bg: "bg-energy-orange/15" },
          { label: "Goals", value: "3/5", icon: Target, color: "text-chart-4", bg: "bg-chart-4/15" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <Card className="border-border/30 bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-colors">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={cn("flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl", stat.bg, stat.color)}>
                    <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Weekly Progress */}
      <motion.div variants={itemVariants}>
        <Card className="border-border/30 bg-card/60 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-energy-orange" />
                <h3 className="font-bold text-sm sm:text-base text-foreground">Weekly Progress</h3>
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground">{currentStreak} day streak</span>
            </div>
            <div className="flex items-center justify-between gap-1.5 sm:gap-2">
              {weeklyStats.map((day, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex flex-1 flex-col items-center gap-1.5 sm:gap-2"
                >
                  <div className={cn(
                    "flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl transition-all",
                    day.completed 
                      ? "bg-gradient-to-br from-energy-green to-energy-green/80 text-white shadow-md shadow-energy-green/30" 
                      : "bg-secondary text-muted-foreground"
                  )}>
                    {day.completed && <Zap className="h-4 w-4 sm:h-5 sm:w-5" />}
                  </div>
                  <span className={cn(
                    "text-[10px] sm:text-xs font-medium",
                    day.completed ? "text-energy-green" : "text-muted-foreground"
                  )}>
                    {day.day}
                  </span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <h3 className="mb-2 sm:mb-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">Quick Actions</h3>
        <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-3">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.id}
              onClick={() => onNavigate(action.id)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="group flex items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-border/30 bg-card/60 p-3 sm:p-4 text-left backdrop-blur-sm hover:bg-card/80 hover:border-energy-green/30 transition-all min-h-[64px] sm:min-h-[80px]"
            >
              <div className={cn("flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl text-white shrink-0", action.color)}>
                <action.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm sm:text-base text-foreground">{action.label}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{action.description}</p>
              </div>
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-energy-green group-hover:translate-x-1 transition-all shrink-0" />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* BMI Calculator */}
      <motion.div variants={itemVariants}>
        <Card className="border-border/30 bg-card/60 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col lg:flex-row">
              {/* BMI Inputs */}
              <div className="flex-1 p-4 sm:p-5 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Scale className="h-4 w-4 sm:h-5 sm:w-5 text-energy-orange" />
                  <h3 className="font-bold text-sm sm:text-base text-foreground">BMI Calculator</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Scale className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        Weight
                      </span>
                      <span className="font-medium text-foreground">{weight} kg</span>
                    </label>
                    <input
                      type="range"
                      min={40}
                      max={150}
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="w-full h-2 appearance-none rounded-full bg-secondary cursor-pointer"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Ruler className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        Height
                      </span>
                      <span className="font-medium text-foreground">{height} cm</span>
                    </label>
                    <input
                      type="range"
                      min={140}
                      max={220}
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full h-2 appearance-none rounded-full bg-secondary cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* BMI Result */}
              <div className="flex-1 bg-gradient-to-br from-energy-green/10 via-energy-orange/5 to-transparent p-4 sm:p-5 flex flex-col items-center justify-center min-h-[160px]">
                <motion.div 
                  className="text-center"
                  key={bmi.toFixed(1)}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Your BMI</p>
                  <p className="text-4xl sm:text-5xl font-black text-foreground mb-2">{bmi.toFixed(1)}</p>
                  <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs sm:text-sm font-semibold", bmiCategory.color, "bg-secondary")}>
                    {bmiCategory.label}
                  </span>
                </motion.div>
                
                {/* BMI Scale */}
                <div className="mt-4 w-full max-w-[180px] sm:max-w-[200px]">
                  <div className="relative h-2.5 sm:h-3 w-full rounded-full overflow-hidden bg-gradient-to-r from-chart-4 via-energy-green via-50% via-energy-orange to-energy-red">
                    <motion.div
                      className="absolute top-0 h-full w-1 bg-white shadow-lg rounded-full"
                      initial={{ left: "0%" }}
                      animate={{ 
                        left: `${Math.min(Math.max((bmi - 15) / 25 * 100, 0), 100)}%` 
                      }}
                      transition={{ type: "spring", stiffness: 100 }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-[9px] sm:text-[10px] text-muted-foreground">
                    <span>15</span>
                    <span>25</span>
                    <span>30</span>
                    <span>40</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Today's Workout Preview */}
      <motion.div variants={itemVariants}>
        <Card className="border-border/30 bg-card/60 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5 text-energy-green" />
                <h3 className="font-bold text-sm sm:text-base text-foreground">Today&apos;s Workout</h3>
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-energy-green bg-energy-green/10 px-2 py-1 rounded-full">Chest Day</span>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {[
                { name: "Bench Press", sets: "4x8", weight: "60kg" },
                { name: "Incline DB Press", sets: "3x10", weight: "24kg" },
                { name: "Cable Flyes", sets: "3x12", weight: "15kg" },
              ].map((exercise, index) => (
                <motion.div
                  key={exercise.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center justify-between rounded-lg sm:rounded-xl bg-secondary/50 p-2.5 sm:p-3"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md sm:rounded-lg bg-energy-green/20 text-xs sm:text-sm font-bold text-energy-green shrink-0">
                      {index + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm sm:text-base text-foreground truncate">{exercise.name}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{exercise.sets}</p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-energy-orange shrink-0 ml-2">{exercise.weight}</span>
                </motion.div>
              ))}
            </div>
            <motion.button
              onClick={() => onNavigate("workout")}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="mt-3 sm:mt-4 flex w-full items-center justify-center gap-2 rounded-lg sm:rounded-xl border border-dashed border-energy-green/50 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-energy-green hover:bg-energy-green/5 transition-colors min-h-[44px]"
            >
              Start This Workout
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
