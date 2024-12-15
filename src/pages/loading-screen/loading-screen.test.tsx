import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component: LoadingScreen', () => {
  it('should render loading text', () => {
    render(<LoadingScreen />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('should render three dots for loading animation', () => {
    render(<LoadingScreen />);
    const dots = screen.getAllByTestId('loading-dot');
    expect(dots).toHaveLength(3);
  });
});
