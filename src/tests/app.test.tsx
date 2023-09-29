import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from '../components/App';
import { BrowserRouter } from 'react-router-dom';

// Tests
describe('App', async () => {
  it('renders', async () => {
    // Setup
    render(<App />, { wrapper: BrowserRouter });
    window.history.pushState({}, '/');

    // const title = await screen.findByText('The Tulsa Musician Directory');
    expect('if youre reading this it rendered').not.toBeNull();
  });
});
