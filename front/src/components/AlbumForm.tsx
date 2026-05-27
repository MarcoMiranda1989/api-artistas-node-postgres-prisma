import { FormEvent, useState, useEffect } from 'react'
import { Album, Artist, getArtists } from '../api/client'

interface Props {
  album?: Album | null
  onSubmit: (data: Partial<Album>) => Promise<void>
  onCancel: () => void
}

export default function AlbumForm({ album, onSubmit, onCancel }: Props) {
  const [titulo, setTitulo] = useState('')
  const [anio, setAnio] = useState(String(new Date().getFullYear()))
  const [genero, setGenero] = useState('')
  const [image, setImage] = useState('')
  const [artistaId, setArtistaId] = useState('')
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getArtists().then(setArtists).catch(() => {})
    if (album) {
      setTitulo(album.titulo)
      setAnio(String(album.anio))
      setGenero(album.genero || '')
      setImage(album.image || '')
      setArtistaId(String(album.artistaId))
    }
  }, [album])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await onSubmit({
      titulo,
      anio: Number(anio),
      genero,
      image,
      artistaId: Number(artistaId),
    })
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl space-y-4 max-w-lg w-full shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold text-indigo-600">
        {album ? 'Editar Álbum' : 'Nuevo Álbum'}
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
        <label className="block text-sm text-gray-600 mb-1">Año</label>
        <input
          type="number"
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
          required
          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Género</label>
        <input
          type="text"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">URL de imagen</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Artista</label>
        <select
          value={artistaId}
          onChange={(e) => setArtistaId(e.target.value)}
          required
          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Selecciona un artista</option>
          {artists.map((a) => (
            <option key={a.id} value={a.id}>{a.nombre}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 shadow-sm"
        >
          {loading ? 'Guardando...' : album ? 'Actualizar' : 'Crear'}
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
