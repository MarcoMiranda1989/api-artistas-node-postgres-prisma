import { useNavigate } from 'react-router-dom'
import { Artist } from '../api/client'

interface Props {
  artist: Artist
  onEdit: (artist: Artist) => void
  onDelete: (id: number) => void
}

export default function ArtistCard({ artist, onEdit, onDelete }: Props) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/artists/${artist.id}`)}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 hover:border-indigo-200 hover:-translate-y-0.5 transition-all cursor-pointer group"
    >
      <div className="h-40 bg-gradient-to-br from-indigo-500 to-indigo-400 flex items-center justify-center">
        {artist.image ? (
          <img src={artist.image} alt={artist.nombre} className="w-full h-full object-cover" />
        ) : (
          <span className="text-5xl text-white/50 font-bold">{artist.nombre.charAt(0)}</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{artist.nombre}</h3>
        <p className="text-sm text-gray-500">{artist.pais || 'País no especificado'}</p>
        {artist.albums && (
          <p className="text-xs text-indigo-500 mt-1">{artist.albums.length} álbum(es)</p>
        )}
        <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onEdit(artist)}
            className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg transition-colors shadow-sm"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(artist.id)}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors shadow-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
