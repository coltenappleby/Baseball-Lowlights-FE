import React from 'react'
import leftLogo from '../ricky_henderson_gif.gif'
import rightLogo from '../griffy_gif.gif'


function Header() {
  return (
    <header>
      <img src={leftLogo} alt="Ricky Henderson animated gif" />
      <h1>Baseball Lowlights</h1>
      <img className="logo-right" src={rightLogo} alt="Ken Griffey Jr. animated gif"/>
    </header>
  )
}

export default Header 