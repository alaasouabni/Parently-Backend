const Event = require("../../models/Event");

module.exports = async function (req, res) {
  console.log("Retrieving all events");

  const events = await Event.find({},null,{sort: {created_at: -1}});

  res.status(200).send(events);
};
