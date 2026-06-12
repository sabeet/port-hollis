import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import rightArrowPath from '../constants/RightArrowPath'

const draw = {
  hidden: { pathLength: 0, opacity: 1 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 5, ease: "easeInOut" }
  }
}

function Post({ title, date, filename }) {
  const num = filename.replace(".md", "")

  return (
    <li className="flex flex-col pb-10">
      <div className="flex">
        <motion.div
          className="w-1/3 text-6xl font-bold glitch"
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
          
          <Link to={`/posts/${filename}`} >
            <motion.svg
              className="w-24 mt-2 glitch"
              viewBox="0 0 112 45"
              xmlns="http://www.w3.org/2000/svg"
              initial="hidden"
              animate="visible"
            >
            <motion.path
              d={rightArrowPath}
              stroke="black"
              strokeWidth="1"
              fill="transparent"
              variants={draw}
            />
            </motion.svg>
          </Link>
          
        </div>
      </div>
      <div className="h-px mt-10" style={{ background: "linear-gradient(to right, white, black)" }} />
    </li>
  )
}

export default Post