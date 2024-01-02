import { useRef } from "react";

const Edit = (props) => {
    const title = useRef("");
    const description = useRef("");
    console.log(props.value.id)
    const handleSubmit = async (event) => {
      console.log("hererererere");
    //   console.log(title.current.value, description.current.value);
      const response = await fetch("http://localhost:8000/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.current.value,
          description: description.current.value,
          Id: props.value.id
        }),
      }).then((res) => {
        return res.json();
      });
      // console.log('here', response, title.current.value, description.current.value)
    };

  return (
    <div className="bigDiv">
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <h1>Write a note here</h1>
        <div>
          <div>
            <label>New Title:</label>
            <div>
              <input type="text" ref={title} />
            </div>
          </div>
          <div>
            <div>
              <label>New description</label>
              <div>
                <textarea
                  className="note_field"
                  type="text"
                  ref={description}
                />
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
};

export default Edit;
