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
    <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded-lg space-y-4 max-w-lg">
      <h2 className="text-xl font-bold text-accent-light">
        {album ? 'Editar Álbum' : 'Nuevo Álbum'}
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
        <label className="block text-sm text-white/70 mb-1">Año</label>
        <input
          type="number"
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
          required
          className="w-full bg-primary border border-accent/30 rounded px-3 py-2 text-white focus:outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="block text-sm text-white/70 mb-1">Género</label>
        <input
          type="text"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          className="w-full bg-primary border border-accent/30 rounded px-3 py-2 text-white focus:outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="block text-sm text-white/70 mb-1">URL de imagen</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full bg-primary border border-accent/30 rounded px-3 py-2 text-white focus:outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="block text-sm text-white/70 mb-1">Artista</label>
        <select
          value={artistaId}
          onChange={(e) => setArtistaId(e.target.value)}
          required
          className="w-full bg-primary border border-accent/30 rounded px-3 py-2 text-white focus:outline-none focus:border-accent"
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
          className="bg-accent hover:bg-accent-light text-white px-4 py-2 rounded font-medium transition-colors disabled:opacity-50"
        >
          {loading ? 'Guardando...' : album ? 'Actualizar' : 'Crear'}
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
