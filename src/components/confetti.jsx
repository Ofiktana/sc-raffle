import { useEffect, useState } from 'react'

export default function Confetti({ active, onComplete }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (!active) {
      setParticles([])
      return
    }

    // Create confetti particles
    const colors = ['#ef4444', '#22c55e', '#eab308', '#3b82f6', '#ec4899', '#f59e0b', '#8b5cf6', '#06b6d4']
    const newParticles = []

    for (let i = 0; i < 150; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        size: Math.random() * 10 + 5,
        speedX: (Math.random() - 0.5) * 4,
        speedY: Math.random() * 3 + 2,
        rotationSpeed: (Math.random() - 0.5) * 10,
      })
    }

    setParticles(newParticles)

    // Clean up after animation
    const timer = setTimeout(() => {
      setParticles([])
      if (onComplete) {
        onComplete()
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [active, onComplete])

  if (particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            animation: `confetti-fall ${2 + Math.random() * 2}s linear forwards`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

