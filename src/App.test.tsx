import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import MainPage from './pages/MainPage'
import DetailPage from './pages/DetailPage'

describe('MainPage', () => {
  it('renders a tile for every patch as a link to its detail page', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    )

    // Each numbered patch (1–14) is rendered as a clickable link.
    for (let n = 1; n <= 14; n += 1) {
      const link = screen.getByRole('link', { name: new RegExp(`Beet ${n}\\b`) })
      expect(link).toHaveAttribute('href', `/patches/${n}`)
    }
  })

  it('renders the special-variant patches Kompost, Kräuter and Himbeeren as links', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: /Kompost/ })).toHaveAttribute('href', '/patches/15')
    expect(screen.getByRole('link', { name: /Kräuter/ })).toHaveAttribute('href', '/patches/16')
    expect(screen.getByRole('link', { name: /Beeren/ })).toHaveAttribute('href', '/patches/17')
  })

  it('renders storage units (Schuppen, Kiste) as links to /storage/:id', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: 'Kiste' })).toHaveAttribute('href', '/storage/kiste')
    expect(screen.getByRole('link', { name: 'Schuppen' })).toHaveAttribute(
      'href',
      '/storage/schuppen'
    )
  })
})

describe('DetailPage', () => {
  function renderAt(path: string) {
    return render(
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/patches/:number" element={<DetailPage />} />
        </Routes>
      </MemoryRouter>
    )
  }

  it('shows the patch label as the heading for /patches/7', () => {
    renderAt('/patches/7')
    expect(screen.getByRole('heading', { level: 1, name: 'Beet 7' })).toBeInTheDocument()
  })

  it('lists the planted plant with its feeder and light requirement', () => {
    renderAt('/patches/7')
    expect(screen.getByText('Rucola')).toBeInTheDocument()
    expect(screen.getByText('Radieschen')).toBeInTheDocument()
    expect(screen.getByText('Edamame')).toBeInTheDocument()
  })

  it('shows the plant count badge', () => {
    renderAt('/patches/7')
    expect(screen.getByText(/^3 Pflanzen$/)).toBeInTheDocument()
  })

  it('renders a back link to the main page', () => {
    renderAt('/patches/7')
    const backLink = screen.getByRole('link', { name: /Beet 7/ })
    expect(backLink).toHaveAttribute('href', '/')
  })

  it('renders the Saison-Plan section with month headers', () => {
    renderAt('/patches/7')
    expect(screen.getByText(/Saison-Plan/i)).toBeInTheDocument()
    expect(screen.getByText('MÄR')).toBeInTheDocument()
    expect(screen.getByText('NOV')).toBeInTheDocument()
  })

  it('shows a not-found fallback for unknown patch numbers', () => {
    renderAt('/patches/999')
    expect(
      screen.getByRole('heading', { level: 1, name: /nicht gefunden/i })
    ).toBeInTheDocument()
  })
})
