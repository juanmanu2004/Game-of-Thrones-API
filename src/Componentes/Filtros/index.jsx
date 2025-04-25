function Filtro({ onTipoChange }) {
    const roles = [
      "All",
      "Reyes",
      "Reinas",
      "Caballeros",
      "Villanos",
      "Héroes",
      "Asesinos",
      "Hechiceros",
      "Consejeros",
      "Nobles",
      "Guerreros",
      "Ladrones",
      "Sacerdotes",
      "Comandantes",
      "Señores",
      "Guardianes",
    ];
  
    return (
      <div className="c-filtro">
        {roles.map((rol, index) => (
          <button className='' key={index} onClick={() => onTipoChange(rol)}>
            {rol}
          </button>
        ))}
      </div>
    );
  }
  
  export default Filtro;
  