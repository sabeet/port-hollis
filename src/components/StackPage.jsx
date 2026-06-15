import { useEffect, useRef, useState } from "react"
import PageTransition from "./PageTransition"

const stack = [
  { name: "React", description: "UI library for building component-based interfaces" },
  { name: "Vite", description: "Frontend build tool and dev server" },
  { name: "React Router", description: "Client-side routing between pages" },
  { name: "Tailwind CSS v4", description: "Utility-first CSS framework for styling" },
  { name: "Framer Motion", description: "Animation library for React" },
  { name: "React Markdown", description: "Renders markdown content as HTML" },
  { name: "GitHub Contents API", description: "Fetches markdown posts from a public repo" },
  { name: "Matter.js", description: "Physics rendering for fun" },
]

const CLICK_THRESHOLD = 5
const DOTS = ["·", "· ·", "· · ·", "· · · ·"]

export default function StackPage() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [clicks, setClicks] = useState(0)
  const [dropped, setDropped] = useState(false)

  const handleTitleClick = () => {
    if (dropped) return
    setClicks(c => {
      const next = c + 1
      if (next >= CLICK_THRESHOLD) {
        setDropped(true)
      }
      return next
    })
  }

  useEffect(() => {
    if (!dropped) return

    let animId
    let cleanupFn = () => {}

    const initPhysics = async () => {
      const Matter = (await import("matter-js")).default
      const { Engine, Runner, Bodies, Body, Composite } = Matter

      const container = containerRef.current
      const canvas = canvasRef.current
      if (!container || !canvas) return

      const rootRect = container.getBoundingClientRect()
      const W = container.offsetWidth
      const H = Math.max(container.offsetHeight, 500)

      canvas.width = W
      canvas.height = H

      const engine = Engine.create({ gravity: { y: 2 } })
      const world = engine.world
      const ctx = canvas.getContext("2d")
      const fragments = []

      const collectChars = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent
          if (!text.trim()) return

          const parent = node.parentElement
          const style = window.getComputedStyle(parent)
          const fontSize = parseFloat(style.fontSize) || 15
          const fontWeight = style.fontWeight || "400"
          const color = style.color

          for (let i = 0; i < text.length; i++) {
            const ch = text[i]
            if (ch === " ") continue

            const range = document.createRange()
            range.setStart(node, i)
            range.setEnd(node, i + 1)
            const rects = range.getClientRects()
            if (!rects.length) continue

            const cr = rects[0]
            const x = cr.left - rootRect.left + cr.width / 2
            const y = cr.top - rootRect.top + cr.height / 2
            const w = Math.max(cr.width, 5)
            const h = Math.max(cr.height, 8)

            const body = Bodies.rectangle(x, y, w * 0.75, h * 0.8, {
              restitution: 0.3,
              friction: 0.5,
              frictionAir: 0.01,
              density: 0.003,
            })
            Body.setVelocity(body, {
              x: (Math.random() - 0.5) * 2,
              y: Math.random() * 0.5,
            })
            fragments.push({ body, ch, fontSize, fontWeight, color })
            Composite.add(world, body)
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.tagName.toLowerCase() === "li") {
            const rect = node.getBoundingClientRect()
            const bx = rect.left - rootRect.left + rect.width / 2
            const by = rect.bottom - rootRect.top
            if (rect.height > 0) {
              const hrBody = Bodies.rectangle(bx, by, rect.width * 0.9, 1.5, {
                restitution: 0.1,
                friction: 0.6,
                frictionAir: 0.02,
                density: 0.005,
              })
              fragments.push({ body: hrBody, isHr: true, w: rect.width * 0.9 })
              Composite.add(world, hrBody)
            }
          }
          for (const child of node.childNodes) collectChars(child)
        }
      }

      collectChars(container)

      // hide original content
      const main = container.querySelector("main")
      if (main) main.style.visibility = "hidden"

      const floor = Bodies.rectangle(W / 2, H + 25, W * 2, 50, { isStatic: true, friction: 0.8 })
      const wallL = Bodies.rectangle(-25, H / 2, 50, H * 2, { isStatic: true })
      const wallR = Bodies.rectangle(W + 25, H / 2, 50, H * 2, { isStatic: true })
      Composite.add(world, [floor, wallL, wallR])

      const runner = Runner.create()
      Runner.run(runner, engine)

      cleanupFn = () => {
        Runner.stop(runner)
      }

      const loop = () => {
        ctx.clearRect(0, 0, W, H)

        ctx.strokeStyle = "rgba(0,0,0,0.15)"
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, H - 2)
        ctx.lineTo(W, H - 2)
        ctx.stroke()

        for (const f of fragments) {
          const pos = f.body.position
          const angle = f.body.angle
          ctx.save()
          ctx.translate(pos.x, pos.y)
          ctx.rotate(angle)
          if (f.isHr) {
            ctx.strokeStyle = "rgba(0,0,0,0.15)"
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(-f.w / 2, 0)
            ctx.lineTo(f.w / 2, 0)
            ctx.stroke()
          } else {
            ctx.font = `${f.fontWeight} ${f.fontSize}px sans-serif`
            ctx.fillStyle = f.color
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillText(f.ch, 0, 0)
          }
          ctx.restore()
        }

        animId = requestAnimationFrame(loop)
      }

      loop()
    }

    initPhysics()

    return () => {
      if (animId) cancelAnimationFrame(animId)
      cleanupFn()
    }
  }, [dropped])

  return (
    <PageTransition>
      <div ref={containerRef} style={{ position: "relative", overflow: "hidden", minHeight: "500px" }}>
        <main className="max-w-2xl mx-auto px-4 py-2">
          <div className="flex items-baseline gap-3 mb-8">
            <h1
              className="text-3xl font-bold cursor-pointer select-none"
              onClick={handleTitleClick}
              style={{ transition: "transform 0.1s" }}
            >
              stack
            </h1>
            {clicks > 0 && clicks < CLICK_THRESHOLD && (
              <span className="text-sm text-gray-400">{DOTS[clicks - 1]}</span>
            )}
          </div>
          <ul className="space-y-6">
            {stack.map(item => (
              <li key={item.name} className="flex flex-col border-b pb-6">
                <span className="text-lg font-semibold">{item.name.toLowerCase()}</span>
              </li>
            ))}
          </ul>
        </main>

        {dropped && (
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    </PageTransition>
  )
}