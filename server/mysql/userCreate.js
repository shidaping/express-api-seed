import async from 'async';
import uuid from 'uuid';
import encrypt from '../lib/encrypt';

export default (options, callback) => {
  let data = options.data;
  let req = options.req;
  let newUser = new req.models.User({});
  let salt = uuid.v4();
  let now = new Date();
  // async.waterfall([
  //   (cb) => {

  //   },
  //   () => {

  //   }
  // ])
  newUser.password = encrypt(data.password, salt);
  newUser.email = data.email;
  newUser.salt = salt;
  newUser.created_at = now;
  newUser.updated_at = now;
  newUser.nick_name = uuid.v4();

  newUser.save((err, doc) => {
    console.log(err);
    console.log(doc);
    callback(err, doc);
  });
};
