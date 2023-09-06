import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const TareasCliente = () => {
  const URL = process.env.REACT_APP_URL;

  const { setIdCliente, idCliente } = useContext(GlobalContext);

  useEffect(() => {
    const idCli = Number(localStorage.getItem("cliSelect"));
    setIdCliente(Number(idCli));
  }, []);

  return (
    <>
      <iframe
        loading="lazy"
        src={`${URL}server/tareas_dashboard/tareasCliente_new/?idCliente=${idCliente}`} // para el resto de los crm
        width={"100%"}
        height={"700"}
        style={{ border: "none" }}
        title="Tarea Cliente"
      ></iframe>
    </>
  );
};

export default TareasCliente;
