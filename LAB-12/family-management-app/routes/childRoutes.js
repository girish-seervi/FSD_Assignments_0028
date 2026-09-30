const express = require('express');
const router = express.Router();
const childController = require('../controllers/childController');

// Update child
router.patch('/:id', childController.updateChild);

// Delete child
router.delete('/:id', childController.deleteChild);

module.exports = router;
