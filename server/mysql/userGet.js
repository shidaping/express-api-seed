import async from 'async';
import encrypt from '../lib/encrypt';

export default (options, callback) => {
  let data = options.data;
  let req = options.req;
  req.models.User.one({ id: data.id }, callback);
};
