import React, { Component } from 'react';
import Post from './Post'
import NewPostForm from './NewPostForm'

class ProfileContainer extends Component {

  render() {
    let {username, posts} = this.props.user
    let arrayOfComponents = posts.map(post => {
      return <Post key={post.id} post={post} deleteOnePost={this.props.deleteOnePost} updateOneUserPost={this.props.updateOneUserPost} />
    })

    return (
      <div>
        <h2>{username}&apos;s Profile</h2>
        <NewPostForm token={this.props.token}
                  user={this.props.user}
                addOnePost={this.props.addOnePost}
                
                />

        <h3>Posts</h3>

        <div style= {{display: "flex", padding: "50px", width: "100%"}}>
          {arrayOfComponents}
        </div>

      </div>
    );
  }

}

export default ProfileContainer;