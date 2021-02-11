import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

test('É renderizado um card com as informações de determinado pokémon', () => {
  const { getByTestId, getByAltText } = renderWithRouter(<App />);
  const name = getByTestId('pokemon-name');
  expect(name.innerHTML).toBe('Pikachu');
  expect(getByTestId('pokemonType').innerHTML).toBe('Electric');
  expect(getByTestId('pokemon-weight').innerHTML).toBe('Average weight:6.0kg');
  const pikachuImg = getByAltText('Pikachu sprite');
  expect(pikachuImg).toBeInTheDocument();
  expect(pikachuImg.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('O card do Pokémon indicado na Pokédex contém um link para exibir detalhes', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('More details'));
  expect(history.location.pathname).toBe('/pokemons/25');
});

test('Existe um ícone de estrela nos Pokémons favoritados', () => {
  const { getByText, getByAltText } = renderWithRouter(<App />);
  fireEvent.click(getByText('More details'));
  fireEvent.click(getByText('Pokémon favoritado?'));
  expect(getByAltText('Pikachu is marked as favorite')).toBeInTheDocument();
  expect(getByAltText('Pikachu is marked as favorite').src).toBe('http://localhost/star-icon.svg');
});
