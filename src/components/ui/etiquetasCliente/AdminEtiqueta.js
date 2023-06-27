import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Select } from "antd";

const AdminEtiqueta = () => {
  const URL = process.env.REACT_APP_URL;

  const { idCliente, etiquetasCli } = useContext(GlobalContext);

  const [totalEtqCli, setTotalEtqCli] = useState([]);

  const { Option } = Select;

  const buscarEtiqueta = () => {
    const data = new FormData();
    data.append("idCli", idCliente);
    fetch(`${URL}buscarEtiquetasCliente.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setTotalEtqCli(objetoData);
      });
    });
  };

  console.log("totalEtqCli: ", totalEtqCli);
  console.log("etiquetasCli: ", etiquetasCli);

  useEffect(() => {
    if (idCliente) {
      buscarEtiqueta();
    }
  }, [idCliente]);

  const handleEtiquetaChange = (selectedEtiquetas) => {
    // Actualizar el estado de etiquetasCli cuando se seleccione o deseleccione una etiqueta
    // selectedEtiquetas es un arreglo con los valores seleccionados
    // Puedes realizar las operaciones necesarias aquí, como enviar los datos al servidor, etc.
  };

  const etiquetasCliNombres = etiquetasCli.map((etiqueta) => ({
    value: etiqueta.etq_id,
    label: etiqueta.etq_nombre,
    color: etiqueta.etq_color,
  }));

  const renderEtiquetaTag = (props) => {
    const { label, value, closable, onClose } = props;
    const etiqueta = totalEtqCli.find((etiqueta) => etiqueta.etq_id === value);
    const backgroundColor = etiqueta ? etiqueta.etq_color : "";
    return (
      <div
        style={{
          backgroundColor,
          color: "#fff",
          borderRadius: "4px",
          padding: "2px 8px",
          display: "inline-block",
          marginRight: "8px", // Espacio entre etiquetas
        }}
      >
        <span style={{paddingTop:"2px", fontWeight:"600"}}>{label.toUpperCase()}</span>
        {closable && (
          <span
            style={{ marginLeft: "4px", cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            x
          </span>
        )}
      </div>
    );
  };

  return (
    <>
      <Select
        mode="multiple"
        placeholder="Selecciona etiquetas"
        value={etiquetasCliNombres}
        onChange={handleEtiquetaChange}
        tagRender={renderEtiquetaTag} // Personaliza la apariencia de las etiquetas seleccionadas
      >
        {totalEtqCli.map((etiqueta) => (
          <Option
            key={etiqueta.etq_id}
            value={etiqueta.etq_id}
            label={etiqueta.etq_nombre}
          >
            {etiqueta.etq_nombre.toUpperCase()}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default AdminEtiqueta;
