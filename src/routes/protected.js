const express = require('express');
const authenticationMiddleware = require('../middlewares/authentication');
const router = express.Router();

// Vista protegida
router.get('/', authenticationMiddleware,(req, res) => {
  res.render('protected', { user: req.user });
});

module.exports = router;