import React, { Component } from 'react';

class NewPostForm extends Component {

  state = {
    title: "",
    description: "",
    image_url: "",
    likes: 0,
    user_id: this.props.user.id
  }

  handleSubmit = (e) => {
    e.preventDefault()

    fetch("http://localhost:4000/posts", {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${this.props.token}`
      },
      body: JSON.stringify(this.state)
    })
      .then(r => r.json())
      .then((newlyCreatedPost) => {
        this.props.addOnePost(newlyCreatedPost)
        this.setState({
          title: "",
          description: "",
          image_url: "",
          likes: 0
        })
      })

  }

  handleChange = (e) => {
    let {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Add New Post</label><br></br>
        <input type="text" autoComplete="off" placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange} />
        <input type="text" autoComplete="off" placeholder="Description" name="description" value={this.state.description} onChange={this.handleChange} />
        <input type="text" autoComplete="off" placeholder="Image Address" name="image_url" value={this.state.image_url} onChange={this.handleChange} />
        <input type="text" autoComplete="off" placeholder="Likes" name="likes" value={this.state.likes} onChange={this.handleChange} />
        <input type="submit" value="Create New Post" />
      </form>
    );
  }

}

export default NewPostForm;