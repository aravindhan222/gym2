"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Zap } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-[25%] -left-[15%] w-[55%] h-[55%] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.75 0.2 145 / 0.2), transparent 70%)",
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.75 0.18 55 / 0.15), transparent 70%)",
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[40%] right-[20%] w-[25%] h-[25%] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.6 0.22 25 / 0.1), transparent 70%)",
          }}
          animate={{
            x: [0, -15, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(oklch(0.98 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(0.98 0 0) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="w-full max-w-md px-4 py-8">
        {/* Logo */}
        <motion.div
          className="flex flex-col items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="h-6 w-6 text-primary-foreground" />
            </motion.div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
                TitanFlow
              </h1>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                Gym OS
              </p>
            </div>
          </Link>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          className="flex rounded-xl bg-secondary/50 border border-border/30 p-1 mb-6 backdrop-blur-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link
            href="/login"
            className={`flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
              pathname === "/login"
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className={`flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
              pathname === "/signup"
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Sign Up
          </Link>
        </motion.div>

        {/* Content */}
        {children}
      </div>
    </div>
  )
}
