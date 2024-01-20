import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();
  let handleNavigate = (prop) => {
    if (prop == 1) navigate("/Register");
    else if(prop == 2)navigate("/Add");
    else navigate("/Manage")
  };

  return (
    <div className="BigDiv">
      <title>Notes!</title>
      <div className="Container">
        <h1 className="hContainer">Welcome to Notes!</h1>
        <div className="textContainer">
          Create new notes or Manage already existing notes:
        </div>
        <div className="btnContainer">
          <button
            className="buttons"
            onClick={() => {
              handleNavigate(1);
            }}
          >
            Register here!
          </button>
          <button
            className="buttons"
            onClick={() => {
              handleNavigate(2);
            }}
          >
            Create a note here!
          </button>
          <button
            className="buttons"
            onClick={() => {
              handleNavigate(3);
            }}
          >
            Manage the notes here!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
