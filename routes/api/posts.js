const express = require('express');
const router = express.Router();
const postController = require('../../controller/posts/posts')
const auth = require('../../middlewares/auth');




router.get('/',postController.post_all_list);
router.post('/',auth,postController.post_add_list);

router.get('/:postId',postController.post_show);
router.delete('/:postId',auth,postController.post_delete);
router.get('/:postId/sameposts',postController.post_sameposts);
router.post('/search',postController.post_search);



module.exports = router;