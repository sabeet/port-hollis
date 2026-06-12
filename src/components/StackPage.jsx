import PageTransition from "./PageTransition"

const stack = [
  { name: "React", description: "UI library for building component-based interfaces" },
  { name: "Vite", description: "Frontend build tool and dev server" },
  { name: "React Router", description: "Client-side routing between pages" },
  { name: "Tailwind CSS v4", description: "Utility-first CSS framework for styling" },
  { name: "Framer Motion", description: "Animation library for React" },
  { name: "React Markdown", description: "Renders markdown content as HTML" },
  { name: "GitHub Contents API", description: "Fetches markdown posts from a public repo" },
]

function StackPage() {
  return (
    <PageTransition>
      <main className="max-w-2xl mx-auto px-4 py-2">
        <h1 className="text-3xl font-bold mb-8">Stack</h1>
        <ul className="space-y-6">
          {stack.map(item => (
            <li key={item.name} className="flex flex-col border-b pb-6">
              <span className="text-lg font-semibold">{item.name}</span>
            </li>
          ))}
        </ul>
      </main>
    </PageTransition>
  )
}

export default StackPage