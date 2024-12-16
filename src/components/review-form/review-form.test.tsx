import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { makeFakeOffer } from '../../utils/mocks';
import ReviewForm from './review-form'; // Adjust the import according to your file structure
import { store } from '../../store';

describe('ReviewForm Component', () => {
  const renderWithProvider = (ui: React.ReactElement) =>
    render(
      <Provider store={store}>
        <MemoryRouter>{ui}</MemoryRouter>
      </Provider>
    );

  it('should render review form with rating and review input', () => {
    const mockOffer = makeFakeOffer();

    renderWithProvider(<ReviewForm offerId={mockOffer.id} />);

    expect(screen.getByLabelText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByTitle(/perfect/i)).toBeInTheDocument();
    expect(screen.getByTitle(/good/i)).toBeInTheDocument();
    expect(screen.getByTitle(/not bad/i)).toBeInTheDocument();
    expect(screen.getByTitle(/badly/i)).toBeInTheDocument();
    expect(screen.getByTitle(/terribly/i)).toBeInTheDocument();
  });


  it('should disable submit button if form is invalid', async () => {
    const mockOffer = makeFakeOffer();

    renderWithProvider(<ReviewForm offerId={mockOffer.id} />);

    const submitButton = screen.getByRole('button', { name: /Submit/i });

    expect(submitButton).toBeDisabled();

    const reviewInput = screen.getByLabelText(/Your review/i);
    const ratingInput = screen.getByTitle(/perfect/i);

    await userEvent.type(reviewInput, 'This is a review with enough characters to pass the validation');
    await userEvent.click(ratingInput);

    expect(submitButton).toBeEnabled();
  });


  it('should show error message if review length is invalid', async () => {
    const mockOffer = makeFakeOffer();

    renderWithProvider(<ReviewForm offerId={mockOffer.id} />);

    const reviewInput = screen.getByLabelText(/Your review/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i });

    await userEvent.type(reviewInput, 'A much longer review that meets the length requirement.');
    await userEvent.click(screen.getByTitle(/perfect/i));

    expect(submitButton).toBeEnabled();
    await userEvent.click(submitButton);
    expect(screen.queryByText(/Review must be between 50 and 300 characters./i)).not.toBeInTheDocument();
  });
});
