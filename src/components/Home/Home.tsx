import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useHttp from "../../hook/use-http";
import SpinnerModal from "../UI/SpinnerModal/SpinnerModal";
import Header from "../Header/Header";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import "./Home.css";
import Post from "./Post/Post";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";
import MessageModal from "../UI/MessageModal/MessageModal";
import { NumberLiteralType } from "typescript";

const Home = () => {
  const [visibleBtn, setVisibleBtn] = useState<boolean>(false);
  const [currentPage, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(15);

  const { list, status, sendRequest, error, clearError } = useHttp();

  const navigate = useNavigate();

  const numberOfPages = Math.ceil(list.length / perPage);

  const fromPost: number = currentPage * perPage - perPage;
  const toPost: number = currentPage * perPage;

  const pagesArray = [];
  for (let page = 1; page <= numberOfPages; page++) {
    pagesArray.push(page);
  }

  //UseEffect whitch add scroll listener event on window to toggle visibility scrollToTop button
  useEffect(() => {
    const scrollEvent = () => {
      if (window.pageYOffset > 100) {
        setVisibleBtn(true);
      } else {
        setVisibleBtn(false);
      }
    };
    window.addEventListener("scroll", scrollEvent);

    //Cleanup func for remove listener
    return () => window.removeEventListener("scroll", scrollEvent);
  });

  //useEffect for get list of posts
  useEffect(() => {
    const config = { url: "https://jsonplaceholder.typicode.com/posts" };
    sendRequest(config);
  }, []);

  let posts: JSX.Element | JSX.Element[] = <div>There is no items yet!</div>;

  if (list.length > 0) {
    const newList = [...list].slice(fromPost, toPost);
    posts = newList.map((post) => {
      return <Post key={post.id} post={post} />;
    });
  }

  //Function for scroll to top on press Button for scroll
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //List of pages in pagination bar
  const pages = pagesArray.map((page) => {
    return (
      <span
        className={`page ${currentPage === page ? "active" : ""}`}
        key={page}
        onClick={() => setPage(page)}
      >
        {page}
      </span>
    );
  });
  return (
    <>
      {status === "pending" ? (
        <SpinnerModal />
      ) : (
        status === "error" && (
          <MessageModal message={error} onCancel={clearError} />
        )
      )}
      <Header>
        <Button
          variant="contained"
          endIcon={<AddCircleOutlineIcon />}
          className="centered_btn"
          onClick={() => navigate("/create")}
        >
          Create post
        </Button>
      </Header>
      <div className="list-wrapper">{posts}</div>
      <div className="pagination_wrapper">
        <strong className="from_to">{`${fromPost}-${toPost > list.length ? list.length : toPost}`}</strong>
        <div className="pagination">
          {pages}
        </div>
        </div>
      {visibleBtn && (
        <Tooltip title="Scroll to top" placement="top">
          <span className="arrow_wrapper" onClick={scrollToTop}>
            <ArrowUpwardIcon />
          </span>
        </Tooltip>
      )}
    </>
  );
};

export default Home;
