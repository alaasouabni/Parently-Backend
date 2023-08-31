var express = require("express");
var router = express.Router();

const isAuthenticated = require("../middleware/isAuthenticated");


/* GET home page. */
router.get("/",isAuthenticated,  function (req, res) {
  res.status(200).json({ msg: "good" });
  //   try {
  //    // const fileStr = fs.readFileSync(__dirname+'/a.png', {encoding: 'base64'});
  //     const uploadResponse = await cloudinary.uploader.upload(__dirname+'/a.png');
  //       console.log(uploadResponse)
  //     res.json(uploadResponse);
  // } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ err: 'Something went wrong' });
  // }
  // QRCode.toDataURL('I am a pony!', function (err, url) {
  //   console.log(url)

  //  })

  // QRCode.toString("",{type:'terminal'}, function (err, url) {
  //   console.log(url)
  // })
});

module.exports = router;
