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