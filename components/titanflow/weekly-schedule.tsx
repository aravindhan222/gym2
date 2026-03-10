"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  CalendarDays,
  Dumbbell,
  Heart,
  Zap,
  Check,
  ChevronRight,
  Sparkles
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface WorkoutDay {
  day: string
  shortDay: string
  focus: string
  exercises: string[]
  color: string
  icon: React.ElementType
  isRestDay?: boolean
}

const weeklyPlan: WorkoutDay[] = [
  {
    day: "Monday",
    shortDay: "Mon",
    focus: "Chest",
    exercises: ["Bench Press", "Incline Dumbbell Press", "Cable Flyes", "Push-ups"],
    color: "bg-work-red",
    icon: Dumbbell
  },
  {
    day: "Tuesday",
    shortDay: "Tue",
    focus: "Back",
    exercises: ["Deadlift", "Pull-ups", "Barbell Rows", "Lat Pulldown"],
    color: "bg-chart-2",
    icon: Dumbbell
  },
  {
    day: "Wednesday",
    shortDay: "Wed",
    focus: "Legs",
    exercises: ["Squats", "Leg Press", "Lunges", "Leg Curls"],
    color: "bg-chart-3",
    icon: Dumbbell
  },
  {
    day: "Thursday",
    shortDay: "Thu",
    focus: "Shoulders",
    exercises: ["Overhead Press", "Lateral Raises", "Front Raises", "Face Pulls"],
    color: "bg-chart-4",
    icon: Dumbbell
  },
  {
    day: "Friday",
    shortDay: "Fri",
    focus: "Arms",
    exercises: ["Barbell Curls", "Tricep Dips", "Hammer Curls", "Skull Crushers"],
    color: "bg-primary",
    icon: Dumbbell
  },
  {
    day: "Saturday",
    shortDay: "Sat",
    focus: "Cardio",
    exercises: ["HIIT Session", "Running", "Jump Rope", "Burpees"],
    color: "bg-work-red",
    icon: Heart
  },
  {
    day: "Sunday",
    shortDay: "Sun",
    focus: "Rest",
    exercises: ["Active Recovery", "Stretching", "Light Walk", "Foam Rolling"],
    color: "bg-rest-blue",
    icon: Sparkles,
    isRestDay: true
  },
]

export function WeeklySchedule() {
  const [selectedDay, setSelectedDay] = useState<WorkoutDay | null>(null)
  const today = new Date().getDay()
  const todayIndex = today === 0 ? 6 : today - 1

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-border/30 bg-gradient-to-br from-primary/10 to-transparent">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <CalendarDays className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Weekly Workout Plan</h2>
                <p className="text-sm text-muted-foreground">Your 7-day training split</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Mini Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-border/30 bg-card/60 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-1">
              {weeklyPlan.map((day, index) => (
                <motion.button
                  key={day.day}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedDay(selectedDay?.day === day.day ? null : day)}
                  className={cn(
                    "relative flex-1 flex flex-col items-center gap-1 rounded-2xl py-3 transition-all min-h-[72px]",
                    selectedDay?.day === day.day
                      ? cn(day.color, "text-white shadow-lg")
                      : index === todayIndex
                      ? "bg-secondary text-foreground ring-2 ring-primary"
                      : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                  )}
                >
                  <span className="text-[10px] font-semibold uppercase">{day.shortDay}</span>
                  <day.icon className="h-4 w-4" />
                  {index === todayIndex && selectedDay?.day !== day.day && (
                    <motion.div
                      className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Selected Day Detail */}
      <AnimatePresence mode="wait">
        {selectedDay && (
          <motion.div
            key={selectedDay.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className={cn("border-border/30 overflow-hidden", selectedDay.isRestDay && "bg-gradient-to-br from-rest-blue/10 to-transparent")}>
              <CardContent className="p-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl text-white", selectedDay.color)}>
                    <selectedDay.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{selectedDay.day}</h3>
                    <p className={cn("text-sm font-semibold", selectedDay.isRestDay ? "text-rest-blue" : "text-primary")}>
                      {selectedDay.focus} {selectedDay.isRestDay ? "Day" : "Workout"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedDay.exercises.map((exercise, index) => (
                    <motion.div
                      key={exercise}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3"
                    >
                      <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg text-white text-xs font-bold", selectedDay.color)}>
                        {index + 1}
                      </div>
                      <span className="font-medium text-foreground">{exercise}</span>
                    </motion.div>
                  ))}
                </div>

                {!selectedDay.isRestDay && (
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={cn(
                      "mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white min-h-[48px]",
                      selectedDay.color
                    )}
                  >
                    <Zap className="h-5 w-5" />
                    Start {selectedDay.focus} Workout
                  </motion.button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Week View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-1">Full Schedule</h3>
        {weeklyPlan.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
          >
            <Card 
              className={cn(
                "group cursor-pointer border-border/30 bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all",
                index === todayIndex && "ring-2 ring-primary/50"
              )}
              onClick={() => setSelectedDay(selectedDay?.day === day.day ? null : day)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl text-white",
                      day.color,
                      day.isRestDay && "opacity-70"
                    )}>
                      <day.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-foreground">{day.day}</h4>
                        {index === todayIndex && (
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Today</span>
                        )}
                      </div>
                      <p className={cn("text-sm", day.isRestDay ? "text-rest-blue" : "text-muted-foreground")}>
                        {day.focus} {day.isRestDay ? "- Recovery" : `- ${day.exercises.length} exercises`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {index < todayIndex && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                    <ChevronRight className={cn(
                      "h-5 w-5 text-muted-foreground transition-transform",
                      selectedDay?.day === day.day && "rotate-90"
                    )} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
