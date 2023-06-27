require('dotenv').config();

const { PORT = 3000 } = process.env;
const { MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const { JWT_SECRET = 'secret-key' } = process.env;
const { NODE_ENV = 'production' } = process.env;

module.exports = {
  PORT,
  MONGO_URL,
  JWT_SECRET,
  NODE_ENV,
};
