const { Router } = require("express");

function makeRouter() {
  const router = new Router();

  router.get('/api/v1', (req, res) => {
    res.json({
      message: 'API is OK'
    });
  });

  return router;
}

module.exports = {
  makeRouter
}
