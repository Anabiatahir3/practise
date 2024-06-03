import { useState, useEffect } from "react";
const useDebounce = (text, delay) => {
  const [debounce, setDebounce] = useState(text);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(text);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [text, delay]);

  return debounce;
};

const FRUITS = ["Apple", "apricot", "banana", "orange"];
function App() {
  const [entered, setEntered] = useState("");
  const [filtered, setFiltered] = useState([]);
  const debounceText = useDebounce(entered, 1000);

  useEffect(() => {
    const filteredFruits = FRUITS.filter((item) =>
      item.toLowerCase().includes(debounceText.toLowerCase())
    );
    setFiltered(filteredFruits);
  }, [debounceText]);

  const handleInput = (e) => {
    const input = e.target.value;
    setEntered(input);
  };
  return (
    <div>
      <input type="text" value={entered} onChange={handleInput} />
      {filtered.length > 0 && (
        <ul>
          {filtered.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
