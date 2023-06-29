
const TareasCliente = () => {

  const PORT = window.location.port ? window.location.port : 80;
  const PROTOCOL = window.location.protocol;
  const HOSTNAME = window.location.hostname;
  const URL = `${PROTOCOL}//${HOSTNAME}:${PORT}`;

  const idCli = Number(localStorage.getItem("cliSelect"));
  //setIdCliente(Number(idCli));
  //console.log(idCliente);

  return (
    <>
      <iframe
            loading="lazy"
            //src={`${URL}/tati/server/tareas_dashboard/tareasCliente_new/?idCliente=${idCli}`} // para local tati
            src={`${URL}/duoc/server/tareas_dashboard/tareasCliente_new/?idCliente=${idCli}`} // para el resto de los crm
            width={"100%"}
            height={"500"}
            style={{ border: "none" }}
            title="Tarea Cliente"
          ></iframe>
    </>
  )
}

export default TareasCliente;