import {useState, useEffect, useCallback} from 'react';

const Lobby = ({room, changeMenu, socket, userColours, setRoom}) => {
    
    const [header, setHeader] = useState({
      text: "In " + (room.length ? room[0].username : "") + "'s Room",
      colour: "black"
    });

    /**
     * Someone joins/leaves
     */
    const updateRoom = useCallback(resp => {
      setRoom(resp);
    }, [setRoom]);

    useEffect(() => {
      socket.on("room-update", updateRoom);
      return () => socket.off("room-update");
    }, [socket, updateRoom]);

    /**
     * Room leader leaves
     */
    const displayError = useCallback(() => {
      setRoom([]);
      setHeader({
        text: "Room Leader Has Left!",
        colour: "Red"
      });
    }, [setRoom ,setHeader]);

    useEffect(() => {
      socket.on("room-delete", displayError);
      return () => socket.off("room-delete");
    }, [socket, displayError]);

    /**
     * Game starts
     */
    const startGame = useCallback(startUser => {
      changeMenu({
        id: 4,
        options: {startId: startUser}
      });
    }, [changeMenu]);

    useEffect(() => {
      socket.on("game-start", startGame);
      return () => socket.off("game-start");
    }, [socket, startGame]);
  
  return (
    <>
        <div className="row my-4">
            <h1 className="text-center col-12 mb-4" style={{color: header.colour}}>{header.text}</h1>
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
                        if (header.text !== "Room Leader Has Left!") 
                          socket.emit("leave-room");
                        changeMenu({
                          id: 0,
                          options: {}
                        });
                    }}
                >
                    Leave Lobby
                </button>
            </div>
        </div>
    </>
  );
}

export default Lobby;