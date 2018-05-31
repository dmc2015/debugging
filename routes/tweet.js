const express = require('express');
const router = express.Router();
const tweetController = require('../controllers/tweet');

router.use(tweetController.requireAuth);

router.post('/', tweetController.create);
router.get('/new', tweetController.new);
router.get('/:id', tweetController.show);

module.exports = router;
