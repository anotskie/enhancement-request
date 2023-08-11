import React, { useState, useEffect } from 'react'
import APIService from './APIService'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';




function Forms(props,setArticles, articles,) {
  const [title, setTitle] = useState('')
  const [id, setID] = useState('')
  const [description, setDescription] = useState(props.article.description)
  const [isUpdated, setIsUpdated] = useState(false) 

  useEffect(() => {
        setTitle(props.article.title)
        setDescription(props.article.description)


  }, [props.article])

  const updateArticle = () => {
    const updatedArticle = { title, description, id: props.article.id };
    APIService.UpdateArticle(props.article.id, updatedArticle)
      .then(resp => {
        console.log(resp);
        setIsUpdated(!isUpdated);
      })
      .catch(error => {
        console.error('Error updating article:', error);
        
      });
  }
  

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/articles/', {
      'method':'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Token 5c567d10dfba02ecd6a26904732c78bb33a76808'
      }
    })
    .then(resp => resp.json())
    .then(resp => setArticles(resp))
    .catch(error => console.log(error))

  }, [isUpdated])

  const insertArticle = () => {
    APIService.InsertArticle({title, description})
    .then(resp => console.log(resp))
  }

  
  return (
    <div>
        
      {props.article ? (
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" placeholder="Please Enter Title" value={title} onChange={e => setTitle(e.target.value)} />

          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" rows="5" value={description} onChange={e => setDescription(e.target.value)}></textarea>

          <br></br>

          {
            props.article.id ?  <button onClick={updateArticle} className="btn btn-success">Update Article</button>
            : <button onClick={insertArticle} className="btn btn-success">Insert New Article</button>
          }

         

          
          
        </div>
      ) : null}

    </div>
  )
}

export default Forms