import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const NotasCliente = () => {
  const URLDOS = process.env.REACT_APP_URL;
  const { idCliente, setIdCliente } = useContext(GlobalContext);

  useEffect(() => {
    if (!idCliente) {
      const idCli = Number(localStorage.getItem("cliSelect"));
      setIdCliente(idCli);
    }
  }, [idCliente]);

  return (
    <>
      <iframe
        loading="lazy"
        // src={`${URL}/tati/modulos/notas_clientes/?idC=${idCliente}`}//pra probar local en tati
        src={`${URLDOS}modulos/notas_clientes/?idC=${idCliente}`} // para el resto de los crm
        width={"100%"}
        height={"900"}
        style={{ border: "none" }}
        title="Notas Cliente"
      ></iframe>
    </>
  );
};

export default NotasCliente;
