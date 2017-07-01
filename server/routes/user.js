import mysqlUserCreate from '../mysql/userCreate';
import myqlUserGet from '../mysql/userGet';
import mysqlUserLogin from '../mysql/userLogin';

export default (app) => {
  app.post('/user/create', (req, res) => {
    console.log(req.body);
    mysqlUserCreate({
      data: req.body,
      req: req,
    }, (err, doc) => {
      if (err) {
        res.json({
          code: 500,
          err: String(err),
        });
      }
      res.json({
        code: 0,
        result: doc,
      });
    });
  });

  app.get('/user/get', (req, res) => {
    console.log(req.query);
    myqlUserGet({
      data: req.query,
      req: req,
    }, (err, doc) => {
      if (err) {
        res.json({
          code: 500,
          msg: String(err),
        });
        return;
      }
      console.log(doc);
      res.json({
        code: 0,
        result: doc,
      });
    });
  });

  app.post('/user/login', (req, res) => {
    console.log(req.body);
    mysqlUserLogin({
      data: req.body,
      req: req,
    }, (err, doc) => {
      if (err) {
        res.json({
          code: 500,
          err: String(err),
        });
        return;
      }
      req.session.user = doc;
      res.json({
        code: 0,
        result: doc,
      });
    });
  });
};
