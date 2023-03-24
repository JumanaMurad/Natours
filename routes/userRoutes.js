const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const {getAllUsers, createUser} = require('../controllers/userController');


const router = express.Router();

router.post('/signup', authController.signup);

router.post('/login', authController.login)

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;