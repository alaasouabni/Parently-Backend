const Event = require("../../models/Event");

module.exports = async function (req, res) {
  console.log("deleting an event with id ", req.params.eventId);
  
  const event = await Event.findById(req.params.eventId);
  if(event.creator == req.user.id){
    await Event.deleteOne({_id:req.params.eventId});
    res.status(200).json({msg:"event deleted sucessfully"})
  }else{
    res.status(401).json({error:"you are not allowed to delete the event because you are not the creator of the event"})
  }

};
