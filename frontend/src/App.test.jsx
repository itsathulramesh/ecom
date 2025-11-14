import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the navbar', () => {
    render(<App />);
    const navbarBrand = screen.getByRole('link', { name: /eCommerce/i });
    expect(navbarBrand).toBeInTheDocument();
  });

  it('renders the Home page by default', () => {
    render(<App />);
    expect(screen.getByText(/Welcome to Our eCommerce Store/i)).toBeInTheDocument();
  });
});
