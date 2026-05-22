import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import DetailPage from './pages/DetailPage'
import PlantDetailPage from './pages/PlantDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/patches/:number" element={<DetailPage />} />
        <Route path="/plants/:id" element={<PlantDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}
