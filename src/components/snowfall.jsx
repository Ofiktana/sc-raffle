import { useEffect, useState } from "react"

export default function Snowfall() {
  const [snowflakes, setSnowflakes] = useState([])

  useEffect(() => {
    const flakes = []
    for (let i = 0; i < 50; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: 10 + Math.random() * 20,
        size: 2 + Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.7,
        delay: Math.random() * 10,
      })
    }
    setSnowflakes(flakes)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute snowflake"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            backgroundColor: "white",
            borderRadius: "50%",
            opacity: flake.opacity,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `-${flake.delay}s`,
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
          }}
        />
      ))}
    </div>
  )
}
