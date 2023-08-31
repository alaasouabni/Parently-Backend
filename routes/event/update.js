const Event = require("../../models/Event");

module.exports = async function (req, res) {
  console.log("Updating an event  with id ", req.params);
  
  //check if the user is the creator of the event
  
  const eventOld = await Event.findById(req.params.eventId);
  if(eventOld.creator == req.user.id){
    const event = await Event.findOneAndUpdate({_id:req.params.eventId},req.body,{returnDocument:"after"});
    res.status(200).json(event)
  }else{
    res.status(401).json({error:"you are not allowed to delete the event because you are not the creator of the event"})
  }
};
