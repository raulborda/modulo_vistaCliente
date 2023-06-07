import { Button, Form, Input, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./graficos.css";
import { GlobalContext } from "../../../../context/GlobalContext";

export const NuevaCapacidad = ({ cosechaActiva }) => {

  const URL = process.env.REACT_APP_URL;
  var objData = [];

  //! UseContext
  const {
    idCliente,
    setDataContext,
    setIsButtonDisabled,
    setIsSelectEditDisabled,
    update,
    setUpdate,
    ca, 
    setRefrescarTable,
    setCardSelected
  } = useContext(GlobalContext);

  //! UseState
  const [isData, setIsData] = useState({});
  const [isDataSet, setIsDataSet] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  //! Funciones
  const traeData = () => {
    if (localStorage.getItem("data")) {
      setIsDataSet(JSON.parse(localStorage.getItem("data")).objData);
    }
  };

  useEffect(() => {
    const fetchData = () => {
      traeData();
    };
    fetchData();
  }, []);

  const handleOk = () => {
    let inputPropias = document.getElementById("inputPropias").value;
    let inputAgricultura = document.getElementById("inputAgricultura").value;
    let inputGanaderia = document.getElementById("inputGanaderia").value;
    let inputTambo = document.getElementById("inputTambo").value;
    //! Inicio - Coop Camil
    // let inputFeedlot = document.getElementById("inputFeedlot").value;
    //! Fin - Coop Camil
    //! Inicio - Para todas las demas coop
    let inputMixto = document.getElementById("inputMixto").value;
    //! Fin - Para todas las demas coop

    let totalPropias =
      parseInt(inputAgricultura) +
      parseInt(inputGanaderia) +
      parseInt(inputTambo) +
      //! Inicio - Coop Camil
      // parseInt(inputFeedlot);
    //! Fin - Coop Camil
    //! Inicio - Para todas las demas coop
    parseInt(inputMixto);
    //! Fin - Para todas las demas coop

    let inputAlquiladas = document.getElementById("inputAlquiladas").value;
    let inputAgriculturaA = document.getElementById("inputAgriculturaA").value;
    let inputGanaderiaA = document.getElementById("inputGanaderiaA").value;
    let inputTamboA = document.getElementById("inputTamboA").value;

    //! Inicio - Coop Camil
    // let inputFeedlotA = document.getElementById("inputFeedlotA").value;
    //! Fin - Coop Camil
    //! Inicio - Para todas las demas coop
    let inputMixtoA = document.getElementById("inputMixtoA").value;
    //! Fin - Para todas las demas coop

    let totalAlquiladas =
      parseInt(inputAgriculturaA) +
      parseInt(inputGanaderiaA) +
      parseInt(inputTamboA) +
      //! Inicio - Coop Camil
      // parseInt(inputFeedlotA);
    //! Fin - Coop Camil
    //! Inicio - Para todas las demas coop
    parseInt(inputMixtoA);
    //! Fin - Para todas las demas coop

    if (isData.cosecha !== null) {
      console.log('isData: ', isData)
      if (totalPropias <= inputPropias && totalAlquiladas <= inputAlquiladas) {
        if (localStorage.getItem("data")) {
          objData = [...isDataSet, isData];
        } else {
          objData = [isData];
        }

        localStorage.setItem("data", JSON.stringify({ objData }));
        setCardSelected(1);
        newCap(idCliente, isData);
        setUpdate(!update);
        setIsSelectEditDisabled(false);

      } else {
        messageApi.open({
          type: 'warning',
          content: 'Por favor revise: Los Has. de Rubros exceden la cantidad total.',
        });
      }
    } else {
      isData.cosecha = ca;
      // alert("Se debe ingresar la cosecha");
      if (totalPropias <= inputPropias && totalAlquiladas <= inputAlquiladas) {
        if (localStorage.getItem("data")) {
          objData = [...isDataSet, isData];
        } else {
          objData = [isData];
        }

        localStorage.setItem("data", JSON.stringify({ objData }));
        setCardSelected(1);
        newCap(idCliente, isData);
        setUpdate(!update);
        setIsSelectEditDisabled(false);

      } else {
        messageApi.open({
          type: 'warning',
          content: 'Por favor revise: Los Has. de Rubros exceden la cantidad total.',
        });
      }
    }
  };

  const handleInputChange = (event) => {
    setIsData({
      //Crea el objeto de lo que escribo en los campos
      ...isData,
      cosecha: localStorage.getItem("idCosechaSelec")
        ? localStorage.getItem("idCosechaSelec")
        : null,
      [event.target.name]: event.target.value,
    });
  };

  //* FUNCION QUE CARGA LOS DATOS DE UNA NUEVA COSECHA
  function newCap(cli, isData) {
    const data = new FormData();
    data.append("idC", cli);
    data.append("idCos", isData["cosecha"]);
    data.append("cantAP", isData["agricultura"]);
    data.append("cantAA", isData["agriculturaA"]);
    data.append("cantGP", isData["ganaderia"]);
    data.append("cantGA", isData["ganaderiaA"]);
    data.append("cantTP", isData["tambo"]);
    data.append("cantTA", isData["tamboA"]);
    //! Inicio - Coop Camil
    // data.append("cantMP", isData["feedlot"]);
    // data.append("cantMA", isData["feedlotA"]);
    //! Fin - Coop Camil
    //! Inicio - Para todas las demas coop
    data.append("cantMP", isData["mixto"]);
    data.append("cantMA", isData["mixtoA"]);
    //! Fin - Para todas las demas coop
    data.append("totalP", isData["propias"]);
    data.append("totalA", isData["alquiladas"]);
    fetch(`${URL}com_newCapacidad.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
      });
    });
    setRefrescarTable(true); //! Sirve para refrescar la table en donde se utiliza en un useEffect en Capacidad.
  }

  const salir = () => {
    setIsButtonDisabled(false);
    setDataContext(null);
    setUpdate(!update);
    setCardSelected(1);
    setIsSelectEditDisabled(false);
  };

  return (
    <>
      <div className="divNuevaCapacidad">
        <div className="cont">
          <table>
            <thead>
              <tr>
                <th className="encabezadoVacio" style={{ width: "385px" }}></th>
                <th className="encabezados" style={{ "text-align": "right" }}>
                  PROPIAS
                </th>
                <th className="encabezados" style={{ "text-align": "right" }}>
                  ALQUILER
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <td className="celdaRubro">AGRICULTURA</td>
                <td className="celdaInput">
                  <Form.Item name="inputAgricultura">
                    <Input
                      className="inputTable"
                      type="number"
                      placeholder="0"
                      name="agricultura"
                      style={{ textAlign: "right" }}
                      defaultValue={0}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Item>
                </td>
                <td className="celdaInputAlquiladas">
                  <Form.Item name="inputAgriculturaA">
                    <Input
                      className="inputTable"
                      type="number"
                      placeholder="0"
                      name="agriculturaA"
                      style={{ textAlign: "right" }}
                      defaultValue={0}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Item>
                </td>
              </tr>
            </thead>
            <thead>
              <tr>
                <td className="celdaRubro">GANADERIA</td>
                <td className="celdaInput">
                  <Form.Item name="inputGanaderia">
                    <Input
                      className="inputTable"
                      type="number"
                      placeholder="0"
                      name="ganaderia"
                      style={{ textAlign: "right" }}
                      defaultValue={0}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Item>
                </td>
                <td className="celdaInputAlquiladas">
                  <Form.Item name="inputGanaderiaA">
                    <Input
                      className="inputTable"
                      type="number"
                      placeholder="0"
                      name="ganaderiaA"
                      style={{ textAlign: "right" }}
                      defaultValue={0}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Item>
                </td>
              </tr>
            </thead>
            <thead>
              <tr>
                <td className="celdaRubro">TAMBO</td>
                <td className="celdaInput">
                  <Form.Item name="inputTambo">
                    <Input
                      className="inputTable"
                      type="number"
                      placeholder="0"
                      name="tambo"
                      style={{ textAlign: "right" }}
                      defaultValue={0}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Item>
                </td>
                <td className="celdaInputAlquiladas">
                  <Form.Item name="inputTamboA">
                    <Input
                      className="inputTable"
                      type="number"
                      placeholder="0"
                      name="tamboA"
                      style={{ textAlign: "right" }}
                      defaultValue={0}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Item>
                </td>
              </tr>
            </thead>
            <thead>
              <tr>
              {/* //! Inicio - Coop Camil */}
                {/* <td className="celdaRubro">FEEDLOT</td>
                <td className="celdaInput">
                  <Form.Item name="inputFeedlot">
                    <Input
                      className="inputTable"
                      type="number"
                      placeholder="0"
                      name="feedlot"
                      style={{ textAlign: "right" }}
                      defaultValue={0}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Item>
                </td>
                <td className="celdaInputAlquiladas">
                  <Form.Item name="inputFeedlotA">
                    <Input
                      className="inputTable"
                      type="number"
                      placeholder="0"
                      name="feedlotA"
                      style={{ textAlign: "right" }}
                      defaultValue={0}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Item>
                </td> */}
                {/* //! Fin - Coop Camil */}
                {/* //! Inicio - Para todas las demas coop */}
                <td className="celdaRubro">MIXTO</td>
                <td className="celdaInput">
                  <Form.Item name="inputMixto">
                    <Input
                      className="inputTable"
                      type="number"
                      placeholder="0"
                      name="mixto"
                      style={{ textAlign: "right" }}
                      defaultValue={0}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Item>
                </td>
                <td className="celdaInputAlquiladas">
                  <Form.Item name="inputMixtoA">
                    <Input
                      className="inputTable"
                      type="number"
                      placeholder="0"
                      name="mixtoA"
                      style={{ textAlign: "right" }}
                      defaultValue={0}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Item>
                </td>
                {/* //! Fin - Para todas las demas coop */}
              </tr>
            </thead>
            <thead>
              <tr>
                <td className="celdaInput" style={{ "font-weight": "bold" }}>
                  TOTAL
                </td>
                <td className="celdaInput">
                  <Form.Item name="inputPropias">
                    <Input
                      className="inputTable"
                      type="number"
                      placeholder="0"
                      name="propias"
                      style={{ textAlign: "right" }}
                      defaultValue={0}
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                </td>
                <td className="celdaInputAlquiladas">
                  <Form.Item name="inputAlquiladas">
                    <Input
                      className="inputTable"
                      type="number"
                      placeholder="0"
                      name="alquiladas"
                      style={{ textAlign: "right" }}
                      defaultValue={0}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Item>
                </td>
              </tr>
            </thead>
          </table>
        </div>
        <div className="contBotonesNuevaCapacidad">
          <div>
            <Button className="btnAddCosechaData" onClick={() => handleOk()}>
              {" "}
              Guardar
            </Button>
          </div>
          <div>
            <Button className="btnAddCosechaData" onClick={() => salir()}>
              {" "}
              Cancelar
            </Button>
          </div>
        </div>
      </div>
      {contextHolder}
    </>
  );
};
