var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');

// Your Model
const Model = require('../Models/Model');

// Your filter for files to accept
const fileFilter = (req, file, callback) => {
  //reject file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    callback(null, true);
  else
    callback(null, false);
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

//Error Messages
const existingError = {
  message: 'The file does not exist!',
  code: 99
};


router.get('/', (req, res, next) => {
  const promise = Model.find();
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });

});

//Post a file
const post = router.post('/', upload.single('picture'), (req, res, next) => {
  console.log(req.file);

  const file = new Model({
    picture: req.file.path // it takes path of file in type of string
  });

  const promise = file.save();
  console.log(promise);
  promise.then((data) => {
    res.json({
      data
    });
  }).catch((err) => {
    res.json(err.message);
  });
});

router.put('/:model_id', upload.single('picture'), (req, res, next) => {

});

router.delete('/:model_id', (req, res, next) => {
  const promise = Model.findOneAndDelete(
    req.params.model_id
  );

  promise.then((data) => {
    if (!data)
      next(existingError);

    fs.unlink(`${data.picture}`);

    res.json({
      status: 1
    });


  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;