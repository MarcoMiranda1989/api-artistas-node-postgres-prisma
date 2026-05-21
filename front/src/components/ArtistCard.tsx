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
      className="bg-secondary rounded-lg overflow-hidden shadow-lg hover:shadow-accent/20 hover:scale-[1.02] transition-all cursor-pointer group"
    >
      <div className="h-40 bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
        {artist.image ? (
          <img src={artist.image} alt={artist.nombre} className="w-full h-full object-cover" />
        ) : (
          <span className="text-5xl text-white/40 font-bold">{artist.nombre.charAt(0)}</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-highlight">{artist.nombre}</h3>
        <p className="text-sm text-white/60">{artist.pais || 'País no especificado'}</p>
        {artist.albums && (
          <p className="text-xs text-accent-light mt-1">{artist.albums.length} álbum(es)</p>
        )}
        <div className="flex gap-2 mt-3" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onEdit(artist)}
            className="text-sm bg-accent hover:bg-accent-light text-white px-3 py-1 rounded transition-colors"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(artist.id)}
            className="text-sm bg-red-500/80 hover:bg-red-500 text-white px-3 py-1 rounded transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
