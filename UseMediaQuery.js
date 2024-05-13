import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );
  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = (e) => setMatches(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);
  return matches;
};

// === component usage ===
/*
const App = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div>
      <h1>{isMobile ? 'Mobile View' : 'Desktop View'}</h1>
    </div>
  );
};
 */