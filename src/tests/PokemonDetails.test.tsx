import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente PokemonDetails', () => {
  it('Testa se as informações do pokemon são exibidas na tela', async () => {
    renderWithRouter(<App />, { route: '/pokemon/25' });
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.textContent).toBe('Pikachu');

    const moreDetailsLink = screen.queryByText('More Details');
    expect(moreDetailsLink).not.toBeInTheDocument();

    const getH2Title = screen.getByRole('heading', {
      name: /pikachu details/i, level: 2,
    });
    expect(getH2Title).toBeInTheDocument();

    const textFavorite = screen.getByText(/pokémon favoritado\?/i);
    expect(textFavorite).toBeInTheDocument();

    const getCheckbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    await userEvent.click(getCheckbox);
    expect(getCheckbox).toBeChecked();

    const getSummary = screen.getByRole('heading', {
      name: /summary/i, level: 2,
    });
    expect(getSummary).toBeInTheDocument();

    const getSummaryParah = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(getSummaryParah).toBeInTheDocument();

    const getLocations = screen.getByRole('heading', {
      name: /game locations of pikachu/i, level: 2,
    });
    expect(getLocations).toBeInTheDocument();

    const imgElements = screen.getAllByRole('img');
    console.log(imgElements);

    const firstImglocation = imgElements[2];
    expect(firstImglocation).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(firstImglocation).toHaveAttribute('alt', 'Pikachu location');
  });
});
