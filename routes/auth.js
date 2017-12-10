const express = require('express');
const passport = require('passport');

const router = express.Router();
const bcrypt = require('bcrypt');

const response = require('../config/response');
const User = require('../models/user').User;

const upload = require('../config/multer');


//LOGIN
router.post('/login', (req, res, next) => {
  if (req.user) {
    return response.forbidden();
  }
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return response.notFound(req, res);
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return response.data(req, res, req.user);
    });
  })(req, res, next);
});


//SIGNUP
router.post('/signup', (req, res, next) => {
  if (req.user) {
    return response.forbidden();
  }
  const {
    username,
    email,
    password,
    firstName,
    lastName,
    picture
  } = req.body;

  if (!username) {
    return response.unprocessable(req, res, 'Missing mandatory field "Username".');
  }
  if (!password) {
    return response.unprocessable(req, res, 'Missing mandatory field "Password".');
  }
  if (!email) {
    return response.unprocessable(req, res, 'Missing mandatory field "Email".');
  }

  User.findOne({
    username
  }, 'username', (err, userExists) => {
    if (err) {
      return next(err);
    }
    if (userExists) {
      return response.unprocessable(req, res, 'Username already in use.');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      username,
      email,
      password: hashPass,
      firstName,
      lastName,
      picture: 'http://sguru.org/wp-content/uploads/2017/06/cool-anonymous-profile-pictures-1699946_orig.jpg'
    });

    newUser.save((err) => {
      if (err) {
        return next(err);
      }
      req.login(newUser, (err) => {
        if (err) {
          return next(err);
        }
        return response.data(req, res, newUser.asData());
      });
    });
  });
});

//EDIT USER PROFILE
router.put('/me', (req, res, next) => {
  
    const userUpdate = {
      pic_path: req.body.pic_path || req.user.pic_path,
    };
  
    User.findByIdAndUpdate(req.user._id, userUpdate, {
      new: true
    }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return response.notFound(req, res);
      }
      let data = user.asData();
      return response.data(req, res, data);
    });
  });

//UPLOAD PROFILE PAGE 

router.post('/upload', upload.single('file'), (req, res, next) => {
  const data = {
    userFileName: `/uploads/${req.file.filename}`
  };

  return response.data(req, res, data);
});

//LOGOUT
router.post('/logout', (req, res) => {
  req.logout();
  return response.ok(req, res);
});


//ME
router.get('/me', (req, res) => {
  if (req.user) {
    return response.data(req, res, req.user.asData());
  }

  return response.notFound(req, res);
});

// router.get('/:userID', (req, res, next) => {
//   const uID = req.params.userID;
//   console.log(uID);
//   User.findById(uID, (err, user) => {
//     if (err) { return next(err); }
//     response.data(req, res, req.user.asData(),{ user: user });
//     // res.render('auth/profile', { user: user });
//   });
// });







module.exports = router;