const mongoose = require('mongoose');

// User Schema
const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    short_description:{type: String},
    description: {type: String},
    creator: {type:mongoose.Schema.Types.ObjectId, required:true},
})

// User model
const Event = mongoose.model("Event", eventSchema)

module.exports = Event