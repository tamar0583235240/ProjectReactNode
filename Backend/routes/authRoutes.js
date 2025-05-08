
// const verifyJWT = require("../middleware/verifyJWT")
// const express = require("express")
//  const router = express.Router()
//  const {SignIn,SignUp} = require("../controllers/authController")
//  router.post("/SignIn", SignIn)
//  router.post("/SignUp", SignUp)
//  module.exports = router
const express = require("express");
const router = express.Router();
const { SignIn, SignUp, checkAuth, logout } = require("../controllers/authController");
const verifyJWT = require("../middleware/verifyJWT");

router.post("/SignIn", SignIn);
router.post("/SignUp", SignUp);
// router.get("/check", verifyJWT, checkAuth); //  בודק אם יש טוקן חוקי ומחזיר מידע על המשתמש
// router.post("/logout", logout); //  מסיר את הקוקי בצד שרת

module.exports = router;
