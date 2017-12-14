const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TipSchema = new Schema({

 title: {
    type: String
    // required: [true, "Title can't be empty"]
  },
  content: {
    type: String
    // required: [true, "Content can't be empty"]
  },
  postStatus: {
    type: String
    // required: [true, "Content can't be empty"]
  },
  picture: {
    type: String,
    // required: [true, 'Content is required']
  },
  location: {
    latitude: String,
    longitude: String
    // required: [true, "Content can't be empty"]
  },
  city: {
    type: String,
    // required: [true, 'Content is required']
  },

  categories: {
    type: String,
    enum: ["architecture", "art", "photography","culture","Design","sports"]
  },

  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  
},

{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
}

);

TipSchema.methods.asData = function () {
  return {
    id: this._id
  };
};

const Tip = mongoose.model('Tip', TipSchema);

module.exports = {
  Tip
};
