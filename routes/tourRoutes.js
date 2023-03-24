const express = require('express');
const tourController = require('../controllers/tourController');
const {getAllTours, createTour} = require('../controllers/tourController');

const router = express.Router();

//router.param('id', tourController.checkID);


router
    .route('/tour-stats')
    .get(tourController.getTourStats);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

router
    .route('/')
    .get(getAllTours)
    .post(createTour);


module.exports = router;