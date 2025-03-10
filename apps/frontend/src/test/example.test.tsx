import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Example Test', () => {
  it('should pass', () => {
    render(<div>Hello Test</div>);
    expect(screen.getByText('Hello Test')).toBeInTheDocument();
  });
});
