import React, {Component} from 'react';
import Message from './Message.jsx'

class Messages extends Component {
  render() {
    const changeContent = this.props.nameChange;
    const content = this.props.userMessage.map(msg =>{
      return <Message key={Math.random()} username={msg.username} content={msg.content}/>});
    return (
<main className="messages">
<div >
  {content}
  </div>
  <div className="message system">
    {changeContent}
  </div>
</main>

    );
  }
}

export default Messages;