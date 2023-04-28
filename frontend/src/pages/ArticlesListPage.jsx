import React, { useEffect, useState } from "react";
import mockArticles from "../data/mock-articles";
import { Link } from "react-router-dom";
import axios from "axios";

const ArticlesListPage = () => {
  const [articles, setArticles] = useState();

  const fetchArticles = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/articles`);
    setArticles(data);
  };
  useEffect(() => {
    fetchArticles();
  }, []);

  if (articles) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          margin: "auto",
        }}
      >
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
    );
  }
};

export default ArticlesListPage;

const ArticleCard = ({ article }) => {
  return (
    <Link to={`/articles/${article._id}`}>
      <div style={{ width: "85%", border: "1px solid yellow", padding: 12 }}>
        <h3 style={{ color: "white", fontSize: "yellow" }}>{article.name}</h3>
        {/* <p>{article.content[0].substring(0, 180)}...</p> */}
      </div>
    </Link>
  );
};
