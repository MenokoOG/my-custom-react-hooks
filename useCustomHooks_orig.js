import { useState } from "react";

export default function useArray(defaultValue) {
  const [array, setArray] = useState(defaultValue);

  function push(element) {
    setArray((a) => [...a, element]);
  }

  function filter(callback) {
    setArray((a) => a.filter(callback));
  }

  function update(index, newElement) {
    setArray((a) => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length),
    ]);
  }

  function remove(index) {
    setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
  }

  function clear() {
    setArray([]);
  }

  return { array, set: setArray, push, filter, update, remove, clear };
}

// === component usage ===
/*
import useArray from "./useArray"

export default function ArrayComponent() {
  const { array, set, push, remove, filter, update, clear } = useArray([
    1, 2, 3, 4, 5, 6,
  ])

  return (
    <div>
      <div>{array.join(", ")}</div>
      <button onClick={() => push(7)}>Add 7</button>
      <button onClick={() => update(1, 9)}>Change Second Element To 9</button>
      <button onClick={() => remove(1)}>Remove Second Element</button>
      <button onClick={() => filter(n => n < 3)}>
        Keep Numbers Less Than 4
      </button>
      <button onClick={() => set([1, 2])}>Set To 1, 2</button>
      <button onClick={clear}>Clear</button>
    </div>
  )
}
*/


import { useCallback, useEffect, useState } from "react"

export default function useAsync(callback, dependencies = []) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [value, setValue] = useState()

  const callbackMemoized = useCallback(() => {
    setLoading(true)
    setError(undefined)
    setValue(undefined)
    callback()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false))
  }, dependencies)

  useEffect(() => {
    callbackMemoized()
  }, [callbackMemoized])

  return { loading, error, value }
}

// === component usage ===
/*
import useAsync from "./useAsync"

export default function AsyncComponent() {
  const { loading, error, value } = useAsync(() => {
    return new Promise((resolve, reject) => {
      const success = false
      setTimeout(() => {
        success ? resolve("Hi") : reject("Error")
      }, 1000)
    })
  })

  return (
    <div>
      <div>Loading: {loading.toString()}</div>
      <div>{error}</div>
      <div>{value}</div>
    </div>
  )
}
*/

import { useState, useEffect } from 'react';

  const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
};

// === component usage===
/*
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    // Perform search API call with debouncedSearchTerm
    // ...
  }, [debouncedSearchTerm]);
  return (
    <div>
      <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
    </div>
  );
}
*/

import { useEffect, useRef } from "react"
import isEqual from "lodash/fp/isEqual"

export default function useDeepCompareEffect(callback, dependencies) {
  const currentDependenciesRef = useRef()

  if (!isEqual(currentDependenciesRef.current, dependencies)) {
    currentDependenciesRef.current = dependencies
  }

  useEffect(callback, [currentDependenciesRef.current])
}

// === component usage ===
/*
import { useEffect, useState, useRef } from "react"
import useDeepCompareEffect from "./useDeepCompareEffect"

export default function DeepCompareEffectComponent() {
  const [age, setAge] = useState(0)
  const [otherCount, setOtherCount] = useState(0)
  const useEffectCountRef = useRef()
  const useDeepCompareEffectCountRef = useRef()

  const person = { age: age, name: "Kyle" }

  useEffect(() => {
    useEffectCountRef.current.textContent =
      parseInt(useEffectCountRef.current.textContent) + 1
  }, [person])

  useDeepCompareEffect(() => {
    useDeepCompareEffectCountRef.current.textContent =
      parseInt(useDeepCompareEffectCountRef.current.textContent) + 1
  }, [person])

  return (
    <div>
      <div>
        useEffect: <span ref={useEffectCountRef}>0</span>
      </div>
      <div>
        useDeepCompareEffect: <span ref={useDeepCompareEffectCountRef}>0</span>
      </div>
      <div>Other Count: {otherCount}</div>
      <div>{JSON.stringify(person)}</div>
      <button onClick={() => setAge(currentAge => currentAge + 1)}>
        Increment Age
      </button>
      <button onClick={() => setOtherCount(count => count + 1)}>
        Increment Other Count
      </button>
    </div>
  )
}
*/

import { useEffect, useRef } from "react"

export default function useEventListener(
  eventType,
  callback,
  element = window
) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (element == null) return
    const handler = e => callbackRef.current(e)
    element.addEventListener(eventType, handler)

    return () => element.removeEventListener(eventType, handler)
  }, [eventType, element])
}

