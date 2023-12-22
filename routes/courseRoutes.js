const { Router } = require('express');
const courseController = require('../controllers/courseController');
const router = Router();

router.get('/', courseController.course_index);

router.post('/', courseController.course_create_post);

router.get('/:id', courseController.course_details);

router.post('/:id', courseController.course_update_post);

router.delete('/:id', courseController.course_delete);

module.exports = router;