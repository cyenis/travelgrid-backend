const express = require('express');
const router = express.Router();

const Chat = require('../models/chat').Chat;
const upload = require("../config/multer");

// const enums = require('../models/enums/enums');



// GET Chat
router.get('/', function (req, res, next) {
  Chat.find({}).populate({
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


//Get one Chat
router.get("/:id", (req, res, next) => {
  const chatid = req.params.id;
  Chat.findOne({ _id: `${chatid}` })
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



// CREATE and SAVE a new chat
router.post('/add', (req, res, next) => {
   
  const user = req.user;

  const chatInfo = {
    content: req.body.content,
    user_id: user._id,
  };

  const newChat = new Chat (chatInfo);


  newChat.save(err => {
    if (err) {
      res.json(err);
      return;
    }

    res.json(newChat);
  });
});


//--Uploads
router.post("/upload", upload.single("file"), (req, res, next) => {
  res.json({ filename: `/uploads/${req.file.filename}` });
});


module.exports = router;