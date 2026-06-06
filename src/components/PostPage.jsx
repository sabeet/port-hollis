import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

function PostPage() {
  const { filename } = useParams()
  const [content, setContent] = useState("")

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/sabeet/md-collection-blog/main/repo/${filename}`)
      .then(res => res.text())
      .then(text => setContent(text))
  }, [filename])

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
    <div className="prose">
        <ReactMarkdown>{content}</ReactMarkdown>
    </div>
</main>
  )
}

export default PostPage