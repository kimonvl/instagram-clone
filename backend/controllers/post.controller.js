import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";

export const addNewPost = async (req, res) => {
    try {
        const { caption } = req.body;
        const image = req.file;
        console.log(image);
        const author = req.id;

        if (!image) {
            return res.status(400).json({
                message: "Image required",
                success: false
            })
        }

        //image upload
        const optimizedImageBuffer = await sharp(image.buffer).resize({ width: 800, height: 800, fit: 'inside' }).toFormat('jpeg', { quality: 80 }).toBuffer();

        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri);

        const post = await Post.create({
            caption,
            author,
            image: cloudResponse.secure_url,
            imagePublicId: cloudResponse.public_id
        });

        await User.updateOne({ _id: author }, { $push: { posts: post._id } });

        return res.status(200).json({
            message: "Post created successfully",
            success: true,
            post
        });
    } catch (error) {
        console.log(error);
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            })
        }
        const posts = await Post.find({ author: { $in: user.following } }).populate("author", "username profilePicture").limit(20).sort({ createdAt: -1 });
        if (!posts) {
            return res.status(400).json({
                message: "Didn't find any posts",
                success: false,
            });
        }

        return res.status(200).json({
            posts,
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const userId = req.id;
        const posts = await Post.find({ author: userId }).sort({ createdAt: -1 }).populate("author", "username profilePicture");
        if (!posts) {
            return res.status(400).json({
                message: "No posts found",
                success: false,
            })
        }

        return res.status(200).json({
            posts,
            success: false,
        })
    } catch (error) {
        console.log(error);
    }
}

export const getFullPost = async (req, res) => {
    try {
        const postId = req.params.id;
        if (!postId) {
            return res.status(400).json({
                message: "Post not found",
                success: false,
            })
        }
        const fullPost = await Post.findById(postId).
            populate("author", "username profilePicture").
            populate({
                path: "comments",
                sort: -1,
                populate: {
                    path: "author",
                    select: "username profilePicture"
                }
            }).populate({
                path:"likes",
                select:"username profilePicture"
            });
        if (!fullPost) {
            return res.status(400).json({
                message: "Post not found",
                success: false,
            });
        }

        return res.status(200).json({
            fullPost,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(400).json({
                message: "Post not found",
                success: false,
            });
        }

        if (!post.author.equals(userId)) {
            return res.status(400).json({
                message: "Unauthorized user to delete this post",
                success: false,
            });
        }
        //delete associated comments
        await Comment.deleteMany({ post: postId });
        //remove the post from user
        await User.updateOne({ _id: userId }, { $pull: { posts: postId } });
        //delete the post
        await post.deleteOne();

        if (post.imagePublicId) {
            await cloudinary.uploader.destroy(post.imagePublicId);
            console.log("immage destroyed");
        }

        return res.status(200).json({
            message: "Post deleted",
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
}

export const editPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.id;
        const { caption } = req.body;
        const image = req.file;

        let post = await Post.findById(postId);
        if (!post) {
            return res.status(400).json({
                message: "Post not found",
                success: false,
            });
        }

        if (!post.author.equals(userId)) {
            return res.status(400).json({
                message: "Unauthorized user to edit",
                success: false,
            });
        }

        post.caption = caption;
        if (image) {
            if (post.imagePublicId) {
                await cloudinary.uploader.destroy(post.imagePublicId);
                console.log("immage destroyed");
            }

            const optimizedImageBuffer = await sharp(image.buffer)
                .resize({ width: 800, height: 800, fit: 'inside' })
                .toFormat('jpeg', { quality: 80 })
                .toBuffer();

            const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
            const cloudResponse = await cloudinary.uploader.upload(fileUri);

            // 3) Update post fields
            post.image = cloudResponse.secure_url;
            post.imagePublicId = cloudResponse.public_id;
        }

        await post.save();
        return res.status(200).json({
            message: "Post edited",
            success: true,
            post
        });
    } catch (error) {
        console.log(error);
    }
}

export const createComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.id;
        const { text } = req.body;

        const comment = await Comment.create({
            text,
            author: userId,
            post: postId
        });

        if (!comment) {
            return res.status(400).json({
                message: "Failed to create comment",
                success: false,
            });
        }

        const post = await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } }, { new: true });
        if (!post) {
            return res.status(400).json({
                message: "Post not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Comment created successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const userId = req.id;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(400).json({
                message: "Comment not found",
                success: false,
            });
        }
        if (!comment.author.equals(userId)) {
            return res.status(400).json({
                message: "Unauthorized user to delete this comment",
                success: false,
            });
        }

        let post = await Post.findById(comment.post);
        if (!post) {
            return res.status(400).json({
                message: "Post not found",
                success: false,
            });
        }
        //remove comment from post
        post.comments = post.comments.filter((cId) => { return !(cId.equals(commentId)) });
        await post.save();

        //delete comment
        await comment.deleteOne();

        return res.status(200).json({
            message: "Comment deleted successfully",
            success: true,
        });

    } catch (error) {
        console.log(error);
    }
}

export const editComment = async (req, res) => {
    try {
        const userId = req.id;
        const commentId = req.params.id;
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                message: "You need to provide text to edit the comment",
                success: false,
            });
        }

        let comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(400).json({
                message: "Comment not found",
                success: false,
            });
        }
        if (!comment.author.equals(userId)) {
            return res.status(400).json({
                message: "Unauthorized user to edit this comment",
                success: false,
            });
        }

        comment.text = text;
        await comment.save();

        return res.status(200).json({
            message: "Comment edited successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.id;

        let post  = await Post.findById(postId);
        if(!post){
            return res.status(400).json({
                message: "Post not found",
                success: false,
            }); 
        }

        post.likes.addToSet(userId);
        await post.save();

        return res.status(200).json({
            message: "Liked post successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
}

export const dislikePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.id;

        let post = await Post.findById(postId);
        if(!post){
            return res.status(400).json({
                message: "Post not found",
                success: false``,
            }); 
        }

        post.likes.pull(userId);
        await post.save();

        return res.status(200).json({
            message: "Disliked post successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
}

export const bookmarkPost = async (req, res) => {
    try {
        const userId = req.id;
        const postId = req.params.id;

        const post = await Post.findById(postId);
        if(!post) return res.status(200).json({message: "Disliked post successfully",success: true,}); 
        
        let user = await User.findById(userId);
        if(user.bookmarks.includes(post._id)){
            //remove from bookmark
            user.bookmarks.pull(post._id);
            await user.save();
            return res.status(200).json({
                message: "Post removed from bookmarks",
                success: true,
            }); 
        } else{
            //add to bookmark
            user.bookmarks.addToSet(post._id);
            await user.save();
            return res.status(200).json({
                message: "Post added to bookmarks",
                success: true,
            });
        }
    } catch (error) {
        console.log(error);
    }
}

//TODO: delete/edit comment, like/dislike post