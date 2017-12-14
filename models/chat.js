const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TipSchema = new Schema({


    content: {
    type: String
    // required: [true, "Content can't be empty"]
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

const Chat = mongoose.model('Chat', TipSchema);

module.exports = {
  Chat
};
