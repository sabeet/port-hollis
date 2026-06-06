import { Link } from 'react-router-dom'

function Post({ title, date, filename }) {
  return (
    <li className="border-b pb-10">
      <p className="text-sm text-gray-400">{date}</p>
      <h2 className="text-2xl font-semibold mt-1">{title}</h2>
      <Link to={`/posts/${filename}`} className="text-blue-500 text-sm mt-3 inline-block">
        Read more →
      </Link>
    </li>
  )
}

export default Post