import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Rating } from '.'

describe("Rating", () => {
  it ('Should render component', () => {
    
    render(<Rating value={3} />)
    expect(screen.getByLabelText('Avaliação: 3 de 5')).toBeInTheDocument()
  });

  it ('Should render corrent number of stars', () => {
    render(<Rating value={4.5} max={7} />)
    const stars = screen.getByLabelText('Avaliação: 4.5 de 7')
    expect(stars.children.length).toBe(7)
  });

  it ('Should render half star correctly', () => {
    render(<Rating value={2.5} />)
    const halfStar = screen.getByTestId('star-half')
    expect(halfStar).toBeInTheDocument()
  });

  it ('Should render empty stars correctly', () => {
    render(<Rating value={1} />)
    const stars = screen.getAllByTestId('star')
    // 1 full star + 4 empty stars
    expect(stars.length).toBe(5)
    expect(stars[0].parentElement).not.toHaveClass('opacity-30')
    for (let i = 1; i < stars.length; i++) {
      expect(stars[i].parentElement).toHaveClass('opacity-30')
    }
  });

  it('Should render all empty stars for negative value', () => {
    render(<Rating value={-2} />)
    // Todos devem ser vazios
    expect(screen.getAllByTestId('star').filter(el => el.parentElement?.className.includes('opacity-30'))).toHaveLength(5)
    expect(screen.queryByTestId('star-half')).not.toBeInTheDocument()
  })

  it('Should render all full stars for value greater than max', () => {
    render(<Rating value={10} max={5} />)
    expect(screen.getAllByTestId('star')).toHaveLength(5)
    expect(screen.queryByTestId('star-half')).not.toBeInTheDocument()
  })

  it ('Should render all full stars for value greater than max', () => {
    render(<Rating value={10} max={5} />)
    expect(screen.getAllByTestId('star')).toHaveLength(5)
    expect(screen.queryByTestId('star-half')).not.toBeInTheDocument()
  })

  it ('Should area-label reflect value and max props', () => {
    render(<Rating value={3.5} max={8} />)
    expect(screen.getByLabelText('Avaliação: 3.5 de 8')).toBeInTheDocument()
  })

  it ('Should render decimal values correctly', () => {
    render(<Rating value={2.3} />)
    const stars = screen.getAllByTestId('star')

    const disabledStars = stars.filter(el => el.parentElement?.className.includes('opacity-30'))
    expect(disabledStars).toHaveLength(2) // 5 - 2 = 3 estrelas vazias

    const fullStars = stars.filter(el => !el.parentElement?.className.includes('opacity-30'))
    expect(fullStars).toHaveLength(2)
    expect(screen.getAllByTestId('star-half')).toHaveLength(1)
    expect(screen.getAllByTestId('star').filter(el => el.parentElement?.className.includes('opacity-30'))).toHaveLength(2)
  })

  it('Should render no stars when max is 0', () => {
    render(<Rating value={2} max={0} />)
    expect(screen.queryByTestId('star')).not.toBeInTheDocument()
    expect(screen.queryByTestId('star-half')).not.toBeInTheDocument()
  })
})