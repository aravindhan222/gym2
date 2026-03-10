"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Dumbbell, 
  Plus, 
  Trash2, 
  Copy, 
  Check,
  ChevronDown,
  ChevronUp,
  Calendar,
  Target
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface ExerciseSet {
  id: string
  reps: number
  weight: number
}

interface Exercise {
  id: string
  name: string
  sets: ExerciseSet[]
  isExpanded: boolean
}

const defaultExercises = [
  { 
    id: "1", 
    name: "Barbell Squat", 
    sets: [
      { id: "1-1", reps: 8, weight: 60 },
      { id: "1-2", reps: 8, weight: 70 },
      { id: "1-3", reps: 6, weight: 80 },
    ],
    isExpanded: true 
  },
  { 
    id: "2", 
    name: "Bench Press", 
    sets: [
      { id: "2-1", reps: 10, weight: 50 },
      { id: "2-2", reps: 8, weight: 60 },
    ],
    isExpanded: false 
  },
]

export function WorkoutLog() {
  const [exercises, setExercises] = useState<Exercise[]>(defaultExercises)
  const [newExerciseName, setNewExerciseName] = useState("")
  const [copied, setCopied] = useState(false)

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })

  const addExercise = () => {
    if (!newExerciseName.trim()) return
    
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: newExerciseName,
      sets: [{ id: `${Date.now()}-1`, reps: 10, weight: 0 }],
      isExpanded: true,
    }
    
    setExercises([...exercises, newExercise])
    setNewExerciseName("")
  }

  const removeExercise = (exerciseId: string) => {
    setExercises(exercises.filter((e) => e.id !== exerciseId))
  }

  const toggleExpand = (exerciseId: string) => {
    setExercises(exercises.map((e) => 
      e.id === exerciseId ? { ...e, isExpanded: !e.isExpanded } : e
    ))
  }

  const addSet = (exerciseId: string) => {
    setExercises(exercises.map((e) => {
      if (e.id !== exerciseId) return e
      const lastSet = e.sets[e.sets.length - 1]
      const newSet: ExerciseSet = {
        id: `${exerciseId}-${Date.now()}`,
        reps: lastSet?.reps || 10,
        weight: lastSet?.weight || 0,
      }
      return { ...e, sets: [...e.sets, newSet] }
    }))
  }

  const removeSet = (exerciseId: string, setId: string) => {
    setExercises(exercises.map((e) => {
      if (e.id !== exerciseId) return e
      return { ...e, sets: e.sets.filter((s) => s.id !== setId) }
    }))
  }

  const updateSet = (exerciseId: string, setId: string, field: "reps" | "weight", value: number) => {
    setExercises(exercises.map((e) => {
      if (e.id !== exerciseId) return e
      return {
        ...e,
        sets: e.sets.map((s) => 
          s.id === setId ? { ...s, [field]: value } : s
        ),
      }
    }))
  }

  const generateSummary = useCallback(() => {
    const lines = [
      `WORKOUT LOG - ${today}`,
      "------------------------",
      "",
    ]
    
    exercises.forEach((exercise) => {
      lines.push(`${exercise.name}`)
      exercise.sets.forEach((set, index) => {
        lines.push(`  Set ${index + 1}: ${set.reps} reps @ ${set.weight}kg`)
      })
      lines.push("")
    })
    
    const totalSets = exercises.reduce((acc, e) => acc + e.sets.length, 0)
    const totalVolume = exercises.reduce(
      (acc, e) => acc + e.sets.reduce((setAcc, s) => setAcc + s.reps * s.weight, 0),
      0
    )
    
    lines.push("------------------------")
    lines.push(`Total: ${exercises.length} exercises, ${totalSets} sets`)
    lines.push(`Volume: ${totalVolume.toLocaleString()}kg`)
    
    return lines.join("\n")
  }, [exercises, today])

  const copyToClipboard = async () => {
    const summary = generateSummary()
    await navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const totalSets = exercises.reduce((acc, e) => acc + e.sets.length, 0)
  const totalVolume = exercises.reduce(
    (acc, e) => acc + e.sets.reduce((setAcc, s) => setAcc + s.reps * s.weight, 0),
    0
  )

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-energy-green/10">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-energy-green" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-foreground">{today}</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {exercises.length} exercises
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={copyToClipboard}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 font-medium transition-all min-h-[44px] w-full sm:w-auto",
                  copied 
                    ? "bg-energy-green text-white" 
                    : "bg-gradient-to-r from-energy-green to-energy-green/80 text-white shadow-lg shadow-energy-green/25"
                )}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 sm:h-5 sm:w-5" />
                    Copy Summary
                  </>
                )}
              </motion.button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid gap-3 sm:gap-4 grid-cols-2"
      >
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-energy-orange/10">
              <Target className="h-4 w-4 sm:h-5 sm:w-5 text-energy-orange" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-foreground">{totalSets}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Total Sets</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-energy-red/10">
              <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5 text-energy-red" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-foreground">{totalVolume.toLocaleString()}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Volume (kg)</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Add Exercise */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex gap-2 sm:gap-3">
              <Input
                placeholder="Add exercise..."
                value={newExerciseName}
                onChange={(e) => setNewExerciseName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addExercise()}
                className="flex-1 min-h-[44px] rounded-xl sm:rounded-2xl border-border/50 bg-secondary text-foreground placeholder:text-muted-foreground text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addExercise}
                className="flex h-11 w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-energy-green to-energy-green/80 text-white shadow-lg shadow-energy-green/25 shrink-0"
              >
                <Plus className="h-5 w-5" />
              </motion.button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Exercise Timeline */}
      <div className="relative space-y-3 sm:space-y-4 pl-3 sm:pl-4">
        {/* Timeline line */}
        <div className="absolute left-[5px] sm:left-[7px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-energy-green via-energy-orange to-energy-red opacity-30" />

        <AnimatePresence>
          {exercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-3 sm:-left-4 top-5 sm:top-6 flex h-3 w-3 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-gradient-to-br from-energy-green to-energy-orange shadow-lg shadow-energy-green/25">
                <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white" />
              </div>

              <Card className="ml-3 sm:ml-4 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
                <CardHeader 
                  className="cursor-pointer py-3 sm:py-4 px-3 sm:px-4"
                  onClick={() => toggleExpand(exercise.id)}
                >
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-secondary shrink-0">
                        <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5 text-energy-green" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">{exercise.name}</h3>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">
                          {exercise.sets.length} sets
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          removeExercise(exercise.id)
                        }}
                        className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl text-muted-foreground hover:bg-energy-red/10 hover:text-energy-red transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-secondary">
                        {exercise.isExpanded ? (
                          <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>

                <AnimatePresence>
                  {exercise.isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CardContent className="border-t border-border/50 pt-3 sm:pt-4 px-3 sm:px-4 pb-3 sm:pb-4 space-y-2 sm:space-y-3">
                        {exercise.sets.map((set, setIndex) => (
                          <motion.div
                            key={set.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: setIndex * 0.05 }}
                            className="flex items-center gap-2 sm:gap-3"
                          >
                            <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md sm:rounded-lg bg-energy-orange/10 text-[10px] sm:text-xs font-bold text-energy-orange shrink-0">
                              {setIndex + 1}
                            </span>
                            <div className="flex flex-1 items-center gap-2 sm:gap-3">
                              <div className="flex-1">
                                <Label className="sr-only">Reps</Label>
                                <div className="relative">
                                  <Input
                                    type="number"
                                    value={set.reps}
                                    onChange={(e) => updateSet(exercise.id, set.id, "reps", parseInt(e.target.value) || 0)}
                                    className="h-9 sm:h-10 rounded-lg sm:rounded-xl border-border/50 bg-secondary pr-10 sm:pr-12 text-center text-sm text-foreground"
                                  />
                                  <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs text-muted-foreground">
                                    reps
                                  </span>
                                </div>
                              </div>
                              <div className="flex-1">
                                <Label className="sr-only">Weight</Label>
                                <div className="relative">
                                  <Input
                                    type="number"
                                    value={set.weight}
                                    onChange={(e) => updateSet(exercise.id, set.id, "weight", parseInt(e.target.value) || 0)}
                                    className="h-9 sm:h-10 rounded-lg sm:rounded-xl border-border/50 bg-secondary pr-8 sm:pr-10 text-center text-sm text-foreground"
                                  />
                                  <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs text-muted-foreground">
                                    kg
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => removeSet(exercise.id, set.id)}
                              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl text-muted-foreground hover:bg-energy-red/10 hover:text-energy-red transition-colors shrink-0"
                              disabled={exercise.sets.length <= 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </motion.div>
                        ))}
                        
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => addSet(exercise.id)}
                          className="flex w-full items-center justify-center gap-2 rounded-lg sm:rounded-xl border border-dashed border-energy-green/50 py-2.5 sm:py-3 text-xs sm:text-sm text-energy-green hover:border-energy-green hover:bg-energy-green/5 transition-colors min-h-[44px]"
                        >
                          <Plus className="h-4 w-4" />
                          Add Set
                        </motion.button>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {exercises.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-4 py-8 sm:py-12 text-center"
          >
            <Dumbbell className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50" />
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">No exercises yet</p>
            <p className="text-xs sm:text-sm text-muted-foreground/50">Add your first exercise above</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
