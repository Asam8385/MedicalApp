import React from 'react';
import renderer from 'react-test-renderer';
import SignIn from './SignIn';

// Mocking react-router-dom's useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mocking useUserLoginMutation hook
jest.mock('../../redux/api/authApi', () => ({
  useUserLoginMutation: jest.fn(() => [jest.fn(), { isError: false, isLoading: false, isSuccess: false, error: null }])
}));

// Mocking GoogleLogin component
jest.mock('@react-oauth/google', () => ({
  GoogleLogin: () => null,
}));

describe('SignIn', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SignIn />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // You can add more tests here as needed...
});
