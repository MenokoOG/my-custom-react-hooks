import { useState } from 'react';

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const toggle = () => {
    setValue((prevValue) => !prevValue);
  };
  return [value, toggle];
};

// === Usage in component ===
/*
const App = () => {
  const [isModalOpen, toggleModal] = useToggle(false);

  return (
    <div>
      <button onClick={toggleModal}>Toggle Modal</button>
      {isModalOpen && <Modal />}
    </div>
  );
};
*/