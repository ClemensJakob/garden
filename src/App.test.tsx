import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import MainPage from './pages/MainPage'
import DetailPage from './pages/DetailPage'
import PlantDetailPage from './pages/PlantDetailPage'

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

  it("tints a bed with its lead plant's accent color (e.g. Kürbis → pumpkin)", () => {
    // Beet 11 = Kürbis only → bed should carry the pumpkin accent class.
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    )
    const kuerbisBed = screen.getByRole('link', { name: /Beet 11/ })
    expect(kuerbisBed.className).toMatch(/accent-pumpkin/)
  })

  it('shows the plant icon next to its name when one is defined', () => {
    // Beet 11 = Kürbis (icon: 🎃)
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    )
    const kuerbisBed = screen.getByRole('link', { name: /Beet 11/ })
    expect(kuerbisBed.textContent).toContain('🎃')
    expect(kuerbisBed.textContent).toContain('Kürbis')
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

  it('lists each planted plant as a link to its plant detail page', () => {
    renderAt('/patches/7')
    expect(screen.getByRole('link', { name: /Rucola Details/ })).toHaveAttribute(
      'href',
      '/plants/rucola'
    )
    expect(screen.getByRole('link', { name: /Radieschen Details/ })).toHaveAttribute(
      'href',
      '/plants/radieschen'
    )
    expect(screen.getByRole('link', { name: /Edamame Details/ })).toHaveAttribute(
      'href',
      '/plants/edamame'
    )
  })

  it('shows the plant count badge', () => {
    renderAt('/patches/7')
    expect(screen.getByText(/^3 Pflanzen$/)).toBeInTheDocument()
  })

  it('renders a back link to the main page', () => {
    renderAt('/patches/7')
    const backLink = screen.getByRole('link', { name: /Garten/ })
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

describe('PlantDetailPage', () => {
  function renderAt(path: string, state?: unknown) {
    return render(
      <MemoryRouter initialEntries={[{ pathname: path, state }]}>
        <Routes>
          <Route path="/plants/:id" element={<PlantDetailPage />} />
        </Routes>
      </MemoryRouter>
    )
  }

  it('shows the plant name as the heading', () => {
    renderAt('/plants/rucola')
    expect(screen.getByRole('heading', { level: 1, name: 'Rucola' })).toBeInTheDocument()
  })

  it('shows row spacing and plant spacing values', () => {
    renderAt('/plants/rucola')
    expect(screen.getByText('Reihenabstand')).toBeInTheDocument()
    expect(screen.getByText('Pflanzabstand')).toBeInTheDocument()
    // Rucola: rowSpacing 20cm, plantSpacing 10cm.
    expect(screen.getByText('20 cm')).toBeInTheDocument()
    expect(screen.getByText('10 cm')).toBeInTheDocument()
  })

  it('lists good and bad companions as links to their plant pages', () => {
    renderAt('/plants/rucola')
    // Rucola goodCompanions include 'salat'.
    const salat = screen.getByRole('link', { name: 'Salat' })
    expect(salat).toHaveAttribute('href', '/plants/salat')
    // Rucola badCompanions include 'weisskohl'.
    const weisskohl = screen.getByRole('link', { name: 'Weißkohl' })
    expect(weisskohl).toHaveAttribute('href', '/plants/weisskohl')
  })

  it('shows the Besonderheiten section', () => {
    renderAt('/plants/rucola')
    expect(screen.getByText('Besonderheiten')).toBeInTheDocument()
  })

  it('back link returns to the originating patch when navigated from one', () => {
    renderAt('/plants/rucola', { fromPatchNumber: 7 })
    const back = screen.getByRole('link', { name: /Beet 7/ })
    expect(back).toHaveAttribute('href', '/patches/7')
  })

  it('back link returns to the garden when no origin is given', () => {
    renderAt('/plants/rucola')
    const back = screen.getByRole('link', { name: /Garten/ })
    expect(back).toHaveAttribute('href', '/')
  })

  it('shows a not-found fallback for unknown plant ids', () => {
    renderAt('/plants/does-not-exist')
    expect(
      screen.getByRole('heading', { level: 1, name: /nicht gefunden/i })
    ).toBeInTheDocument()
  })
})
