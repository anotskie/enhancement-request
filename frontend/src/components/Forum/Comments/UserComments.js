import React, { useEffect, useState } from "react";

const CommentsPage = () => {
  const [articleId, setArticleId] = useState(null);

  useEffect(() => {
    // Parse the query parameter from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("articleId");

    if (id) {
      // Set the articleId state with the parsed value
      setArticleId(id);
    }
  }, []);

  return (
    <div>
      <h1>Comments Page</h1>
      {articleId && <p>Article ID: {articleId}</p>}
      {/* You can now use the articleId to fetch comments or perform other actions */}
    </div>
  );
};

export default CommentsPage;
