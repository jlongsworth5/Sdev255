const { Router } = require('express');
const studentController = require('../controllers/studentController');
const router = Router();

router.get('/', studentController.student_index);

router.post('/', studentController.registration_create_post);

router.delete('/:id', studentController.registration_delete_post);

router.get('/:id', studentController.registrations_get);

module.exports = router;