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

const createArticles = async (title, description) => {
  const response = await fetch(`http://127.0.0.1:8000/api/articles/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify({
      title,
      description,
    }),
  });

  const data = await response.json();
  return data;
};

// const voteForArticle = async (articleId) => {
//   const response = await fetch(`http://127.0.0.1:8000/api/articles/${articleId}/vote/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Token ${localStorage.getItem("authToken")}`,
//     },
//   });

//   const data = await response.json();
//   return data;
// };

// const fetchArticles = async () => {
//   const response = await fetch(`http://127.0.0.1:8000/api/articles/`);
//   const data = await response.json();
//   return data;
// };

export async function registerUser(username, password) {
  const response = await fetch('http://127.0.0.1:8000/api/register/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.detail);
  }
}

// const registerUser = async (username, password, email) => {
//   const response = await fetch(`http://127.0.0.1:8000/api/register/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ username, password, email }),
//   });

//   const data = await response.json();
//   return data;
// };

// Function to log in a user

function getCookie(name) {
  const value = `; ${document.cookie};`
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export async function loginUser(username, password) {
  const response = await fetch('http://127.0.0.1:8000/api/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
}

// const loginUser = async (username, password) => {
//   const csrftoken = getCookie('csrftoken');
//   const response = await fetch(`http://127.0.0.1:8000/api/user-login/`, {
//     method: "POST",
//     headers: {
//       "X-CSRFToken": csrftoken,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ username, password }),
//   });

//   const data = await response.json();

//   if (response.ok) {
//     localStorage.setItem("authToken", data.token);
//     localStorage.setItem("user_id", data.user_id);
//     localStorage.setItem("username", data.username); // Store the username in local storage
//   }

//   const userId = localStorage.getItem("user_id");
//   console.log("User ID:", userId);

//   return data;
// };

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

export async function createArticle(title, description, token) {
  const response = await fetch('http://127.0.0.1:8000/api/articles/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ title, description }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.detail);
  }
}

export async function getArticleList() {
  const response = await fetch('http://127.0.0.1:8000/api/articles/');
  const data = await response.json();
  return data;
}

export async function voteForArticle(articleId, token) {
  const response = await fetch(`http://127.0.0.1:8000/api/articles/${articleId}/vote/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
}

export async function getUserDetails(userId) {
  const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}/`);
  const data = await response.json();
  console.log("User Details Response:", data); // Debug: Check the API response
  return data.username; // Assuming username is in the response
}


export { logoutUser, updateArticle, createComment,createArticles };
