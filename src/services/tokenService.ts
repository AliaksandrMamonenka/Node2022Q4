import jwt from 'jsonwebtoken';

const tokenKeyValue = 'this-is-the-key';

class TokenService {
  generateToken(payload: any) {
    const accessToken = jwt.sign(payload, tokenKeyValue, { expiresIn: '10m' });

    return { accessToken };
  }

  validateToken(payload: any) {
    const accessToken = jwt.verify(payload, tokenKeyValue);

    return accessToken;
  }
}

export default new TokenService();
