'use strict';

var
  express = require('express'),
  router = express.Router(),
  memberController = require('../controllers/memberController')
  ;

// =========
// Home Page
// =========

router.get('/', function (req, res) {
  res.render('index');
});

// ===========
// Member
// ===========

router.get('/members',  memberController.getAll);
router.get('/member/', function (req, res) {
  memberController.get(req, res);
});
router.get('/member/create/', function (req, res) {
  memberController.save(req, res);
});
router.put('/member', function (req, res) {
  memberController.update(req, res);
});


module.exports = router;
