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
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 hover:border-indigo-200 hover:-translate-y-0.5 transition-all cursor-pointer group"
    >
      <div className="h-36 bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center">
        {album.image ? (
          <img src={album.image} alt={album.titulo} className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl text-white/50 font-bold">{album.titulo.charAt(0)}</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{album.titulo}</h3>
        <p className="text-sm text-gray-500">{album.anio}</p>
        {album.genero && <p className="text-xs text-indigo-500 mt-1">{album.genero}</p>}
        {showArtist && album.artista && (
          <p className="text-xs text-gray-400 mt-1">{album.artista.nombre}</p>
        )}
        <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onEdit(album)}
            className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg transition-colors shadow-sm"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(album.id)}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors shadow-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
