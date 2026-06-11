import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import PageTransition from "./PageTransition"
import ParseFrontmatter from '../utils/ParseFrontmatter'

function PostPage() {
  const { filename } = useParams()
  const [content, setContent] = useState("")
  const [date, setDate] = useState("")
  const [title, setTitle] = useState("")
  const [totalPosts, setTotalPosts] = useState(null)

  const currentNum = parseInt(filename.replace(".md", ""))
  const prevFile = `${String(currentNum - 1).padStart(2, "0")}.md`
  const nextFile = `${String(currentNum + 1).padStart(2, "0")}.md`

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/sabeet/md-collection-blog/main/repo/${filename}`)
      .then(res => res.text())
      .then(text => {
  const { attributes, body } = ParseFrontmatter(text)
  setContent(body)
  setDate(attributes.date)
  setTitle(attributes.title)
})

    fetch("https://api.github.com/repos/sabeet/md-collection-blog/contents/repo")
      .then(res => res.json())
      .then(files => setTotalPosts(files.length))
  }, [filename])

  return (
    <PageTransition>
      <main className="max-w-2xl mx-auto px-4 py-2">
        <div className="prose">
          <h1>{title}</h1>
          <hr className="border-black mb-2" />
          <p className="text-sm text-gray-400 mb-8">{date}</p>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        <div className="flex justify-between mt-12">
          {currentNum > 1 ? (
            <Link to={`/posts/${prevFile}`} className="text-gray-500 hover:text-black transition-colors">
              ← Previous
            </Link>
          ) : <span />}

          {totalPosts && currentNum < totalPosts ? (
            <Link to={`/posts/${nextFile}`} className="text-gray-500 hover:text-black transition-colors">
              Next →
            </Link>
          ) : <span />}
        </div>

      </main>
    </PageTransition>
  )
}

export default PostPage