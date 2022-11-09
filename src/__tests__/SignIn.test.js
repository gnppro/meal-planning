/* eslint-disable react/react-in-jsx-scope */
import { fireEvent, render, screen } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
import SignIn from '../pages/SignInPage';
// import auth from '../firebase/firebaseConfig';

// jest.mock('..firebase/firebaseConfig', () => );
const myMock = jest.fn();

test('renders learn react link', () => {
  render(<SignIn />);
  const linkElement = screen.getByText(/signin/i);
  expect(linkElement).toBeInTheDocument();
});

test('return the signup', async () => {
  render(<SignIn />);
  const currentUser = {
    user: '',
    email: '',
  };
  myMock.mockResolvedValueOnce(currentUser);
  const button = screen.getByRole('button-login');
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(emailInput, { target: { value: 'donfifi_2001@hotmail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'FireMan369' } });
  fireEvent.click(button);

  await myMock();
  // await act(() => myMock());

  // await waitFor(() => expect(buttonEl).not.toHaveTextContent('Registrado'));
  const registered = await screen.findByText('Hola Fabian');
  expect(registered).toBeInTheDocument();
  // await expect(nameInput).toHaveTextContent('');
});
