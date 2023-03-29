import React from 'react'

export const NegociosCliente = () => {
  const PORT = window.location.port ? window.location.port : 80;
  const PROTOCOL = window.location.protocol;
  const HOSTNAME = window.location.hostname;
  const URL = `${PROTOCOL}//${HOSTNAME}:${PORT}`;

  //const idCli = localStorage.getItem("cliente");
  const idCli = 2049;
  return (
    <>
      <iframe
            loading="lazy"
            src={`${URL}/duoc/modulos/negocios_clientes/?idC=${idCli}`}
            width={"100%"}
            // height={"770"}
            height={"500"}
            style={{ border: "none" }}
            title="Tarea Cliente"
          ></iframe>
    </>
  )
}

export default NegociosCliente;