import orm from 'orm';
import config from '../../config';


export default (app) => {
  app.use(
    orm.express(config.mysql, {
      define: function(db, models, next) {
        models.User = db.define('user', {
          id: { type: 'serial', key: true }, // the auto-incrementing primary key
          mobile: { type: 'text' },
          email: { type: 'text' },
          user_name: { type: 'text' },
          user_type: { type: 'number' },
          password: { type: 'text' },
          salt: { type: 'text' },
          nickname: { type: 'text' },
          true_name: { type: 'text' },
          avatar: { type: 'text' },
          score: { type: 'number' },
          level: { type: 'number' },
          created_by: { type: 'number' },
          created_at: { type: 'date', time: true },
          updated_by: { type: 'number' },
          updated_at: { type: 'date', time: true },
        }, {
          connection: 'user',
        });
        next();
      },
    }),
  );
};
