import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Filtros from '../Filtros';
import './style.css';

function Listas() {
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroRol, setFiltroRol] = useState('All');
  const navigate = useNavigate();

  // Carga todos los personajes
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch("https://anapioficeandfire.com/api/characters?page=1&pageSize=1000");
        const personajes = await res.json();
        setData(personajes);
      } catch (error) {
        console.error("Error al cargar personajes:", error);
      }
    };

    obtenerDatos();
  }, []);

  // Función para filtrar por rol (no disponible directamente en la API, lo simulamos)
  const filtrarPorRol = (personaje, rol) => {
    const titulos = personaje.titles?.join(' ').toLowerCase() || '';
    const alias = personaje.aliases?.join(' ').toLowerCase() || '';
    const nombre = personaje.name?.toLowerCase() || '';

    switch (rol) {
      case 'Reyes':
        return titulos.includes('king') || alias.includes('king');
      case 'Caballeros':
        return titulos.includes('ser') || alias.includes('ser');
      case 'Villanos':
        return alias.includes('kingslayer') || alias.includes('the hound') || alias.includes('mountain');
      case 'Comandantes':
        return titulos.includes('commander');
      case 'Guardias Reales':
        return titulos.includes('kingsguard');
      default:
        return true;
    }
  };

  // Filtrado final
  const resultados = data.filter(personaje => {
    const nombre = personaje.name?.toLowerCase() || '';
    const coincideBusqueda = busqueda.length < 3 || nombre.includes(busqueda.toLowerCase());
    const coincideRol = filtrarPorRol(personaje, filtroRol);
    return coincideBusqueda && coincideRol;
  });

  return (
    <>
      <input
        type="text"
        placeholder="Buscar Personaje"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />

      <Filtros onTipoChange={setFiltroRol} />

      <section className='c-lista'>
        {resultados.map((personaje, index) => {
          const nombre = personaje.name || `Desconocido #${index + 1}`;
          return (
            <div
              className='c-lista-pokemon'
              key={index}
              onClick={() => navigate(`/Personaje/${encodeURIComponent(personaje.name || "Unknown")}`)}
            >
              <p>{index + 1}</p>
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(nombre)}&background=random`}
                alt={`Personaje ${nombre}`}
                width='auto'
                height='60'
                loading='lazy'
              />
              <p>{nombre}</p>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Listas;
