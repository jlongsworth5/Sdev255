const { Router } = require('express');
const staffController = require('../controllers/staffController');
const router = Router();

router.get('/', staffController.staff_index);

module.exports = router;