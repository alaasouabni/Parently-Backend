const Event = require("../../models/Event");

module.exports = async function (req, res) {
  console.log("Retrieving an event with id ", req.params.eventId);

  const event = await Event.findById(req.params.eventId).populate("attendees").populate("checked_in_attendees");

  res.status(200).send(event);
};
