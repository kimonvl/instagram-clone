import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js"
import { addNewPost, bookmarkPost, createComment, deleteComment, deletePost, dislikePost, editComment, editPost, getAllPosts, getFullPost, getUserPosts, likePost } from "../controllers/post.controller.js";

const postRouter = express.Router();

postRouter.route('/addnewpost').post(isAuthenticated, upload.single('image'), addNewPost);
postRouter.route('/getallposts').post(isAuthenticated, getAllPosts);
postRouter.route('/getuserposts').post(isAuthenticated, getUserPosts);
postRouter.route('/getfullpost/:id').post(isAuthenticated, getFullPost);
postRouter.route('/deletepost/:id').post(isAuthenticated, deletePost);
postRouter.route('/editpost/:id').post(isAuthenticated, upload.single('image'), editPost);
postRouter.route('/createcomment/:id').post(isAuthenticated, createComment);
postRouter.route('/deletecomment/:id').post(isAuthenticated, deleteComment);
postRouter.route('/editcomment/:id').post(isAuthenticated, editComment);
postRouter.route('/likepost/:id').post(isAuthenticated, likePost);
postRouter.route('/dislikepost/:id').post(isAuthenticated, dislikePost);
postRouter.route('/bookmarkpost/:id').post(isAuthenticated, bookmarkPost);

export default postRouter;