"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Flame, 
  User, 
  Ruler, 
  Scale,
  Activity,
  Minus,
  Plus,
  TrendingUp,
  TrendingDown,
  Target,
  Utensils
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type Gender = "male" | "female"
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very-active"

const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  "very-active": 1.9,
}

const activityLabels: Record<ActivityLevel, { label: string; description: string }> = {
  sedentary: { label: "Sedentary", description: "Little or no exercise" },
  light: { label: "Lightly Active", description: "1-3 days/week" },
  moderate: { label: "Moderately Active", description: "3-5 days/week" },
  active: { label: "Very Active", description: "6-7 days/week" },
  "very-active": { label: "Extra Active", description: "Athlete level" },
}

function RadialProgress({ 
  value, 
  max, 
  label, 
  size = 200 
}: { 
  value: number
  max: number
  label: string
  size?: number 
}) {
  const percentage = Math.min((value / max) * 100, 100)
  const strokeWidth = 14
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Background glow */}
      <motion.div 
        className="absolute inset-0 rounded-full blur-2xl"
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.05, 1]
        }}
        transition={{ repeat: Infinity, duration: 3 }}
        style={{ 
          background: `radial-gradient(circle, oklch(0.75 0.2 145 / 0.4) 0%, transparent 70%)` 
        }}
      />
      
      {/* SVG Ring */}
      <svg 
        width={size} 
        height={size} 
        className="rotate-[-90deg] transform"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="oklch(0.22 0.02 150)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#calorie-gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="drop-shadow-[0_0_12px_oklch(0.75_0.2_145)]"
        />
        <defs>
          <linearGradient id="calorie-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.75 0.2 145)" />
            <stop offset="50%" stopColor="oklch(0.75 0.18 55)" />
            <stop offset="100%" stopColor="oklch(0.6 0.22 25)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center text */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.span 
            className="text-5xl font-black text-foreground tabular-nums"
            key={value}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {value.toLocaleString()}
          </motion.span>
        </AnimatePresence>
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      </div>
    </div>
  )
}

