const { Router } = require("express"); // import Router from express
const Todo = require("../models/Todo"); // import Todo model
const Event= require("../models/event");
const User=require("../models/User");
const { isLoggedIn } = require("./middleware"); // import isLoggedIn custom middleware

const router = Router();

//custom middleware could also be set at the router level like so
// router.use(isLoggedIn) then all routes in this router would be protected

// Index Route with isLoggedIn middleware
router.get("/", isLoggedIn, async (req, res) => {
  const { email } = req.user; // get username from req.user property created by isLoggedIn middleware
  console.log(email);
  //send all todos with that user
  res.json(
    await Todo.find({ email }).catch((error) =>
      res.status(400).json({ error })
    )
  );
});

// Show Route with isLoggedIn middleware
router.get("/:id", isLoggedIn, async (req, res) => {
  const { email } = req.user; // get username from req.user property created by isLoggedIn middleware
  const _id = req.params.id; // get id from params
  //send target todo
  res.json(
    await Todo.findOne({ email, _id }).catch((error) =>
      res.status(400).json({ error })
    )
  );
});

// create Route with isLoggedIn middleware
router.post("/create-event", isLoggedIn, async (req, res) => {
  const body = req.body;
  console.log("hi");
  console.log(req.user);
  const user = await User.findOne({ email: req.user.email })
  try {
    const newEvent = await Event.create({
      name: body.name,
      description: body.description,
      short_description: body.short_description,
      creator: user._id,
    });

    await User.findByIdAndUpdate(user._id, {
      $push: { created_events: newEvent._id },
    });

    console.log("Event created  ", newEvent);

    res.status(200).json(newEvent);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// update Route with isLoggedIn middleware
router.put("/:id", isLoggedIn, async (req, res) => {
  const { email } = req.user; // get username from req.user property created by isLoggedIn middleware
  req.body.email = email; // add username property to req.body
  const _id = req.params.id;
  //update todo with same id if belongs to logged in User
  res.json(
    await Todo.updateOne({ email, _id }, req.body, { new: true }).catch(
      (error) => res.status(400).json({ error })
    )
  );
});

// update Route with isLoggedIn middleware
router.delete("/:id", isLoggedIn, async (req, res) => {
  const { email } = req.user; // get username from req.user property created by isLoggedIn middleware
  const _id = req.params.id;
  //remove todo with same id if belongs to logged in User
  res.json(
    await Todo.remove({ email, _id }).catch((error) =>
      res.status(400).json({ error })
    )
  );
});

module.exports = router