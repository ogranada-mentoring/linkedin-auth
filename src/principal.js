const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');

const { makeRouter: makePublicRouter } = require('./controllers/routers/public');
const { makeRouter: makeLinkedinRouter } = require('./controllers/routers/linkedin');
// const { makeRouter } = require('./controllers/routers/public');
// const makePublicRouter = makeRouter;

function main() {
  dotenv.config();
  const { PORT } = process.env;

  const app = express();
  app.use(passport.initialize()); // Inicializa passport
  app.use(express.static('./public'))

  app.use(makePublicRouter());
  app.use(makeLinkedinRouter());

  app.listen(PORT, () => {
    console.log(`Server is ready at ${PORT}`);
  });

}
module.exports = {
  main
}
