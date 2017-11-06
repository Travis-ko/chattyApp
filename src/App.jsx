import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import Messages from './MessageList.jsx'
import Message from './Message.jsx'
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      currentUser: {}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.onNewMessage = this.onNewMessage.bind(this);
    this.connection = new WebSocket("ws://localhost:3001");
    const nameChange = "";
    const count = "";
  }


  onNewMessage(event){
    if(event.keyCode === 13){
      const user = chatbarusername.value;
      const msg = chatbarmessage.value;
      const newMessage = {id: 3,username: user, content: msg};
      event.target.value = "";
      if (this.state.currentUser.name !== user){
        const tempUser = this.state.currentUser.name;
        this.state.currentUser.name = user;
        this.connection.send(JSON.stringify("type:nameChange" + tempUser + " Changed their name to " + user));
      }
    this.connection.send(JSON.stringify(newMessage));
    }
  }


  componentDidMount() {
    this.connection.onopen = (event) => {
      console.log("server connected");
    }

    this.connection.onmessage = (event) => {
      if(event.data.includes("clientNumber") === true) {
        const parsedCount = JSON.parse(event.data);
        const userCount = parsedCount.count.replace("clientNumber", "");
        this.count = userCount;
        console.log();
      }
      if(event.data.includes('type:nameChange') === true && event.data.includes('undefined') === false){
        const changeMsg = event.data.replace("type:nameChange", "")
        this.nameChange = changeMsg;
        console.log(this.nameChange)
      }
      if(event.data.includes('type:nameChange') === false) {
        const recievedMessage = JSON.parse(event.data)
        const messages = this.state.messages.concat(recievedMessage)
        this.setState({messages: messages})
      }
    }
  }



  render() {
    if(this.state)
    return (
      <div>
      <count>
        {this.count}
      </count>
      <div>
          <Chatbar onNewMessage={this.onNewMessage} user={this.state.currentUser} />
          <Messages userMessage={this.state.messages} nameChange={this.nameChange}/>
      </div>
      </div>
    );
  }
}
export default App;
