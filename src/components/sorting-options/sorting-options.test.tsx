import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MemoizedSortingOptions from './sorting-options';
import { SortOptions } from '../../const';
import { vi } from 'vitest';

describe('SortingOptions Component', () => {
  it('should render with default selected option', () => {
    render(<MemoizedSortingOptions onSortChange={vi.fn()} />);
    const sortingType = screen.getByText(SortOptions.Popular, { selector: '.places__sorting-type' });
    expect(sortingType).toBeInTheDocument();
  });

  it('should open and close the dropdown when clicked', () => {
    render(<MemoizedSortingOptions onSortChange={vi.fn()} />);
    const sortingType = screen.getByText(SortOptions.Popular, { selector: '.places__sorting-type' });

    fireEvent.click(sortingType);
    expect(screen.getByRole('list')).toHaveClass('places__options--opened');

    fireEvent.click(sortingType);
    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');
  });

  it('should call onSortChange with the correct option when an option is clicked', () => {
    const onSortChange = vi.fn();
    render(<MemoizedSortingOptions onSortChange={onSortChange} />);
    const sortingType = screen.getByText(SortOptions.Popular, { selector: '.places__sorting-type' });

    fireEvent.click(sortingType);
    const option = screen.getByText(SortOptions.PriceLowToHigh);
    fireEvent.click(option);

    expect(onSortChange).toHaveBeenCalledWith(SortOptions.PriceLowToHigh);
    expect(screen.getByText(SortOptions.PriceLowToHigh, { selector: '.places__sorting-type' })).toBeInTheDocument();
  });
});
