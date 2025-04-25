import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

function Personajes() {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const [characterImage, setCharacterImage] = useState('');

  const esFavorito = favoritos.some(p => p.name === name);

  // Cargar los datos del personaje usando la ThronesAPI
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // Petición a la ThronesAPI
        const res = await fetch(`https://thronesapi.com/api/v2/characters/${name}`);
        const personaje = await res.json();
        
        if (personaje) {
          setData(personaje);
          setCharacterImage(personaje.imageUrl);  // La imagen ya está incluida en la respuesta
        }
      } catch (error) {
        console.error("Error al cargar personaje:", error);
      }
    };

    obtenerDatos();
  }, [name]);

  // Manejo de favoritos
  const toggleFavorito = () => {
    let nuevosFavoritos;
    if (esFavorito) {
      nuevosFavoritos = favoritos.filter(p => p.name !== name);
    } else {
      nuevosFavoritos = [...favoritos, { name }];
    }
    setFavoritos(nuevosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
  };

  if (!data) return <p>Cargando personaje...</p>;

  return (
    <div className="personaje-detalle">
      <h2>{data.name || "Desconocido"}</h2>
      <img
        src={characterImage}
        alt={data.name}
        width="200"
      />
      <ul>
        <li><strong>Género:</strong> {data.gender || "Desconocido"}</li>
        <li><strong>Casa:</strong> {data.house || "Sin información"}</li>
        <li><strong>Origen:</strong> {data.culture || "Desconocido"}</li>
        <li><strong>Nacimiento:</strong> {data.born || "Desconocido"}</li>
        <li><strong>Fallecimiento:</strong> {data.died || "Sigue vivo"}</li>
        <li><strong>Títulos:</strong> {data.titles?.join(', ') || "Ninguno"}</li>
        <li><strong>Alias:</strong> {data.aliases?.join(', ') || "Ninguno"}</li>
      </ul>

      <button onClick={toggleFavorito}>
        {esFavorito ? '❤️ Favorito' : '🤍 Agregar a Favoritos'}
      </button>
    </div>
  );
}

export default Personajes;