// === component usage ===
/*
import { useState } from "react"
import useEventListener from "./useEventListener"

export default function EventListenerComponent() {
  const [key, setKey] = useState("")
  useEventListener("keydown", e => {
    setKey(e.key)
  })

  return <div>Last Key: {key}</div>
}
*/

import { useState, useEffect } from 'react';

  const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { data, error, loading };
};

// === component usage ===
/*
const App = () => {
  const { data, error, loading } = useFetch('https://api.example.com/data');

  if (loading) {
    return <p>Loading data...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
*/

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

export default function useOnScreen(ref, rootMargin = "0px") {
    const [isVisible, setIsVisible] = useState(false)
  
    useEffect(() => {
      if (ref.current == null) return
      const observer = new IntersectionObserver(
        ([entry]) => setIsVisible(entry.isIntersecting),
        { rootMargin }
      )
      observer.observe(ref.current)
      return () => {
        if (ref.current == null) return
        observer.unobserve(ref.current)
      }
    }, [ref.current, rootMargin])
  
    return isVisible
  }

  // == component usage ===
  /*
  import { useRef } from "react"
import useOnScreen from "./useOnScreen"

export default function OnScreenComponentComponent() {
  const headerTwoRef = useRef()
  const visible = useOnScreen(headerTwoRef, "-100px")

  return (
    <div>
      <h1>Header</h1>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde incidunt,
        nam id itaque error dicta? Numquam earum iusto optio officia, molestias
        debitis illum facilis nemo asperiores eaque voluptates modi? Dicta
        mollitia fugit doloremque vitae, dolores sequi fuga quas vel incidunt
        animi architecto dignissimos amet in quam praesentium corrupti voluptate
        dolorem impedit numquam aut cupiditate nulla! Nisi dolore dicta, cumque
        illum tempora enim dolores eum quis itaque nostrum architecto vel cum
        officiis aperiam qui exercitationem voluptatibus. Veritatis unde
        doloribus dolorem architecto, eum reprehenderit possimus similique eius
        cum obcaecati totam placeat. Delectus nulla, quae temporibus omnis
        assumenda autem ad quibusdam facilis aspernatur inventore nobis. Vitae
        architecto, unde consequuntur velit consequatur dicta mollitia, fuga
        iure hic accusamus blanditiis. Dignissimos, tenetur amet adipisci
        nostrum perferendis ad rerum accusamus distinctio repellendus eius,
        quisquam repellat nesciunt, consequatur culpa neque? Inventore vitae
        laborum aperiam ullam dolorem officiis ipsum aliquid doloribus pariatur,
        commodi iure illum soluta delectus, architecto ratione maiores
        accusamus. Provident quia sequi dolorum asperiores necessitatibus
        consequatur perspiciatis at a, inventore, deserunt corporis recusandae
        earum vero voluptas saepe pariatur, libero illo. Numquam facilis magnam
        exercitationem ipsam libero quidem minima dolores perferendis eveniet
        impedit eos, nesciunt unde velit facere itaque eum quasi laboriosam
        veritatis aliquid tenetur. Blanditiis exercitationem laborum, optio
        nulla minima libero sed doloremque soluta, dignissimos tempora rerum id
        nostrum iusto eveniet illo corrupti dicta. Non fuga exercitationem sit
        dignissimos voluptatibus cumque nobis iste asperiores illum fugit
      </div>
      <h1 ref={headerTwoRef}>Header 2 {visible && "(Visible)"}</h1>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde incidunt,
        nam id itaque error dicta? Numquam earum iusto optio officia, molestias
        debitis illum facilis nemo asperiores eaque voluptates modi? Dicta
        mollitia fugit doloremque vitae, dolores sequi fuga quas vel incidunt
        animi architecto dignissimos amet in quam praesentium corrupti voluptate
        dolorem impedit numquam aut cupiditate nulla! Nisi dolore dicta, cumque
        illum tempora enim dolores eum quis itaque nostrum architecto vel cum
        officiis aperiam qui exercitationem voluptatibus. Veritatis unde
        doloribus dolorem architecto, eum reprehenderit possimus similique eius
        cum obcaecati totam placeat. Delectus nulla, quae temporibus omnis
        assumenda autem ad quibusdam facilis aspernatur inventore nobis. Vitae
        architecto, unde consequuntur velit consequatur dicta mollitia, fuga
        iure hic accusamus blanditiis. Dignissimos, tenetur amet adipisci
        nostrum perferendis ad rerum accusamus distinctio repellendus eius,
        quisquam repellat nesciunt, consequatur culpa neque? Inventore vitae
        laborum aperiam ullam dolorem officiis ipsum aliquid doloribus pariatur,
        commodi iure illum soluta delectus, architecto ratione maiores
        accusamus. Provident quia sequi dolorum asperiores necessitatibus
        consequatur perspiciatis at a, inventore, deserunt corporis recusandae
        earum vero voluptas saepe pariatur, libero illo. Numquam facilis magnam
        exercitationem ipsam libero quidem minima dolores perferendis eveniet
        impedit eos, nesciunt unde velit facere itaque eum quasi laboriosam
        veritatis aliquid tenetur. Blanditiis exercitationem laborum, optio
        nulla minima libero sed doloremque soluta, dignissimos tempora rerum id
        nostrum iusto eveniet illo corrupti dicta. Non fuga exercitationem sit
        dignissimos voluptatibus cumque nobis iste asperiores illum fugit
        veritatis fugiat quia voluptates cupiditate vel rerum eligendi facere
        sint nostrum quam, maiores dolorem repellat voluptas! Magnam ullam quis
        quas aut consequuntur quo doloremque, earum sint soluta vero iste quasi
        voluptates labore rerum aspernatur illum esse maxime laudantium? Tempore
        perspiciatis perferendis ea dolorem et quasi eos illo beatae consectetur
        maxime, enim ducimus corrupti, accusantium quisquam rem dolorum itaque
        iste velit. Amet similique accusamus doloribus expedita modi a
        architecto accusantium labore unde non, dolore totam quaerat sit
        laboriosam quae ullam impedit, pariatur repudiandae quisquam debitis
        repellendus nihil. Cumque blanditiis ut recusandae illum! Maiores
        eveniet nulla exercitationem natus delectus est minus a architecto
        pariatur molestias quo nihil maxime quasi facere magnam neque dolorem
        ad, doloribus hic! Qui corporis perspiciatis dolores rem minima tenetur.
        Fugit ipsa consectetur ad reiciendis, quia iste, sapiente rerum
        exercitationem reprehenderit laborum eligendi cumque? Quia porro modi
        repudiandae nostrum accusamus! Corporis eum fugit nihil facilis placeat
        ab est obcaecati consequuntur qui atque tempore soluta aliquid saepe
        ducimus, at sed modi illo ipsa numquam ratione vero eos reprehenderit!
        Sapiente nesciunt consequatur labore iste quas possimus rem cumque,
        fugit laborum repellendus nisi adipisci officia temporibus quaerat!
        Beatae doloribus veritatis at, maiores suscipit debitis reiciendis cum
        impedit non aut modi iste? Placeat illo quisquam assumenda esse cum
        ipsum quasi perspiciatis voluptatem rerum itaque, similique quidem
        molestias exercitationem ullam eum amet tempore dolor aliquid unde
        deserunt dolore excepturi. Aut dolore rerum sequi nihil soluta eum
        expedita consequatur aliquid consequuntur saepe esse necessitatibus
        repudiandae, natus, officia enim odit rem nobis adipisci, voluptates
        autem dolor blanditiis ipsam animi a. Illo accusantium iure qui aperiam
        commodi, quidem, dolorem error eum animi, id nam? Corporis, non
        adipisci!
      </div>
    </div>
  )
}
  */

