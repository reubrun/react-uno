import {useState, useEffect, useCallback} from 'react';

const CreateGame = ({changeMenu, socket, userId, username, userColours, room, setRoom}) => {
  const [roomId, ] = useState(
    Math.random().toString(36).substring(2, 10).toUpperCase()
  );

  const updateRoom = useCallback(resp => {
    setRoom(resp);
  }, [setRoom]);

  useEffect(() => {
    socket.emit("create-room", {roomId, userId, username});
    socket.on("room-update", updateRoom);
    return () => socket.off("room-update");
  }, [socket, roomId, userId, username, updateRoom]);

  const startGame = useCallback(startPlayer => {
    changeMenu({
      id: 4,
      options: {startId: startPlayer}
    });
  }, [changeMenu]);

  useEffect(() => {
    socket.on("game-start", startGame);
    return () => socket.off("start-game");
  }, [socket, startGame]);

  return (
    <>
        <div className="row my-4">
            <h1 className="text-center col-12 mb-4">Your room code is <span>{roomId}</span></h1>
            <h5 className="text-center col-12">Users in this room:</h5>
        </div>
        <div className="d-flex justify-content-around">
            {room.map(user => (
                <span
                    key={user.userId}
                    className="badge mb-2"
                    style={{
                        fontSize: "100%", 
                        background: userColours[user.userNum][0],
                        color: userColours[user.userNum][1]
                    }}
                >{user.username}</span>
            ))}
        </div>
        <hr/>
        <div className="row my-4">
            <div className="col-6 text-center">
                <button 
                    type="button" 
                    className="btn btn-lg btn-secondary" 
                    onClick={() => {
                        socket.emit("leave-room");
                        setRoom([]);
                        changeMenu({id: 0, options:{}});
                    }}
                >
                    Leave Room
                </button>
            </div>
            <div className="col-6 text-center">
                <button 
                    type="button" 
                    className="btn btn-lg btn-success"
                    disabled={room.length === 1 ? true : false}
                    onClick={() => {
                        socket.emit("game-start");
                    }}
                >
                    Start Game
                </button>
            </div>
        </div>
    </>
  );
}

export default CreateGame;