import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeFakeOffer } from '../../utils/mocks';
import MemoizedPlaceCard from './place-card';
import { store } from '../../store';
import { vi } from 'vitest';

describe('PlaceCard Component', () => {
  const renderWithProvider = (ui: React.ReactElement) =>
    render(
      <Provider store={store}>
        <Router>{ui}</Router>
      </Provider>
    );

  it('should render place card correctly', () => {
    const mockOffer = makeFakeOffer();

    renderWithProvider(<MemoizedPlaceCard offer={mockOffer} onMouseEnter={vi.fn()} onMouseLeave={vi.fn()} />);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
  });

  it('should call onMouseEnter and onMouseLeave when hovered', async () => {
    const mockOffer = makeFakeOffer();
    const handleMouseEnter = vi.fn();
    const handleMouseLeave = vi.fn();
    const user = userEvent.setup();

    renderWithProvider(<MemoizedPlaceCard offer={mockOffer} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />);

    const card = screen.getByText(mockOffer.title).closest('article');
    if (card) {
      await user.hover(card);
      expect(handleMouseEnter).toHaveBeenCalledWith(mockOffer.id);

      await user.unhover(card);
      expect(handleMouseLeave).toHaveBeenCalled();
    }
  });
});
