const express = require('express');
const router = express.Router();

const Tip = require('../models/tip').Tip;
const upload = require("../config/multer");

// const enums = require('../models/enums/enums');


// GET ALL TIPS
router.get('/', function (req, res, next) {
  Tip.find({}, (err, data) => {
    if (err) {
      return next(err); // to not show the error in the frontend
    }
    return res.json(data);
  });
});

//Get Tip
router.get("/:id", (req, res, next) => {
  const flatid = req.params.id;
  Flat.findOne({ _id: `${tipid}` }, (err, data) => {
    if (err) {
      return next(err);
      console.log(flatid);
    }
    res.json(data);
  });
});

// CREATE and SAVE a new tip
router.post('/add', (req, res, next) => {
   
  const user = req.user;

  const tipInfo = {
    title: req.body.title,
    content: req.body.content,
    postStatus: req.body.postStatus,
    picture: req.body.filename,
    location: req.body.location,
    destination: req.body.destination,
    user_id: user._id,
  };

  const newTip = new Tip (tipInfo);


  newTip.save(err => {
    if (err) {
      res.json(err);
      return;
    }

    res.json(newTip);
  });
});


//--Uploads
router.post("/upload", upload.single("file"), (req, res, next) => {
  res.json({ filename: `/uploads/${req.file.filename}` });
});


// Deletes one spot from the spot list

// router.delete('/', (req, res) => {
//   console.log(req, res);
// });

// gets the selector-object
// router.get('/selectors', function (req, res, next) {
//   res.json(enums);
// });

module.exports = router;