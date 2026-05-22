import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import MainPage from './pages/MainPage'
import DetailPage from './pages/DetailPage'

describe('MainPage', () => {
  it('renders the heading', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: /garden/i })).toBeInTheDocument()
  })

  it('renders item links', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: 'Item 1' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Item 5' })).toBeInTheDocument()
  })
})

describe('DetailPage', () => {
  it('renders the item id from the route', () => {
    render(
      <MemoryRouter initialEntries={['/42']}>
        <Routes>
          <Route path="/:id" element={<DetailPage />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: /item 42/i })).toBeInTheDocument()
  })

  it('renders a back link', () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:id" element={<DetailPage />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: /back to list/i })).toBeInTheDocument()
  })
})
