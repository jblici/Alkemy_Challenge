const { Router } = require('express');
const router = Router();
const { signIn, signUp, googleSignIn } = require('../controllers/auth')

router.post('/signin', signIn);
router.post('/signup', signUp);
router.post('/googlesignin', googleSignIn);

module.exports = router;