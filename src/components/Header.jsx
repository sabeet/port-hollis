import { motion } from "framer-motion"
import blogTitlePath from "../constants/blogTitlePath"
import { Link } from 'react-router-dom'
import draw from '../utils/Draw'

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
              variants={draw(10)}
            />
          </motion.svg>
        </Link>
      </div>
    </header>
  )
}

export default Header