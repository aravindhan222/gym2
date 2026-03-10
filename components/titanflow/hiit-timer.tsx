"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Flame,
  Snowflake,
  Volume2,
  VolumeX,
  Clock,
  Repeat,
  ChevronUp,
  ChevronDown
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Phase = "work" | "rest" | "idle"

interface TimeInputProps {
  label: string
  icon: React.ReactNode
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  unit?: string
  color?: string
}

function TimeInput({ label, icon, value, onChange, min, max, step = 1, unit = "s", color = "text-primary" }: TimeInputProps) {
  const handleIncrement = () => onChange(Math.min(max, value + step))
  const handleDecrement = () => onChange(Math.max(min, value - step))
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || min
    onChange(Math.min(max, Math.max(min, newValue)))
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn("flex items-center gap-1.5 text-xs font-medium", color)}>
        {icon}
        <span>{label}</span>
      </div>
      <div className="flex flex-col items-center">
        <button
          onClick={handleIncrement}
          className="flex h-8 w-full items-center justify-center rounded-t-xl bg-secondary/80 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <div className="relative flex items-center">
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            min={min}
            max={max}
            className="w-20 bg-card border-x border-border/50 py-3 text-center text-2xl font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-energy-green/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="absolute right-2 text-xs text-muted-foreground">{unit}</span>
        </div>
        <button
          onClick={handleDecrement}
          className="flex h-8 w-full items-center justify-center rounded-b-xl bg-secondary/80 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export function HIITTimer() {
  const [workTime, setWorkTime] = useState(30)
  const [restTime, setRestTime] = useState(10)
  const [rounds, setRounds] = useState(8)
  const [currentRound, setCurrentRound] = useState(1)
  const [timeLeft, setTimeLeft] = useState(workTime)
  const [phase, setPhase] = useState<Phase>("idle")
  const [isRunning, setIsRunning] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  
  const audioContextRef = useRef<AudioContext | null>(null)

  const playBeep = useCallback((frequency: number = 800, duration: number = 150) => {
    if (!soundEnabled) return
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      }
      
      const ctx = audioContextRef.current
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      oscillator.frequency.value = frequency
      oscillator.type = "sine"
      
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000)
      
      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + duration / 1000)
    } catch {
      // Audio not supported
    }
  }, [soundEnabled])

  const resetTimer = useCallback(() => {
    setIsRunning(false)
    setPhase("idle")
    setCurrentRound(1)
    setTimeLeft(workTime)
  }, [workTime])

  const toggleTimer = () => {
    if (phase === "idle") {
      setPhase("work")
      setTimeLeft(workTime)
      playBeep(1000, 200)
    }
    setIsRunning(!isRunning)
  }

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (phase === "work") {
            if (currentRound >= rounds) {
              playBeep(1200, 500)
              setIsRunning(false)
              setPhase("idle")
              setCurrentRound(1)
              return workTime
            }
            playBeep(600, 200)
            setPhase("rest")
            return restTime
          } else if (phase === "rest") {
            playBeep(1000, 200)
            setPhase("work")
            setCurrentRound((r) => r + 1)
            return workTime
          }
        }
        
        if (prev <= 4 && prev > 1) {
          playBeep(800, 100)
        }
        
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, phase, currentRound, rounds, workTime, restTime, playBeep])

  // Update timeLeft when workTime changes and timer is idle
  useEffect(() => {
    if (phase === "idle") {
      setTimeLeft(workTime)
    }
  }, [workTime, phase])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = phase === "work" 
    ? ((workTime - timeLeft) / workTime) * 100
    : phase === "rest"
    ? ((restTime - timeLeft) / restTime) * 100
    : 0

  const totalWorkoutTime = (workTime + restTime) * rounds - restTime
  const completedTime = phase === "idle" 
    ? 0 
    : (currentRound - 1) * (workTime + restTime) + (phase === "work" ? workTime - timeLeft : workTime + restTime - timeLeft)

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Timer Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card 
          className={cn(
            "relative border-border/50 overflow-hidden transition-colors duration-500",
            phase === "work" && isRunning && "animate-pulse-red",
            phase === "rest" && isRunning && "bg-rest-green/10"
          )}
        >
          {/* Background Progress */}
          <motion.div
            className={cn(
              "absolute inset-0 opacity-20",
              phase === "work" ? "bg-energy-red" : "bg-rest-green"
            )}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            style={{ transformOrigin: "left" }}
            transition={{ duration: 0.5 }}
          />

          <CardContent className="relative p-4 sm:p-6 space-y-6 sm:space-y-8">
            {/* Header with Sound Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-foreground">
                <Flame className="h-5 w-5 text-energy-orange" />
                <h2 className="font-bold text-lg">HIIT Timer</h2>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              >
                {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </button>
            </div>

            {/* Phase Indicator */}
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <div 
                className={cn(
                  "flex items-center gap-2 rounded-full px-3 sm:px-4 py-2 transition-all",
                  phase === "work" 
                    ? "bg-energy-red/20 text-energy-red scale-105" 
                    : "bg-secondary text-muted-foreground"
                )}
              >
                <Flame className="h-4 w-4" />
                <span className="text-sm font-medium">Work</span>
              </div>
              <div 
                className={cn(
                  "flex items-center gap-2 rounded-full px-3 sm:px-4 py-2 transition-all",
                  phase === "rest" 
                    ? "bg-rest-green/20 text-rest-green scale-105" 
                    : "bg-secondary text-muted-foreground"
                )}
              >
                <Snowflake className="h-4 w-4" />
                <span className="text-sm font-medium">Rest</span>
              </div>
            </div>

            {/* Timer Display */}
            <div className="flex flex-col items-center justify-center">
              <motion.div 
                className={cn(
                  "relative flex items-center justify-center rounded-full",
                  phase === "work" && isRunning && "animate-pulse-glow-orange"
                )}
                style={{ width: "min(280px, 70vw)", height: "min(280px, 70vw)" }}
              >
                {/* Glow effect */}
                {phase !== "idle" && (
                  <div 
                    className={cn(
                      "absolute inset-0 rounded-full blur-2xl opacity-30",
                      phase === "work" ? "bg-energy-red" : "bg-rest-green"
                    )}
                  />
                )}
                
                {/* Ring background */}
                <svg className="absolute inset-0 -rotate-90 w-full h-full" viewBox="0 0 280 280">
                  <circle
                    cx="140"
                    cy="140"
                    r="130"
                    fill="none"
                    stroke="oklch(0.22 0.02 150)"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="140"
                    cy="140"
                    r="130"
                    fill="none"
                    stroke={phase === "work" ? "oklch(0.6 0.22 25)" : phase === "rest" ? "oklch(0.65 0.18 145)" : "oklch(0.75 0.2 145)"}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 130}
                    strokeDashoffset={2 * Math.PI * 130 * (1 - progress / 100)}
                    transition={{ duration: 0.5 }}
                    className="drop-shadow-lg"
                  />
                </svg>

                {/* Center content */}
                <div className="relative flex flex-col items-center">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={timeLeft}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className={cn(
                        "text-5xl sm:text-7xl font-bold tabular-nums",
                        phase === "work" ? "text-energy-red" : phase === "rest" ? "text-rest-green" : "text-foreground"
                      )}
                    >
                      {formatTime(timeLeft)}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-sm sm:text-lg text-muted-foreground mt-1 sm:mt-2">
                    Round {currentRound} of {rounds}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetTimer}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              >
                <RotateCcw className="h-6 w-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTimer}
                className={cn(
                  "flex h-20 w-20 items-center justify-center rounded-2xl text-white shadow-lg transition-all",
                  isRunning 
                    ? "bg-energy-red shadow-energy-red/25" 
                    : "bg-gradient-to-br from-energy-green to-energy-green/80 shadow-energy-green/25"
                )}
              >
                {isRunning ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
              </motion.button>
              <div className="h-14 w-14" />
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Total Progress</span>
                <span>{Math.round((completedTime / totalWorkoutTime) * 100)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <motion.div 
                  className="h-full rounded-full bg-gradient-to-r from-energy-green via-energy-orange to-energy-red"
                  animate={{ width: `${(completedTime / totalWorkoutTime) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Settings Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">Set Your Intervals</h3>
            
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              <TimeInput
                label="Work"
                icon={<Flame className="h-3.5 w-3.5" />}
                value={workTime}
                onChange={setWorkTime}
                min={5}
                max={300}
                step={5}
                color="text-energy-red"
              />
              <TimeInput
                label="Rest"
                icon={<Snowflake className="h-3.5 w-3.5" />}
                value={restTime}
                onChange={setRestTime}
                min={5}
                max={120}
                step={5}
                color="text-rest-green"
              />
              <TimeInput
                label="Rounds"
                icon={<Repeat className="h-3.5 w-3.5" />}
                value={rounds}
                onChange={setRounds}
                min={1}
                max={50}
                step={1}
                unit=""
                color="text-energy-orange"
              />
            </div>

            {/* Quick Presets */}
            <div className="mt-6 space-y-2">
              <p className="text-xs text-muted-foreground">Quick Presets</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Tabata", work: 20, rest: 10, rounds: 8, color: "hover:bg-energy-green/20 hover:text-energy-green" },
                  { label: "30/30", work: 30, rest: 30, rounds: 10, color: "hover:bg-energy-orange/20 hover:text-energy-orange" },
                  { label: "EMOM", work: 45, rest: 15, rounds: 12, color: "hover:bg-chart-4/20 hover:text-chart-4" },
                  { label: "Brutal", work: 60, rest: 15, rounds: 6, color: "hover:bg-energy-red/20 hover:text-energy-red" },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      setWorkTime(preset.work)
                      setRestTime(preset.rest)
                      setRounds(preset.rounds)
                      if (phase === "idle") setTimeLeft(preset.work)
                    }}
                    className={cn("px-3 py-2 text-xs font-medium rounded-xl bg-secondary text-foreground transition-colors min-h-[44px]", preset.color)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-3 sm:gap-4 grid-cols-3"
      >
        {[
          { label: "Total Time", value: formatTime(totalWorkoutTime), icon: Clock, color: "text-energy-green" },
          { label: "Work Total", value: formatTime(workTime * rounds), icon: Flame, color: "text-energy-red" },
          { label: "Rest Total", value: formatTime(restTime * (rounds - 1)), icon: Snowflake, color: "text-rest-green" },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-3 sm:p-4 text-center">
                <Icon className={cn("h-4 w-4 mx-auto mb-1", stat.color)} />
                <p className="text-[10px] sm:text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-base sm:text-lg font-bold tabular-nums text-foreground">{stat.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </motion.div>
    </div>
  )
}
