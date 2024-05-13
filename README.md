# Some useful custom hooks for react. 

## UseLocalStorage
### Managing browser storage is a common requirement among React applications. useLocalStorage hook allows you to synchronize a value with the localStorage.

## useMediaQuery
### Making your application responsive and adapting it to different screen sizes is crucial nowadays. The useMediaQuery hook allows you to easily handle media queries in React.

## useDebounce
### Debouncing is a technique used to delay the execution of a function until after a certain period of inactivity. useDebounce hook enables you to debounce any value. 

## useFetch
### Fetching data asynchronously is a common task in modern web development. The useFetch hook simplifies data fetching and error handling.

## useToggle
### Managing toggles and boolean states can sometimes become cumbersome. The useToggle hook allows you to handle boolean states with ease. 

## useScript
### useScript is a custom React hook that allows a component to load a JavaScript file from a given URL and keep track of the loading, error, and value states. In addition, it uses the custom useAsync hook that allows a component to handle asynchronous operations and keep track of the loading, error, and value states.

The hook takes in one argument:

URL is the URL of the JavaScript file to be loaded.
The hook creates a callback function that uses the DOM API to create a new script element and sets its src to the URL passed in. It also sets the async property to true.
It then returns a new promise that resolves or rejects when the script loads or is in error respectively.

## useDeepCompareEffect
### useDeepCompareEffect is a custom React hook that allows a component to run an effect only when the dependencies have changed using a deep comparison instead of a shallow comparison. It uses the built-in useEffect hook from the React library and lodash isEqual function for deep comparison.

The hook takes two arguments:

callback is a function that represents the effect of being executed.
dependencies is an array of values that the effect depends on.
It also creates a ref called currentDependenciesRef to store the current dependencies.
It then compares the current dependencies with the new dependencies using the isEqual function. If they are not equal, it updates the current dependencies ref with the new dependencies.
Then it calls useEffect with the callback function and the currentDependenciesRef.current as the dependencies.

## useEventListener
### useEventListener is a custom React hook that allows a component to add an event listener to a specific DOM element and execute a callback function when the event occurs. It uses the built-in useEffect hook from the React library.

The hook takes three arguments:

eventType is a string representing the type of event to listen for, such as "click" or "keydown".
callback is a function that represents the action to be taken when the event occurs.
element is an optional DOM element to add the event listener. The default value is window, meaning the event listener will be added to the global window object.
It also creates a ref called callbackRef to store the current callback function.
The useEffect hook is used to set up the event listener when the component mounts and to remove the event listener when the component unmounts. It also updates the callback ref when the callback function changes.

## useOnScreen
### useOnScreen is a custom React hook that allows a component to detect when a specific DOM element is visible within the viewport and keep track of the visibility status. It uses the built-in useEffect hook from the React library and the IntersectionObserver API.

The hook takes two arguments:

ref is a reference to the DOM element to detect visibility, which is typically created using the React "useRef" hook.
rootMargin is an optional string that defines an offset around the root element. It can be used to enlarge or shrink the root element's bounding box before checking for an intersection. The default value is "0px".
The useEffect hook is used to set up the IntersectionObserver when the component mounts and to remove the observer when the component unmounts. It also updates the observer when the ref or rootMargin changes.
It returns a boolean value isVisible that indicates whether the DOM element is currently visible or not.

## useWindowSize
### useWindowSize is a custom React hook that allows a component to keep track of the current size of the browser window. It uses the built-in useState hook from the React library and a custom hook called useEventListener that allows a component to add an event listener to a specific DOM element and execute a callback function when the event occurs.

The hook creates an object called windowSize that contains the width and height of the browser window and sets the initial state using the window.innerWidth and window.innerHeight properties.

It uses the useEventListener hook to add a resize event listener to the window object and updates the state with the new width and height of the window when the event occurs.
It returns the windowSize object, which contains the current width and height of the browser window.

## useTimeout
### useTimeout is a custom React hook that allows a component to set and clear a timeout. It uses the useCallback, useEffect, and useRef hooks from the React library. The hook takes in two arguments: a callback that will be called after the specified delay, and a delay is the time in milliseconds that should pass before the callback is invoked.

The hook returns an object with two properties: reset and clear, functions that can be used to reset or clear the timeout.

The hook uses the useRef hook to create two references: callbackRef and timeoutRef. The callbackRef holds the callback function as a mutable value, and timeoutRef contains the timeout id returned by setTimeout() function.

