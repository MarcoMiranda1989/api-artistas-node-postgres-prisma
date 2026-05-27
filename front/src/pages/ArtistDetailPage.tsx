import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Artist, Album, getArtist, createAlbum, updateAlbum, deleteAlbum } from '../api/client'
import AlbumCard from '../components/AlbumCard'
import AlbumForm from '../components/AlbumForm'

export default function ArtistDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [artist, setArtist] = useState<Artist | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null)
  const [error, setError] = useState('')

  const load = useCallback(() => {
    if (!id) return
    getArtist(Number(id))
      .then(setArtist)
      .catch(() => { setError('Artista no encontrado'); setArtist(null) })
  }, [id])

  useEffect(() => { load() }, [load])

  const handleCreateAlbum = async (data: any) => {
    await createAlbum({ ...data, artistaId: Number(id) })
    setShowForm(false)
    load()
  }

  const handleUpdateAlbum = async (data: any) => {
    if (!editingAlbum) return
    await updateAlbum(editingAlbum.id, data)
    setEditingAlbum(null)
    load()
  }

  const handleDeleteAlbum = async (albumId: number) => {
    if (!confirm('¿Eliminar este álbum?')) return
    await deleteAlbum(albumId)
    load()
  }

  if (!artist && !error) {
    return     <p className="text-gray-400 text-center py-12">Cargando...</p>
  }

  if (error && !artist) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={() => navigate('/artists')} className="text-indigo-600 hover:text-indigo-700 hover:underline font-medium">
          Volver a artistas
        </button>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => navigate('/artists')}
        className="text-indigo-600 hover:text-indigo-700 hover:underline mb-4 inline-block font-medium"
      >
        &larr; Volver a artistas
      </button>

      {artist && (
        <>
          <div className="bg-white rounded-xl p-6 mb-8 flex items-center gap-6 shadow-sm border border-gray-100">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-400 flex items-center justify-center overflow-hidden shrink-0">
              {artist.image ? (
                <img src={artist.image} alt={artist.nombre} className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl text-white/60 font-bold">{artist.nombre.charAt(0)}</span>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{artist.nombre}</h1>
              <p className="text-gray-500">{artist.pais || 'País no especificado'}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-indigo-600">Álbumes</h2>
            <button
              onClick={() => setShowForm(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm shadow-sm"
            >
              + Nuevo Álbum
            </button>
          </div>

          {(showForm || editingAlbum) && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <AlbumForm
                album={editingAlbum}
                onSubmit={editingAlbum ? handleUpdateAlbum : handleCreateAlbum}
                onCancel={() => { setShowForm(false); setEditingAlbum(null) }}
              />
            </div>
          )}

          {(!artist.albums || artist.albums.length === 0) && (
            <p className="text-gray-400 text-center py-8">Este artista no tiene álbumes</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artist.albums?.map((a) => (
              <AlbumCard key={a.id} album={a} onEdit={setEditingAlbum} onDelete={handleDeleteAlbum} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
