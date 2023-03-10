//const fs = require('fs');
const Tour = require('../models/tourModel');

///const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

//MIdDLEWARE

// exports.checkID = (req, res, next, val) =>
// {
//     console.log(`Tour id is: ${val}`);

//     if(req.params.id * 1 > tours.length)
//     {
//         return res.status(404).json(
//             {
//                 status: 'fail',
//                 message: 'Invalid ID'
//             }
//         );
//     }
//     next();
// }

// exports.CheckBody = (req, res, next) => {
//     if(!req.body.name || !req.body.price)
//     {
//         return res.status(400).json({
//             status: 'fail',
//             message: 'Bad request'
//         });
//     }
//     next();
// }

//ROUTER HANDELERS
exports.getAllTours = async (req, res) => {
  try {
    // BUILD A QUERY
    // 1) Filtering
    const queryObj = { ...req.query };
    const execludedFields = ['page', 'sort', 'limit', 'fields'];
    execludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Avanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // const tours = await Tour.find()
    // .where('duration')
    // .equals(5)
    // .where('difficulty')
    // .equals("easy");

    let query = Tour;

    // 2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else{
        query = query.sort('-createdAt');
    }


    // 3) Field Limiting
    if(req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields);
    } else{
        query = query.select('-__v'); // Here I execlude the __v
    }

    // 4) Pagination

    // EXECUTE A QUERYquey
    const tours = await query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //Tour.findOne({_id: req.params.id})

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'sucess',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndRemove(req.params.id);

    res.status(204).json({
      status: 'success',
      date: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};
