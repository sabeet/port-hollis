import { useState, useEffect } from "react"
import Header from "./components/Header"
import Post from "./components/Post"
import { Routes, Route, useLocation } from 'react-router-dom'
import PostPage from './components/PostPage'
import PageTransition from "./components/PageTransition"
import { AnimatePresence } from "framer-motion"
import ParseFrontmatter from './utils/ParseFrontmatter'

function App() {
  const [posts, setPosts] = useState([])
  const location = useLocation()

  useEffect(() => {
    fetch("https://api.github.com/repos/sabeet/md-collection-blog/contents/repo")
      .then(res => res.json())
      .then(files => {
        const fetchAll = files.map(file =>
          fetch(`https://raw.githubusercontent.com/sabeet/md-collection-blog/main/repo/${file.name}`)
            .then(res => res.text())
            .then(text => {
              const result = ParseFrontmatter(text)
              const { attributes } = result
              return {
                id: file.sha,
                filename: file.name,
                title: attributes.title,
                date: attributes.date
              }
            })
        )
        Promise.all(fetchAll).then(parsed => setPosts([...parsed].reverse()))
      })
  }, [])

  return (
    <>
      <div className="max-w-2xl mx-auto px-4 pt-4 pb-2">
        <Header />
      </div>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition>
              <main className="max-w-2xl mx-auto px-4 py-2">
                <ul className="space-y-10">
                  {posts.map(post => (
                    <Post key={post.id} title={post.title} date={post.date} filename={post.filename} />
                  ))}
                </ul>
              </main>
            </PageTransition>
          } />
          <Route path="/posts/:filename" element={<PostPage />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App