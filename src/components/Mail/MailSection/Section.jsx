import React from 'react';
import './Section.css'

const Section = ({ Icon, Title, Color, selected }) => {
  return (
    <div
      className={`section ${selected && 'section__selected'}`}
      style={{
        borderBottom: `3px solid ${Color}`,
        color: `${selected && Color}`
      }}

    >
      <Icon />
      <h4>{Title}</h4>
    </div >
  )
}

export default Section