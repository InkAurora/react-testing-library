import React from 'react';
import { render } from '@testing-library/react';
import { NotFound } from '../components';

test('A página contém um heading h2 com o texto Page requested not found 😭', () => {
  const { getByText } = render(<NotFound />);
  expect(getByText('Page requested not found')).toBeInTheDocument();
});

test('A página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  const { getByAltText } = render(<NotFound />);
  const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const alt = 'Pikachu crying because the page requested was not found';
  expect(getByAltText(alt).src).toBe(src);
});
