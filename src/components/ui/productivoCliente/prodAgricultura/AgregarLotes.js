import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Card, Divider, Form, Input, Select, message } from "antd";
import { GlobalContext } from "../../../context/GlobalContext";
import { CloseOutlined, InboxOutlined, PaperClipOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import { parseString } from "xml2js";
import { area, polygon } from "@turf/turf";

const AgregarLotes = () => {
  const URL = process.env.REACT_APP_URL;
  const [form] = Form.useForm();
  const { Option } = Select;
  const [controlGeoJsonMarcado, setControlGeoJsonMarcado] = useState(false);
  const [has, setHas] = useState(0);
  const [hasDibujada, setHasDibujada] = useState(0);
  const [datosArchivo, setDatosArchivo] = useState({});
  const [latitud, setLatitud] = useState(0);
  const [longitud, setLongitud] = useState(0);
  const [nombreLote, setNombreLote] = useState('');

  const formRef = useRef(null);

  const {
    idCliente,
    setShowFormAgregar,
    valorGeoJSON,
    setValorGeoJSON,
    campos,
    setCampos,
    setClientes,
    importarArchivo, setImportarArchivo,
    agregarLote,
    coordenadasArchivo, setCoordenadasArchivo,
    setLimpiarStates, limpiarStates,
    geoJSONModificado,
    setSpinning,
    setSelectedCampoGeojson,
  } = useContext(GlobalContext);

  const [nombreArchivo, setNombreArchivo] = useState(false);
  const [controlDatosArchivo, setControlDatosArchivo] = useState(false);
  const [coordFiltradas, setCoordFiltradas] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ".kml",
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      if (!file.name.toLowerCase().endsWith(".kml")) {
        console.error("Por favor, selecciona un archivo con extensión .kml");
        message.error("Ingrese unicamente archivos .kml");
        return;
      }

      reader.onload = (e) => {
        const kmlData = e.target.result;

        parseString(kmlData, (err, result) => {
          if (err) {
            console.error(err);
            return;
          }
          const nameFile = result.kml.Document[0].name
          setNombreArchivo(nameFile)
          const coordinates = result.kml.Document[0].Placemark[0].Polygon[0].outerBoundaryIs[0].LinearRing[0].coordinates[0];
          setDatosArchivo(result.kml.Document[0])
          setLatitud(result.kml.Document[0].Placemark[0].LookAt[0].latitude);
          setLongitud(result.kml.Document[0].Placemark[0].LookAt[0].longitude);
          setNombreLote(result.kml.Document[0].Placemark[0].name);

          const coordinatesArray = coordinates.split(' ').map(coord => {
            const [longitude, latitude] = coord.trim().split(',').map(parseFloat);
            return [longitude, latitude];
          });

          // Filtrar los elementos no deseados (NaN o undefined)
          const filteredCoordinatesArray = coordinatesArray.filter(coord => {
            const [longitude, latitude] = coord;
            return !isNaN(longitude) && !isNaN(latitude) && longitude !== undefined && latitude !== undefined;
          });
          setCoordFiltradas(filteredCoordinatesArray)
          setControlDatosArchivo(true)

        });
      };
      reader.readAsText(file);
    },
  });


  function calcularHectareas(coordenadas) {
    const poligono = polygon([coordenadas]);
    const area1 = area(poligono);
    const hectareas = area1 / 10000;
    const hectareasRedoneada = hectareas.toFixed(2);
    return hectareasRedoneada;
  }

  function calcularHectareasDibujadas(coordenadas) {
    console.log('valorGeoJSON: - Cambio', valorGeoJSON);
    const coordenadasObj = JSON.parse(coordenadas);
    const poligono = polygon([coordenadasObj]);
    const area1 = area(poligono);
    const hectareas = area1 / 10000;
    const hectareasRedoneada = hectareas.toFixed(2);
    return hectareasRedoneada;
  }

  useEffect(() => {
    if (valorGeoJSON.length > 0) {
      const hectareasDibujadas = calcularHectareasDibujadas(valorGeoJSON);
      setHasDibujada(hectareasDibujadas);
      // Reiniciar el campo "has" del formulario
      formRef.current?.resetFields(['has']);
    }
  }, [valorGeoJSON])



  useEffect(() => {
    setControlDatosArchivo(false)
    setCoordenadasArchivo(coordFiltradas);
    if (coordFiltradas.length > 0) {
      setHas(calcularHectareas(coordFiltradas));
    }
  }, [controlDatosArchivo])

  useEffect(() => {
    traeCampos();
    traeClientes();
  }, [])


  function traeCampos() {
    const data = new FormData();
    fetch(`${URL}lot_listCampos.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setCampos(objetoData);
      });
    });
  }

  function traeClientes() {
    const data = new FormData();
    fetch(`${URL}lot_listClientes.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setClientes(objetoData);
      });
    });
  }

  const onSubmitAdd = async (values) => {
    if (valorGeoJSON.length === 0) {
      setControlGeoJsonMarcado(true);
    } else {
      try {
        setSpinning(true);
        const latLon = 0;
        const dataAdd = new FormData();
        dataAdd.append("idC", idCliente);
        dataAdd.append("lote", values.nombre);
        dataAdd.append("has", values.has);
        dataAdd.append("campo", values.campo);
        dataAdd.append("cliente", idCliente);
        dataAdd.append("participacion", 100);
        dataAdd.append("condicion", values.condicion);
        dataAdd.append("valorGeoJSON", valorGeoJSON);
        dataAdd.append("lat", latLon);
        dataAdd.append("lon", latLon);

        const response = await fetch(`${URL}client_addLote.php`, {
          method: "POST",
          body: dataAdd,
        });

        if (response.ok) {
          const resp = await response.text();
          const data = resp;
          setShowFormAgregar(false);
          form.resetFields();
          setValorGeoJSON([]);
          message.success("Lote agregado exitosamente");
        } else {
          throw new Error("Error al agregar el lote");
        }
      } catch (error) {
        console.log("Error: ", error);
        message.error("Error al agregar el lote");
      } finally {
        setSpinning(false);
        setSelectedCampoGeojson(null)
      }
    }
  };

  const onSubmitImportarArchivo = async (values) => {
    try {
      setSpinning(true);

      const dataAdd = new FormData();
      dataAdd.append("idC", idCliente);
      dataAdd.append("lote", datosArchivo.Placemark[0].name);
      dataAdd.append("has", has);
      dataAdd.append("campo", values.campo);
      dataAdd.append("cliente", idCliente);
      dataAdd.append("participacion", 100);
      dataAdd.append("condicion", values.condicion);
      dataAdd.append("valorGeoJSON", JSON.stringify(coordenadasArchivo));
      dataAdd.append("lat", parseFloat(latitud).toFixed(2));
      dataAdd.append("lon", parseFloat(longitud).toFixed(2));

      const response = await fetch(`${URL}client_addLote.php`, {
        method: "POST",
        body: dataAdd,
      });

      if (response.ok) {
        const resp = await response.text();
        const data = resp;
        setShowFormAgregar(false);
        form.resetFields();
        setValorGeoJSON([]);
        setImportarArchivo(false);
        message.success("Lote importado exitosamente");
      } else {
        throw new Error("Error al importar el archivo");
      }
    } catch (error) {
      console.log("Error: ", error);
      message.error("Error al importar el archivo");
    } finally {
      setSpinning(false);
    }
  };




  const limpiezaStates = () => {
    form.resetFields();
    setNombreArchivo('');
    setNombreLote('');
    setHas(0);
    setDatosArchivo({});
    setLongitud(0);
    setLatitud(0);
    setHasDibujada(0);
  }
  useEffect(() => {
    if (limpiarStates) {
      limpiezaStates();
      setLimpiarStates(false);
    }
  }, [limpiarStates])

  useEffect(() => {
    // Actualizar los valores del formulario cuando los estados cambien
    if (has > 0) {
      form.setFieldsValue({
        has: has > 0 ? has : null,
      });
    } else {
      form.setFieldsValue({
        has: hasDibujada > 0 ? hasDibujada : null,
      });
    }
  }, [has, hasDibujada, geoJSONModificado]);
  useEffect(() => {
    form.setFieldsValue({
      nombre: nombreLote.length > 0 ? nombreLote : null,
    });
  }, [nombreLote])

  return (
    <>
      {/* Renderizar el componente de mensaje */}
      {contextHolder}

      {agregarLote &&
        (
          <Card
            style={{
              width: "800px",
              height: "40%",
              marginLeft: "10px",
            }}
          >
            <Form form={form} onFinish={onSubmitAdd}>
              <div>
                <h1 className="titulos">NUEVO LOTE</h1>
                <Divider style={{ marginBottom: "10px", marginTop: "0px" }} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingBottom: "15px",
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px' }} >
                    <Form.Item
                      name="campo"
                      label="Campo"
                      rules={[
                        {
                          required: true,
                          message: "Por favor selecciona un campo",
                        },
                      ]}
                      className="hidden-asterisk" // Agregar esta línea para ocultar el asterisco
                    >
                      <Select
                        style={{ width: "200px", marginLeft: '20px' }}
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children &&
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={(value) => {
                          const selectedCampo = campos.find((campo) => campo.cam_id === value);
                          setSelectedCampoGeojson(selectedCampo?.cam_geojson || null);
                        }}
                      >
                        {campos &&
                          campos.map((campo) => (
                            <Select.Option key={campo.cam_id} value={campo.cam_id}>
                              {campo.cam_nombre}
                            </Select.Option>
                          ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="nombre"
                      label="Nombre Lote"
                      style={{marginLeft: '15px'}}
                      rules={[
                        {
                          required: true,
                          message: "Por favor ingresa el nombre del lote",
                        },
                      ]}
                      className="hidden-asterisk" // Agregar esta línea para ocultar el asterisco
                    >
                      <Input
                        style={{
                          width: "200px",
                          marginRight: "15px",
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }} >
                  <Form.Item
                      name="condicion"
                      label="Condición"
                      rules={[
                        {
                          required: true,
                          message: "Por favor selecciona una condición",
                        },
                      ]}
                      className="hidden-asterisk" // Agregar esta línea para ocultar el asterisco
                    >
                      <Select
                        style={{
                          width: "200px",
                          // marginRight: "15px",
                          marginLeft: '3px',
                        }}
                      >
                        <Option value="1">PROPIO</Option>
                        <Option value="2">ALQUILADO</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="has"
                      label="Hectáreas"
                      style={{marginLeft: '15px'}}
                      rules={[
                        {
                          required: true,
                          message: "Por favor ingrese las hectáreas del lote",
                        },
                      ]}
                      className="hidden-asterisk" // Agregar esta línea para ocultar el asterisco
                      initialValue={hasDibujada > 0 && hasDibujada}
                    >
                      <Input
                        type="number"
                        style={{
                          width: "82px",
                          marginLeft: '18px'
                        }}
                      />
                    </Form.Item>

                  </div>
                </div>
                <Divider style={{ marginBottom: "10px", marginTop: "0px" }} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    {controlGeoJsonMarcado ? (
                      <label style={{ color: "red" }}>
                        * Por favor marque el lote
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button type="primary" htmlType="submit" style={{ marginRight: '5px' }}>
                      Guardar
                    </Button>
                    <Button
                      onClick={() => (
                        setShowFormAgregar(false), limpiezaStates(), setSelectedCampoGeojson(null)
                      )}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </Card >
        )
      }
      {importarArchivo && (
        <Card
          style={{
            width: "900px",
            height: "40%",
            marginLeft: "10px",
          }}
        >
          <Form form={form} onFinish={onSubmitImportarArchivo}>
            <div>
              <h1 className="titulos">IMPORTAR ARCHIVO</h1>
              <Divider style={{ marginBottom: "10px", marginTop: "0px" }} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingBottom: "15px",
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'row' }}>

                  <div style={{ display: 'flex', flexDirection: 'column', marginRight: '15px', alignItems: 'center' }}>

                    <p style={{ marginLeft: '-180px' }}>Archivo KML : </p>
                    <Form.Item
                      name="kmlFile"
                      rules={[
                        {
                          required: false,
                          message: "Por favor seleccione un archivo KML",
                        },
                      ]}
                      className="hidden-asterisk"
                      style={{ marginLeft: '15px' }}
                    >
                      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'drag-active' : ''}`}>
                        <input {...getInputProps()} />
                        <InboxOutlined style={{ color: 'green', fontSize: '48px' }} />
                        {isDragActive ? (
                          <p>Suelta el archivo aquí...</p>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <p style={{ color: 'rgba(0, 0, 0, 0.88)', fontSize: '16px' }} >Click o arrastre un archivo aquí</p>
                            <p>Ingrese archivos .kml</p>
                          </div>
                        )}
                      </div>
                    </Form.Item>
                    {nombreArchivo && (
                      <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '20px' }}>
                        <PaperClipOutlined style={{ marginRight: '5px', color: 'green' }} />
                        <p style={{ color: 'green' }}>Nombre Archivo: {nombreArchivo}</p>
                        <CloseOutlined style={{ marginLeft: '5px' }} onClick={limpiezaStates} />
                      </div>
                    )}
                  </div>
                  <div>
                    <Form.Item
                      name="nombre"
                      label="Nombre Lote"
                      rules={[
                        {
                          required: true,
                          message: "Por favor ingresa el nombre del lote",
                        },
                      ]}
                      className="hidden-asterisk" // Agregar esta línea para ocultar el asterisco
                      initialValue={nombreLote}
                    >
                      <Input
                        style={{
                          width: "200px",
                          marginRight: "15px",
                          marginBottom: '5px'
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="campo"
                      label="Campo"
                      rules={[
                        {
                          required: true,
                          message: "Por favor selecciona un campo",
                        },
                      ]}
                      className="hidden-asterisk" // Agregar esta línea para ocultar el asterisco
                    >
                      <Select
                        style={{ width: "200px", marginLeft: '36px', marginBottom: '5px' }}
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children &&
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {campos &&
                          campos.map((campo) => (
                            <Select.Option key={campo.cam_id} value={campo.cam_id}>
                              {campo.cam_nombre}
                            </Select.Option>
                          ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="has"
                      label="Hectáreas"
                      rules={[
                        {
                          required: true,
                          message: "Por favor ingrese las hectáreas del lote",
                        },
                      ]}
                      className="hidden-asterisk" // Agregar esta línea para ocultar el asterisco
                      initialValue={has > 0 && has}
                    >
                      <Input
                        type="number"
                        style={{
                          width: "82px",
                          marginLeft: '15px',
                          marginBottom: '5px'
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="condicion"
                      label="Condición"
                      rules={[
                        {
                          required: true,
                          message: "Por favor selecciona una condición",
                        },
                      ]}
                      className="hidden-asterisk" // Agregar esta línea para ocultar el asterisco
                    >
                      <Select
                        style={{
                          width: "200px",
                          marginLeft: '17px',
                        }}
                      >
                        <Option value="1">PROPIO</Option>
                        <Option value="2">ALQUILADO</Option>
                      </Select>
                    </Form.Item>

                  </div>
                  {datosArchivo && datosArchivo.Placemark && datosArchivo.Placemark[0] &&
                    <div style={{ display: 'flex', flexDirection: 'column', marginRight: '15px' }}>
                      <label>Latitud: {latitud && parseFloat(latitud).toFixed(2)} </label>
                      <label>Longitud: {longitud && parseFloat(longitud).toFixed(2)} </label>
                    </div>
                  }
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: '5px' }}
                >
                  Guardar
                </Button>
                <Button
                  onClick={() => (
                    setShowFormAgregar(false), limpiezaStates(), setImportarArchivo(false)
                  )}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </Form>
        </Card>
      )}
    </>
  );
};

export default AgregarLotes;
