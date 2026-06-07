import { useState, useEffect } from "react"
import Header from "./components/Header"
import Post from "./components/Post"
import { Routes, Route } from 'react-router-dom'
import PostPage from './components/PostPage'
import PageTransition from "./components/PageTransition"

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("https://api.github.com/repos/sabeet/md-collection-blog/contents/repo")
      .then(res => res.json())
      .then(files => {
        const parsed = files.map(file => {
          const noExt = file.name.replace(".md", "")
          const [year, month, day, ...titleParts] = noExt.split("-")
          const date = `${year}-${month}-${day}`
          const title = titleParts.join(" ")

          return { id: file.sha, title, date, filename: file.name }
        })
        setPosts(parsed)
      })
  }, [])

return (
  <>
  <div className="max-w-2xl mx-auto px-4 py-12" >
  <Header />
  </div>
  <Routes>
    <Route path="/" element={
      <PageTransition>
        <main className="max-w-2xl mx-auto px-4 py-12">
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
  </>
)
}

export default App