'use client'
import React, { useEffect, useState } from 'react'

const Effect = () => {
    const [count, setCount] = useState(0);

    const incre = () => setCount((c) => c + 1)
    const [calc,setCalc] = useState('')
     useEffect(()=>{
        setCalc(() => count * 2)
     },[count])
  
  return (
    <>
    <p>Count: {count}</p>
      <button onClick={incre}>+</button>
     <p>{calc}</p>
    </>
  )
}

export default Effect