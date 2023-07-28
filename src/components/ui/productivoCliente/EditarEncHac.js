import { Button, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React, { useContext, useRef } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const EditarEncHac = () => {
    const URLDOS = process.env.REACT_APP_URL;

  const formRef = useRef(null);

  const { idCliente, setDrawerEditar, actualizarEncHac, setActualizarEncHac } =
    useContext(GlobalContext);

  const initialValues = {
    tambosPro: 0,
    tambosCab: 0,
    litro: 0,
    feedlot: 0,
    invernador: 0,
    cria: 0,
  };

  //* FUNCION QUE CARGA LOS DATOS DE UNA NUEVA ENCUESTA HACIENDA
  function editarEnc(values) {
    console.log("idC", idCliente);
    console.log("tambosPro", Number(values.tambosPro));
    console.log("tambosCab", Number(values.tambosCab));
    console.log("litro", Number(values.litro));
    console.log("feedlot", Number(values.feedlot));
    console.log("invernador", Number(values.invernador));
    console.log("cria", Number(values.cria));

    // const data = new FormData();
    // data.append("idC", idCliente);
    // data.append("tambosPro", values.tambosPro);
    // data.append("tambosCab", values.tambosCab);
    // data.append("litro", values.litro);
    // data.append("feedlot", values.feedlot);
    // data.append("invernador", values.invernador);
    // data.append("cria", values.cria);

    // fetch(`${URLDOS}nuevaEncHac.php`, {
    //   method: "POST",
    //   body: data,
    // }).then(function (response) {
    //   response.text().then((resp) => {
    //     const data = resp;
    //     console.log(data);
    //   });
    // });

    // Limpiar el formulario
    formRef.current.setFieldsValue(initialValues);

    setDrawerEditar(false);
    //setActualizarEncHac(!actualizarEncHac);
  }

  return (
    <>
      <Form
        layout="vertical"
        ref={formRef}
        onFinish={editarEnc}
        initialValues={initialValues}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            bottom: "0",
            width: "100%",
            marginLeft:"11px"
          }}
        >
          <FormItem name="tambosPro" label="Cantidad Tambos">
            <Input
              style={{
                marginTop: "-5px",
                marginBottom: "10px",
                width: "250px",
              }}
            />
          </FormItem>
          <FormItem name="tambosCab" label="Cantidad Vacas en ordeñe">
            <Input
              style={{
                marginTop: "-5px",
                marginBottom: "10px",
                width: "250px",
              }}
            />
          </FormItem>
          <FormItem name="litro" label="Producción Litro/Día">
            <Input
              style={{
                marginTop: "-5px",
                marginBottom: "10px",
                width: "250px",
              }}
            />
          </FormItem>
          <FormItem name="feedlot" label="Produccion Anual FeedLot">
            <Input
              style={{
                marginTop: "-5px",
                marginBottom: "10px",
                width: "250px",
              }}
            />
          </FormItem>
          <FormItem name="invernador" label="Produccion Anual Invernador">
            <Input
              style={{
                marginTop: "-5px",
                marginBottom: "10px",
                width: "250px",
              }}
            />
          </FormItem>
          <FormItem name="cria" label="Produccion Anual Cria">
            <Input
              style={{
                marginTop: "-5px",
                marginBottom: "10px",
                width: "250px",
              }}
            />
          </FormItem>
        </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
              bottom: "0",
              width: "100%",
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", fontWeight: "500" }}
            >
              GUARDAR
            </Button>
          </div>
      </Form>
    </>
  );
};

export default EditarEncHac;