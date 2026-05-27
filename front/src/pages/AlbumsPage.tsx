import { useState, useEffect, useCallback } from 'react'
import { Album, getAlbums, createAlbum, updateAlbum, deleteAlbum } from '../api/client'
import AlbumCard from '../components/AlbumCard'
import AlbumForm from '../components/AlbumForm'

export default function AlbumsPage() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Album | null>(null)
  const [error, setError] = useState('')

  const load = useCallback(() => {
    getAlbums()
      .then(setAlbums)
      .catch(() => setError('Error al cargar álbumes'))
  }, [])

  useEffect(() => { load() }, [load])

  const handleCreate = async (data: Partial<Album>) => {
    await createAlbum(data)
    setShowForm(false)
    load()
  }

  const handleUpdate = async (data: Partial<Album>) => {
    if (!editing) return
    await updateAlbum(editing.id, data)
    setEditing(null)
    load()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este álbum?')) return
    await deleteAlbum(id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Álbumes</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
        >
          + Nuevo Álbum
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {(showForm || editing) && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <AlbumForm
            album={editing}
            onSubmit={editing ? handleUpdate : handleCreate}
            onCancel={() => { setShowForm(false); setEditing(null) }}
          />
        </div>
      )}

      {albums.length === 0 && !error && (
        <p className="text-gray-400 text-center py-12">No hay álbumes registrados</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {albums.map((a) => (
          <AlbumCard key={a.id} album={a} onEdit={setEditing} onDelete={handleDelete} showArtist />
        ))}
      </div>
    </div>
  )
}
