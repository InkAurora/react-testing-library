import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import pokemons from '../data';

const seven = 7;

test('O próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText('Próximo pokémon')).toBeInTheDocument();

  const pokes = [];
  pokemons.map((pokemon) => pokes.push(pokemon.name));
  pokes.forEach((poke) => {
    expect(getByText(poke)).toBeInTheDocument();
    fireEvent.click(getByText('Próximo pokémon'));
  });
  expect(getByText(pokes[0])).toBeInTheDocument();
});

test('É mostrado apenas um Pokémon por vez', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  expect(getAllByTestId('pokemon-name').length).toBe(1);
});

test('A Pokédex tem os botões de filtro', () => {
  const { getByRole, getAllByTestId, getByText } = renderWithRouter(<App />);
  expect(getAllByTestId('pokemon-type-button').length).toBe(seven);
  fireEvent.click(getByRole('button', { name: 'Electric' }));
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('A Pokédex contém um botão para resetar o filtro', () => {
  const { getByRole, getByText } = renderWithRouter(<App />);
  expect(getByText('Pikachu')).toBeInTheDocument();
  expect(getByRole('button', { name: 'All' })).toBeInTheDocument();
  fireEvent.click(getByRole('button', { name: 'All' }));
  expect(getByText('Pikachu')).toBeInTheDocument();
});

test('É criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const pokes = [];
  pokemons.map((pokemon) => {
    if (!pokes.find((e) => pokemon.type === e)) {
      return pokes.push(pokemon.type);
    }
    return null;
  });
  const types = [];
  getAllByTestId('pokemon-type-button').map((type) => types.push(type.innerHTML));
  pokes.forEach((type, index) => {
    expect(types[index]).toBe(type);
  });
});

test('O botão de Próximo pokémon deve ser desabilitado', () => {
  const { getByRole, getByTestId, getAllByTestId } = renderWithRouter(<App />);
  expect(getAllByTestId('pokemon-type-button').length).toBe(seven);
  fireEvent.click(getByRole('button', { name: 'Electric' }));
  expect(getByTestId('next-pokemon')).toBeDisabled();
});
