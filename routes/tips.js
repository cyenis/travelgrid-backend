const express = require('express');
const router = express.Router();

const Tip = require('../models/tip').Tip;
const upload = require("../config/multer");

// const enums = require('../models/enums/enums');



// GET ALL TIPS
router.get('/', function (req, res, next) {
  Tip.find({}).populate({
      path: " user_id",
      model: "User"
    })
    .exec((err, data) => {
      if (err) {
        next(err);
      } else {
        res.json(data);
      }
    });
});


//Get one Tip
router.get("/:id", (req, res, next) => {
  const tipid = req.params.id;
  Tip.findOne({ _id: `${tipid}` })
    .populate({
      path: " user_id",
      model: "User"
    })
    .exec((err, data) => {
      if (err) {
        next(err);
      } else {
        res.json(data);
      }
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