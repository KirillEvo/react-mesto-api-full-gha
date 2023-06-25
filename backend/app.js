require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const routes = require('./routes');
const auth = require('./middlewares/auth');

// const { requestLogger, errorLogger } = require('./middlewares/logger');

// const { MONGO_URL } = process.env;

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

const { validateCreateUser, validateLogin } = require('./middlewares/validation');
const { createUser, login } = require('./controllers/auth');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true, useUnifiedTopology: true,
});

app.use(cookieParser());
app.use(cors());
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// const allowedCors = [
//   'http://daily-pix.nomoreparties.sbs',
//   'https://daily-pix.nomoreparties.sbs',
//   'http://localhost:3000',
//   'https://localhost:3000',
//   'localhost:3000',
// ];

// app.use((req, res, next) => {
//   const { origin } = req.headers;
//   const { method } = req;
//   res.header('Access-Control-Allow-Credentials', true);

//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }

//   if (method === 'OPTIONS') {

//   }
//   next();
// });

// app.use(requestLogger);
app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

app.use(auth);
app.use(routes);

// app.use(limiter);
app.use(helmet());

// app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? err.message
        : message,
    });
  next();
});

app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`);
});
