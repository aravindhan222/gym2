"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search,
  Dumbbell,
  Target,
  ChevronRight,
  X,
  Play
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type MuscleGroup = "all" | "chest" | "back" | "legs" | "shoulders" | "arms" | "core" | "cardio"

interface Exercise {
  id: string
  name: string
  muscle: MuscleGroup
  description: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  equipment: string
  instructions: string[]
}

const exercises: Exercise[] = [
  {
    id: "1",
    name: "Bench Press",
    muscle: "chest",
    description: "The classic chest builder for mass and strength",
    difficulty: "Intermediate",
    equipment: "Barbell, Bench",
    instructions: [
      "Lie on a flat bench with feet flat on the floor",
      "Grip the bar slightly wider than shoulder-width",
      "Lower the bar to your mid-chest",
      "Press the bar up until arms are extended"
    ]
  },
  {
    id: "2",
    name: "Squat",
    muscle: "legs",
    description: "King of all exercises for lower body development",
    difficulty: "Intermediate",
    equipment: "Barbell, Squat Rack",
    instructions: [
      "Position bar on upper back",
      "Stand with feet shoulder-width apart",
      "Lower until thighs are parallel to ground",
      "Drive through heels to stand"
    ]
  },
  {
    id: "3",
    name: "Deadlift",
    muscle: "back",
    description: "Full body compound movement for overall strength",
    difficulty: "Advanced",
    equipment: "Barbell",
    instructions: [
      "Stand with feet hip-width, bar over mid-foot",
      "Hinge at hips and grip the bar",
      "Keep back flat and chest up",
      "Stand up by driving through the floor"
    ]
  },
  {
    id: "4",
    name: "Push-ups",
    muscle: "chest",
    description: "Bodyweight classic for chest and triceps",
    difficulty: "Beginner",
    equipment: "None",
    instructions: [
      "Start in plank position",
      "Lower chest to the ground",
      "Keep body in a straight line",
      "Push back up to start"
    ]
  },
  {
    id: "5",
    name: "Pull-ups",
    muscle: "back",
    description: "Ultimate back builder using bodyweight",
    difficulty: "Intermediate",
    equipment: "Pull-up Bar",
    instructions: [
      "Grip bar with hands shoulder-width apart",
      "Hang with arms fully extended",
      "Pull up until chin clears the bar",
      "Lower with control"
    ]
  },
  {
    id: "6",
    name: "Overhead Press",
    muscle: "shoulders",
    description: "Build boulder shoulders with this compound lift",
    difficulty: "Intermediate",
    equipment: "Barbell or Dumbbells",
    instructions: [
      "Hold weight at shoulder level",
      "Press weight overhead",
      "Lock out arms at the top",
      "Lower with control to start"
    ]
  },
  {
    id: "7",
    name: "Barbell Curl",
    muscle: "arms",
    description: "Classic bicep isolation exercise",
    difficulty: "Beginner",
    equipment: "Barbell",
    instructions: [
      "Stand holding barbell with underhand grip",
      "Keep elbows at your sides",
      "Curl the weight up to shoulders",
      "Lower slowly to starting position"
    ]
  },
  {
    id: "8",
    name: "Plank",
    muscle: "core",
    description: "Isometric core strengthening exercise",
    difficulty: "Beginner",
    equipment: "None",
    instructions: [
      "Start in forearm plank position",
      "Keep body in a straight line",
      "Engage core and glutes",
      "Hold for desired time"
    ]
  },
  {
    id: "9",
    name: "Lunges",
    muscle: "legs",
    description: "Unilateral leg exercise for balance and strength",
    difficulty: "Beginner",
    equipment: "Optional: Dumbbells",
    instructions: [
      "Stand tall with feet hip-width apart",
      "Step forward with one leg",
      "Lower until both knees are at 90 degrees",
      "Push back to starting position"
    ]
  },
  {
    id: "10",
    name: "Burpees",
    muscle: "cardio",
    description: "Full body cardio and strength combo",
    difficulty: "Intermediate",
    equipment: "None",
    instructions: [
      "Start standing, drop to push-up position",
      "Perform a push-up",
      "Jump feet to hands",
      "Jump up with arms overhead"
    ]
  },
  {
    id: "11",
    name: "Lat Pulldown",
    muscle: "back",
    description: "Machine-based lat isolation exercise",
    difficulty: "Beginner",
    equipment: "Cable Machine",
    instructions: [
      "Sit at lat pulldown machine",
      "Grip bar wider than shoulders",
      "Pull bar down to upper chest",
      "Control the weight back up"
    ]
  },
  {
    id: "12",
    name: "Tricep Dips",
    muscle: "arms",
    description: "Bodyweight tricep builder",
    difficulty: "Intermediate",
    equipment: "Parallel Bars or Bench",
    instructions: [
      "Grip bars or place hands on bench",
      "Lower body by bending elbows",
      "Keep elbows close to body",
      "Push back up to start"
    ]
  },
]

