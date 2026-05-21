import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ArtistsPage from './pages/ArtistsPage'
import ArtistDetailPage from './pages/ArtistDetailPage'
import AlbumsPage from './pages/AlbumsPage'
import AlbumDetailPage from './pages/AlbumDetailPage'
import SongsPage from './pages/SongsPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ArtistsPage />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/artists/:id" element={<ArtistDetailPage />} />
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/albums/:id" element={<AlbumDetailPage />} />
        <Route path="/songs" element={<SongsPage />} />
      </Routes>
    </Layout>
  )
}
