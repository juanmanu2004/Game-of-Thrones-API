import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Aleatorios from './Componentes/Aleatorios'
import Entidades from './Componentes/Entidades'
import Favoritos from './Componentes/Favoritos'
import Listas from './Componentes/Listas'
import Personajes from './Componentes/Personajes'
import Usuario from './Componentes/Usuario'
import Menu from './Componentes/Menu';
import './App.css'

function App() {

  
  return (
   
  <Router>
    <Menu/>

    <Routes>
    <Route path="/Aleatorios" element={<Aleatorios />} />
        <Route path="/Entidades" element={<Entidades />} />
        <Route path="/Favoritos" element={<Favoritos />} />
        <Route path="/" element={<Listas />} />
        <Route path="/Personajes/:name" element={<Personajes />} />
        <Route path="/:Usuario" element={<Usuario />} />
    
    </Routes>
  </Router>
  )
}

export default App
