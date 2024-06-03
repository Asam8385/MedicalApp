import React from 'react';
import renderer from 'react-test-renderer';
import SignIn from './SignIn';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('../../redux/api/authApi', () => ({
  useUserLoginMutation: jest.fn(() => [jest.fn(), { isError: false, isLoading: false, isSuccess: false, error: null }])
}));


jest.mock('@react-oauth/google', () => ({
  GoogleLogin: () => null,
}));

describe('SignIn', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SignIn />).toJSON();
    expect(tree).toMatchSnapshot();
  });

 
});
