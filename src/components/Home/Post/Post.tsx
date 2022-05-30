import React from "react";
import { useNavigate } from "react-router";
import PostModel from "../../../models/post";
import "./Post.css";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Post: React.FC<{ post: PostModel }> = (props) => {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/details/${id}`);
  };

  return (
    <article className="post" key={props.post.id}>
      <h1 className="post_title">{props.post.title}</h1>
      <p className="post_body">
        {props.post.body.slice(0, 100)}
        {props.post.body.length > 100 && <span>...</span>}
      </p>
      <Button variant="contained" onClick={() => handleClick(props.post.id!)}>
        View Details
      </Button>
    </article>
  );
};

export default Post;
