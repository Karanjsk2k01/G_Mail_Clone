import React from 'react'
import './SidebarOptions.css';

const SidebarOptions = ({ Icon, title, number, selected }) => {
  return (
    <div className={`SidebarOption ${selected && 'SidebarOptions__active'}`}>
      <Icon />
      <h3>{title}</h3>
      <p>{number}</p>
    </div>
  )
}

export default SidebarOptions;