import express from 'express';
import path from 'path';
import morgan from 'morgan';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import config from '../config';
import routes from './routes';
import expressMysql from './mysql/index';


const RedisStore = connectRedis(session);

const app = express();
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());
// parse application/json
app.use(bodyParser.json({ limit: '50mb' }));
app.use(morgan('common'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
if (config.env === 'development') {
  app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      maxAge: 1800000,
    },
  }));
} else {
  app.use(session({
    store: new RedisStore(config.redis),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      maxAge: 1800000,
    },
  }));
}
expressMysql(app);
routes(app);
app.disable('x-powered-by');
app.enable('trust proxy');
app.listen(config.port, function() {
  console.log(`app listen at ${config.port}`);
});
