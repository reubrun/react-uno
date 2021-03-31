import {useState, useEffect} from 'react';
import io from 'socket.io-client';
import MainMenu from './MainMenu.js';
import CreateGame from './CreateGame.js';
import JoinGame from './JoinGame.js';
import Lobby from './Lobby.js';
import Game from './game/Game.js'
import {v4 as uuidV4} from 'uuid';

const Router = () => {
  const [menuChoice, setMenuChoice] = useState({
    id: 0,
    options: {}
  });
  const [username, setUsername] = useState("");
  const [userColours, ] = useState({
    "-1": ["#000000", "black"],
      0 : ["#ff4d4d", "white"],
      1 : ["#0066ff", "white"],
      2 : ["#4dffff", "black"],
      3 : ["#e6e600", "black"],
      4 : ["#ff66ff", "black"],
      5 : ["#33cc33", "white"],
      6 : ["#ff9900", "black"],
      7 : ["#6600cc", "white"]
  });
  const [userId, ] = useState(() => uuidV4());
  const [socket, setSocket] = useState();
  const [room, setRoom] = useState([]);

  useEffect(() => {
    const newSocket = io("https://react-uno-server.herokuapp.com/", {
      query: {id: userId},
      transports: ['websocket', 'polling', 'flashsocket']
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [userId]);

  if (menuChoice.id === 0) {
    return (
        <div className="d-flex align-items-center justify-content-center h-100">
            <div className="w-50 bg-light rounded">
                <MainMenu 
                    changeMenu={setMenuChoice} 
                    username={{value:username, setUsername:setUsername}}
                />
            </div>
        </div>
    );
  } else if (menuChoice.id === 1) {
    return (
        <div className="d-flex align-items-center justify-content-center h-100">
            <div className="w-50 bg-light rounded">
                <CreateGame 
                    changeMenu={setMenuChoice} 
                    socket={socket}
                    userId={userId}
                    username={username}
                    userColours={userColours}
                    room={room}
                    setRoom={setRoom}
                />
            </div>
        </div>
    );
  } else if (menuChoice.id === 2) {
    return (
        <div className="d-flex align-items-center justify-content-center h-100">
            <div className="w-50 bg-light rounded">
                <JoinGame 
                    changeMenu={setMenuChoice}
                    socket={socket}
                    userId={userId}
                    username={username}
                    setRoom={setRoom}
                />
            </div>
        </div>
    );
  } else if (menuChoice.id === 3) {
    return (
        <div className="d-flex align-items-center justify-content-center h-100">
            <div className="w-50 bg-light rounded">
                <Lobby 
                    changeMenu={setMenuChoice}
                    socket={socket}
                    userColours={userColours}
                    room={room}
                    setRoom={setRoom}
                />
            </div>
        </div>
    );
  } else if (menuChoice.id === 4) {
    return (
        <Game 
            userId={userId} 
            startUserId={menuChoice.options.startId}
            room={room}
            socket={socket}
            userColours={userColours}
        />
    );
  }
}

export default Router;