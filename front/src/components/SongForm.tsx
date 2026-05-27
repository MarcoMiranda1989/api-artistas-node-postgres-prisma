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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl space-y-4 max-w-lg w-full shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold text-indigo-600">
        {song ? 'Editar Canción' : 'Nueva Canción'}
      </h2>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Título</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Duración (segundos)</label>
        <input
          type="number"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          required
          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Álbum</label>
        <select
          value={albumId}
          onChange={(e) => setAlbumId(e.target.value)}
          required
          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 shadow-sm"
        >
          {loading ? 'Guardando...' : song ? 'Actualizar' : 'Crear'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
