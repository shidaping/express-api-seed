import crypto from 'crypto';
import config from '../../config';

export default (source, salt) => {
  const secret = `${config.salt}${salt}`;
  const hash = crypto.createHmac('sha256', secret)
    .update(source)
    .digest('hex');
  return hash;
};
