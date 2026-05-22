import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import DetailPage from './pages/DetailPage'
import PlantDetailPage from './pages/PlantDetailPage'

export default function App() {
  // Vite injects BASE_URL (e.g. "/garden/" on GitHub Pages, "/" in dev/tests).
  // Strip the trailing slash so React Router treats it as a basename.
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/patches/:number" element={<DetailPage />} />
        <Route path="/plants/:id" element={<PlantDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}
