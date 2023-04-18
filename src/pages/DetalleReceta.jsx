import { useNavigate } from "react-router-dom";
import { useState } from "react";

function DetalleReceta() {

  const redirect = useNavigate();
  const [detailReceta, setDetailReceta] = useState(null);


  return (
    <div>
      <p>detalle de una receta</p>
    </div>
  )
}

export default DetalleReceta
