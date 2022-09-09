const router = require('express').Router();
const authController = require('../controllers/auth.controller.js');
const userController = require('../controllers/user.controller.js');
const auth = require('../middleware/auth.middleware');
const multer = require('../middleware/multer.middleware');


// auth
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);
router.get('/auth', authController.getAuth)


//user
router.get('/', auth.checkUser, userController.getAllUsers);
router.get('/:id', auth.checkUser, userController.userInfo);
router.put('/:id', auth.checkUser, multer, userController.updateUser);
router.delete('/:id', auth.checkUser, userController.deleteUser);


module.exports = router;