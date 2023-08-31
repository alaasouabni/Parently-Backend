module.exports = function(req,res){
    res.clearCookie('token').sendStatus(200);
  
  }