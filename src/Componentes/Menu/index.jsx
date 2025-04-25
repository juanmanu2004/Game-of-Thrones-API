import { useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

function Menu() {
  
  return (
    <nav className="c-menu">
    <Link to="/">Home</Link>
    <Link to="/Entidades">Entidades</Link>
    <Link to="/Aleatorios">Aleatorios</Link>
    <Link to="Usuario">Usuario</Link>
    <Link to="/Favoritos">Favoritos</Link>
  </nav>
  )
}

export default Menu
