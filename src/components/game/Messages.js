const Messages = ({messages}) => {
    const userColours = {
      "-1": "green",
      0   : "red", 
      1   : "blue"
    }
    return (
        <>
            {
                messages.map(message => (
                    <div key={message.messageId} className="row">
                        <div className="col-4 ml-1 pr-0" style={{color: userColours[message.fromId]}}>
                            {message.fromUser}:
                        </div>
                        <div className="col pl-0">
                            {message.content}
                        </div>
                    </div>
                ))
            }
        </>
    );
}

export default Messages;