const muscleGroups: { id: MuscleGroup; label: string; color: string }[] = [
  { id: "all", label: "All", color: "bg-primary" },
  { id: "chest", label: "Chest", color: "bg-work-red" },
  { id: "back", label: "Back", color: "bg-chart-2" },
  { id: "legs", label: "Legs", color: "bg-chart-3" },
  { id: "shoulders", label: "Shoulders", color: "bg-chart-4" },
  { id: "arms", label: "Arms", color: "bg-primary" },
  { id: "core", label: "Core", color: "bg-rest-blue" },
  { id: "cardio", label: "Cardio", color: "bg-work-red" },
]

const difficultyColors = {
  Beginner: "text-primary bg-primary/10",
  Intermediate: "text-chart-4 bg-chart-4/10",
  Advanced: "text-work-red bg-work-red/10",
}

export function ExerciseLibrary() {
  const [search, setSearch] = useState("")
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup>("all")
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(search.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(search.toLowerCase())
    const matchesMuscle = selectedMuscle === "all" || exercise.muscle === selectedMuscle
    return matchesSearch && matchesMuscle
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-border/30 bg-gradient-to-br from-primary/10 to-transparent">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Dumbbell className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Exercise Library</h2>
                <p className="text-sm text-muted-foreground">{exercises.length} exercises available</p>
              </div>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search exercises..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-12 rounded-2xl border-border/30 bg-secondary/50 text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Muscle Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
      >
        {muscleGroups.map((muscle) => (
          <motion.button
            key={muscle.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedMuscle(muscle.id)}
            className={cn(
              "flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all min-h-[40px]",
              selectedMuscle === muscle.id
                ? cn(muscle.color, "text-white shadow-lg")
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {muscle.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Exercise Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid gap-4 sm:grid-cols-2"
      >
        <AnimatePresence mode="popLayout">
          {filteredExercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card 
                className="group cursor-pointer border-border/30 bg-card/60 backdrop-blur-sm hover:bg-card/80 hover:border-primary/30 transition-all"
                onClick={() => setSelectedExercise(exercise)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-foreground">{exercise.name}</h3>
                        <span className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded-full",
                          difficultyColors[exercise.difficulty]
                        )}>
                          {exercise.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{exercise.description}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Target className="h-3 w-3" />
                          {exercise.muscle.charAt(0).toUpperCase() + exercise.muscle.slice(1)}
                        </span>
                        <span className="text-muted-foreground">{exercise.equipment}</span>
                      </div>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <ChevronRight className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredExercises.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 text-center"
        >
          <Search className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <p className="mt-4 text-muted-foreground">No exercises found</p>
          <p className="text-sm text-muted-foreground/50">Try a different search or filter</p>
        </motion.div>
      )}

      {/* Exercise Detail Modal */}
      <AnimatePresence>
        {selectedExercise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedExercise(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-card border border-border/30"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border/30 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{selectedExercise.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        difficultyColors[selectedExercise.difficulty]
                      )}>
                        {selectedExercise.difficulty}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {selectedExercise.muscle.charAt(0).toUpperCase() + selectedExercise.muscle.slice(1)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedExercise(null)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-6">
                <div>
                  <p className="text-muted-foreground">{selectedExercise.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Dumbbell className="h-4 w-4 text-primary" />
                    Equipment Needed
                  </h3>
                  <p className="text-muted-foreground">{selectedExercise.equipment}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Play className="h-4 w-4 text-primary" />
                    How To Perform
                  </h3>
                  <ol className="space-y-3">
                    {selectedExercise.instructions.map((step, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground pt-0.5">{step}</span>
                      </motion.li>
                    ))}
                  </ol>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
