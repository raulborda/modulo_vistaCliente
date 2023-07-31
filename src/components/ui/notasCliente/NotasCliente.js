import React, { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalContext';

const NotasCliente = () => {
  const PORT = window.location.port ? window.location.port : 80;
  const PROTOCOL = window.location.protocol;
  const HOSTNAME = window.location.hostname;
  const URL = `${PROTOCOL}//${HOSTNAME}:${PORT}`;

  const {
    idCliente,
  } = useContext(GlobalContext);

  return (
    <>
      <iframe
            loading="lazy"
            src={`${URL}/tati/modulos/notas_clientes/?idC=${idCliente}`}//pra probar local en tati
            //src={`${URL}/duoc/modulos/notas_clientes/?idC=${idCliente}`} // para el resto de los crm
            width={"100%"}
            height={"900"}
            style={{ border: "none" }}
            title="Notas Cliente"
          ></iframe>
    </>
  )
}

export default NotasCliente;

