import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import Edit from "./Edit";

const Home = () => {
  const [notes, setNotes] = useState("");
  const [editComp, setEditComp] = useState(false);
  const id = useRef(0);

  const navigate = useNavigate();
  let handleNavigate = () => {
    navigate("/Add");
  };

  const handleEdit = (prop) => {
    setEditComp(true);
    id.current = prop;
    console.log(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/notes", {
        method: "GET",
      }).then((res) => {
        return res.json();
      });
      setNotes(response);
      //   console.log(response)
    };
    fetchData();
    console.log(notes);
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch("http://localhost:8000/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: id
      }),
    });
  };

  return (
    <div>
      <div>
        <label>Create a new note here:</label>
        <button
          className="btn"
          onClick={() => {
            handleNavigate();
          }}
        >
          &nbsp;
        </button>
        <div className="mainDiv">
          <ul>
            {notes &&
              notes.map((note, index) => (
                <div className="notes">
                  {console.log("here")}
                  {/* {console.log(note.description)} */}
                  <div className="titles">{note.title}</div>
                  <div className="descriptions">{note.description}</div>
                  <div className="edit">
                    <div>
                      <button onClick={() => {
                        handleDelete(note._id)
                      }}>Delete</button>
                      <button
                        onClick={() => {
                          handleEdit(note._id);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </ul>
          {editComp && <Edit value={{ id: id.current }} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
