const User = require("../../models/User");

module.exports = async function (req, res) {
  console.log("retrieving events for user ", req.user.email);

try{
    const user =  await User.findOne({email:req.user.email}).populate("my_events")
    res.status(200).json(user.my_events);

}catch(e){
 
    console.log("error while finding user");
    res.status(500).send("Error retrieving events" + e);
  }
};
