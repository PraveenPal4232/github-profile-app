import React from "react";
import "./App.css";
import axios from "axios";

const CardList = (props) => (
  <div>
    {props.user.map((user) => (
      <Card key={user.id} {...user} />
    ))}
  </div>
);

class Form extends React.Component {
  state = {
    name: "",
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(
      `https://api.github.com/users/${this.state.name}`
    );
    this.props.onSubmit(resp.data);
    this.setState({ name: "" });
  };
  render() {
    return (
      <form action="" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Github User"
          value={this.state.name}
          onChange={(event) => this.setState({ name: event.target.value })}
        />
        <input type="submit" value="ADD" />
      </form>
    );
  }
}

class Card extends React.Component {
  render() {
    const user = this.props;
    return (
      <div className="github-profile">
        <img src={user.avatar_url} alt="" />
        <div className="info">
          <div className="name">{user.name}</div>
          <div className="company">{user.company}</div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    users: [],
  };
  addNewUser = (newUser) => {
    this.setState((preState) => ({
      users: [...preState.users, newUser],
    }));
  };
  render() {
    return (
      <main>
        <div className="header">
          <h1>GitHub Profile App</h1>
        </div>
        <Form onSubmit={this.addNewUser} />
        <CardList user={this.state.users} />
      </main>
    );
  }
}

export default App;
