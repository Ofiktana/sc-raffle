import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Snowfall from "@/components/snowfall"
import Confetti from "@/components/confetti"
import { findWinnerWithCallback, loadTickets } from "@/lib/raffle"

export default function RaffleDrawer() {
  const [currentNumber, setCurrentNumber] = useState("0000000")
  const [isDrawing, setIsDrawing] = useState(false)
  const [winners, setWinners] = useState([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [currentWinner, setCurrentWinner] = useState(null)
  const [ticketsLoaded, setTicketsLoaded] = useState(false)

  // Preload tickets data on component mount
  useEffect(() => {
    loadTickets().then(() => {
      setTicketsLoaded(true)
    }).catch(error => {
      console.error('Failed to load tickets:', error)
    })
  }, [])

  const handleDraw = async () => {
    setIsDrawing(true)
    setCurrentWinner(null)
    setShowConfetti(false)
    setCurrentNumber("0000000")

    try {
      const result = await findWinnerWithCallback(
        // Callback for each digit drawn
        (partialNumber, position) => {
          setCurrentNumber(partialNumber)
        },
        // Callback when winner is found
        (winnerData) => {
          setCurrentWinner(winnerData)
          setShowConfetti(true)
          setWinners((prev) => [winnerData, ...prev].slice(0, 10))
        }
      )
    } catch (error) {
      console.error('Error drawing winner:', error)
      alert('An error occurred while drawing. Please try again.')
    } finally {
      setIsDrawing(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <Snowfall />
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Christmas lights decoration */}
      <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-center gap-8 z-10">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full twinkle"
            style={{
              backgroundColor: ["#ef4444", "#22c55e", "#eab308", "#3b82f6", "#ec4899"][i % 5],
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
        {/* Logo Placeholder */}
        <div className="mb-8">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-card rounded-full flex items-center justify-center border-4 border-primary shadow-lg shadow-primary/20">
            <img
              src="/christmas-logo-placeholder.jpg"
              alt="Business Logo"
              className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Title */}
        <h1
          className="text-5xl md:text-7xl font-bold text-center mb-4 text-primary"
          style={{ fontFamily: "var(--font-christmas)" }}
        >
          Seplat Cares 2025 Raffle Draw
        </h1>
        <p
          className="text-xl md:text-2xl text-muted-foreground mb-12 text-center"
          style={{ fontFamily: "var(--font-christmas)" }}
        >
          {"May your holidays be filled with joy!"}
        </p>

        {/* Main Draw Card */}
        <Card className="w-full max-w-4xl p-8 md:p-12 mb-8 bg-card border-2 border-primary shadow-2xl shadow-primary/30">
          <div className="flex flex-col items-center gap-8">
            {/* Number Display */}
            <div className="relative w-full">
              <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
              <div className="relative bg-muted rounded-2xl p-6 md:p-10 shadow-inner">
                <div className="flex items-center justify-center gap-2 md:gap-4">
                  {currentNumber.split("").map((digit, index) => (
                    <div
                      key={index}
                      className={`
                        w-12 h-16 md:w-20 md:h-24 bg-background rounded-lg
                        flex items-center justify-center
                        text-4xl md:text-6xl font-bold font-mono
                        border-2 border-border
                        transition-all duration-100
                        ${isDrawing ? "animate-pulse scale-105" : "scale-100"}
                      `}
                      style={{
                        color: isDrawing ? ["#ef4444", "#22c55e", "#eab308"][Math.floor(Math.random() * 3)] : "#eab308",
                      }}
                    >
                      {digit}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Winner Display */}
            {currentWinner && (
              <div className="w-full text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl p-6 border-2 border-primary/50">
                  <p className="text-lg md:text-xl text-muted-foreground mb-2">🎉 Winner! 🎉</p>
                  <h2 className="text-3xl md:text-5xl font-bold text-primary mb-2" style={{ fontFamily: "var(--font-christmas)" }}>
                    {currentWinner.winner}
                  </h2>
                  {/* {currentWinner.ticketData?.tribe && (
                    <p className="text-sm md:text-base text-muted-foreground">
                      Tribe: {currentWinner.ticketData.tribe}
                    </p>
                  )} */}
                </div>
              </div>
            )}

            {/* Draw Button */}
            <Button
              onClick={handleDraw}
              disabled={isDrawing || !ticketsLoaded}
              size="lg"
              className="w-full md:w-auto px-12 py-6 text-2xl font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--font-christmas)" }}
            >
              {!ticketsLoaded ? "Loading Tickets..." : isDrawing ? "Drawing..." : "🎄 Draw Winner 🎄"}
            </Button>
          </div>
        </Card>

        {/* Previous Winners */}
        {winners.length > 0 && (
          <Card className="w-full max-w-4xl p-6 bg-card/80 backdrop-blur border border-border">
            <h2
              className="text-2xl font-bold mb-4 text-primary text-center"
              style={{ fontFamily: "var(--font-christmas)" }}
            >
              Previous Winners
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {winners.map((winner, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-muted rounded-lg p-4 border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Draw #{winners.length - index}
                    </span>
                    <span className="text-lg font-mono font-bold text-accent">{winner.ticketNumber}</span>
                  </div>
                  <div className="text-xl font-bold text-primary">{winner.winner}</div>
                  {/* {winner.ticketData?.tribe && (
                    <div className="text-xs text-muted-foreground mt-1">Tribe: {winner.ticketData.tribe}</div>
                  )} */}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Decorative Elements */}
        <div className="fixed bottom-8 left-8 text-6xl opacity-20 pointer-events-none">🎁</div>
        <div className="fixed bottom-8 right-8 text-6xl opacity-20 pointer-events-none">⭐</div>
        <div className="fixed top-32 left-12 text-4xl opacity-20 pointer-events-none">🎅</div>
        <div className="fixed top-32 right-12 text-4xl opacity-20 pointer-events-none">☃️</div>
      </div>
    </div>
  )
}
