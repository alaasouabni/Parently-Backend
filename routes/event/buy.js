const Event = require("../../models/Event");
const User = require("../../models/User");
const mongoose = require("mongoose");

module.exports = async function (req, res) {
  console.log("buying ticket for event ", req.body.eventId);
  const conn = mongoose.connection;
  const session = await conn.startSession();
  try {
    session.startTransaction();

    const event = await Event.findById(req.body.eventId);

    if (event.attendees.includes(req.user.id)) {
      return res.status(500).json({ error: "You are already registred in this event" });
    }

    await Event.updateOne({_id:event._id}, {
      $push: { attendees: req.user.id },
    });

    await User.updateOne({_id:req.user.id}, {
      $push: { my_events: req.body.eventId },
    });

    await session.commitTransaction();
    res.status(200).json({ msg: "Payment Sucessfull" });
    console.log("success");
  } catch (error) {
    console.log("error");
    await session.abortTransaction();
    res.status(500).json({ error: "Payment failed" });
    session.endSession();
  }
};
