
import express from "express";
import { editProfile, followOrUnfollow, getProfile, getSuggestedUsers, login, logout, register } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.route('/register').post(register);
userRouter.route('/login').post(login);
userRouter.route('/logout').get(logout);
userRouter.route('/profile/:id').get(isAuthenticated, getProfile);
userRouter.route('/profile/edit').post(isAuthenticated, upload.single('profilePhoto'), editProfile);
userRouter.route('/suggested').get(isAuthenticated, getSuggestedUsers);
userRouter.route('/followorunfollow/:id').post(isAuthenticated, followOrUnfollow);

export default userRouter;
