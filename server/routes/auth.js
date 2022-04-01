import express from "express";


const router = express.Router();

//middleware
import { requireSignin } from "../middlewares";

//controllers
import { signup, login, logout, currentUser, forgotPassword, resetPassword } from "../controllers/auth";

//endpoints
router.post("/signup", signup );
router.post("/login", login);
router.post("/logout", logout);
router.get("/current-user", requireSignin, currentUser);
// router.get("/send-email", sendTestEmail);
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)


module.exports = router;
