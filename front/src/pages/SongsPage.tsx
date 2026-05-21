import { useState, useEffect, useCallback } from 'react'
import { Song, getSongs, createSong, updateSong, deleteSong } from '../api/client'
import SongCard from '../components/SongCard'
import SongForm from '../components/SongForm'

export default function SongsPage() {
  const [songs, setSongs] = useState<Song[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Song | null>(null)
  const [error, setError] = useState('')

  const load = useCallback(() => {
    getSongs()
      .then(setSongs)
      .catch(() => setError('Error al cargar canciones'))
  }, [])

  useEffect(() => { load() }, [load])

  const handleCreate = async (data: Partial<Song>) => {
    await createSong(data)
    setShowForm(false)
    load()
  }

  const handleUpdate = async (data: Partial<Song>) => {
    if (!editing) return
    await updateSong(editing.id, data)
    setEditing(null)
    load()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta canción?')) return
    await deleteSong(id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-highlight">Canciones</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-accent hover:bg-accent-light text-white px-4 py-2 rounded font-medium transition-colors"
        >
          + Nueva Canción
        </button>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {(showForm || editing) && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <SongForm
            song={editing}
            onSubmit={editing ? handleUpdate : handleCreate}
            onCancel={() => { setShowForm(false); setEditing(null) }}
          />
        </div>
      )}

      {songs.length === 0 && !error && (
        <p className="text-white/50 text-center py-12">No hay canciones registradas</p>
      )}

      <div className="space-y-2">
        {songs.map((s) => (
          <SongCard key={s.id} song={s} onEdit={setEditing} onDelete={handleDelete} showAlbum />
        ))}
      </div>
    </div>
  )
}
