import { useState, useEffect, useCallback } from 'react'
import { Artist, getArtists, createArtist, updateArtist, deleteArtist } from '../api/client'
import ArtistCard from '../components/ArtistCard'
import ArtistForm from '../components/ArtistForm'

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Artist | null>(null)
  const [error, setError] = useState('')

  const load = useCallback(() => {
    getArtists()
      .then(setArtists)
      .catch(() => setError('Error al cargar artistas'))
  }, [])

  useEffect(() => { load() }, [load])

  const handleCreate = async (data: Partial<Artist>) => {
    await createArtist(data)
    setShowForm(false)
    load()
  }

  const handleUpdate = async (data: Partial<Artist>) => {
    if (!editing) return
    await updateArtist(editing.id, data)
    setEditing(null)
    load()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este artista?')) return
    await deleteArtist(id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-highlight">Artistas</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-accent hover:bg-accent-light text-white px-4 py-2 rounded font-medium transition-colors"
        >
          + Nuevo Artista
        </button>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {(showForm || editing) && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <ArtistForm
            artist={editing}
            onSubmit={editing ? handleUpdate : handleCreate}
            onCancel={() => { setShowForm(false); setEditing(null) }}
          />
        </div>
      )}

      {artists.length === 0 && !error && (
        <p className="text-white/50 text-center py-12">No hay artistas registrados</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {artists.map((a) => (
          <ArtistCard key={a.id} artist={a} onEdit={setEditing} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}