import { useRef } from "react"

export default function usePrevious(value) {
  const currentRef = useRef(value)
  const previousRef = useRef()

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current
    currentRef.current = value
  }

  return previousRef.current
}

// === components usage ===
/*
import { useState } from "react"
import usePrevious from "./usePrevious"

export default function PreviousComponent() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("Kyle")
  const previousCount = usePrevious(count)

  return (
    <div>
      <div>
        {count} - {previousCount}
      </div>
      <div>{name}</div>
      <button onClick={() => setCount(currentCount => currentCount + 1)}>
        Increment
      </button>
      <button onClick={() => setName("John")}>Change Name</button>
    </div>
  )
}
*/

import useAsync from "../9-useAsync/useAsync"

export default function useScript(url) {
  return useAsync(() => {
    const script = document.createElement("script")
    script.src = url
    script.async = true

    return new Promise((resolve, reject) => {
      script.addEventListener("load", resolve)
      script.addEventListener("error", reject)
      document.body.appendChild(script)
    })
  }, [url])
}

// === component usage ===
/*
import useScript from "./useScript"

export default function ScriptComponent() {
  const { loading, error } = useScript(
    "https://code.jquery.com/jquery-3.6.0.min.js"
  )

  if (loading) return <div>Loading</div>
  if (error) return <div>Error</div>
  return <div>{window.$(window).width()}</div>
}
*/

