import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { Button } from './button';

test('The button should have correct background color', () => {
  render(<Button backgroundColor="#ccc" label="Demo Button" />);
  const button = screen.getByText('Demo Button');
  expect(button).toHaveStyle({
    backgroundColor: '#ccc',
  });
});
