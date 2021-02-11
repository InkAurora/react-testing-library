import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('About')).toBeInTheDocument();
  expect(getByText('Favorite Pokémons')).toBeInTheDocument();
});

test('A aplicação é redirecionada para a página inicial.', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const home = getByText('Home');
  fireEvent.click(home);

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('A aplicação é redirecionada para a página de About', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const about = getByText('About');
  fireEvent.click(about);

  expect(getByText('About Pokédex')).toBeInTheDocument();
});

test('A aplicação é redirecionada para a página de Pokémons Favoritados', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const favorite = getByText('Favorite Pokémons');
  fireEvent.click(favorite);

  expect(getByText('Favorite pokémons')).toBeInTheDocument();
});

test('A aplicação é redirecionada para a página Not Found', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/asd');

  expect(getByText('Page requested not found')).toBeInTheDocument();
});
