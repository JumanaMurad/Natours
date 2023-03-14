const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//const app = require('./app');
const Tour = require('./../../models/tourModel')

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
  );

mongoose
.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true //Search about how to work arround this later
  })
  .then(() => console.log('DB connection successful!'));

  // READ JSON FILE
  const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

  // IMPORT DATA INTO THE DATABASE
  const importData = async () => {
    try{
        await Tour.create(tours);
        console.log('Data successfully loaded!')
    } catch (err) {
        console.log('Error:💥', err)
    }
  };

  //DELETE ALL DATA FORM DB 
  const deleteData = async () => {
    try{
        await Tour.deleteMany();
        console.log('Data successfully deleted!');
        process.exit();
    } catch (err) {
        console.log('Error:💥', err)
    }
  }

  console.log(process.argv);

  if(process.argv[2] === '--import') {
    importData();
  } else if(process.argv[2] === '--delete'){
    deleteData();
  }
  