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
    city: req.body.city,
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


// Like a tip
router.get('/:questionId/addQuestionStar', (req, res, next) => {
  const questionId = req.params.questionId;
  const questionUpdate = {
    $inc: {
      "stars": 1
    }
  };
  Question.findByIdAndUpdate(questionId, questionUpdate, (err, question) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (questionUpdate.errors) {
      return res.status(400).json(questionUpdate);
    }
    return res.json(questionUpdate);
  });
});

// Add comment to tip
// router.post('/:questionId/addanswer', (req, res, next) => {
//   const questionId = req.params.questionId;

//   var questionUpdate = {
//     $push: {
//       "answers": {
//         content: req.body.content,
//         stars: 0
//       }
//     }
//   };

//   Question.findByIdAndUpdate(questionId, questionUpdate, (err, question) => {
//     if (err) {
//       return res.status(500).json(err);
//     }
//     if (questionUpdate.errors) {
//       return res.status(400).json(questionUpdate);
//     }
//     return res.json(questionUpdate);
//   });
// });

// Get specific city tips
router.get('/citytips/:id', (req, res, next) => {
  Tip.find({
    'city': req.params.id
  }).populate('user_id').exec((err, tips) => {
    if (err) {
      return res.json(err).status(500);
    }
    return res.json(tips);
  });
});

// Get specific user tips
router.get('/usertips/:id', (req, res, next) => {
  Tip.find({
    'user_id': req.params.id
  }).populate('user_id').exec((err, tips) => {
    if (err) {
      return res.json(err).status(500);
    }
    return res.json(tips);
  });
});






module.exports = router;