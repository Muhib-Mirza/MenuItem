import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { useState } from "react";

function App() {
  const [displayGroupModal, setDisplayGroupModal] = useState(false);
  const [displayGroupName, setDisplayGroupName] = useState("");
  const [isInputValid, setIsInputValid] = useState(true);
  const [masterDisplayGroup, setMasterDisplayGroup] = useState([
    { displayGroupName: "POS Home Screen", selectedValue: "POS Home Screen" },
  ]);
  const [selectedValue, setSelectedValue] = useState("POS Home Screen");
  const [isExist, setIsExist] = useState(false);

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
    const exist = masterDisplayGroup.some(
      (group) => group.displayGroupName == displayGroupName
    );
    if (exist) {
      setIsExist(true);
      return;
    } else {
      setDisplayGroupModal(false);
      setMasterDisplayGroup((prev) => [
        ...prev,
        { displayGroupName, selectedValue },
      ]);
      setDisplayGroupName("");
    }
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.id);
  };

  const deleteDisplayGroup = (groupName) => {
    setMasterDisplayGroup((prev) =>
      prev.filter((group) => group.displayGroupName != groupName)
    );
    console.log(masterDisplayGroup.displayGroupName);
  };

  return (
    <div className="App">
      {console.log(masterDisplayGroup)}
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
                          !isInputValid || isExist ? "is-invalid" : ""
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
                      {isExist && (
                        <div className="invalid-feedback">
                          Display Group Already Exists.
                        </div>
                      )}
                    </div>
                    <div style={{ display: "flex" }}>
                      <span className="radioTitle">Show In</span>
                      <div className="radioContainer">
                        <div className="form-check pd5">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="POS Home Screen"
                            checked={selectedValue === "POS Home Screen"}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="POS Home Screen"
                          >
                            POS Home Screen
                          </label>
                        </div>
                        {masterDisplayGroup.map((value, key) => {
                          if (value.displayGroupName !== "POS Home Screen") {
                            return (
                              <div className="form-check pd5" key={key}>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id={value.displayGroupName}
                                  checked={
                                    selectedValue === value.displayGroupName
                                  }
                                  onChange={handleChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={value.displayGroupName}
                                >
                                  {value.displayGroupName}
                                </label>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
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
            <div style={{ width: "100%" }} key={index}>
              <div className="displayName">
                {value.displayGroupName}{" "}
                {value.displayGroupName != "POS Home Screen" ? (
                  <span>
                    <img
                      src="/delete.png"
                      alt="Delete"
                      style={{
                        cursor: "pointer",
                        float: "right",
                        marginRight: "1rem",
                        paddingTop: "3px",
                      }}
                      onClick={() => deleteDisplayGroup(value.displayGroupName)}
                    />
                  </span>
                ) : (
                  ""
                )}
                {value.selectedValue != "POS Home Screen" ? (
                  <span> ( {value.selectedValue} ) </span>
                ) : (
                  <span></span>
                )}{" "}
              </div>
              <div className="itemContainer">
                <div className="itemDiv">
                  <div style={{ paddingTop: "0.3rem" }}>
                    <span
                      style={{ marginRight: "0.3rem", paddingLeft: "0.3rem" }}
                    >
                      1.
                    </span>
                    Chai <span style={{ float: "right" }}>Del</span>
                  </div>
                  <hr style={{ marginBottom: "0px", marginTop: "0.3rem" }} />
                </div>
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
