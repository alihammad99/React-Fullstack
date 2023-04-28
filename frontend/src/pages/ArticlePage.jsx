import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

const ArticlePage = () => {
  const [article, setArticle] = useState({ upvotes: 0, comments: [] });
  const { _id } = useParams();

  const fetchArticle = async () => {
    const getArticle = await axios.get(
      `http://localhost:8000/api/articles/${_id}/`
    );
    // console.log(getArticle.data);
    setArticle(getArticle.data);
  };

  useEffect(() => {
    fetchArticle();
    if (article) {
      console.log(article);
    } else {
      console.log("There is no article with id " + _id);
    }
  }, [_id]);

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <h4>{article.name}</h4>
      {/* <h1>{article.title}</h1>
      <h2>{article.content}</h2> */}
    </div>
  );
};

export default ArticlePage;
