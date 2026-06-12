import { motion } from "framer-motion"
import blogTitlePath from "../constants/blogTitlePath"
import { Link } from 'react-router-dom'

const draw = {
  hidden: { pathLength: 0, opacity: 1 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 10, ease: "easeInOut" }
  }
}

function Header() {
  return (
    <header className="mb-4">
      <div className="flex items-end gap-2">
        <Link to="/">
          <motion.svg
            className="w-full max-w-xs glitch"
            viewBox="0 0 225 90"
            xmlns="http://www.w3.org/2000/svg"
            initial="hidden"
            animate="visible"
          >
            <motion.path
              d={blogTitlePath}
              stroke="black"
              strokeWidth="1"
              fill="transparent"
              variants={draw}
            />
          </motion.svg>
        </Link>
      </div>
    </header>
  )
}

export default Header