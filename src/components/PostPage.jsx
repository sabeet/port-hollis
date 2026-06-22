import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import PageTransition from "./PageTransition"
import ParseFrontmatter from '../utils/ParseFrontmatter'

function PostPage() {
  const { filename } = useParams()
  const [content, setContent] = useState("")
  const [date, setDate] = useState("")
  const [title, setTitle] = useState("")
  const [totalPosts, setTotalPosts] = useState(null)
  const [showUpper, setShowUpper] = useState(false)
  const [lastEdited, setLastEdited] = useState("")

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

    fetch(`https://api.github.com/repos/sabeet/md-collection-blog/commits?path=repo/${filename}&per_page=1`)
      .then(res => res.json())
      .then(commits => {
        if (commits.length > 0) {
          const raw = commits[0].commit.committer.date
          const formatted = new Date(raw).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })
          setLastEdited(formatted)
        }
      })

    fetch("https://api.github.com/repos/sabeet/md-collection-blog/contents/repo")
      .then(res => res.json())
      .then(files => setTotalPosts(files.length))
  }, [filename])

  useEffect(() => {
    if (!title) return
    setShowUpper(false)
    const timer = setTimeout(() => setShowUpper(true), 300)
    return () => clearTimeout(timer)
  }, [title])

  const capitalizeTitle = (str) => {
    const prepositions = ['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor',
                          'on', 'at', 'to', 'by', 'in', 'of', 'up', 'as', 'is']

    return str.split(' ').map((word, index) => {
      if (index === 0) return word
      if (prepositions.includes(word.toLowerCase())) return word.toLowerCase()
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    }).join(' ')
  }

  const lowerTitle = title.toLowerCase()
  const firstLetter = lowerTitle.charAt(0)
  const restOfTitle = capitalizeTitle(lowerTitle).slice(1)

  return (
    <PageTransition>
      <main className="max-w-2xl mx-auto px-4 py-2">
        <div className="prose">
          <h1>
            <motion.span
              className="inline-block title-glitch"
              animate={{ opacity: [1, 0.2, 1, 0.2, 1] }}
              transition={{ duration: 0.6 }}
            >
              {showUpper ? firstLetter.toUpperCase() : firstLetter}
            </motion.span>
            {restOfTitle}
          </h1>
          <hr className="border-black mb-2" />
          <div className="text-sm text-gray-400 mb-8 flex justify-between">
            <p>Posted: {date}</p>
            {lastEdited && <p>Last Edited: {lastEdited}</p>}
          </div> 
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