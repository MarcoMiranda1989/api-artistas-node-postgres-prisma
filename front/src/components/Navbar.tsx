import { NavLink } from 'react-router-dom'

const links = [
  { to: '/artists', label: 'Artistas' },
  { to: '/albums', label: 'Álbumes' },
  { to: '/songs', label: 'Canciones' },
]

export default function Navbar() {
  return (
    <nav className="bg-secondary shadow-lg border-b border-accent/30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="text-2xl font-bold text-highlight tracking-tight">
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
                    ? 'text-accent-light border-b-2 border-accent-light'
                    : 'text-white/80 hover:text-accent-light'
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
