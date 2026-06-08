import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import PageTransition from "./PageTransition"

function PostPage() {
  const { filename } = useParams()
  const [content, setContent] = useState("")

  const noExt = filename.replace(".md", "")
  const [year, month, day] = noExt.split("-")
  const date = `${year}-${month}-${day}`

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/sabeet/md-collection-blog/main/repo/${filename}`)
      .then(res => res.text())
      .then(text => setContent(text))
  }, [filename])

  return (
    <PageTransition>
      <main className="max-w-2xl mx-auto px-4 py-2">
        <div className="prose">
            <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <>
                      <h1 className="text-center">{children}</h1>
                      <hr className="border-black mb-8" />
                      <p className="text-sm text-gray-400 mb-2">{date}</p>
                    </>
                      )
                    }}
                  >
          {content}
        </ReactMarkdown>
        </div>
      </main>
    </PageTransition>
  )
}

export default PostPage