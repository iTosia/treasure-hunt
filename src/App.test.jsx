import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the loading state initially', () => {
    render(<App />);
    expect(screen.getByText(/Loading Map\.\.\./i)).toBeInTheDocument();
  });

  it('renders the game title', () => {
    render(<App />);
    expect(screen.getByText(/Treasure Hunt/i)).toBeInTheDocument();
  });
});
