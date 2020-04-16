import React, { Component } from 'react';
import Post from './Post'
import NewPostForm from './NewPostForm'

class ProfileContainer extends Component {

  render() {
    let {username, posts} = this.props.user
    let arrayOfComponents = posts.map(post => {
      return <Post key={post.id} post={post} />
    })

    return (
      <div>
        <h2>{username}&apos;s Profile</h2>
        <NewPostForm token={this.props.token}
                addOnePost={this.props.addOnePost}/>

        <h3>Posts</h3>

        <ol>
          {arrayOfComponents}
        </ol>

      </div>
    );
  }

}

export default ProfileContainer;