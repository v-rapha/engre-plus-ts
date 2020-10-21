import AuthService from '@src/services/auth';
import { authMiddleware } from '../auth';

describe('AuthMiddleware', () => {
  it('should verify a JWT token and call the next function', () => {
    const jwtToken = AuthService.generateToken({ data: 'token' });
    const reqFake = {
      headers: {
        'x-access-token': jwtToken,
      },
    };
    const resFake = {};
    const nextFake = jest.fn();
    authMiddleware(reqFake, resFake, nextFake);
    expect(nextFake).toHaveBeenCalled();
  });
});
