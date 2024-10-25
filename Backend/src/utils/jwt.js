import jwt from 'jsonwebtoken';
import env from '~/config/env';

export const create_access_token = (payload,expiresIn) => {
  return jwt.sign(payload, env?.JWT_ACCESS_TOKEN_SECRET, { expiresIn });
}



export const create_fresh_token = (payload,expiresIn) => {
    return jwt.sign(payload, env?.JWT_ACCESS_TOKEN_SECRET, { expiresIn});
  }