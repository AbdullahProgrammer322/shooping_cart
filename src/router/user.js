import express from 'express';

import auth from '../middleware/auth.js';

import UserController from '../controller/user.js';

import validate from '../middleware/validator/index.js';

const router = express.Router();

router.post('/signup', validate.SignupValidator, UserController.signup);
router.post('/signin', validate.SigninValidator, UserController.signin);
router.get('/profile', auth, UserController.profile);

export default router;
