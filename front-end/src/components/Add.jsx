import '../styles/add.css';
import { useRef } from "react";

function Add() {
  const title = useRef("");
  const description = useRef("");

  const handleSubmit = async (event) => {
    console.log('hererererere')
    console.log(title.current.value, description.current.value)
    event.preventDefault();
    const response = await fetch("http://localhost:8000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.current.value,
        description: description.current.value,
      }),
    }).then((res) => {
      return res.json();
    });
    // console.log('here', response, title.current.value, description.current.value)
  }

  return (
    <div>
      <form onSubmit={(event)=>{handleSubmit(event)}}>
        <h1>Write a note here</h1>
        <div>
          <div>
            <label>Note Title:</label>
            <div>
              <input type="text" ref={title} />
            </div>
          </div>
          <div>
            <div>
              <label>Note description</label>
              <div>
                <textarea className="note_field" type="text" ref={description} />
              </div>
            </div>
          </div>
          <div>
            <input type="submit" value="SUBMIT" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Add;
