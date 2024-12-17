import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MemoizedLogo from './logo'; // Путь к компоненту

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const expectedAltText = '6 cities logo';
    const expectedSrc = 'img/logo.svg';
    const expectedWidth = 81;
    const expectedHeight = 41;

    render(
      <MemoryRouter>
        <MemoizedLogo />
      </MemoryRouter>
    );

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getByAltText(expectedAltText).getAttribute('src')).toBe(expectedSrc);

    const logoImage = screen.getByAltText(expectedAltText);
    expect(logoImage).toHaveAttribute('width', expectedWidth.toString());
    expect(logoImage).toHaveAttribute('height', expectedHeight.toString());
  });
});
