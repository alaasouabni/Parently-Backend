const User = require("../../models/User");

module.exports = async function (req, res) {
  console.log("retrieving user info");

try{
    const user =  await User.findOne({_id:req.params.userId}).populate("created_events").populate("my_events")
    res.status(200).json(user);
}catch(e){
 
    console.log("error while finding user");
    res.status(500).send("Error retrieving events" + e);
  }
};
