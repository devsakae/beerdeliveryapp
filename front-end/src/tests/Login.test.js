import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';

describe('Testa tela de login no frontend', () => {
  render(<App />);
  const inputEmail = screen.getByTestId('common_login__input-email');
  const inputPassword = screen.getByTestId('common_login__input-password');
  const submitButton = screen.getByTestId('common_login__button-login');
  const registerLink = screen.getByTestId('common_login__button-register');

  it('Encontra todos os campos obrigatórios', () => {
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
    userEvent.click(registerLink);
  });
  // it('Possível acessar a tela de registro via tela de login?', () => {
  //   expect(submitButton).toBeInTheDocument();
  // });
});
