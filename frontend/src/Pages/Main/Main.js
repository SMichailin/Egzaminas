import React, { useState } from 'react';
import './Main.css';

import { useAuth } from "../../context/Auth";

function Main() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
const auth = useAuth()
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can add your logic to handle the submitted post data here.
    console.log('Title:', title);
    console.log('Content:', content);
  };

  return (
    <div className="post-form-container">
      <h2>Praceduros pavadinimas</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="title">pavadinimas:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        
        <button type="submit" >Proceduros patvirtinimas</button>
      </form>
<span onClick={() => auth.logout()}>
                Atsijungti
              </span>
    </div>
  );
}

export default Main;
