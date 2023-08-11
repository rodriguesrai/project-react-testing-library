import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica a página NotFound', () => {
  it('Verifica se a página contém um headind h2 e uma tag img', () => {
    renderWithRouter(<App />, { route: '*' });
    const pageTitle = screen.getByRole('heading', { name: /Page requested not found/i, level: 2 });
    expect(pageTitle).toBeInTheDocument();
    const imgNotFound = screen.getByRole('img');
    expect(imgNotFound).toHaveAttribute('alt', "Clefairy pushing buttons randomly with text I have no idea what i'm doing");
  });
});
