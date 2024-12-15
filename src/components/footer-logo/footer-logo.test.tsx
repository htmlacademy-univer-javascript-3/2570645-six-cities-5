import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MemoizedFooterLogo from './footer-logo'; // Путь к компоненту

describe('Component: FooterLogo', () => {
  it('should render correctly', () => {
    const expectedAltText = '6 cities logo';
    const expectedSrc = 'public/img/logo.svg';
    const expectedWidth = 64;
    const expectedHeight = 33;

    render(
      <MemoryRouter>
        <MemoizedFooterLogo />
      </MemoryRouter>
    );

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getByAltText(expectedAltText).getAttribute('src')).toBe(expectedSrc);

    const footerLogoImage = screen.getByAltText(expectedAltText);
    expect(footerLogoImage).toHaveAttribute('width', expectedWidth.toString());
    expect(footerLogoImage).toHaveAttribute('height', expectedHeight.toString());
  });
});
