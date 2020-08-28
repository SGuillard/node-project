const router = require("express").Router();

// Put all your server routes in here

router.use('/', (req, res) => {
  console.log('ll');
  res.send('Hello, aaa!');
});

module.exports = router;
