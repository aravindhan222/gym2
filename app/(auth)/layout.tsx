import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication | TitanFlow",
  description: "Login or sign up to TitanFlow to access your personalized gym dashboard.",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-[0%] right-[0%] w-[40%] h-[40%] rounded-full bg-secondary/30 blur-[100px]" />
      </div>

      <div className="w-full max-w-md p-4">
        {children}
      </div>
    </div>
  )
}
