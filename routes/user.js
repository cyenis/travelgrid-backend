const express = require("express");
const passport = require("passport");
const router = express.Router();
const bcrypt = require("bcrypt");

const response = require('../config/response');
const User = require('../models/user').User;
const Tip = require("../models/tip").Tip;



// NEED TO EXPORT USERS ASDATA PASSWORD IS SHOWING!!!!

/* GET all users */
router.get("/", (req, res, next) => {
  User.find({}).populate({
    path: " connections",
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

/* GET ONE USER */
router.get("/:id", (req, res, next) => {
  const userid = req.params.id;
  User.findOne({ _id: `${userid}` }, (err, data) => {
    if (err) {
      return next(err);
      console.log(userid);
    }
    res.json(data);
  });
});

/* GET ONE USER LIVING IN */


router.get('/city/:id', (req, res, next) => {
  User.find({
    'livingIn.placeName': req.params.id})
    .populate('user_id').exec((err, users) => {
    if (err) {
      return res.json(err).status(500);
    }
    return res.json(users);
  });
});



module.exports = router;