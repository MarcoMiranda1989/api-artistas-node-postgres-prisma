import { NavLink } from 'react-router-dom'

const links = [
  { to: '/artists', label: 'Artistas' },
  { to: '/albums', label: 'Álbumes' },
  { to: '/songs', label: 'Canciones' },
]

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
          MusicManager
        </NavLink>
        <div className="flex gap-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors ${
                  isActive
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-indigo-600'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
