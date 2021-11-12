import "./App.css";

import React from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import "./App.css";
import Form from "react-bootstrap/Form";
import Header from "./Header";
import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'

const socket = io.connect("http://localhost:3001");
const user = nanoid(7);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      chat: [],
      currentRoom: null,
    };
    this.chatHandler = this.chatHandler.bind(this);
  }

  chatHandler(e) {
    e.preventDefault();
    if(this.state.message !== "") {
      socket.emit("send-message", {
        message: this.state.message,
        userName: user,
        room: this.state.currentRoom,
      });
    }
    this.setState({
      message: "",
    });
  }

  chatListener() {
    socket.on("send-message", payload => {
      console.log("server payload: ", payload);
      this.setState({
        chat: [...this.state.chat, payload],
      });
    });
  }

  joinRoom(roomNumber) {
    if (
      this.state.currentRoom !== roomNumber &&
      this.state.currentRoom !== null
    ) {
      socket.emit("leave", this.state.currentRoom);
      this.setState({
        chat: []
      })
    }
    if (this.state.currentRoom !== roomNumber) {
      socket.emit("join", roomNumber);
      this.setState({
        currentRoom: roomNumber,
      });
    }
  }

  componentDidMount() {
    this.chatListener();
  }

  render() {
    return (
      <div className="App">
        <Header currentRoom={this.state.currentRoom}/>
        <Button className="secondary" onClick={(e) => this.joinRoom(1)} >Room 1</Button>
        <Button variant="warning" onClick={(e) => this.joinRoom(2)} >Room 2</Button>
        <Button variant="info" onClick={(e) => this.joinRoom(3)} >Room 3</Button>
        <h2 className="scroll-area">
          {this.state.chat.map((payload, idx) => {
            return (
              <p key={idx}>
                {payload.userName} - message: {payload.message}
              </p>
            );
          })}
        </h2>
        { this.state.currentRoom === null ? null :
          <Form onSubmit={this.onSubmit}>
            <Form.Control
              type="text"
              value={this.state.message}
              onChange={(e) => this.setState({ message: e.target.value })}
            />
            <Form.Control className="btn btn-primary btn-lg" value="Send" type="submit" onClick={this.chatHandler} />
          </Form>
        }
        <Footer />
      </div>
    )
  }
}
export default App;
