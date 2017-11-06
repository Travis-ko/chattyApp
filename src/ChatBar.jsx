import React, {Component} from 'react';

class ChatBar extends Component {

  render() {
    return (
      <footer className="chatbar">
        <input defaultValue={this.props.onNewMessage.user} id="chatbarusername" onKeyDown={this.props.onNewMessage} placeholder="Your Name (Optional)" />
        <input id="chatbarmessage" onKeyDown={this.props.onNewMessage} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;