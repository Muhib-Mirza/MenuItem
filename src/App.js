import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { useState } from "react";

function App() {
  const [displayGroupModal, setDisplayGroupModal] = useState(false);
  const [displayGroupName, setDisplayGroupName] = useState("");
  const [isInputValid, setIsInputValid] = useState(true);
  const [masterDisplayGroup, setMasterDisplayGroup] = useState([
    "POS Home Screen",
  ]);

  const handleInput = (e) => {
    const name = e.target.value.trim();
    setDisplayGroupName(name);
    setIsInputValid(name !== "");
  };

  const addDisplayGroup = () => {
    if (displayGroupName === "") {
      setIsInputValid(false);
      return;
    }
    setDisplayGroupModal(false);
    setMasterDisplayGroup((prev) => [...prev, displayGroupName]);
    setDisplayGroupName("");
  };
  return (
    <div className="App">
      <div className="menuBar">
        <div
          style={{
            color: "#2626ca",
            cursor: "pointer",
            fontWeight: "bold",
            marginLeft: "1rem",
          }}
          onClick={() => setDisplayGroupModal(true)}
        >
          Add Display Group
        </div>
        {displayGroupModal && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            tabIndex="-1"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Create Display Group</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setDisplayGroupModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="displayGroupName">{displayGroupName}</div>
                  <div className="displayGroupInput">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        Display Group Name
                      </span>
                      <input
                        type="text"
                        className={`form-control ${
                          !isInputValid ? "is-invalid" : ""
                        }`}
                        placeholder="Enter Display Group Name"
                        aria-label="displaygroupname"
                        aria-describedby="basic-addon1"
                        id="displaygroupname"
                        onChange={handleInput}
                        required
                      />
                      {!isInputValid && (
                        <div className="invalid-feedback">
                          Display Group Name cannot be empty.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setDisplayGroupModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addDisplayGroup}
                    disabled={displayGroupName === ""}
                  >
                    Add Display Group
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mainGrid">
        {masterDisplayGroup.map((value, index) => {
          return (
            <div style={{ width: "100%" }}>
              <div className="displayName">{value}</div>
              <div className="itemContainer">
                <div className="itemDiv"></div>
                <div
                  className="addItem"
                  style={{
                    opacity: "0.5",
                    paddingLeft: "1rem",
                    paddingTop: "0.3rem",
                    paddingBottom: "0.2rem",
                  }}
                >
                  Add Item
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
