import { useState, useEffect } from 'react';

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

//=== use in component ===
/*
const App = () => {
  const [name, setName] = useLocalStorage('name', 'John Doe');

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <p>Hello, {name}!</p>
    </div>
  );
};
*/