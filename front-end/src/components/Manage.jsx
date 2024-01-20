import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/manage.css";
import Edit from "./Edit";
import Loading from "./Loading";

const Manage = () => {
  const [notes, setNotes] = useState("");
  const [editComp, setEditComp] = useState(false);
  const id = useRef(0);
  const idx = useRef(0);
  const [modal, setModal] = useState(false);
  const [note, setNote] = useState("");
  const pages = useRef(0);
  const [page, setPages] = useState(0);
  const [pagination, setPagination] = useState([]);
  const [loadingComp, setLoadingComp] = useState(true);

  const navigate = useNavigate();
  let handleNavigate = (prop) => {
    if (prop == 1) navigate("/Add");
    else navigate("/");
  };

  const handleEdit = (prop, prop1) => {
    setEditComp(true);
    id.current = prop;
    idx.current = prop1;
  };

  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/notes", {
      method: "GET",
    }).then((res) => {
      return res.json();
    });
    setNotes(response);
  };

  useEffect(() => {
    setLoadingComp(true)
    console.log("pages", pages.current.value);
    // fetchPaginationData(0) check if works
    console.log(fetchPaginationData(0));
  }, []);

  const handleRead = (id) => {
    let arr = notes.filter((prop) => prop._id == id);
    setNote((prev) => {
      prev = [...arr];
      return prev;
    });
    console.log("note", note);
    setModal(true);
  };

  useEffect(() => {
    console.log(note);
  }, [note]);

  const handleRefresh = (id) => {
    let arr = notes.filter((prop) => prop._id !== id);
    // console.log('here', arr)
    setNotes((prev) => {
      prev = [...arr];
      return prev;
    });
  };

  useEffect(() => {
    if (editComp == true) return;
    // handleRefresh(setNotes);
  }, [editComp]);

  const handleDelete = async (id) => {
    const response = await fetch("http://localhost:8000/notes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: id,
        key: localStorage.getItem("auth_token"),
      }),
    }).then(() => {});
  };

  const fetchPaginationData = async (index) => {
    console.log("inner", pages.current.value);
    const response = await fetch("http://localhost:8000/pagination", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        perPage: parseInt(pages.current.value),
        idx: index,
      }),
    }).then((res) => {
      return res.json();
    });
    setLoadingComp(false);
    console.log("response values", response);
    setPagination(response.pageCnt);
    setNotes(response.arr); // 20 had some weird glitch where it's only 1 page
    return response;
  };

  const handlePageChanges = async () => {
    const changedPages = pages.current.value;
    console.log(changedPages);
    setPages(changedPages);
    console.log(pages.current.value);
    fetchPaginationData(0);
    console.log(notes);
  };

  return (
    <div>
      <title>Manage Notes!</title>
      <div>
        <select
          ref={pages}
          className="select"
          onChange={() => {
            setLoadingComp(true)
            handlePageChanges();
          }}
          onClick={() => {
            console.log(pages.current.value);
          }}
          >
          <option value="" disabled="true">
            Per page...
          </option>
          <option value="5">5</option>
          <option value="10" selected="true">
            10
          </option>
          <option value="20">20</option>
        </select>
        <div className="mainDiv">
          {loadingComp && <Loading/>}
          <ul>
            {modal &&
              note.map((idx) => (
                <div
                  className={"modal_note " + note[0].font + " " + note[0].color}
                >
                  {console.log(note[0].title)}
                  <div className="titlesDiv">
                    <div className="titles">{note[0].title}</div>
                  </div>
                  <div className="descriptions">{note[0].description}</div>
                  <div className="edit">
                    <div>
                      <button
                        className="buttons1"
                        onClick={() => {
                          setModal(false);
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            {!loadingComp && notes &&
              notes.map((note, index) => (
                <div className={"notes " + note.font + " " + note.color}>
                  <div className="titlesDiv">
                    <div className="titles">{note.title}</div>
                  </div>
                  <div className="descriptions">{note.description}</div>
                  <div className="edit">
                    <div>
                      <button
                        className="buttons1"
                        onClick={() => {
                          handleRead(note._id);
                        }}
                      >
                        Read
                      </button>
                      <button
                        className="buttons1"
                        onClick={() => {
                          handleDelete(note._id);
                          handleRefresh(note._id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="buttons1"
                        onClick={() => {
                          handleEdit(note._id, index);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </ul>
          {editComp && (
            <Edit
              value={{
                id: id.current,
                idx: idx.current,
                state: notes,
                setter: setNotes,
                editComp: editComp,
                setEditComp: setEditComp,
              }}
            />
          )}
        </div>
        <div className="bottomManage a2">
          {pages.current.value != "all" && (
            <div className="bottomPagination">
              {pagination &&
                pagination.map((arr, index) => {
                  return (
                    <div
                      className="testtest"
                      onClick={() => {
                        setLoadingComp(true);
                        fetchPaginationData(index);
                      }}
                    >
                      {index + 1}
                    </div>
                  );
                })}
            </div>
          )}
          <button
            className="buttons2"
            onClick={() => {
              handleNavigate(2);
            }}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Manage;
