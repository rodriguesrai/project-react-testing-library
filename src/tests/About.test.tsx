import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando página About', () => {
  it('Verificando se está na página correta', async () => {
    renderWithRouter(<App />);
    const btnAbout = screen.getByRole('link', { name: /about/i });

    expect(btnAbout).toBeInTheDocument();
    await userEvent.click(btnAbout);
    const pageTitle = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    const img = screen.getByAltText('Pokédex');
    expect(pageTitle).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
