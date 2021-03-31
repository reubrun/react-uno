import {useState, useEffect, useCallback} from 'react';

const JoinGame = ({changeMenu, socket, userId, username, setRoom}) => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState({
    message: "",
    colour: "#fff"
  });

  const updateRoom = useCallback(resp => {
    setRoom(resp);
    changeMenu({
      id: 3,
      options: {}
    });
  }, [setRoom, changeMenu]);

  const joinError = useCallback(resp => {
    if (resp === 404) {
      setError({
        message: "Could not find that room",
        colour: "#F2DEDE"
      });
      return;
    }
    if (resp === 500) {
      window.location.reload();
    }
  }, [setError]);

  useEffect(() => {
    socket.on("room-update", updateRoom);
    return () => socket.off("room-update");
  }, [socket, updateRoom]);

  useEffect(() => {
    socket.on("join-error", joinError);
    return () => socket.off("room-update");
  }, [socket, joinError]);

  const validate = () => {
    if (roomCode === "") {
      setError({
        message: "You must enter a room code.",
        colour: "#F2DEDE" 
      });
    } else {
      setError({
        message: "",
        colour: "#fff"
      });
      socket.emit("join-room", {roomId:roomCode, userId, username});
    }
  }

  return (
    <>
        <div className="row my-4">
            <h1 className="text-center col-12">Enter Room Code:</h1>
            <div className="col-6 mx-auto">
                <input 
                    key="1"
                    type="text"
                    className="form-control"
                    style={{backgroundColor : error.colour}}
                    onFocus={e => {
                        e.target.style.backgroundColor = "#fff";
                    }}
                    onChange={e => {
                        setRoomCode(e.target.value);
                    }}
                >
                </input>
                <p className="text-danger mb-0">{error.message}</p>
            </div>
        </div>
        <hr/>
        <div className="row my-4">
            <div className="col-6 text-center">
                <button 
                    type="button" 
                    className="btn btn-lg btn-secondary" 
                    onClick={() => {
                        changeMenu({
                          id: 0,
                          options: {}
                        });
                    }}
                >
                    Back
                </button>
            </div>
            <div className="col-6 text-center">
                <button 
                    type="button" 
                    className="btn btn-lg btn-success" 
                    onClick={() => {
                        validate();
                    }}
                >
                    Join Game
                </button>
            </div>
        </div>
    </>
  );
}

export default JoinGame;