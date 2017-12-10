const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
username: {
    type: String,
    required: [true, 'username is required']
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  firstName: {
    type: String,
    // required: [true, 'firstName is required']
  },
 lastName: {
    type: String,
    // required: [true, 'lastName is required']
  }
  ,
  email: {
    type: String
    // required: [true, "Email can't be empty"]
  },
  about: {
    type: String,
    // required: [true, 'About is required']
  },
  languages: {
    type: String,
    // required: [true, ' is required']
  },
  interests: {
    type: String,
    // required: [true, ' is required']
  },
  education: {
    type: String,
    // required: [true, ' is required']
  },
  livingIn: {
    type: String,
    // required: [true, ' is required']
  },
  livedIn: {
    type: String,
    // required: [true, ' is required']
  },
  traveledTo: {
    type: String,
    // required: [true, ' is required']
  }
});

UserSchema.methods.asData = function () {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    
  };
};

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};