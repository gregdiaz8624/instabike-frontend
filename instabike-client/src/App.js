import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './Components/Home'
import NavBar from './Components/NavBar'
import Form from './Components/Form'
import './App.css'
import {withRouter, Redirect} from 'react-router-dom'
import ProfileContainer from './ProfileComponents/ProfileContainer'

class App extends React.Component {

  state = {

    user: {
      id: 0,
      username: "",
      posts: []
    },
    token: ""

  }

  componentDidMount(){

    if (localStorage.token) {

      fetch("http://localhost:4000/persist", {
        headers: {
          "Authorization": `bearer ${localStorage.token}`
        }
      })
      .then(r => r.json())
      .then(this.handleResponse)

    }
  }

  logSomeonOut = () => {
    this.setState({
      user: {
        id: 0,
        username: "",
        posts: []
      },
      token: ""
    })
    localStorage.clear()
  }

  handleLoginSubmit = (userInfo) => {
    console.log("Login form has been submitted")

    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
      .then(r => r.json())
      .then(this.handleResponse)
  }

  handleRegisterSubmit = (userInfo) => {
    console.log("Register form has been submitted")

    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
      .then(r => r.json())
      .then(this.handleResponse)
  }

  handleResponse = (resp) => {
    if (!resp.message) {
      localStorage.token = resp.token
      this.setState({
        user: resp.user,
        token: resp.token
      }, () => {
        this.props.history.push("/profile")
      })
    }
    else {
      alert(resp.message)
    }
  }

  renderForm = (routerProps) => {
    if(routerProps.location.pathname === "/login"){
      return <Form formName="Login Form" handleSubmit={this.handleLoginSubmit}/>
    } else if (routerProps.location.pathname === "/register") {
      return <Form formName="Register Form" handleSubmit={this.handleRegisterSubmit}/>
    }
  }

  renderProfile = (routerProps) => {
    if (this.state.token) {
        return <ProfileContainer
         user={this.state.user} 
         token={this.state.token}
         addOnePost={this.addOnePost}
         deleteOnePost={this.deleteOnePost}
         updateOneUserPost={this.updateOneUserPost}
         />
    } else {
      return <Redirect to="/login"/>
    }
  }

  addOnePost = (newPost) => {

    let copy = [...this.state.user.posts, newPost]

    this.setState({
      user: {
        ...this.state.user,
        posts: copy
      }
    })

  }
  updateOneUserPost = (id, numberToIncreaseLiked) => {

    // let foundObject = this.state.user.posts.find(userObj => userObj.id === id)
    // console.log(foundObject)

    // fetch(`http://localhost:4000/posts/${id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "content-type": "application/json",
    //     "Authorization": `Bearer ${localStorage.token}`
    //   },
    //   body: JSON.stringify({
      
    //   ...foundObject,
    //   likes: userObj.likes + numberToIncreaseLiked
    // })
    // })
    // .then(r => r.json())
    // .then(() => {
      let theUpdatedArray = this.state.user.posts.map((userObj) => {
        if (userObj.id === id) {
          console.log(userObj.likes, numberToIncreaseLiked)
          return {
            ...userObj,
            likes: userObj.likes + numberToIncreaseLiked
          }
        } else {
          return userObj
        }
      })

      this.setState({
  
          user: {
            id: this.state.user.id,
            username: this.state.user.username,
            posts: theUpdatedArray}
        
      })
    // })

  }

  deleteOnePost = (id) => {

    fetch(`http://localhost:4000/posts/${id}`, {
      method: "DELETE",
      headers: {"Authorization": `Bearer ${localStorage.token}`
              }
    }) 
    
   
      let filteredArray = this.state.user.posts.filter(postObj => {
        return postObj.id !== id
      })

      this.setState({
        
        user:{ 
          id: this.state.user.id,
          username: this.state.user.username,
          posts: filteredArray}
      })
   
  }

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/login" render={ this.renderForm } />
          <Route path="/register" render={ this.renderForm } />
          <Route path="/profile" render={ this.renderProfile } />
          <Route path="/" exact component={Home} />
          <Route render={ () => <p>Page Not Found</p> } />
        </Switch>
       
      </div>
    );
  }

}

export default withRouter(App)
