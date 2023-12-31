import React from 'react';
import axios from "axios";
import { useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom"; 


function Home() {
    let history = useNavigate();
    const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  const likeAPost = (postId) => {
    axios.post("http://localhost:3001/likes", {PostId: postId}, {headers: {accessToken: localStorage.getItem("accessToken")}})
    .then((response) => {
      alert(response.data);
    });
  }
  return ( 
    <div>
       {listOfPosts.map((value, key) => {
        return(
            <div className='post'
                key={key}>
                <div className='title'> {value.title} </div>
                <div className='body'
                onClick={() => {
                    history(`/post/${value.id}`);
                }}> {value.postText} </div>
                <div className='footer'> {value.username} {""}
                <button
                  onClick={() => {
                    likeAPost(value.id);
                  }}>
                    {""} Like
                  </button>
                  <label>{value.Likes.length}</label>
                  </div>
            </div>
        );
      })}
    </div>
  )
}

export default Home
