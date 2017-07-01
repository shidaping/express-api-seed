import async from 'async';
import encrypt from '../lib/encrypt';
import errorMsg from '../lib/errorMsg';

export default (options, callback) => {
  let data = options.data;
  let req = options.req;
  let user = null;
  async.waterfall([
    (cb) => {
      req.models.User.one({ email: data.email }, (err, doc) => {
        if (err) {
          callback(err);
          return;
        }
        if (!doc) {
          cb(errorMsg.user.wrong_user);
          return;
        }
        user = doc;
        cb(null);
      });
    },
    (cb) => {
      if (encrypt(data.password, user.salt) === user.password) {
        cb(null);
        return;
      }
      cb(errorMsg.user.wrong_user);
    },
  ], (err) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, user);
  });
};
