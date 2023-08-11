import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente Pokedex', () => {
  it('Testa se a página possui um title', () => {
    renderWithRouter(<App />);
    const h2Title = screen.getByRole('heading', { name: /Encountered Pokémon/i, level: 2 });
    expect(h2Title).toBeInTheDocument();
  });
  it('Testa se é exibido o próximo Pokémon da lista quando o botão é clicado', async () => {
    renderWithRouter(<App />);
    const btnNext = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(btnNext).toBeInTheDocument();

    await userEvent.click(btnNext);
    const capCharmander = screen.getByText(/Charmander/i);
    expect(capCharmander).toBeInTheDocument();
    await userEvent.click(btnNext);
    const capCaterpie = screen.getByText(/Caterpie/i);
    expect(capCaterpie).toBeInTheDocument();
  });
  it('Testa se ao apertar o next no último Pokemon ele retorna ao primeiro', async () => {
    renderWithRouter(<App />);
    const btnNext = screen.getByRole('button', { name: /próximo pokémon/i });

    const clickPromises = Array.from({ length: 9 }, () => userEvent.click(btnNext));
    await Promise.all(clickPromises);
    const capPikachu = screen.getByText(/Pikachu/i);
    expect(capPikachu).toBeInTheDocument();
  });
  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const otherPokemons = screen.queryAllByTestId('pokemon-name');
    expect(otherPokemons).toHaveLength(1);
  });
  it('Testa os botões de filtro da pokedex', async () => {
    renderWithRouter(<App />);
    const capFilros = screen.queryAllByTestId('pokemon-type-button');
    expect(capFilros).toHaveLength(7);

    const takePoison = screen.getByRole('button', { name: /poison/i });
    await userEvent.click(takePoison);
    const poisonParagraph = screen.getByText('Poison', { selector: 'p' });
    expect(poisonParagraph).toBeInTheDocument();

    const capAll = screen.getByRole('button', { name: /all/i });
    await userEvent.click(capAll);
    const capPikachu = screen.getByText(/Pikachu/i);
    expect(capPikachu).toBeInTheDocument();
    expect(capAll).toBeInTheDocument();
  });
});
