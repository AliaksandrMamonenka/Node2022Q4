import jwt from 'jsonwebtoken';

class TokenService {
  tokenKeyValue = String(process.env.JWT_REFRESH_SECRET_KEY);

  generateToken(payload: any) {
    const accessToken = jwt.sign(payload, this.tokenKeyValue, { expiresIn: '10m' });

    return { accessToken };
  }

  validateToken(payload: any) {
    const accessToken = jwt.verify(payload, this.tokenKeyValue);

    return accessToken;
  }
}

export default new TokenService();
