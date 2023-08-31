const Event = require("../../models/Event");
const User = require("../../models/User");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const MailGunAPI = process.env.MAILGUN_API_KEY;
const MailGunDomain = process.env.MAILGUN_DOMAIN;
const mailgun = new Mailgun(formData);

module.exports = async function (req, res) {
  console.log("Sending an email to all event's participants :", req.params.eventId);

  const client = mailgun.client({
    username: "api",
    key: MailGunAPI,
  });

  const event = await Event.findById(req.params.eventId).populate("attendees");
  const creator = await User.findById(event.creator);
  if (event.creator == req.user.id) {
    if (event.attendees.length == 0) {
      res.status(501).json({ msg: "no attendees to send email to" });
      return;
    }
    for (i = 0; i < event.attendees.length; i++) {
      const msgData = {
        from: `${creator.first_name} ${creator.last_name} <${req.params.eventId}@no-reply.evemark.fun>`,
        to: `${event.attendees[i].first_name} ${event.attendees[i].last_name} <${event.attendees[i].email}>`,
        subject: `[${event.name}] - ${req.body.subject}`,
        text: req.body.message,
      };
      client.messages
        .create(MailGunDomain, msgData)
        .then((msg) => {
          console.log(msg);
          res.status(200).json(msg);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  } else {
    res.status(401).json({
      error:
        "you are not allowed to send email to the event's participants because you are not the creator of the event",
    });
  }
};
