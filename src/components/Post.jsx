import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Post({ title, date, filename }) {
  const num = filename.replace(".md", "")

  return (
    <li className="flex flex-col pb-10">
      <div className="flex">
        <motion.div
          className="w-1/3 text-6xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ WebkitTextStroke: "1px black", color: "transparent" }}
        >
          {num}
        </motion.div>
        <div className="w-2/3">
          <p className="text-sm text-gray-400">{date}</p>
          <h2 className="text-2xl font-semibold mt-1">{title}</h2>
          <Link to={`/posts/${filename}`} className="text-blue-500 text-sm mt-3 inline-block">
            Read more →
          </Link>
        </div>
      </div>
      <div className="h-px mt-10" style={{ background: "linear-gradient(to right, white, black)" }} />
    </li>
  )
}

export default Post