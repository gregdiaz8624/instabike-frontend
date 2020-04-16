import React from 'react';

const Post = ({post}) => {
    console.log(post)
  return(

    <div>
  
    <ul>{post.title}</ul>
    <ul>{post.description}</ul>
    <ul><img src={post.image_url} alt={"bike"}></img></ul>
    <ul>{post.likes}</ul>
    </div>
  )
};

export default Post;