import { useReducer } from "react";
import "./App.css";

function App() {
  //Title
  //List of Items -> ( check box, item, description)
  //input field to add new items at top
  //checked items move down and strike through

  const items = {
    todo: [{ id: 1, name: "Try out!", active: true }],
    input: "",
    id: 1,
  };

  const reducer = (state, action) => {
    let id = null;
    switch (action.type) {
      case "trackInput":
        return { ...state, input: action.input };
      case "complete":
        return {
          ...state,
          todo: state.todo.map((item) =>
            item.id === action.id ? { ...item, active: false } : item
          ),
        };

      case "inComplete":
        return {
          ...state,
          todo: state.todo.map((item) =>
            item.id === action.id ? { ...item, active: true } : item
          ),
        };

      case "add": {
        const newId = state.id + 1;
        return {
          input: "",
          id: newId,
          todo: [{ id: newId, name: state.input, active: true }, ...state.todo],
        };
      }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, items);

  const onUserInput = (e) => {
    dispatch({ type: "trackInput", input: e.target.value });
  };

  const onCheck = (e, id) => {
    const isChecked = e.target.checked;
    console.log(isChecked);
    if (isChecked) {
      dispatch({ type: "complete", id: id });
    } else {
      dispatch({ type: "inComplete", id: id });
    }
  };

  const onbuttonClick = () => {
    dispatch({ type: "add" });
  };

  return (
    <>
      <h1>To-do App</h1>

      <div>
        {state.todo.map((item) => (
          <div key={item.id}>
            <input
              type="checkbox"
              checked={!item.active}
              name={item.name}
              id={item.name}
              onChange={() => onCheck(event, item.id)}
            />
            <label
              className={item.active ? "active" : "nonActive"}
              id={item.id}
            >
              {item.name}
            </label>
          </div>
        ))}
      </div>

      <input
        type="text"
        onChange={onUserInput}
        placeholder="Add new Items"
      ></input>
      <button onClick={onbuttonClick}>submit</button>
    </>
  );
}

export default App;
