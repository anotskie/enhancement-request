export default class APIService {
    static UpdateArticle(article_id, body) {
      return fetch(`http://127.0.0.1:8000/api/articles/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token 5c567d10dfba02ecd6a26904732c78bb33a76808',
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
        console.error('Error updating article:', error);
        throw error; 
      });
    }

    static InsertArticle(body){
        return fetch('http://127.0.0.1:8000/api/articles/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token 5c567d10dfba02ecd6a26904732c78bb33a76808',
            },
            body: JSON.stringify(body),
        }).then((resp) => {
            if (!resp.ok) {
              throw new Error(`Request failed with status: ${resp.status}`);
            }
            return resp.json();
          })
          .catch((error) => {
            console.error('Error updating article:', error);
            throw error; 
          });
    }


    static DeleteArticle(article_id) {
        return fetch(`http://127.0.0.1:8000/api/articles/${article_id}/`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token 5c567d10dfba02ecd6a26904732c78bb33a76808',
            },
        }).then((resp) => {
            if (!resp.ok) {
              throw new Error(`Request failed with status: ${resp.status}`);
            }
           
          }).catch((error) => {
            console.error('Error deleting article:', error);
            throw error;
          });
    }
    


  }