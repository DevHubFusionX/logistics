import { Link } from 'react-router-dom'
import { AnimatedLogo } from '../../../common'

export default function SidebarHeader() {
  return (
    <div className="px-6 py-8 border-b border-gray-200">
      <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <AnimatedLogo className="h-10 sm:h-12 w-auto" />
      </Link>
    </div>
  )
}

SidebarHeader.propTypes = {}
