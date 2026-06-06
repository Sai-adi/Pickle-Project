import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x    = Math.random() * canvas.width
        this.y    = Math.random() * canvas.height
        this.r    = Math.random() * 1.5 + 0.2
        this.vx   = (Math.random() - 0.5) * 0.3
        this.vy   = (Math.random() - 0.5) * 0.3 - 0.1
        this.life = Math.random()
        const palette = ['255,193,7', '255,152,0', '139,195,74', '220,48,39', '255,255,255']
        this.color = palette[Math.floor(Math.random() * palette.length)]
      }
      update() {
        this.x += this.vx
        this.y += this.vy
        this.life -= 0.001
        if (this.life <= 0 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset()
          this.y = canvas.height + 10
        }
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.color},${this.life * 0.6})`
        ctx.fill()
      }
    }

    for (let i = 0; i < 120; i++) particles.push(new Particle())

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="particles-canvas"
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}
