const mongoose = require("mongoose");

const Event = new mongoose.Schema({
  name: { type: String, required: true },
  short_description:String,
  description: String,
  creator: {type:mongoose.Schema.Types.ObjectId, required:true},
  bannerURL:String,
  location: {type:mongoose.Schema.Types.String},
  start_date: Date,
  end_date:Date,
  category: String,
  price: mongoose.Schema.Types.Decimal128,
  program: mongoose.Schema.Types.Mixed,
  attendees:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
  checked_in_attendees:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],

  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", Event);
