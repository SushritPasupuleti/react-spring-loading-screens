import React, { useRef, useState, useEffect, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  useTransition,
  animated,
} from 'react-spring';
import './css/main.css';

function App() {
  const ref = useRef([])
  const [items, set] = useState([])
  const transitions = useTransition(items, null, {
    from: 
      { opacity: 0, height: 0, innerHeight: 0, transform: 'perspective(600px) rotateX(0deg)', color: '#8fa5b6' },
    enter: [
      { opacity: 1, height: 80, innerHeight: 80 },
      { transform: 'perspective(600px) rotateX(180deg)', color: '#28d79f' },
      { transform: 'perspective(600px) rotateX(0deg)' },
    ],
    leave: [{ color: '#c23369' }, { innerHeight: 0 }, { opacity: 0, height: 0 }],
    update: { color: '#28b4d7' },
  })

  const reset = useCallback(() => {
    ref.current.map(clearTimeout)
    ref.current = []
    set([])
    ref.current.push(setTimeout(() => set(['Shopping', 'Slots', '.com']), 2000))
    ref.current.push(setTimeout(() => set(['Your', 'Time']), 4000))
    ref.current.push(setTimeout(() => set(['Your', 'Store']), 6000))
    ref.current.push(setTimeout(() => set(['Book', 'Now']), 8000))
  }, [])

  useEffect(() => { 
    reset(); }, [])

  return (
    <div>
      {transitions.map(({ item, props: { innerHeight, ...rest }, key }) => (
        <animated.div className="transitions-item" key={key} style={rest} onClick={reset}>
          <animated.div style={{ overflow: 'visible', height: innerHeight }}>{item}</animated.div>
        </animated.div>
      ))}
    </div>
  )
}


export default App;
