// export default class APIService {
//   static DeleteArticle(article_id) {
//     return fetch(`http://127.0.0.1:8000/api/articles/${article_id}/`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Token 5c567d10dfba02ecd6a26904732c78bb33a76808",
//       },
//     })
//       .then((resp) => {
//         if (!resp.ok) {
//           throw new Error(`Request failed with status: ${resp.status}`);
//         }
//       })
//       .catch((error) => {
//         console.error("Error deleting article:", error);
//         throw error;
//       });
//   }
// }
const updateArticle = async (articleId, updatedData) => {
  const response = await fetch(`api/articles/${articleId}/update_article/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  const data = await response.json();
  return data;
};

const createArticle = async (title, description) => {
  const response = await fetch(`http://127.0.0.1:8000/api/articles/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify({ title, description }),
  });

  const data = await response.json();
  return data;
};

const voteForArticle = async (articleId) => {
  const response = await fetch(`http://127.0.0.1:8000/api/articles/${articleId}/vote/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("authToken")}`,
    },
  });

  const data = await response.json();
  return data;
};

const fetchArticles = async () => {
  const response = await fetch(`http://127.0.0.1:8000/api/articles/`);
  const data = await response.json();
  return data;
};

const registerUser = async (username, password, email) => {
  const response = await fetch(`http://127.0.0.1:8000/api/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, email }),
  });

  const data = await response.json();
  return data;
};

// Function to log in a user

function getCookie(name) {
  const value = `; ${document.cookie};`
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}


const loginUser = async (username, password) => { 
  const csrftoken = getCookie('csrftoken');
  const response = await fetch(`http://127.0.0.1:8000/api/user-login/`, {
    method: "POST",
    headers: {
      "X-CSRFToken": csrftoken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("authToken", data.token); // Store the token in local storage
  }

  return data;
};

const logoutUser = () => {
  localStorage.removeItem("authToken"); // Remove the token from local storage
};

const createComment = async (articleId, text) => {
  const response = await fetch(`http://127.0.0.1:8000/api/articles/${articleId}/comments/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify({ text }),
  });

  const data = await response.json();
  return data;
};

export { registerUser, loginUser, logoutUser, fetchArticles, createArticle, voteForArticle, updateArticle, createComment };
