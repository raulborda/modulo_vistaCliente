/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Select } from "antd";
import "./Styles.css";
import { Tag } from "../../utils/CardBrightness";

const AdminEtiqueta = () => {
  const URL = process.env.REACT_APP_URL;

  const { idCliente, etiquetasCli, actualizarEtiqueta, setActualizarEtiqueta } =
    useContext(GlobalContext);

  const [totalEtqCli, setTotalEtqCli] = useState([]);
  const [guardarEtiq, setGuardarEtiq] = useState(etiquetasCli);

  const { Option } = Select;

  const buscarEtiqueta = () => {
    const data = new FormData();
    data.append("idCli", idCliente);
    fetch(`${URL}modulos/buscarEtiquetasCliente.php`, {
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

  useEffect(() => {
    if (idCliente) {
      buscarEtiqueta();
    }
  }, [idCliente]);

  const handleEtiquetaChange = (selectedEtiquetas) => {
    const etiquetasSeleccionadas = totalEtqCli.filter((etiqueta) =>
      selectedEtiquetas.includes(etiqueta.etq_id)
    );

    setGuardarEtiq(etiquetasSeleccionadas);

    guardarEtiquetasCliente(etiquetasSeleccionadas);
  };

  const guardarEtiquetasCliente = (etiquetas) => {
    var etq = [];
    const data = new FormData();
    data.append("idCli", idCliente);
    etiquetas.forEach((id) => {
      etq.push(Number(id.etq_id));
    });

    data.append("etqC", JSON.stringify(etq));
    fetch(`${URL}modulos/guardarEtiquetaxCliente.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        etq = [];
        setActualizarEtiqueta(!actualizarEtiqueta);
      });
    });
  };

  const etiquetasCliNombres = guardarEtiq.map((etiqueta) => ({
    value: etiqueta.etq_id,
    label: etiqueta.etq_nombre,
    color: etiqueta.etq_color,
  }));

  const renderEtiquetaTag = (props) => {
    const { label, value, closable, onClose } = props;
    const etiqueta = totalEtqCli.find((etiqueta) => etiqueta.etq_id === value);
    const backgroundColor = etiqueta ? etiqueta.etq_color : "";
    return (
      // <div
      //   style={{
      //     backgroundColor,
      //     color: "#fff",
      //     borderRadius: "4px",
      //     padding: "2px 8px",
      //     display: "inline-block",
      //     marginRight: "8px", // Espacio entre etiquetas
      //   }}
      // >
      //   <span style={{ paddingTop: "2px", fontWeight: "600" }}>
      //     {label.toUpperCase()}
      //   </span>
      //   {closable && (
      //     <span
      //       style={{ marginLeft: "4px", cursor: "pointer" }}
      //       onClick={(e) => {
      //         e.stopPropagation();
      //         onClose();
      //       }}
      //     >
      //       x
      //     </span>
      //   )}
      // </div>
      <Tag hex={backgroundColor} nombre={label?.toUpperCase()} />
    );
  };

  return (
    <>
      <Select
        mode="multiple"
        style={{ minWidth: "200px", fontSize: "small" }}
        placeholder="Selecciona etiquetas"
        value={etiquetasCliNombres}
        onChange={handleEtiquetaChange}
        tagRender={renderEtiquetaTag} // Personaliza la apariencia de las etiquetas seleccionadas
        showSearch
        optionFilterProp="children"
      >
        {totalEtqCli.map((etiqueta) => (
          <Option key={etiqueta.etq_id} value={etiqueta.etq_id}>
            {etiqueta.etq_nombre.toUpperCase()}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default AdminEtiqueta;
