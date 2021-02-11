import React from 'react';
import { render } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import pokemons from '../data';
import renderWithRouter from './helpers/renderWithRouter';

test('É exibido na tela a mensagem No favorite pokemon found', () => {
  const { getByText } = render(<FavoritePokemons />);
  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});

const favorite = [pokemons[0], pokemons[1]];

test('É exibido todos os cards de pokémons favoritados', () => {
  const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={ favorite } />);
  favorite.forEach((element) => {
    expect(queryByText(element.name)).toBeInTheDocument();
  });
});

test('É exibido na tela a mensagem No favorite pokemon found', () => {
  const { queryByText } = render(<FavoritePokemons />);
  for (let i = favorite.length; i < pokemons.length; i += 1) {
    expect(queryByText(pokemons[i].name)).not.toBeInTheDocument();
  }
});
