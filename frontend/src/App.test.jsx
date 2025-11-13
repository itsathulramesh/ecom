
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { describe, it, expect } from 'vitest'; // Explicitly import test globals

describe('App', () => {
  it('renders the Navbar', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    expect(screen.getByText(/eCommerce Store/i)).toBeInTheDocument();
  });

  it('renders the Home page by default', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    expect(screen.getByText(/Welcome to our eCommerce Store/i)).toBeInTheDocument();
  });
});
