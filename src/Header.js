import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <header>
        { this.props.currentRoom ? <h1>Basic Messenger Room {this.props.currentRoom}</h1> : <h1>Basic Messenger </h1>}
      </header>
    );
  }
}

export default Header;
