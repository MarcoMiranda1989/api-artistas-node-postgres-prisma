const BASE_URL = 'http://localhost:3000'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Error desconocido' }))
    throw new Error(err.error || `HTTP ${res.status}`)
  }
  return res.json()
}

export interface Artist {
  id: number
  nombre: string
  pais: string
  image: string
  albums?: Album[]
  createdAt: string
  updatedAt: string
}

export interface Album {
  id: number
  titulo: string
  anio: number
  image: string
  genero: string
  artistaId: number
  artista?: Artist
  canciones?: Song[]
  createdAt: string
  updatedAt: string
}

export interface Song {
  id: number
  titulo: string
  duracion: number
  albumId: number
  album?: Album
  createdAt: string
  updatedAt: string
}

export const getArtists = () => request<Artist[]>('/artists')
export const getArtist = (id: number) => request<Artist>(`/artists/${id}`)
export const createArtist = (data: Partial<Artist>) =>
  request<Artist>('/artists', { method: 'POST', body: JSON.stringify(data) })
export const updateArtist = (id: number, data: Partial<Artist>) =>
  request<Artist>(`/artists/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const deleteArtist = (id: number) =>
  request<{ message: string }>(`/artists/${id}`, { method: 'DELETE' })

export const getAlbums = () => request<Album[]>('/albums')
export const getAlbum = (id: number) => request<Album>(`/albums/${id}`)
export const createAlbum = (data: Partial<Album>) =>
  request<Album>('/albums', { method: 'POST', body: JSON.stringify(data) })
export const updateAlbum = (id: number, data: Partial<Album>) =>
  request<Album>(`/albums/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const deleteAlbum = (id: number) =>
  request<{ message: string }>(`/albums/${id}`, { method: 'DELETE' })

export const getSongs = () => request<Song[]>('/songs')
export const getSong = (id: number) => request<Song>(`/songs/${id}`)
export const createSong = (data: Partial<Song>) =>
  request<Song>('/songs', { method: 'POST', body: JSON.stringify(data) })
export const updateSong = (id: number, data: Partial<Song>) =>
  request<Song>(`/songs/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const deleteSong = (id: number) =>
  request<{ message: string }>(`/songs/${id}`, { method: 'DELETE' })
