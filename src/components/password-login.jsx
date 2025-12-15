import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

const CORRECT_PASSWORD = "seplatcares2025"

export default function PasswordLogin({ onSuccess }) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate a small delay for better UX
    setTimeout(() => {
      if (password === CORRECT_PASSWORD) {
        // Store authentication in localStorage
        localStorage.setItem("raffle_authenticated", "true")
        onSuccess()
      } else {
        setError("Incorrect password. Please try again.")
        setPassword("")
        setIsLoading(false)
      }
    }, 300)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md p-8 bg-card border-2 border-primary shadow-2xl">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="mb-4">
            <div 
              className="bg-white rounded-full p-4 md:p-5 flex items-center justify-center shadow-2xl"
              style={{
                boxShadow: `
                  0 0 0 1px rgba(255, 255, 255, 0.1),
                  0 4px 20px rgba(0, 0, 0, 0.15),
                  0 8px 30px rgba(0, 0, 0, 0.1),
                  0 2px 8px rgba(0, 0, 0, 0.2),
                  inset 0 1px 2px rgba(255, 255, 255, 0.9),
                  inset 0 -1px 2px rgba(0, 0, 0, 0.05)
                `,
                borderRadius: '9999px'
              }}
            >
              <img
                src="/seplat-logo.png"
                alt="Seplat Energy Plc"
                className="h-10 md:h-14 w-auto object-contain"
                onError={(e) => {
                  // Fallback if logo doesn't exist
                  e.target.style.display = 'none'
                }}
              />
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h1
              className="text-3xl md:text-4xl font-bold mb-2 text-primary"
              style={{ fontFamily: "var(--font-christmas)" }}
            >
              Seplat Cares 2025
            </h1>
            {/* <p className="text-muted-foreground">
              Enter password to access the raffle draw
            </p> */}
          </div>

          {/* Password Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-2">
              {/* <Label htmlFor="password">Password</Label> */}
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError("")
                }}
                placeholder="Enter password to access the raffle draw"
                className="w-full"
                disabled={isLoading}
                autoFocus
              />
              {error && (
                <p className="text-sm text-destructive mt-2">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading || !password}
              style={{ fontFamily: "var(--font-christmas)" }}
            >
              {isLoading ? "Verifying..." : "Access Raffle Draw"}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}

