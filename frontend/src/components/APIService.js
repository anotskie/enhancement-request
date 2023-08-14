export default class APIService {
  static UpdateArticle(article_id, body) {
    return fetch(`http://127.0.0.1:8000/api/articles/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token 5c567d10dfba02ecd6a26904732c78bb33a76808",
      },
      body: JSON.stringify(body),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`Request failed with status: ${resp.status}`);
        }
        return resp.json();
      })
      .catch((error) => {
        console.error("Error updating article:", error);
        throw error;
      });
  }

  static InsertArticle(body) {
    return fetch("http://127.0.0.1:8000/api/articles/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token 5c567d10dfba02ecd6a26904732c78bb33a76808",
      },
      body: JSON.stringify(body),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`Request failed with status: ${resp.status}`);
        }
        return resp.json();
      })
      .catch((error) => {
        console.error("Error updating article:", error);
        throw error;
      });
  }

  static DeleteArticle(article_id) {
    return fetch(`http://127.0.0.1:8000/api/articles/${article_id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token 5c567d10dfba02ecd6a26904732c78bb33a76808",
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`Request failed with status: ${resp.status}`);
        }
      })
      .catch((error) => {
        console.error("Error deleting article:", error);
        throw error;
      });
  }
}

const registerUser = async (username, password) => {
  const response = await fetch(`/api/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  return data;
};

// Function to log in a user
const loginUser = async (username, password) => {
  const response = await fetch(`/api/user-login/`, {
    method: "POST",
    headers: {
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

export { registerUser, loginUser, logoutUser };
