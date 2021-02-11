import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('A página contém as informações sobre a Pokédex', () => {
  const { getByText } = render(<About />);
  expect(getByText('About Pokédex')).toBeInTheDocument();
});

test('A página contém um heading h2 com o texto About Pokédex', () => {
  const { getByText } = render(<About />);
  expect(getByText('About Pokédex')).toBeInTheDocument();
});

test('A página contém dois parágrafos com texto sobre a Pokédex', () => {
  const { container } = render(<About />);
  const temp = container.querySelectorAll('p');
  const two = 2;
  expect(temp.length).toBe(two);
});

test('A página contém a seguinte imagem de uma Pokédex', () => {
  const { getByRole } = render(<About />);
  const src = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  expect(getByRole('img').src).toBe(src);
});
