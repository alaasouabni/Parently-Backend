const User = require("../../models/User")

module.exports =  async  function(req, res) {
    const { email, password, first_name, last_name } = req.body;
    const userExists =  await User.findOne({email:email})
    
    if(userExists)
      return res.status(500).json({error:"user already exists"})
      
      try{
        const user = new User({ email, password, first_name, last_name, created_events:[], my_events:[]});
        user.save(function(err) {
          if (err) {
            res.status(500)
              .json({err:"Error registering new user please try again." + err});
          } else {
            res.status(200).json({msg:"Welcome to the club!"});
          }
        });
        
      }
      catch(e)
      {
        console.log("error while creating a user" + e)
        res.status(500).json({error:"error while creating a user" + e})
      }
  



  };