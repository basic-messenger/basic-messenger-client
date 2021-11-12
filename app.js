import React from 'react';
import io from 'socket.io-client';
import {nanoid} from 'nanoid';
import './app.css';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io.connect('http://localhost:8000')
const user = nanoid(7)

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      msgContent: '',
      chat: [],
    }
    this.chatHandler = this.chatHandler.bind(this);
  }

  chatHandler(e){
    e.preventDefault();
    console.log('client-chatter: ',this.state.msgContent)
    socket.emit('client-chatter', {msgContent: this.state.msgContent, userName: user })
  }

  chatListener(){
      socket.on("client-chatter", (payload) => {
      console.log('server payload: ',payload)
      //      old chat, new msg
      // set state with payload from server
      this.setState({
        chat: [...this.state.chat, payload]
      });
    });
  }

  componentDidMount(){
    this.chatListener()
  }
  
  render(){
    return (
      <div className="App">
        <h1>Welcome to Basic Chat Messenger</h1>
        <h2>
          {this.state.chat.map( (payload, idx)  => {
            return(
              <p key={idx}>
                {payload.userName} - message: {payload.msgContent}
              </p>
            )
          })}
        </h2>
        <Form onSubmit={this.onSubmit}>
                <Form.Label>Type Message:</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.msgContent}
                  onChange={(e)=> this.setState({msgContent: e.target.value})}
                />
              <Form.Control
                type="submit"
                onClick={this.chatHandler}
              />
        </Form>
      </div>
    );
  }
}

export default App;