The useEffect hook is used to ensure that the callbackRef.current always has the latest callback passed.
The set function creates a new timeout using setTimeout, invoking the callback function after the specified delay. The clear function clears the timeout using clearTimeout. Then there is an another useEffect hook is used to set the timeout on mount and remove it on unmount. The reset function is a combination of clear and set functions. Finally, the useCallback hook ensures that the functions are only recreated when their dependencies change.

## useUpdateEffect
### useUpdateEffect is a custom React hook that allows a component to run a callback function only when specific dependencies change. It uses the React library's built-in useEffect and useRef hooks.

The hook takes in two arguments:

callback is the function that should be called when the dependencies change
dependencies is an array of values that the hook should listen to for changes.
The hook uses the useRef hook to create a reference firstRenderRef with the initial value as true. This reference will be used to track the first render of the component.
The useEffect hook is used to listen for changes in the dependencies array and call the callback function. Inside the useEffect function, it checks whether this is the first render of the component by checking the firstRenderRef value. If yes, it sets it to false and returns. If not, it means this is an update, so it will call the callback function and return the callback function.

## useArray
### useArray is a custom React hook that allows a component to manage an array state. It uses the built-in useState hook from the React library. The hook takes in an argument, defaultValue, which is used to initialize the array state. The hook returns an object with several properties:

array is the current array state
set is a function that allows you to set the array state to a new value
push is a function that will enable you to add an element to the end of the array
filter is a function that allows you to filter the array by passing a callback function
update is a function that will enable you to update an element at a specific index of the array
remove is a function that will allow you to remove an element to a particular index of the array
clear is a function that will enable you to clear the array.
All the functions that change the array state use the setArray function. Still, they do it in a way that preserves the immutability of the state by creating a new array, adding or removing the elements, and then passing it to the setArray function.

## usePrevious
### usePrevious is a custom React hook that allows a component to keep track of the previous value of a variable. It uses the built-in useRef hook from the React library.

The hook takes in an argument value, which is the current value of the variable. Then, it creates two refs, one called currentRef, which holds the present value of the variable, and another called previousRef, which has the previous value of the variable.

The hook compares the current value with the previous value. If it's different, it updates the previousRef with the current value and the currentRef with the new value. Then it returns the previousRef.current.

## useStateWithHistory
### useStateWithHistory is a custom React hook that allows a component to keep track of the state's history. It uses the built-in useState, useCallback, and useRef hooks from the React library.

The hook takes in two arguments:

defaultValue is the initial value of the state
capacity is an optional argument that sets the maximum number of states that should be stored in history.
The hook creates two refs, one called historyRef that holds an array of the state's history, and another called pointerRef that has the current pointer of the history. It also creates three callback functions: set, back, and forward.
The set function is used to set the state, it works similarly to the built-in setState function, but it also keeps track of the state's history by adding the new value to the history array and updating the pointerRef. The function can take a value or a callback function that receives the current state as an argument. The function also ensures that the history array's capacity is not exceeded by removing the oldest element.

The back function navigates the previous state in history. It decrements the pointerRef and updates the state with the earlier value of the history array.

The forward function navigates the next state in history. It increments the pointerRef and updates the state with the next value in the history array.

The go function navigates a specific state in history. It sets the pointerRef to the index passed as an argument and updates the state with the value at that index in the history array.

The hook returns an array with two elements:

the current state value
an object that contains the history array, the pointer, and the functions set, back, forward, and go.

## useAsync
### useAsync is a custom React hook that allows a component to handle asynchronous operations and keep track of the loading, error, and value states. It uses the built-in useState and useEffect hooks from the React library and the useCallback hook.

The hook takes in two arguments:

callback is a function that returns a promise. This function is responsible for performing the async operation.
dependencies is an array of dependencies the hook should listen for changes. The callback function will be executed when any of the dependencies change.
The hook creates three state variables: loading, error, and value. The loading state is used to indicate whether the async operation is currently in progress, the error state is used to store the error object in case the promise is rejected, and the value state is used to store the resolved value in case the promise is fulfilled.

The hook also creates a callback function called callbackMemoized using useCallback. This function sets the loading, error, and value states to their initial values and then calls the callback function passed in.
The useEffect hook calls the callbackMemoized function when the dependencies change.

