

function Receta(props) {
  // console.log(props)
  return (
    <div>
      <img src={props.img} alt="receta" width={200} />
      <h2>{props.titulo.length > 15 
        ? props.titulo[0].toUpperCase() + props.titulo.slice(1,22) + '....'
        : props.titulo[0].toUpperCase() + props.titulo.slice(1)}
      </h2>
      <p>{props.nPersonas} p.</p>
      <p>{props.user}</p>
    </div>
  )
}

export default Receta