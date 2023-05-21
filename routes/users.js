var express = require("express");
var router = express.Router();

const {
  register,
  access,
  getAllUser,
} = require("../controllers/user.controller");
const { Auth } = require("../middlewares");
const { auth } = Auth;

router.post("/auth/signup", register);
router.post("/auth/login", access);
router.get("/userlist", auth, getAllUser);

module.exports = router;
