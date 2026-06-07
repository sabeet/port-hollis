import { motion } from "framer-motion"
import blogTitlePath from "../constants/blogTitlePath"

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
    <header className="mb-10">
      <motion.svg
        width="362.279"
        height="102.5"
        viewBox="0 0 362.279 102.5"
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
      <p className="text-gray-500 mt-2">Thoughts, writing, and whatever else.</p>
    </header>
  )
}

export default Header