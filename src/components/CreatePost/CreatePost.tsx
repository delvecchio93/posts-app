import { useEffect } from "react";
import useHttp from "../../hook/use-http";
import { useNavigate } from "react-router";
import PostBody from "../PostBody/PostBody";
import PostModel from "../../models/post";
import ConfigModel from "../../models/configModel";
import SpinnerModal from "../UI/SpinnerModal/SpinnerModal";
import MessageModal from "../UI/MessageModal/MessageModal";

const CreatePost = () => {
  const { status, redirect, sendRequest, error, clearError } = useHttp();
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect === true) navigate("/home");
  }, [redirect]);

  const handleConfirm = (data: PostModel) => {
    const config: ConfigModel = {
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/posts",
      data: data,
    };

    sendRequest(config);
  };

  return (
    <>
      {status === "pending" ? (
        <SpinnerModal />
      ) : (
        status === "error" && (
          <MessageModal message={error} onCancel={clearError} />
        )
      )}
      <PostBody
        title={"Create post:"}
        onCancel={() => navigate("/home")}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default CreatePost;
