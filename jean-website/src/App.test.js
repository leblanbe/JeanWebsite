import { fireEvent, render, screen } from '@testing-library/react';
import Gallery from './pages/Gallery';

beforeEach(() => {
  localStorage.clear();
});

test('renders the gallery page for an admin user', () => {
  render(<Gallery loggedInUser="jean.feerick@gmail.com" />);

  expect(screen.getByText(/Photography is the story/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /create category/i })).toBeInTheDocument();
});

test('persists a newly created category after a rerender', () => {
  const { unmount } = render(<Gallery loggedInUser="jean.feerick@gmail.com" />);

  fireEvent.click(screen.getByRole('button', { name: /create category/i }));
  fireEvent.change(screen.getByPlaceholderText(/new category name/i), {
    target: { value: 'Travel' },
  });
  fireEvent.click(screen.getByRole('button', { name: /add category/i }));

  expect(screen.getByText('Travel')).toBeInTheDocument();

  unmount();
  render(<Gallery loggedInUser="someone@example.com" />);

  expect(screen.getByText('Travel')).toBeInTheDocument();
});
