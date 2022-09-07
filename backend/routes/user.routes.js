const router = require('express').Router();
const authController = require('../controllers/auth.controller.js');
const userController = require('../controllers/user.controller.js');
const auth = require('../middleware/auth.middleware');
const multer = require('multer');


// auth
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);


//user
router.get('/', auth.checkUser, userController.getAllUsers);
router.get('/:id', auth.checkUser, userController.userInfo);
router.put('/:id', auth.checkUser, userController.updateUser);
router.delete('/:id', auth.checkUser, userController.deleteUser);


module.exports = router;