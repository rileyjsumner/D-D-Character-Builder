const express = require('express');
const users = require('./Schemas/users');
const fs = require('fs');

function createRouter() {
  const router = express.Router();

  router.get('/character/get',
    users.getUserDocument,
    async (req, res, next) => {
      const user = req.userDocument;

    },
    res.status(200).json({
      status: 'ok'
    })
  );

  return router;
}

module.exports = createRouter;
