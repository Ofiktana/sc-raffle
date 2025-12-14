import { ThemeProvider } from "@/components/theme-provider"
import RaffleDrawer from "@/components/raffle-drawer"
import "./globals.css"

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <main className="min-h-screen" style={{ fontFamily: 'var(--font-christmas), sans-serif' }}>
        <RaffleDrawer />
      </main>
    </ThemeProvider>
  )
}

export default App

