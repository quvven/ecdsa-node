import React from 'react'
import Menu from './Menu'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <div className="navbar">
        <Menu />
      </div>
      <div className="main">
        {children}
      </div>
    </div>
  )
}