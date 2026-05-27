import { Song } from '../api/client'

interface Props {
  song: Song
  onEdit: (song: Song) => void
  onDelete: (id: number) => void
  showAlbum?: boolean
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function SongCard({ song, onEdit, onDelete, showAlbum }: Props) {
  return (
    <div className="bg-white rounded-xl px-4 py-3 flex items-center justify-between group hover:bg-gray-50 transition-colors border border-gray-100 shadow-sm">
      <div className="flex-1">
        <h3 className="text-gray-900 font-medium">{song.titulo}</h3>
        <div className="flex gap-3 text-sm text-gray-400">
          <span>{formatDuration(song.duracion)}</span>
          {showAlbum && song.album && <span>{song.album.titulo}</span>}
        </div>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(song)}
          className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg transition-colors shadow-sm"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(song.id)}
          className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors shadow-sm"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}
