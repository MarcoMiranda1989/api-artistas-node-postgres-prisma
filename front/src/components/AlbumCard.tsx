import { useNavigate } from 'react-router-dom'
import { Album } from '../api/client'

interface Props {
  album: Album
  onEdit: (album: Album) => void
  onDelete: (id: number) => void
  showArtist?: boolean
}

export default function AlbumCard({ album, onEdit, onDelete, showArtist }: Props) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/albums/${album.id}`)}
      className="bg-secondary rounded-lg overflow-hidden shadow-lg hover:shadow-accent/20 hover:scale-[1.02] transition-all cursor-pointer group"
    >
      <div className="h-36 bg-gradient-to-br from-accent/80 to-highlight/60 flex items-center justify-center">
        {album.image ? (
          <img src={album.image} alt={album.titulo} className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl text-white/40 font-bold">{album.titulo.charAt(0)}</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-highlight">{album.titulo}</h3>
        <p className="text-sm text-white/60">{album.anio}</p>
        {album.genero && <p className="text-xs text-accent-light mt-1">{album.genero}</p>}
        {showArtist && album.artista && (
          <p className="text-xs text-white/40 mt-1">{album.artista.nombre}</p>
        )}
        <div className="flex gap-2 mt-3" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onEdit(album)}
            className="text-sm bg-accent hover:bg-accent-light text-white px-3 py-1 rounded transition-colors"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(album.id)}
            className="text-sm bg-red-500/80 hover:bg-red-500 text-white px-3 py-1 rounded transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
