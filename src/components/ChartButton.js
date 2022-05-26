import React from 'react'


const ChartButton = ({children, selected, handleClick}) => {
  return (
      <button onClick={handleClick}
        style={{
          border:'1px solid #ED602B',
          padding:10,
          background:selected? '#ED602B' : 'none',
          color:selected? 'black' : 'white',
          fontWeight: 900

        }}
      >{children}</button>
  )
}

export default ChartButton