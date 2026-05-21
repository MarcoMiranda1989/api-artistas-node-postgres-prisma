import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Album, Song, getAlbum, createSong, updateSong, deleteSong } from '../api/client'
import SongCard from '../components/SongCard'
import SongForm from '../components/SongForm'

export default function AlbumDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [album, setAlbum] = useState<Album | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingSong, setEditingSong] = useState<Song | null>(null)
  const [error, setError] = useState('')

  const load = useCallback(() => {
    if (!id) return
    getAlbum(Number(id))
      .then(setAlbum)
      .catch(() => { setError('Álbum no encontrado'); setAlbum(null) })
  }, [id])

  useEffect(() => { load() }, [load])

  const handleCreateSong = async (data: any) => {
    await createSong({ ...data, albumId: Number(id) })
    setShowForm(false)
    load()
  }

  const handleUpdateSong = async (data: any) => {
    if (!editingSong) return
    await updateSong(editingSong.id, data)
    setEditingSong(null)
    load()
  }

  const handleDeleteSong = async (songId: number) => {
    if (!confirm('¿Eliminar esta canción?')) return
    await deleteSong(songId)
    load()
  }

  if (!album && !error) {
    return <p className="text-white/50 text-center py-12">Cargando...</p>
  }

  if (error && !album) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">{error}</p>
        <button onClick={() => navigate('/albums')} className="text-accent-light hover:underline">
          Volver a álbumes
        </button>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => navigate('/albums')}
        className="text-accent-light hover:underline mb-4 inline-block"
      >
        &larr; Volver a álbumes
      </button>

      {album && (
        <>
          <div className="bg-secondary rounded-lg p-6 mb-8 flex items-center gap-6">
            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-accent/80 to-highlight/60 flex items-center justify-center overflow-hidden shrink-0">
              {album.image ? (
                <img src={album.image} alt={album.titulo} className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl text-white/60 font-bold">{album.titulo.charAt(0)}</span>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-highlight">{album.titulo}</h1>
              <p className="text-white/60">{album.anio} {album.genero ? `· ${album.genero}` : ''}</p>
              {album.artista && (
                <button
                  onClick={() => navigate(`/artists/${album.artista?.id}`)}
                  className="text-accent-light hover:underline text-sm mt-1"
                >
                  {album.artista?.nombre}
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-accent-light">Canciones</h2>
            <button
              onClick={() => setShowForm(true)}
              className="bg-accent hover:bg-accent-light text-white px-4 py-2 rounded font-medium transition-colors text-sm"
            >
              + Nueva Canción
            </button>
          </div>

          {(showForm || editingSong) && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <SongForm
                song={editingSong}
                onSubmit={editingSong ? handleUpdateSong : handleCreateSong}
                onCancel={() => { setShowForm(false); setEditingSong(null) }}
              />
            </div>
          )}

          {(!album.canciones || album.canciones.length === 0) && (
            <p className="text-white/50 text-center py-8">Este álbum no tiene canciones</p>
          )}

          <div className="space-y-2">
            {album.canciones?.map((s) => (
              <SongCard key={s.id} song={s} onEdit={setEditingSong} onDelete={handleDeleteSong} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
