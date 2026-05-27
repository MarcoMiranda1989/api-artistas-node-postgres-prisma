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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl space-y-4 max-w-lg w-full shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold text-indigo-600">
        {artist ? 'Editar Artista' : 'Nuevo Artista'}
      </h2>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">País</label>
        <input
          type="text"
          value={pais}
          onChange={(e) => setPais(e.target.value)}
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
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 shadow-sm"
        >
          {loading ? 'Guardando...' : artist ? 'Actualizar' : 'Crear'}
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
