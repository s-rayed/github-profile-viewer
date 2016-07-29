import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Repo from './Repo.jsx';

class RepoList extends Component {
  render(){
    return(
      <div>
        <ul className="list-group">
        <li className="list-group-item">
          Repo Name: Repo Description
        </li>
          {
            this.props.userRepos.map(repo => {
              return <Repo 
                        repo={repo}
                        key={repo.id}
                        {...this.props} /> // this passes in all of the properties
            })
          }
        </ul>
      </div>
    )
  }
}

export default RepoList;