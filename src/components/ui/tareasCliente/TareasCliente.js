import React from 'react'

const TareasCliente = () => {

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
            src={`${URL}/duoc/modulos/tareas/?idCliente=${idCli}`}
            width={"100%"}
            // height={"770"}
            height={"700"}
            style={{ border: "none" }}
            title="Tarea Cliente"
          ></iframe>
    </>
  )
}

export default TareasCliente;