import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

test('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  const { getByText, getAllByRole } = renderWithRouter(<App />);
  const zero = 0;
  const detailsLink = getByText('More details');
  fireEvent.click(detailsLink);
  expect(getByText('Pikachu Details')).toBeInTheDocument();
  expect(detailsLink).not.toBeInTheDocument();
  expect(getByText('Summary')).toBeInTheDocument();
  expect(getAllByRole('generic')[zero]).toHaveTextContent('roasts hard berries');
});

test('Existe na página uma seção com o mapa contendo as localizações do pokémon', () => {
  const { getByText, getAllByAltText } = renderWithRouter(<App />);
  const two = 2;
  fireEvent.click(getByText('More details'));
  const locations = getAllByAltText('Pikachu location');
  expect(getByText('Game Locations of Pikachu')).toBeInTheDocument();
  expect(getByText('Kanto Viridian Forest')).toBeInTheDocument();
  expect(getByText('Kanto Power Plant')).toBeInTheDocument();
  expect(locations.length).toBe(two);
  expect(locations[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(locations[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
});

test('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  const { getByText } = renderWithRouter(<App />);
  fireEvent.click(getByText('More details'));
  expect(getByText('Pokémon favoritado?')).toBeInTheDocument();
});
