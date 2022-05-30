import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useHttp from "../../hook/use-http";
import Header from "../Header/Header";
import PostBody from "../PostBody/PostBody";
import "./Details.css";

import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PostModel from "../../models/post";
import ConfigModel from "../../models/configModel";
import MessageModal from "../UI/MessageModal/MessageModal";
import SpinnerModal from "../UI/SpinnerModal/SpinnerModal";

let isInit: boolean = true;

const Details = () => {
  const [editPost, setEditPost] = useState<PostModel | null>(null);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);

  const id = useParams().id;

  const { post, status, error, sendRequest, clearError, redirect } = useHttp();

  const navigate = useNavigate();

  useEffect(() => {
    if (isInit == true) {
      const config: ConfigModel = {
        url: `https://jsonplaceholder.typicode.com/posts/${id}`
      };
      sendRequest(config);
      isInit = false;
    }

    if (post !== null && Object.keys(post).length > 0) {
      setEditPost(post);
    }

    if (redirect === true) {
      navigate("/home");
    }
  }, [post, redirect]);

  //Effect with callback func for set init variable to true
  useEffect((): (() => void) => {
    return () => (isInit = true);
  }, []);

  //Delete Post
  const handleDelete = () => {
    const config: ConfigModel = {
      method: "DELETE",
      url: `https://jsonplaceholder.typicode.com/posts/${editPost!.id}`,
    };

    sendRequest(config);
    setDeleteDialog(false);
  };

  //Sending a modified post
  const handleConfirm = (data: PostModel) => {
    const config: ConfigModel = {
      method: "PUT",
      url: `https://jsonplaceholder.typicode.com/posts/${editPost!.id}`,
      data: {
        ...data,
        id: editPost!.id,
        userId: editPost!.userId
      },
    };
    
    sendRequest(config);
  };

  //Handle edit func on Edit button
  const handleEdit = () => {
    setIsEditable(true);
  };

  //Disable edit
  const handleCancel = () => {
    setIsEditable(false);
  };

  //Cancel error dialog
  const handleErrorClick = () => {
    clearError();
    navigate("/home");
  };

  return (
    <>
      {status === "pending" ? (
        <SpinnerModal />
      ) : (
        status === "error" && (
          <MessageModal message={error} onCancel={handleErrorClick} />
        )
      )}
      {deleteDialog === true && (
        <MessageModal
          message="Are you shure you want to delete this post?"
          type="delete"
          title="Warning"
          onCancel={() => setDeleteDialog(false)}
          onConfirm={handleDelete}
        />
      )}
      <Header>
        <div className="btns_wrapper">
          <Button
            variant="contained"
            disabled={isEditable}
            endIcon={<EditIcon />}
            onClick={handleEdit}
          >
            Edit Post
          </Button>
          <Button
            variant="contained"
            disabled={isEditable}
            color="error"
            endIcon={<DeleteIcon />}
            onClick={() => setDeleteDialog(true)}
          >
            Delete Post
          </Button>
        </div>
      </Header>
      <div>
        <PostBody
          title={!isEditable ? "Post details:" : "Edit post:"}
          isEditable={isEditable}
          post={editPost}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </div>
    </>
  );
};

export default Details;
