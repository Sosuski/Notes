import { useRef, useState, useEffect } from "react";
import "../styles/edit.css";

const Edit = (props) => {
  const title = useRef("");
  const description = useRef("");
  const idx = props.value.idx;
  const editComp = props.value.editComp;
  const setEditComp = props.value.setEditComp;
  const notes = props.value.state;
  const fonts = useRef("");
  const colors = useRef("");
  const [font, setFont] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = async (event) => {
    console.log(props.value.id, "id")
    event.preventDefault();
    const response = await fetch("http://localhost:8000/notes", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.current.value,
        description: description.current.value,
        font: font,
        color: color,
        Id: props.value.id,
        key: localStorage.getItem("auth_token")
      }),
    }).then((res) => {
      return res.json();
    });
  };

  const handleEdit = (index, prop, prop1, prop2, prop3) => {
    let arr = [...notes];
    arr[index].title = prop;
    arr[index].description = prop1;
    arr[index].font = prop2;
    arr[index].color = prop3;
  };

  const handleFontChanges = () => {
    const changedFont = fonts.current.value;
    console.log(changedFont);
    setFont(changedFont);
    console.log(font);
  };

  const handleColorChanges = () => {
    const changedColor = colors.current.value;
    console.log(changedColor);
    setColor(changedColor);
    console.log(color);
  };

  return (
    <>
      <form
        className="bigDiv"
        onSubmit={(event) => {
          handleSubmit(event);
          handleEdit(idx, title.current.value, description.current.value, font, color);
          setEditComp(false);
        }}
      >
        <h1>Write a note here</h1>
        <div>
          <div>
            <label>New Title:</label>

            <input className={"title_field "+font+" "+color} type="text" ref={title} />

            <select
              ref={fonts}
              className="select"
              onChange={() => {
                handleFontChanges();
              }}
              onClick={() => {
                console.log(fonts.current);
              }}
            >
              <option value="" disabled="true" selected="true">
                Default Font
              </option>
              <option value="f0">monospace</option>
              <option value="f1">FreeMono</option>
              <option value="f2">Didot</option>
              <option value="f3">Montserrat</option>
              <option value="f4">Caveat</option>
            </select>

            <select
              ref={colors}
              className="select"
              onChange={() => {
                handleColorChanges();
              }}
              onClick={() => {
                console.log(colors.current);
              }}
            >
              <option value="" disabled="true" selected="true">
                Choose Color
              </option>
              <option value="c1">Red</option>
              <option value="c2">Green</option>
              <option value="c3">Blue</option>
            </select>
          </div>
          <div>
            <div>
              <label>New description</label>
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
            <input className="buttons1" type="submit" value="SUBMIT" />
            <button className="buttons1 cancel" onClick={()=>{setEditComp(false)}}>Cancel</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Edit;
