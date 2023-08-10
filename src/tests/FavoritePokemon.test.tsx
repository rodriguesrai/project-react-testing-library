import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa a página de pokemons favoritos', () => {
  renderWithRouter(<App />, { route: '/favorites' });

  it('Verifica o título na tela quando não tem pokemons favoritos', () => {
    const takeTitle = screen.getByText('No favorite Pokémon found');
    expect(takeTitle).toBeInTheDocument();
  });

  it('Testa se o pokemon favoritado está na página de favoritos', async () => {
    renderWithRouter(<App />, { route: '/' });

    const detailsBtn = screen.getByRole('link', {
      name: /more details/i,
    });
    await userEvent.click(detailsBtn);

    const btnFavorite = screen.getByRole('checkbox', {
      name: /pokémon favoritado/i,
    });
    await userEvent.click(btnFavorite);

    const btnFavoritePokemon = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    await userEvent.click(btnFavoritePokemon);

    // Verifica se os pokémons favoritos estão sendo exibidos
    const imgElements = screen.queryAllByRole('img');
    expect(imgElements).toHaveLength(2);
  });
});
