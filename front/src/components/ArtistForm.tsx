import { FormEvent, useState, useEffect } from 'react'
import { Artist } from '../api/client'

interface Props {
  artist?: Artist | null
  onSubmit: (data: Partial<Artist>) => Promise<void>
  onCancel: () => void
}

export default function ArtistForm({ artist, onSubmit, onCancel }: Props) {
  const [nombre, setNombre] = useState('')
  const [pais, setPais] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (artist) {
      setNombre(artist.nombre)
      setPais(artist.pais || '')
      setImage(artist.image || '')
    }
  }, [artist])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await onSubmit({ nombre, pais, image })
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded-lg space-y-4 max-w-lg">
      <h2 className="text-xl font-bold text-accent-light">
        {artist ? 'Editar Artista' : 'Nuevo Artista'}
      </h2>
      <div>
        <label className="block text-sm text-white/70 mb-1">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="w-full bg-primary border border-accent/30 rounded px-3 py-2 text-white focus:outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="block text-sm text-white/70 mb-1">País</label>
        <input
          type="text"
          value={pais}
          onChange={(e) => setPais(e.target.value)}
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
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-accent hover:bg-accent-light text-white px-4 py-2 rounded font-medium transition-colors disabled:opacity-50"
        >
          {loading ? 'Guardando...' : artist ? 'Actualizar' : 'Crear'}
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
