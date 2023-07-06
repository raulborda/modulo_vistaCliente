import { Button, Empty, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../../../context/GlobalContext';
import { GraficoAcopioTT } from './GraficoAcopioTT';
import GraficoEvolucionProductiva from './GraficoEvolucionProductiva';
import { GraficoInsumos } from './GraficoInsumos';
import './graficos.css';
import { EditOutlined, InfoCircleOutlined, PieChartOutlined, PlusCircleOutlined, TableOutlined } from '@ant-design/icons';
import { EditarCapacidad } from './EditarCapacidad';
import { NuevaCapacidad } from './NuevaCapacidad';

const GraficosProdAgricultura = ({ cosechaActiva }) => {
    const URL = process.env.REACT_APP_URL;

    const {
        cardSelected,
        setCardSelected,
        iconTable,
        setIconTable,
        setInfoEdit,
        idCliente,
        setInfoRubros,
        infoCap, 
        setInfoCap,
        selectedAcosDesc,
        infoCosechas,
        isButtonDisabled,
        update,
        setIsButtonDisabled,
        refrescarTable,
        setRefrescarTable,
        setIsButtonEditDisabled,
        isButtonEditDisabled,
        setIsSelectEditDisabled,
    } = useContext(GlobalContext);

    const [selectedValue, setSelectedValue] = useState(localStorage.getItem("cosechaActiva"));

    const columns = [
        {
            title: "",
            dataIndex: "categoria",
            key: "categoria",
            render: (text, record) => (
                <span>
                    {record.categoria === "TOTAL" ? <strong>TOTAL</strong> : text}
                </span>
            ),
        },
        {
            title: <span style={{ color: "#00b33c" }}>PROPIAS</span>,
            dataIndex: "propias",
            key: "propias",
            editable: true,
            width: "20%",
            align: "right",
        },
        {
            title: <span style={{ color: "#00b33c" }}>ALQUILER</span>,
            dataIndex: "alquiler",
            key: "alquiler",
            editable: true,
            width: "20%",
            align: "right",
        },
        {
            title: <span style={{ color: "#00b33c" }}>TOTAL</span>,
            dataIndex: "total",
            key: "total",
            editable: true,
            width: "20%",
            align: "right",
        },
        {
            title: <span style={{ color: "#00b33c" }}>(%)</span>,
            dataIndex: "porcentaje",
            key: "porcentaje",
            editable: true,
            width: "20%",
            align: "right",
        },
    ];

    var result = {};
    let capacidad = [];

    const generaData = (infoCap) => {
        setInfoEdit(infoCap);
        // Iterar sobre cada objeto del array
        infoCap.forEach(info => {
            // Verificar si ya existe el arubro_desc en el objeto result
            if (!result[info.arubro_desc]) {
                result[info.arubro_desc] = {};
            }
            // Verificar la condición y asignar el valor correspondiente
            if (info.condicion === "P") {
                result[info.arubro_desc].propio = info.has;
            } else {
                result[info.arubro_desc].alquilado = info.has;
            }
        });

        capacidad = result;
        capacidad = [
            {
                key: 1,
                categoria: "AGRICULTURA",
                propias: result.AGRICULTURA ? Math.trunc(result.AGRICULTURA.propio) : 0,
                alquiler: result.AGRICULTURA ? Math.trunc(result.AGRICULTURA.alquilado) : 0,
                total: result.AGRICULTURA ? parseInt(result.AGRICULTURA.propio) + parseInt(result.AGRICULTURA.alquilado) : 0,
                porcentaje: result.AGRICULTURA ?
                    (parseInt(infoCap[0]?.ahxs_propias || 0) + parseInt(infoCap[0]?.ahxs_alquiladas || 0)) !== 0 ?
                        (((parseInt(result.AGRICULTURA.propio) + parseInt(result.AGRICULTURA.alquilado)) /
                            (parseInt(infoCap[0]?.ahxs_propias || 0) + parseInt(infoCap[0]?.ahxs_alquiladas || 0))) * 100).toFixed(0) + '%' :
                        0 + '%' :
                    0 + '%'
            },
            {
                key: 2,
                categoria: "GANADERIA",
                propias: result.GANADERIA ? Math.trunc(result.GANADERIA.propio) : 0,
                alquiler: result.GANADERIA ? Math.trunc(result.GANADERIA.alquilado) : 0,
                total: result.GANADERIA ? parseInt(result.GANADERIA.propio) + parseInt(result.GANADERIA.alquilado) : 0,
                porcentaje: result.GANADERIA ?
                    (parseInt(infoCap[0]?.ahxs_propias || 0) + parseInt(infoCap[0]?.ahxs_alquiladas || 0)) !== 0 ?
                        (((parseInt(result.GANADERIA.propio) + parseInt(result.GANADERIA.alquilado)) /
                            (parseInt(infoCap[0]?.ahxs_propias || 0) + parseInt(infoCap[0]?.ahxs_alquiladas || 0))) * 100).toFixed(0) + '%' :
                        0 + '%' :
                    0 + '%'
            },
            {
                key: 3,
                categoria: "TAMBO",
                propias: result.TAMBO ? Math.trunc(result.TAMBO.propio) : 0,
                alquiler: result.TAMBO ? Math.trunc(result.TAMBO.alquilado) : 0,
                total: result.TAMBO ? parseInt(result.TAMBO.propio) + parseInt(result.TAMBO.alquilado) : 0,
                porcentaje: result.TAMBO ?
                    (parseInt(infoCap[0]?.ahxs_propias || 0) + parseInt(infoCap[0]?.ahxs_alquiladas || 0)) !== 0 ?
                        (((parseInt(result.TAMBO.propio) + parseInt(result.TAMBO.alquilado)) /
                            (parseInt(infoCap[0]?.ahxs_propias || 0) + parseInt(infoCap[0]?.ahxs_alquiladas || 0))) * 100).toFixed(0) + '%' :
                        0 + '%' :
                    0 + '%'
            },
            {
                key: 4,
                categoria: "MIXTO",
                propias: result.MIXTO ? Math.trunc(result.MIXTO.propio) : 0,
                alquiler: result.MIXTO ? Math.trunc(result.MIXTO.alquilado) : 0,
                total: result.MIXTO ? parseInt(result.MIXTO.propio) + parseInt(result.MIXTO.alquilado) : 0,
                porcentaje: result.MIXTO ?
                    (parseInt(infoCap[0]?.ahxs_propias || 0) + parseInt(infoCap[0]?.ahxs_alquiladas || 0)) !== 0 ?
                        (((parseInt(result.MIXTO.propio) + parseInt(result.MIXTO.alquilado)) /
                            (parseInt(infoCap[0]?.ahxs_propias || 0) + parseInt(infoCap[0]?.ahxs_alquiladas || 0))) * 100).toFixed(0) + '%' :
                        0 + '%' :
                    0 + '%'
            },
            {
                key: 5,
                categoria: (
                    <>
                        <strong>TOTAL </strong>
                        <InfoCircleOutlined
                            title="El total puede diferir porque no es sumatoria del desglose por rubro."
                            style={{ color: "#00b33c" }}
                        />
                    </>
                ),
                propias: <strong>{Math.trunc(infoCap && infoCap.length > 0 ? infoCap[0].ahxs_propias : 0)}</strong>,
                alquiler: <strong>{Math.trunc(infoCap && infoCap.length > 0 ? infoCap[0].ahxs_alquiladas : 0)}</strong>,
                total: <strong>{infoCap && infoCap.length > 0 ? parseInt(infoCap[0].ahxs_propias) : 0 + infoCap && infoCap.length > 0 ? parseInt(infoCap[0].ahxs_alquiladas) : 0}</strong>,
                porcentaje: <strong>{(infoCap && infoCap.length > 0 ? parseInt(infoCap[0]?.ahxs_propias || 0) : 0 + infoCap && infoCap.length > 0 ? parseInt(infoCap[0]?.ahxs_alquiladas || 0) : 0) !== 0 ?
                    (((infoCap && infoCap.length > 0 ? parseInt(infoCap[0]?.ahxs_propias || 0) : 0 + infoCap && infoCap.length > 0 ? parseInt(infoCap[0]?.ahxs_alquiladas || 0) : 0) /
                        (infoCap && infoCap.length > 0 ? parseInt(infoCap[0]?.ahxs_propias || 0) : 0 + infoCap && infoCap.length > 0 ? parseInt(infoCap[0]?.ahxs_alquiladas || 0) : 0) * 100).toFixed(0)) :
                    0}% </strong>,
            },
        ];
        return result;
    };

    const handleStage = () => {
        switch (cardSelected) {
            case 0:
                if (!capacidad || capacidad.length === 0) {
                    return (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    );
                }
                return <GraficoEvolucionProductiva porcentajes={capacidad} />;
            case 1:

                if (!capacidad || capacidad.length === 0) {
                    return (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No hay datos. Se puede cargar la cosecha activa" />
                    );
                }
                return (
                    <Table
                        columns={columns}
                        dataSource={capacidad}
                        pagination={false}
                    />
                );
            case 2:
                return <GraficoInsumos />;
            case 3:
                return <GraficoAcopioTT/>;
            case 4:
                return <EditarCapacidad />;
            case 5:
                return <NuevaCapacidad />;
            default:
                if (!capacidad || capacidad.length === 0) {
                    return (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    );
                }
                return (
                    <GraficoEvolucionProductiva porcentajes={capacidad} />
                );
        }
    };

    const verGrafico = () => {
        setCardSelected(0)
        setIconTable(!iconTable);
    }

    //* FUNCION QUE TRAE LOS DATOS DE TABLA RUBROS
    function rubros() {
        // Trae la información  con GET
        fetch(`${URL}com_traerRubros.php`, {
            method: "GET",
        }).then(function (response) {
            response.text().then((resp) => {
                const data = resp;
                const objetoData = JSON.parse(data);
                setInfoRubros(objetoData);
            });
        });
    }

    var cosechaa = parseInt(selectedAcosDesc);
    //* EJECUTA LAS FUNCIONES QUE TRAE LA INFO y TRAE LOS DATOS PARA LLENAR TABLA CAPACIDAD PRODUCTIVA INICIAL
    useEffect(() => {
        if (idCliente) {
            const data = new FormData();
            data.append("idC", idCliente);
            data.append("cosecha", cosechaa);
            fetch(`${URL}com_tabCapacidadData.php`, {
                method: "POST",
                body: data,
            }).then(function (response) {
                response.text().then((resp) => {
                    const data = resp;
                    const objetoData = JSON.parse(data);
                    setInfoCap(objetoData);
                });
            });
            rubros();
        }
    }, [idCliente, selectedAcosDesc, update]);


    if (infoCap.length > 0) {
        generaData(infoCap);
    }

    const editarCosecha = () => {
        setIsButtonEditDisabled(true);
        setIsSelectEditDisabled(true)
        setCardSelected(4);

    };

    const addCosecha = () => {
        setCardSelected(5);
        setIsSelectEditDisabled(false);
    };

    //! INICIO - PROBANDO
    useEffect(() => {
        if (infoCap.length > 0) {
            generaData(infoCap);
        }
    }, [infoCap, idCliente, update])

    useEffect(() => {
        if (infoCap.length > 0) {
            generaData(infoCap);
        }
    }, [])

    if (infoCap.length > 0) {
        generaData(infoCap);
        setIsButtonDisabled(true);
    } else {
        setIsButtonDisabled(false);
    }

    if (infoCap.length > 0 || selectedAcosDesc !== cosechaActiva) { //!Esto es para que solamente se pueda agregar cosecha si es la cosecha activa.
        setIsButtonDisabled(true);
    } else {
        setIsButtonDisabled(false);
    }

    var titleBtnEditar = ''
    if (selectedAcosDesc === cosechaActiva) {
        if (infoCap.length > 0) {
            setIsButtonEditDisabled(false);
            titleBtnEditar = 'Editar'

        } else {
            setIsButtonEditDisabled(true);
        }
    } else {
        setIsButtonEditDisabled(true);
        titleBtnEditar = 'Solamente se puede modificar la cosecha activa.'
    }

    if (infoCosechas.length > 0) {
        localStorage.setItem("cosechaActiva", infoCosechas[0].acos_desc);
        localStorage.setItem("idCosecha", infoCosechas[0].acos_id);
    }


    //!Este useEffect es para cuando se edita o se agrega nueva cosecha - Sirve para refrescar la table.
    useEffect(() => {
        if (refrescarTable) {
            generaData(infoCap)
            setRefrescarTable(false)
        }
    }, [refrescarTable, infoCap])
    //! FIN - PROBANDO

    const verTable = () => {
        setCardSelected(1)
        setIconTable(!iconTable);
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '250px' }}>
                {cardSelected === 0 && (
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <h1 className='titulos'>
                            EVOLUCIÓN PRODUCTIVA
                        </h1>
                        {
                            !iconTable &&
                            <Button
                                icon={<TableOutlined />}
                                type="primary"
                                style={{ marginLeft: '10px', marginTop: '-5px', backgroundColor: '#00B33C' }}
                                onClick={() => { verTable(); }}
                            >
                                Ver Tabla
                            </Button>
                        }
                    </div>
                )}
                {cardSelected === 1 && (
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <h1 className='titulos'>
                                CAPACIDAD PRODUCTIVA
                            </h1>
                            <Button
                                icon={<PieChartOutlined />}
                                type="primary"
                                style={{ marginLeft: '10px', marginTop: '-5px', backgroundColor: '#00B33C' }}
                                onClick={() => { verGrafico(); }}
                            >
                                Ver Gráfico
                            </Button>
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                            <Button
                                style={{ alignItems: 'center', boxShadow: 'none !important', outline: '0', border: 'none !important', marginTop: '-8px' }}
                                className="btnEditCosecha"
                                icon={<EditOutlined title={titleBtnEditar} />}
                                onClick={() => editarCosecha()}
                                disabled={isButtonEditDisabled}
                            />
                            <Button
                                style={{ alignItems: "center", boxShadow: "none !important", outline: "0", border: "none !important", marginTop: "-8px" }}
                                className="btnAddCosecha"
                                icon={<PlusCircleOutlined style={{ "--antd-wave-shadow-color": "transparent !important" }} />}
                                onClick={() => {
                                    addCosecha();
                                }}
                                disabled={isButtonDisabled}
                            />
                        </div>
                    </div>
                )}
                {handleStage()}
            </div>
        </>
    );
}

export default GraficosProdAgricultura;