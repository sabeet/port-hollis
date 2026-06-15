import { Link } from 'react-router-dom'

const currentYear = new Date().getFullYear();

function Footer(){
    return (
        <>
    <footer className="mt-auto border-t border-gray-200 py-8">
      <div className="max-w-2xl mx-auto px-4 flex gap-8">
        <div className="w-1/2">
          <Link to="/stack"><span className="text-sm text-gray-400 pb-1">[stack]</span></Link>
        </div>
        <div className="w-1/2 flex justify-end">
          <span className="text-sm text-gray-400 pb-1">[sabeet.dev]</span>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 flex justify-center gap-8 text-gray-400">
        © {currentYear}
      </div>
    </footer>
        </>
    )
}
export default Footer