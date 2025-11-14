import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest'; // Explicitly import test globals

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
