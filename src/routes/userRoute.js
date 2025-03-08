const router = require('express').Router();
const ctrls = require('../controllers/UserController');

router.get('/', ctrls.getAllUsers);
router.get('/:id', ctrls.getCurrent);

module.exports = router;