import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../components/homepage';

// Tests
describe('Renders homepage correctly', async () => {
  it('Should render the page correctly', async () => {
    render(<HomePage />);

    const approveMusician = screen.findByText('Approve Musician');

    expect(approveMusician).not.toBeNull();
  });
});
