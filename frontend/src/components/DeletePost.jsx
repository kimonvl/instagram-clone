import { deletePostStart } from "@/store/post/post.action";
import { useDispatch } from "react-redux";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";

const DeletePost  = ({deletePostOpen, setDeletePostOpen, postId, setOpenCommentDialog}) => {
    const dispatch = useDispatch();

     const onDeletePost = () => {
        dispatch(deletePostStart(postId, setDeletePostOpen, setOpenCommentDialog));
     }

    return(
        <Dialog open={deletePostOpen} onInteractOutside={() => setDeletePostOpen(false)}>
            <DialogContent className="max-w-md p-6">
                <DialogHeader className="text-center text-lg font-semibold">
                    Are you sure you want to delete this post?
                </DialogHeader>
                <DialogFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setDeletePostOpen(false)}>
                        No
                    </Button>
                    <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={onDeletePost}>
                        Yes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeletePost;