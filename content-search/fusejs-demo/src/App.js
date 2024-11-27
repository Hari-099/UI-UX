import React, { useState } from "react";
import Fuse from "fuse.js";

const App = () => {
  // Sample data to search
  const items = [
    { title: "Apple", description: "A fruit that is sweet and crispy." },
    { title: "Banana", description: "A yellow fruit rich in potassium." },
    { title: "Orange", description: "A citrus fruit high in vitamin C." },
    { title: "Pineapple", description: "A tropical fruit with spiky skin." },
  ];

  // Fuse.js options
  const options = {
    keys: ["title", "description"], // Fields to search within
    threshold: 0.4, // Match threshold for fuzziness
  };

  const fuse = new Fuse(items, options);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState(items);

  const handleSearch = (e) => {
    const input = e.target.value;
    setQuery(input);

    if (input.trim()) {
      const fuseResults = fuse.search(input).map((result) => result.item);
      setResults(fuseResults);
    } else {
      setResults(items); // Reset results when query is cleared
    }
  };

  return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>Fuse.js Search Demo</h1>
        <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search items..."
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              fontSize: "16px",
            }}
        />
        <ul>
          {results.map((item, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <strong>{item.title}</strong>: {item.description}
              </li>
          ))}
        </ul>
      </div>
  );
};

export default App;
