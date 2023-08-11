import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Pokemon', () => {
  // it('should first', () => { second })
  it('Testa se é renderizado um card com as informações de determinado pokemon', async () => {
    renderWithRouter(<App />);
    const getBtnDetails = screen.getByRole('link', { name: /more details/i });
    expect(getBtnDetails).toBeInTheDocument();
    await userEvent.click(getBtnDetails);

    const headingPikachu = screen.getByRole('heading', { name: /pikachu details/i });
    expect(headingPikachu).toBeInTheDocument();

    const eletricParagraph = screen.getByText('Electric', { selector: 'p' });
    expect(eletricParagraph).toBeInTheDocument();

    const getWeight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(getWeight).toBeInTheDocument();

    const img = screen.getByAltText('Pikachu sprite');
    expect(img).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');

    const getCheckbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    await userEvent.click(getCheckbox);

    const getStar = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(getStar).toBeInTheDocument();

    const capPikachu = screen.queryByText('Pikachu');
    expect(capPikachu).toBeInTheDocument();
  });
});
