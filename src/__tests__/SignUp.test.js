/* eslint-disable react/react-in-jsx-scope */
import { fireEvent, render, screen } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
import SignUp from '../pages/SignUpPage';
// import auth from '../firebase/firebaseConfig';

// jest.mock('..firebase/firebaseConfig', () => );
const myMock = jest.fn();

test('renders learn react link', () => {
  render(<SignUp />);
  const linkElement = screen.getByText(/register/i);
  expect(linkElement).toBeInTheDocument();
});

test('return the signup', async () => {
  render(<SignUp />);
  const currentUser = {
    user: '',
    email: '',
  };
  myMock.mockResolvedValueOnce(currentUser);
  const button = screen.getByRole('button-register');
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(nameInput, { target: { value: 'Fabian' } });
  fireEvent.change(emailInput, { target: { value: 'fabian.nava.pereda@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'lacultana' } });
  fireEvent.click(button);

  await myMock();
  // await act(() => myMock());

  // await waitFor(() => expect(buttonEl).not.toHaveTextContent('Registrado'));
  const registered = await screen.findByText('Registrado');
  expect(registered).toBeInTheDocument();
  await expect(nameInput).toHaveTextContent('');
});

test('error with firebase', async () => {
  render(<SignUp />);
  const error = 'auth/email-already-in-use';
  myMock.mockResolvedValueOnce(error);
  const button = screen.getByRole('button-register');
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(nameInput, { target: { value: 'Fabian' } });
  fireEvent.change(emailInput, { target: { value: 'fabian.nava.pereda@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'lacultana' } });
  fireEvent.click(button);

  await myMock();
  // await act(() => myMock());

  // await waitFor(() => expect(buttonEl).not.toHaveTextContent('Registrado'));
  const registered = await screen.findByText('Email already in use');
  expect(registered).toBeInTheDocument();
  await expect(nameInput).toHaveTextContent('');
});
