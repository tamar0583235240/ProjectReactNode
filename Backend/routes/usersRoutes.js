const express = require('express');
const router = express.Router();
const { DeleteUser, UpdateUser, signUp } = require('../controllers/usersController');

// router.post('/signUp', signUp);
// router.post('/AddUser', AddUser);
router.delete('/DeleteUser/:user_id', DeleteUser);
router.put('/UpdateUser/:user_id', UpdateUser);
// router.post('/signIn',signIn);

module.exports = router;