import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/user/user.selector";
import { useEffect, useRef, useState } from "react";
import { selectLoadingEditPost } from "@/store/post/post.selector";
import { editPostStart } from "@/store/post/post.action";

const EditPost = ({ editPostOpen, setEditPostOpen, post }) => {
    const dispatch = useDispatch();
    const imageRef = useRef();
console.log("edit post: ", post);
    const currentUser = useSelector(selectCurrentUser);
    //creting loading state for edit post
    const loading = useSelector(selectLoadingEditPost);

    // States for caption and image
    const [caption, setCaption] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [file, setFile] = useState("");

    // Update state whenever `post` changes
    useEffect(() => {
        if (post) {
            setCaption(post.caption || "");
            setImagePreview(post.image || "");
        }
    }, [post]);

    const imageChangeHandler = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result); // Update preview
            };
            reader.readAsDataURL(file); // Convert file to a base64 URL
        }
    };

    const editPostHandler = () => {
        const formData = new FormData();
        formData.append("caption", caption);
        if (imagePreview) formData.append("image", file);
        dispatch(editPostStart(post?._id, formData, setEditPostOpen));
        
    }
    return (
        <Dialog open={editPostOpen}>
            <DialogContent onInteractOutside={() => setEditPostOpen(false)}>
                <DialogHeader className="text-center font-semibold">Edit post</DialogHeader>
                <div className='flex items-center gap-3'>
                    <Avatar>
                        <AvatarImage src={currentUser?.profilePicture} alt="img" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className='font-semibold text-xs'>{currentUser?.username}</h1>
                        <span className='text-gray-600 text-xs'>{currentUser?.bio}</span>
                    </div>
                </div>
                <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="focus-visible:ring-transparent border-none" />
                {
                    imagePreview && (
                        <div className='w-full h-64 items-center justify-center'>
                            <img src={imagePreview} alt="post_image_preview" className='object-cover h-full w-full rounded-md' />
                        </div>
                    )
                }
                <input ref={imageRef} type="file" className='hidden' onChange={imageChangeHandler} />
                <Button onClick={() => imageRef.current.click()} className="w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf]">Select from computer</Button>
                {
                    imagePreview && (
                        loading ? (
                            <Button>
                                <Loader2 />
                                Please wait
                            </Button>
                        ) : (
                            <Button onClick={editPostHandler}>Edit</Button>
                        )
                    )
                }
            </DialogContent>
        </Dialog>
    )
}

export default EditPost;