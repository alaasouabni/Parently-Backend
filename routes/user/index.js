var router = require('express').Router();

const isAuthenticated = require('../../middleware/isAuthenticated');
const create = require("./create")
const login = require("./login")
const logout = require("./logout")
const checkToken = require("./check-token")
const getMyEvents = require("./get-my-events")
const getCreatedEvents = require("./get-created-events")
const getInfo = require("./get-info")

router.post('/create', create);
router.post('/login', login);
router.post("/logout",isAuthenticated,logout)
router.post('/check-token', isAuthenticated,checkToken );
router.get('/get-my-events',isAuthenticated,getMyEvents);
router.get("/get-created-events",isAuthenticated,getCreatedEvents)
router.get("/get-info/:userId",isAuthenticated,getInfo)

module.exports = router;
