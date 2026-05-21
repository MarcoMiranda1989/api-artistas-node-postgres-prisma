import { FormEvent, useState, useEffect } from 'react'
import { Song, Album, getAlbums } from '../api/client'

interface Props {
  song?: Song | null
  onSubmit: (data: Partial<Song>) => Promise<void>
  onCancel: () => void
}

export default function SongForm({ song, onSubmit, onCancel }: Props) {
  const [titulo, setTitulo] = useState('')
  const [duracion, setDuracion] = useState('')
  const [albumId, setAlbumId] = useState('')
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAlbums().then(setAlbums).catch(() => {})
    if (song) {
      setTitulo(song.titulo)
      setDuracion(String(song.duracion))
      setAlbumId(String(song.albumId))
    }
  }, [song])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await onSubmit({
      titulo,
      duracion: Number(duracion),
      albumId: Number(albumId),
    })
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded-lg space-y-4 max-w-lg">
      <h2 className="text-xl font-bold text-accent-light">
        {song ? 'Editar Canción' : 'Nueva Canción'}
      </h2>
      <div>
        <label className="block text-sm text-white/70 mb-1">Título</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          className="w-full bg-primary border border-accent/30 rounded px-3 py-2 text-white focus:outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="block text-sm text-white/70 mb-1">Duración (segundos)</label>
        <input
          type="number"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          required
          className="w-full bg-primary border border-accent/30 rounded px-3 py-2 text-white focus:outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="block text-sm text-white/70 mb-1">Álbum</label>
        <select
          value={albumId}
          onChange={(e) => setAlbumId(e.target.value)}
          required
          className="w-full bg-primary border border-accent/30 rounded px-3 py-2 text-white focus:outline-none focus:border-accent"
        >
          <option value="">Selecciona un álbum</option>
          {albums.map((a) => (
            <option key={a.id} value={a.id}>{a.titulo}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-accent hover:bg-accent-light text-white px-4 py-2 rounded font-medium transition-colors disabled:opacity-50"
        >
          {loading ? 'Guardando...' : song ? 'Actualizar' : 'Crear'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded font-medium transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
