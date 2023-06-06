/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Button, Form, Input, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./graficos.css";
import { GlobalContext } from "../../../../context/GlobalContext";

export const EditarCapacidad = ({ cosechaActiva }) => {

    const URL = process.env.REACT_APP_URL;
    var objData = [];

    //! UseContext
    const {
        idCliente,
        dataContext,
        setDataContext,
        setAppStage,
        setIsButtonEditDisabled,
        infoEdit,
        update,
        setUpdate,
        setIsSelectEditDisabled,
        ca,
        setRefrescarTable,
        setCardSelected,
    } = useContext(GlobalContext);

    const [messageApi, contextHolder] = message.useMessage();
    // console.log('infoEdit: ', infoEdit);

    // console.log('dataContext: ', dataContext);
    // console.log('cosechaActiva: ', ca)
    // useEffect(() => {
    //   setDataContext({
    //     agricultura: Math.trunc(infoEdit[0].has),
    //     agriculturaA: Math.trunc(infoEdit[1].has),
    //     ganaderia: Math.trunc(infoEdit[2].has),
    //     ganaderiaA: Math.trunc(infoEdit[3].has),
    //     tambo: Math.trunc(infoEdit[4].has),
    //     tamboA: Math.trunc(infoEdit[5].has),
    //     mixto: Math.trunc(infoEdit[6].has),
    //     mixtoA: Math.trunc(infoEdit[7].has),
    //     propias: Math.trunc(infoEdit[0].ahxs_propias),
    //     alquiladas: Math.trunc(infoEdit[0].ahxs_alquiladas),


    //     // cosecha: localStorage.getItem("idCosechaSelec") ? localStorage.getItem("idCosechaSelec") : null,
    //     cosecha: cosechaActiva ? cosechaActiva : null,
    //   });
    // }, [])

    useEffect(() => {
        setDataContext({
            //*PROPIAS
            agricultura: Math.trunc(infoEdit.find(info => info.arubro_desc === "AGRICULTURA" && info.condicion === "P").has),
            ganaderia: Math.trunc(infoEdit.find(info => info.arubro_desc === "GANADERIA" && info.condicion === "P").has),
            tambo: Math.trunc(infoEdit.find(info => info.arubro_desc === "TAMBO" && info.condicion === "P").has),
            mixto: Math.trunc(infoEdit.find(info => info.arubro_desc === "MIXTO" && info.condicion === "P").has),

            //* ALQUILADAS
            agriculturaA: Math.trunc(infoEdit.find(info => info.arubro_desc === "AGRICULTURA" && info.condicion === "A").has),
            ganaderiaA: Math.trunc(infoEdit.find(info => info.arubro_desc === "GANADERIA" && info.condicion === "A").has),
            tamboA: Math.trunc(infoEdit.find(info => info.arubro_desc === "TAMBO" && info.condicion === "A").has),
            mixtoA: Math.trunc(infoEdit.find(info => info.arubro_desc === "MIXTO" && info.condicion === "A").has),
            propias: Math.trunc(infoEdit[0].ahxs_propias),
            alquiladas: Math.trunc(infoEdit[0].ahxs_alquiladas),


            // cosecha: localStorage.getItem("idCosechaSelec") ? localStorage.getItem("idCosechaSelec") : null,
            // cosecha: cosechaActiva ? cosechaActiva : null,
            cosecha: ca ? parseInt(ca) : null,
        });
    }, [])

    // console.log(dataContext);

    //! UseState
    const [isActiveModal, setIsActiveModal] = useState(false); //Es por si utilizo el modal para el mensaje de que se paso de cantidad en los rubros


    const handEdit = () => {
        let inputPropias = document.getElementById("inputPropias").value;
        let inputAgricultura = document.getElementById("inputAgricultura").value;
        let inputGanaderia = document.getElementById("inputGanaderia").value;
        let inputTambo = document.getElementById("inputTambo").value;
        let inputMixto = document.getElementById("inputMixto").value;
        let totalPropias =
            parseInt(inputAgricultura) +
            parseInt(inputGanaderia) +
            parseInt(inputTambo) +
            parseInt(inputMixto);

        let inputAlquiladas = document.getElementById("inputAlquiladas").value;
        let inputAgriculturaA = document.getElementById("inputAgriculturaA").value;
        let inputGanaderiaA = document.getElementById("inputGanaderiaA").value;
        let inputTamboA = document.getElementById("inputTamboA").value;
        let inputMixtoA = document.getElementById("inputMixtoA").value;
        let totalAlquiladas =
            parseInt(inputAgriculturaA) +
            parseInt(inputGanaderiaA) +
            parseInt(inputTamboA) +
            parseInt(inputMixtoA);

        if ((totalPropias <= inputPropias) & (totalAlquiladas <= inputAlquiladas)) {
            objData = [...objData, dataContext];
            // console.log("objData: ", objData);
            // console.log("dataContext: ", dataContext);
            localStorage.setItem("data", JSON.stringify({ objData }));
            setCardSelected(1);

            // let cli = localStorage.getItem("cliente");
            let cli = idCliente;

            editCap(cli, dataContext);

            setUpdate(!update);
            setIsSelectEditDisabled(false);

            // console.log("entre if de HANDEDIT");
        } else {
            // alert("El total de Has. de Rubros supera a las Has. Propias en general");
            // setIsActiveModal(true);
            messageApi.open({
                type: 'warning',
                content: 'Por favor revise: Los Has. de Rubros exceden la cantidad total.',
                // getContainer: () => document.body,
            });
        }

    };

    const handleInputChangeEdit = (event) => {
        if (dataContext[event.target.name] !== event.target.value) {
            setDataContext({
                //Crea el objeto de lo que escribo en los campos
                ...dataContext,
                // cosecha: localStorage.getItem("idCosechaSelec") ? localStorage.getItem("idCosechaSelec") : null,
                // cosecha: cosechaActiva ? cosechaActiva : null,
                cosecha: ca ? parseInt(ca) : null,
                [event.target.name]: parseInt(event.target.value),
            });

        }
    };

    //* FUNCION QUE CARGA LOS DATOS DE UNA NUEVA COSECHA
    function editCap(cli, dataContext) {
        // console.log('dataContext.cosecha: ',dataContext["cosecha"])
        const data = new FormData();
        data.append("idC", cli);

        data.append("idCos", parseInt(localStorage.getItem("cosechaActiva")));
        // data.append("idCos", cosechaActiva);

        data.append("cantAP", dataContext["agricultura"]);
        data.append("cantAA", dataContext["agriculturaA"]);
        data.append("cantGP", dataContext["ganaderia"]);
        data.append("cantGA", dataContext["ganaderiaA"]);
        data.append("cantTP", dataContext["tambo"]);
        data.append("cantTA", dataContext["tamboA"]);
        data.append("cantMP", dataContext["mixto"]);
        data.append("cantMA", dataContext["mixtoA"]);
        data.append("totalP", dataContext["propias"]);
        data.append("totalA", dataContext["alquiladas"]);
        // fetch("../com_editCapacidad.php", {
        fetch(`${URL}com_editCapacidad.php`, {
            method: "POST",
            body: data,
        }).then(function (response) {
            response.text().then((resp) => {
                const data = resp;
                console.log('com_editCapacidad: ', data);
                // const objetoData = JSON.parse(data);
                // console.log("Nueva capacidad: ", objetoData)
            });
        });
        setRefrescarTable(true);  //! Sirve para refrescar la table en donde se utiliza en un useEffect en Capacidad.
        setUpdate(!update);
    }

    const salir = () => {
        setIsButtonEditDisabled(false);
        setDataContext(null);
        setUpdate(!update);
        setCardSelected(1)
        setIsSelectEditDisabled(false);
    };

    return (
        <>
            <div className="cont">
                <div>
                    <h1 className='titulos'>
                        CAPACIDAD PRODUCTIVA - EDITAR
                    </h1>
                </div>
                <div>
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
                                            // defaultValue={Math.trunc(infoEdit[0].has)}
                                            defaultValue={Math.trunc(infoEdit.find(info => info.arubro_desc === "AGRICULTURA" && info.condicion === "P").has)}
                                            // value={Math.trunc(infoEdit[0].has)}
                                            value={Math.trunc(infoEdit.find(info => info.arubro_desc === "AGRICULTURA" && info.condicion === "P").has)}

                                            onChange={(value) => handleInputChangeEdit(value)}
                                        />
                                    </Form.Item>
                                </td>
                                <td className="celdaInput">
                                    <Form.Item name="inputAgriculturaA">
                                        <Input
                                            className="inputTable"
                                            type="number"
                                            placeholder="0"
                                            name="agriculturaA"
                                            style={{ textAlign: "right" }}
                                            // defaultValue={Math.trunc(infoEdit[1].has)}
                                            // value={Math.trunc(infoEdit[1].has)}
                                            defaultValue={Math.trunc(infoEdit.find(info => info.arubro_desc === "AGRICULTURA" && info.condicion === "A").has)}
                                            value={Math.trunc(infoEdit.find(info => info.arubro_desc === "AGRICULTURA" && info.condicion === "A").has)}
                                            onChange={(value) => handleInputChangeEdit(value)}
                                        />
                                    </Form.Item>
                                </td>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                <td className="celdaRubro">GANADERÍA</td>
                                <td className="celdaInput">
                                    <Form.Item name="inputGanaderia">
                                        <Input
                                            className="inputTable"
                                            type="number"
                                            placeholder="0"
                                            name="ganaderia"
                                            style={{ textAlign: "right" }}
                                            // defaultValue={Math.trunc(infoEdit[2].has)}
                                            // value={Math.trunc(infoEdit[2].has)}
                                            defaultValue={Math.trunc(infoEdit.find(info => info.arubro_desc === "GANADERIA" && info.condicion === "P").has)}
                                            value={Math.trunc(infoEdit.find(info => info.arubro_desc === "GANADERIA" && info.condicion === "P").has)}
                                            onChange={(value) => handleInputChangeEdit(value)}
                                        />
                                    </Form.Item>
                                </td>
                                <td className="celdaInput">
                                    <Form.Item name="inputGanaderiaA">
                                        <Input
                                            className="inputTable"
                                            type="number"
                                            placeholder="0"
                                            name="ganaderiaA"
                                            style={{ textAlign: "right" }}
                                            // defaultValue={Math.trunc(infoEdit[3].has)}
                                            // value={Math.trunc(infoEdit[3].has)}
                                            defaultValue={Math.trunc(infoEdit.find(info => info.arubro_desc === "GANADERIA" && info.condicion === "A").has)}
                                            value={Math.trunc(infoEdit.find(info => info.arubro_desc === "GANADERIA" && info.condicion === "A").has)}
                                            onChange={(value) => handleInputChangeEdit(value)}
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
                                            // defaultValue={Math.trunc(infoEdit[4].has)}
                                            // value={Math.trunc(infoEdit[4].has)}
                                            defaultValue={Math.trunc(infoEdit.find(info => info.arubro_desc === "TAMBO" && info.condicion === "P").has)}
                                            value={Math.trunc(infoEdit.find(info => info.arubro_desc === "TAMBO" && info.condicion === "P").has)}
                                            onChange={(value) => handleInputChangeEdit(value)}
                                        />
                                    </Form.Item>
                                </td>
                                <td className="celdaInput">
                                    <Form.Item name="inputTamboA">
                                        <Input
                                            className="inputTable"
                                            type="number"
                                            placeholder="0"
                                            name="tamboA"
                                            style={{ textAlign: "right" }}
                                            // defaultValue={Math.trunc(infoEdit[5].has)}
                                            // value={Math.trunc(infoEdit[5].has)}
                                            defaultValue={Math.trunc(infoEdit.find(info => info.arubro_desc === "TAMBO" && info.condicion === "A").has)}
                                            value={Math.trunc(infoEdit.find(info => info.arubro_desc === "TAMBO" && info.condicion === "A").has)}
                                            onChange={(value) => handleInputChangeEdit(value)}
                                        />
                                    </Form.Item>
                                </td>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                <td className="celdaRubro">MIXTO</td>
                                <td className="celdaInput">
                                    <Form.Item name="inputMixto">
                                        <Input
                                            className="inputTable"
                                            type="number"
                                            placeholder="0"
                                            name="mixto"
                                            style={{ textAlign: "right" }}
                                            // defaultValue={Math.trunc(infoEdit[6].has)}
                                            // value={Math.trunc(infoEdit[6].has)}
                                            defaultValue={Math.trunc(infoEdit.find(info => info.arubro_desc === "MIXTO" && info.condicion === "P").has)}
                                            value={Math.trunc(infoEdit.find(info => info.arubro_desc === "MIXTO" && info.condicion === "P").has)}
                                            onChange={(value) => handleInputChangeEdit(value)}
                                        />
                                    </Form.Item>
                                </td>
                                <td className="celdaInput">
                                    <Form.Item name="inputMixtoA">
                                        <Input
                                            className="inputTable"
                                            type="number"
                                            placeholder="0"
                                            name="mixtoA"
                                            style={{ textAlign: "right" }}
                                            // defaultValue={Math.trunc(infoEdit[7].has)}
                                            // value={Math.trunc(infoEdit[7].has)}
                                            defaultValue={Math.trunc(infoEdit.find(info => info.arubro_desc === "MIXTO" && info.condicion === "A").has)}
                                            value={Math.trunc(infoEdit.find(info => info.arubro_desc === "MIXTO" && info.condicion === "A").has)}
                                            onChange={(value) => handleInputChangeEdit(value)}
                                        />
                                    </Form.Item>
                                </td>
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
                                            defaultValue={Math.trunc(infoEdit[0].ahxs_propias)}
                                            value={Math.trunc(infoEdit[0].ahxs_propias)}
                                            onChange={(value) => handleInputChangeEdit(value)}
                                        />
                                    </Form.Item>
                                </td>
                                <td className="celdaInput">
                                    <Form.Item name="inputAlquiladas">
                                        <Input
                                            className="inputTable"
                                            type="number"
                                            placeholder="0"
                                            name="alquiladas"
                                            style={{ textAlign: "right" }}
                                            defaultValue={Math.trunc(infoEdit[0].ahxs_alquiladas)}
                                            value={Math.trunc(infoEdit[0].ahxs_alquiladas)}
                                            onChange={(value) => handleInputChangeEdit(value)}
                                        />
                                    </Form.Item>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
                {/* <div className="btn-msgAdvertencia"> */}
                <div className="contBotones">
                    <div>
                        <Button className="btnAddCosechaData" onClick={() => handEdit()}>
                            {" "}
                            Actualizar
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