import { useCallback, useRef, useState } from "react"

export default function useStateWithHistory(
  defaultValue,
  { capacity = 10 } = {}
) {
  const [value, setValue] = useState(defaultValue)
  const historyRef = useRef([value])
  const pointerRef = useRef(0)

  const set = useCallback(
    v => {
      const resolvedValue = typeof v === "function" ? v(value) : v
      if (historyRef.current[pointerRef.current] !== resolvedValue) {
        if (pointerRef.current < historyRef.current.length - 1) {
          historyRef.current.splice(pointerRef.current + 1)
        }
        historyRef.current.push(resolvedValue)

        while (historyRef.current.length > capacity) {
          historyRef.current.shift()
        }
        pointerRef.current = historyRef.current.length - 1
      }
      setValue(resolvedValue)
    },
    [capacity, value]
  )

  const back = useCallback(() => {
    if (pointerRef.current <= 0) return
    pointerRef.current--
    setValue(historyRef.current[pointerRef.current])
  }, [])

  const forward = useCallback(() => {
    if (pointerRef.current >= historyRef.current.length - 1) return
    pointerRef.current++
    setValue(historyRef.current[pointerRef.current])
  }, [])

  const go = useCallback(index => {
    if (index < 0 || index > historyRef.current.length - 1) return
    pointerRef.current = index
    setValue(historyRef.current[pointerRef.current])
  }, [])

  return [
    value,
    set,
    {
      history: historyRef.current,
      pointer: pointerRef.current,
      back,
      forward,
      go,
    },
  ]
}

// === component usage ===
/*
import { useState } from "react"
import useStateWithHistory from "./useStateWithHistory"

export default function StateWithHistoryComponent() {
  const [count, setCount, { history, pointer, back, forward, go }] =
    useStateWithHistory(1)
  const [name, setName] = useState("Kyle")

  return (
    <div>
      <div>{count}</div>
      <div>{history.join(", ")}</div>
      <div>Pointer - {pointer}</div>
      <div>{name}</div>
      <button onClick={() => setCount(currentCount => currentCount * 2)}>
        Double
      </button>
      <button onClick={() => setCount(currentCount => currentCount + 1)}>
        Increment
      </button>
      <button onClick={back}>Back</button>
      <button onClick={forward}>Forward</button>
      <button onClick={() => go(2)}>Go To Index 2</button>
      <button onClick={() => setName("John")}>Change Name</button>
    </div>
  )
}
*/

import { useCallback, useEffect, useRef } from "react"

export default function useTimeout(callback, delay) {
  const callbackRef = useRef(callback)
  const timeoutRef = useRef()

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
  }, [delay])

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    set()
    return clear
  }, [delay, set, clear])

  const reset = useCallback(() => {
    clear()
    set()
  }, [clear, set])

  return { reset, clear }
}

// === component usage ===
/*
import { useState } from "react"
import useTimeout from "./useTimeout"

export default function TimeoutComponent() {
  const [count, setCount] = useState(10)
  const { clear, reset } = useTimeout(() => setCount(0), 1000)

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <button onClick={clear}>Clear Timeout</button>
      <button onClick={reset}>Reset Timeout</button>
    </div>
  )
}
*/

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

import { useEffect, useRef } from "react"

export default function useUpdateEffect(callback, dependencies) {
  const firstRenderRef = useRef(true)

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }
    return callback()
  }, dependencies)
}

// === component usage ===
/*
import { useState } from "react"
import useUpdateEffect from "./useUpdateEffect"

export default function UpdateEffectComponent() {
  const [count, setCount] = useState(10)
  useUpdateEffect(() => alert(count), [count])

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  )
}
*/

import { useState } from "react"
import useEventListener from "../13-useEventListener/useEventListener"

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEventListener("resize", () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
  })

  return windowSize
}

//=== component usage
/*
import useWindowSize from "./useWindowSize"

export default function WindowSizeComponent() {
  const { width, height } = useWindowSize()

  return (
    <div>
      {width} x {height}
    </div>
  )
}
*/

