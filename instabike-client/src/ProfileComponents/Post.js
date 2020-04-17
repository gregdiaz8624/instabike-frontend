import React from 'react';

const Post = (props) => {
  
 let handleDelete = (e) => {
    
    props.deleteOnePost(props.post.id);

  }

  let handleLike = (e) => {

    props.updateOneUserPost(props.post.id, 1)
  }

  let {post} = props

  return(

    <div>
  
  <div className="card" style={{boxShadow:'0 4px 8px 0 rgba(0,0,0,0.2)',width:'400px',padding:'50px', height:'700px'}}>
  <img src={post.image_url} alt="Avatar" style={{width:"400px", height:"500px"}}/>
        <div className="container" style={{padding:'25px'}}>
          <h4><b>Title: {post.title}</b></h4>
          <p>Description: {post.description}</p>

         

          <p>Likes: {post.likes}  <button className="likeButton" onClick={ handleLike }>
            Like  👍
          </button></p> 

          Delete Post <button className="delButton" onClick={ handleDelete }>
            x
          </button>
        </div>
      </div>
    
    </div>
  )
};

export default Post;