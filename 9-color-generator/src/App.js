import React, { useState } from "react";
import Values from "values.js";
import SingleColor from "./SingleColor";

function App() {
  const [color, setColor] = useState("");
  const [error, setError] = useState(false);
  const [lists, setLists] = useState(new Values("#17BF63").all(5));

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      let colors = new Values(color).all(5);
      setLists(colors);
    } catch (error) {
      alert("Please enter a valid hax value");
      setError(true);
    }
  };

  return (
    <div>
      <section className="container">
        <h3>Color Generator</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="#17BF63"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className={`${error ? "error" : null}`}
          />
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </section>
      <section className="colors">
        {lists.map((color, index) => {
          return (
            <SingleColor key={index} {...color} index={index} hex={color.hex} />
          );
        })}
      </section>
    </div>
  );
}

export default App;
