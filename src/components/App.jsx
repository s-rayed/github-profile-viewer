import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/Profile.jsx';
import Search from './github/Search.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: 's-rayed',
      userData: [],
      userRepos: [],
      perPage: 5
    }
  }

  // Get user data from github
  getUserData(){
    $.ajax({
      url: `https://api.github.com/users/${this.state.username}?client_id=${this.props.clientId}&client_secret=${this.props.clientSecret}`,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({ userData: data });
      }.bind(this),
      error: function(xhr, status, err){
        this.setState({ username: null });
        alert(err);
      }.bind(this)
    });
  }

  // Get user Repos
  getUserRepos(){
    $.ajax({
      url: `https://api.github.com/users/${this.state.username}/repos?per_page=${this.state.perPage}&client_id=${this.props.clientId}&client_secret=${this.props.clientSecret}&sort=created`,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({ userRepos: data });
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err){
        this.setState({ username: null });
      }.bind(this)
    });
  }

  handleFormSubmit(username){
    this.setState({ username: username }, function(){
      this.getUserData();
      this.getUserRepos();
    });
  }

  componentDidMount(){
    this.getUserData();
    this.getUserRepos();
  }

  render(){
    return(
      <div>
        <Search onFormSubmit={this.handleFormSubmit.bind(this)}/>
        <Profile 
          userData={this.state.userData}
          userRepos={this.state.userRepos} />
      </div>
    )
  }

}

App.propTypes = {
  clientId: React.PropTypes.string,
  clientSecret: React.PropTypes.string
};
App.defaultProps = {
  clientId: '5ee537336aaf3059b850',
  clientSecret: '9ded5e849e306a590d05e4ce5b2cd807452817eb'
};
 // Basically adding these to the props of App so we can easily access them when we do the api call.
 // The clientId and client Secret are from github (api credentials)

export default App