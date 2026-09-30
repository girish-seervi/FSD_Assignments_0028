const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Search users by firstName
router.get('/search/:name', userController.searchUsers);

// Count user children
router.get('/:id/children/count', userController.getUserChildrenCount);

// Get specific child (only if child.parentId matches user id)
router.get('/:id/children/:childId', userController.getUserSpecificChild);

// Add child to user
router.post('/:id/children', userController.addChildToUser);

// Get children of user
router.get('/:id/children', userController.getUserChildren);

// Get user profile
router.get('/:id', userController.getUserProfile);

// Create user
router.post('/', userController.createUser);

// Get all users
router.get('/', userController.getAllUsers);


module.exports = router;
