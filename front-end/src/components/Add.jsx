import "../styles/add.css";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

function Add() {
  const title = useRef("");
  const description = useRef("");
  const fonts = useRef("");
  const colors = useRef("")
  const navigate = useNavigate();
  const [font, setFont] = useState("");
  const [color, setColor] = useState("");
  
  console.log(fonts.current)

  let handleNavigate = () => {
    navigate("/");
  };

  const handleSubmit = async (event) => {
    console.log("hererererere");
    console.log(font, color)
    // console.log(title.current.value, description.current.value)
    event.preventDefault();
    const response = await fetch("http://localhost:8000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.current.value,
        description: description.current.value,
        font: font,
        color: color
      }),
    }).then((res) => {
      return res.json();
    });
    // console.log('here', response, title.current.value, description.current.value)
  };

  const handleFontChanges = () => {
    const changedFont = fonts.current.value;
    console.log(changedFont);
    setFont(changedFont);
    console.log(font)
  }

  const handleColorChanges = () => {
    const changedColor = colors.current.value;
    console.log(changedColor);
    setColor(changedColor);
    console.log(color);
  };

  return (
    <div>
      <title>Create a Note!</title>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div className="addContainer">
          <h1>Write a note here!</h1>
          <div>
            <div>
              <div>
                <label>Note Title:</label>

                <input className={"title_field "+font+" "+color} type="text" ref={title} />

                <select ref={fonts} className="select" onChange={()=>{handleFontChanges()}} onClick={()=>{console.log(fonts.current)}}>
                  <option value="" disabled="true" selected="true">Default Font</option>
                  <option value="f0">monospace</option>
                  <option value="f1">FreeMono</option>
                  <option value="f2">Didot</option>
                  <option value="f3">Montserrat</option>
                  <option value="f4">Caveat</option>
                </select>

                <select ref={colors} className="select" onChange={()=>{handleColorChanges()}} onClick={()=>{console.log(colors.current)}}>
                  <option value="" disabled="true" selected="true">Choose Color</option>
                  <option value="c1">Red</option>
                  <option value="c2">Green</option>
                  <option value="c3">Blue</option>
                </select>
              </div>
            </div>
            <div>
              <div>
                <label>Note description</label>
                <div>
                  <textarea
                    className={"note_field "+font+" "+color}
                    type="text"
                    ref={description}
                  />
                </div>
              </div>
            </div>
            <div>
              <input className="buttons" type="submit" value="SUBMIT" />
              <button
                className="buttons back"
                onClick={() => {
                  handleNavigate();
                }}
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Add;
