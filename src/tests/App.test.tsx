import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando componente App', () => {
  it('Testando botão home', async () => {
    renderWithRouter(<App />);
    const btnHome = screen.getByRole('link', { name: /home/i });
    expect(btnHome).toBeInTheDocument();

    await userEvent.click(btnHome);
    const pageTitle = screen.getByRole('heading', { name: /encountered pokémon/i, level: 2 });
    expect(pageTitle).toBeInTheDocument();
  });

  it('Testando botão About', async () => {
    renderWithRouter(<App />);
    const btnAbout = screen.getByRole('link', { name: /about/i });

    expect(btnAbout).toBeInTheDocument();
    await userEvent.click(btnAbout);
    const pageTitle = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    const img = screen.getByAltText('Pokédex');
    expect(pageTitle).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });

  it('Testando botão Favorites', async () => {
    renderWithRouter(<App />);
    const btnFavorite = screen.getByRole('link', { name: 'Favorite Pokémon' });

    expect(btnFavorite).toBeInTheDocument();
    await userEvent.click(btnFavorite);
    const pageTitle = screen.getByRole('heading', { name: /favorite pokémon/i, level: 2 });
    expect(pageTitle).toBeInTheDocument();
  });
});
