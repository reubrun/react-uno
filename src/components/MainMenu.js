import {useState} from 'react';

const MainMenu = ({changeMenu, username}) => {
  const [error, setError] = useState({
    message: "",
    colour: "#fff"
  });

  const validate = changeTo => {
    if (username.value === "") {
      setError({
        message: "You must enter a username.",
        colour: "#F2DEDE" 
      });
      return;
    }
    if (username.value.length > 15) {
      setError({
        message: "Username must be no longer than 15 characters.",
        colour: "#F2DEDE" 
      });
      return;
    }
    setError({
      message: "",
      colour: "#fff"
    });
    changeMenu({
      id: changeTo,
      options: {}
    });
  }

  return (
    <>
        <div className="row my-4">
            <h1 className="text-center col-12">Choose a Username:</h1>
            <div className="col-6 mx-auto">
                <input 
                    key="1"
                    type="text"
                    className="form-control"
                    value={username.value}
                    style={{backgroundColor : error.colour}}
                    onFocus={e => {
                        e.target.style.backgroundColor = "#fff";
                    }}
                    onChange={e => {
                        username.setUsername(e.target.value);
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
                        validate(1);
                    }}
                >
                    Create a Game
                </button>
            </div>
            <div className="col-6 text-center">
                <button 
                    type="button" 
                    className="btn btn-lg btn-secondary" 
                    onClick={() => {
                        validate(2);
                    }}
                >
                    Join a Game
                </button>
            </div>
        </div>
    </>
  );
}

export default MainMenu;