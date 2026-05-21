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
    <div className="bg-secondary/80 rounded-lg px-4 py-3 flex items-center justify-between group hover:bg-secondary transition-colors">
      <div className="flex-1">
        <h3 className="text-white font-medium">{song.titulo}</h3>
        <div className="flex gap-3 text-sm text-white/50">
          <span>{formatDuration(song.duracion)}</span>
          {showAlbum && song.album && <span>{song.album.titulo}</span>}
        </div>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(song)}
          className="text-sm bg-accent hover:bg-accent-light text-white px-3 py-1 rounded transition-colors"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(song.id)}
          className="text-sm bg-red-500/80 hover:bg-red-500 text-white px-3 py-1 rounded transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}
