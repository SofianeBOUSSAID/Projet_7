const router = require('express').Router();
const postController = require("../controllers/post.controller");
const auth = require('../middleware/auth.middleware');
const multer = require('../middleware/multer.middleware');

router.get('/', auth.checkUser, postController.readPost);
router.post('/', auth.checkUser, multer, postController.createPost);
router.put('/:id', auth.checkUser, postController.updatePost);
router.delete('/:id', auth.checkUser, postController.deletePost);
router.patch('/like-post/:id', auth.checkUser, postController.likePost);
router.patch('/unlike-post/:id', auth.checkUser, postController.unlikePost);

module.exports = router;