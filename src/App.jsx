import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import RaffleDrawer from "@/components/raffle-drawer"
import PasswordLogin from "@/components/password-login"
import "./globals.css"
import "@/lib/firebase" // Initialize Firebase

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated
    const authenticated = localStorage.getItem("raffle_authenticated") === "true"
    setIsAuthenticated(authenticated)
    setIsChecking(false)
  }, [])

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("raffle_authenticated")
    setIsAuthenticated(false)
  }

  if (isChecking) {
    // Show loading state while checking authentication
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <main className="min-h-screen" style={{ fontFamily: 'var(--font-christmas), sans-serif' }}>
        {isAuthenticated ? (
          <RaffleDrawer onLogout={handleLogout} />
        ) : (
          <PasswordLogin onSuccess={handleLoginSuccess} />
        )}
      </main>
    </ThemeProvider>
  )
}

export default App

