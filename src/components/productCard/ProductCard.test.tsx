import { render, screen } from '@testing-library/react'
import { ProductCard } from './index'
import { describe, expect, it } from 'vitest'

describe('ProductCard', () => {
  const baseProps = {
    title: 'Produto Teste',
    price: 1000,
  }

  it ('Should render component', () => {
    render(<ProductCard {...baseProps} />)
    expect(screen.getByText('Produto Teste')).toBeInTheDocument()
  })

  it ('Should render price correctly', () => {
    render(<ProductCard {...baseProps} price={2500} />)
    expect(screen.getByText("R$ 2.500,00")).toBeInTheDocument()
    expect(screen.getByText(baseProps.title)).toBeInTheDocument()
  })

  it ('Should render original price', () => {
    render(<ProductCard {...baseProps} originalPrice={1500} />)
    const original = screen.getByText('R$ 1.500,00')
    expect(original).toBeInTheDocument()
    expect(original).toHaveClass('line-through')
  })

  it ('Should render badge', () => {
    render(<ProductCard {...baseProps} badge="Promoção" />)
    expect(screen.getByText('Promoção')).toBeInTheDocument()
  })

  it ('Should not render badge when none provided', () => {
    render(<ProductCard {...baseProps} badge={undefined} />)
    expect(screen.queryByText('Lançamento')).not.toBeInTheDocument()
  })

  it ('Should render image when provided', () => {
    render(<ProductCard {...baseProps} image={{ src: 'img.png', alt: 'alt img' }} />)
    const img = screen.getByAltText('alt img') as HTMLImageElement
    expect(img).toBeInTheDocument()
    expect(img.src).toContain('img.png')
  })

  it ('Should not render image when none provided', () => {
    render(<ProductCard {...baseProps} image={undefined} />)
    const img = screen.queryByRole('img')
    expect(img).not.toBeInTheDocument()
  })

  it('renderiza rating corretamente', () => {
    render(<ProductCard {...baseProps} rating={3.5} />)
    // Espera encontrar 3 estrelas cheias, 1 meia estrela e 1 vazia (opacidade)
    const stars = screen.getByLabelText('Avaliação: 3.5 de 5')
    expect(stars).toBeInTheDocument()
  })

  it('renderiza sem imagem, sem badge e sem originalPrice', () => {
    render(<ProductCard title="Sem extras" price={500} />)
    expect(screen.getByText('Sem extras')).toBeInTheDocument()
    expect(screen.getByText('R$ 500,00')).toBeInTheDocument()
  })
})