export function CalorieEngine() {
  const [gender, setGender] = useState<Gender>("male")
  const [age, setAge] = useState(25)
  const [weight, setWeight] = useState(70) // kg
  const [height, setHeight] = useState(175) // cm
  const [activity, setActivity] = useState<ActivityLevel>("moderate")

  // Mifflin-St Jeor Formula
  const bmr = useMemo(() => {
    if (gender === "male") {
      return Math.round(10 * weight + 6.25 * height - 5 * age + 5)
    }
    return Math.round(10 * weight + 6.25 * height - 5 * age - 161)
  }, [gender, age, weight, height])

  const tdee = useMemo(() => {
    return Math.round(bmr * activityMultipliers[activity])
  }, [bmr, activity])

  const calorieGoals = useMemo(() => ({
    lose: Math.round(tdee - 500),
    maintain: tdee,
    gain: Math.round(tdee + 500),
  }), [tdee])

  // Macro suggestions
  const macros = useMemo(() => ({
    protein: Math.round(weight * 2), // 2g per kg
    carbs: Math.round((tdee * 0.45) / 4), // 45% of calories
    fat: Math.round((tdee * 0.25) / 9), // 25% of calories
  }), [weight, tdee])

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-border/30 bg-gradient-to-br from-energy-orange/20 via-energy-green/10 to-transparent overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-energy-orange to-energy-red text-white">
                <Flame className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Calorie Calculator</h2>
                <p className="text-sm text-muted-foreground">Mifflin-St Jeor Formula</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Calculator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-border/30 bg-card/60 backdrop-blur-sm">
          <CardContent className="p-5">
            <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
              {/* Radial Progress */}
              <div className="flex flex-col items-center gap-4">
                <RadialProgress 
                  value={tdee} 
                  max={4000} 
                  label="Daily Calories (TDEE)"
                  size={240}
                />
                <motion.div 
                  className="flex items-center gap-2 rounded-full bg-energy-green/10 px-4 py-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Activity className="h-4 w-4 text-energy-green" />
                  <span className="text-sm font-semibold text-energy-green">
                    BMR: {bmr.toLocaleString()} kcal
                  </span>
                </motion.div>
              </div>

              {/* Controls */}
              <div className="flex-1 space-y-5 w-full">
                {/* Gender Toggle */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Gender</Label>
                  <div className="flex gap-2">
                    {(["male", "female"] as const).map((g) => (
                      <motion.button
                        key={g}
                        onClick={() => setGender(g)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "flex-1 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all min-h-[48px]",
                          gender === g
                            ? "bg-gradient-to-r from-energy-green to-energy-green/80 text-white shadow-lg shadow-energy-green/30"
                            : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                        )}
                      >
                        {g === "male" ? "Male" : "Female"}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Age */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <User className="h-4 w-4" />
                      Age
                    </Label>
                    <span className="text-sm font-bold text-foreground tabular-nums">{age} years</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setAge(Math.max(15, age - 1))}
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </motion.button>
                    <Slider
                      value={[age]}
                      onValueChange={([v]) => setAge(v)}
                      min={15}
                      max={80}
                      step={1}
                      className="flex-1"
                    />
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setAge(Math.min(80, age + 1))}
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Weight */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Scale className="h-4 w-4" />
                      Weight
                    </Label>
                    <span className="text-sm font-bold text-foreground tabular-nums">{weight} kg</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setWeight(Math.max(40, weight - 1))}
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </motion.button>
                    <Slider
                      value={[weight]}
                      onValueChange={([v]) => setWeight(v)}
                      min={40}
                      max={200}
                      step={1}
                      className="flex-1"
                    />
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setWeight(Math.min(200, weight + 1))}
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Height */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Ruler className="h-4 w-4" />
                      Height
                    </Label>
                    <span className="text-sm font-bold text-foreground tabular-nums">{height} cm</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setHeight(Math.max(140, height - 1))}
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </motion.button>
                    <Slider
                      value={[height]}
                      onValueChange={([v]) => setHeight(v)}
                      min={140}
                      max={220}
                      step={1}
                      className="flex-1"
                    />
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setHeight(Math.min(220, height + 1))}
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Activity Level */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Activity className="h-4 w-4" />
                    Activity Level
                  </Label>
                  <Select value={activity} onValueChange={(v) => setActivity(v as ActivityLevel)}>
                    <SelectTrigger className="min-h-[48px] rounded-2xl border-border/30 bg-secondary text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border/30">
                      {Object.entries(activityLabels).map(([key, { label, description }]) => (
                        <SelectItem key={key} value={key} className="text-foreground">
                          <div className="flex flex-col">
                            <span className="font-medium">{label}</span>
                            <span className="text-xs text-muted-foreground">{description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Calorie Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid gap-4 sm:grid-cols-3"
      >
        {[
          { label: "Lose Weight", value: calorieGoals.lose, icon: TrendingDown, color: "text-energy-red", bg: "bg-energy-red/10", description: "-500 kcal deficit" },
          { label: "Maintain", value: calorieGoals.maintain, icon: Target, color: "text-energy-green", bg: "bg-energy-green/10", description: "Stay balanced" },
          { label: "Gain Muscle", value: calorieGoals.gain, icon: TrendingUp, color: "text-energy-orange", bg: "bg-energy-orange/10", description: "+500 kcal surplus" },
        ].map((goal, i) => (
          <motion.div
            key={goal.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <Card className="border-border/30 bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-colors cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", goal.bg)}>
                    <goal.icon className={cn("h-5 w-5", goal.color)} />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">{goal.label}</span>
                </div>
                <p className={cn("text-3xl font-black tabular-nums", goal.color)}>
                  {goal.value.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{goal.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Macro Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-border/30 bg-card/60 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-bold text-foreground">
              <Utensils className="h-5 w-5 text-energy-orange" />
              Suggested Daily Macros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Protein", value: macros.protein, unit: "g", color: "bg-energy-red", percent: "25%" },
                { label: "Carbs", value: macros.carbs, unit: "g", color: "bg-energy-green", percent: "45%" },
                { label: "Fat", value: macros.fat, unit: "g", color: "bg-energy-orange", percent: "30%" },
              ].map((macro, index) => (
                <motion.div
                  key={macro.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3"
                >
                  <div className={cn("h-10 w-1.5 rounded-full", macro.color)} />
                  <div>
                    <p className="text-sm text-muted-foreground">{macro.label}</p>
                    <p className="text-xl font-bold text-foreground tabular-nums">
                      {macro.value}{macro.unit}
                    </p>
                  </div>
                  <span className="ml-auto text-xs text-muted-foreground">{macro.percent}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
