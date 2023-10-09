import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export const NegociosCliente = () => {
  const URLDOS = process.env.REACT_APP_URL;

  const { idCliente } = useContext(GlobalContext);

  return (
    <>
      <iframe
        loading="lazy"
        src={`${URLDOS}modulos/negocios_clientes/?idC=${idCliente}`}
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="Negocios Cliente"
      ></iframe>
    </>
  );
};

export default NegociosCliente;
