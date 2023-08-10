import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export const FinanzasCliente = () => {
  const URLDOS = process.env.REACT_APP_URL;

  const { idCliente } = useContext(GlobalContext);

  return (
    <>
      <iframe
        loading="lazy"
        src={`${URLDOS}modulos/finanzas_clientes/?idC=${idCliente}`}
        width={"100%"}
        height={"500"}
        style={{ border: "none" }}
        title="Tarea Cliente"
      ></iframe>
    </>
  );
};

export default FinanzasCliente;
