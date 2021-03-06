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
  },
 lastName: {
    type: String,
  },
  email: {
    type: String
  },
  picture: {
    type: String
    },
  about: {
    type: String,
  },
  languages: {
    type: String,
    enum: ["English", "Spanish", "Portugese", "French","Greek"]        
  },
  interests: {
    type: String,
    enum: ["architecture", "art", "photography","culture","Design","sports"]
  },
  education: {
    type: String,
  },

  // user_id: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User'
  // },



  livingIn:
   {
    location: {
      latitude: Number,
      longitude: Number
    },
    placeName: {
    type: String,
  },
    link: {
      type: String
    },
  },


  cityFrom:
  {
   location: {
     latitude: Number,
     longitude: Number
   },
   placeName: {
   type: String,
 },
   link: {
     type: String
   },
 },



 livedIn:  [{
  location: {
    latitude: Number,
    longitude: Number
  },
  placeName: {
  type: String,
},
  link: {
    type: String
  },
}],




  traveledTo:  [{
    location: {
      latitude: Number,
      longitude: Number
    },
    placeName: {
    type: String,
  },
    link: {
      type: String
    },
  }],

  followers: {
    type: Array,
  },

  following: {
    type: Array,
  },


  connections: [
    {
      date: {
        type: Date,
        default: Date.now
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      status: {
        type: String,
        deafault: "pending",
        enum: ["pending", "accepted", "rejected"]
      },
      message: String,
      reply: String
    }
  ]
});

UserSchema.methods.asData = function () {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    picture: this.picture,
    livingIn: this.livingIn,
    cityFrom:this.cityFrom,
    following:this.following
  };
};

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};