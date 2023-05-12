import React, { useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import {
    Form,
    Select,
  } from "antd";

const EditarLotes = () => {
    const URL = process.env.REACT_APP_URL;
    const [form] = Form.useForm();
    const { Option } = Select;
  
    const {
      idCliente,
  
      //Ver lotes
      visible,
      setVisible,
      infoLotes,
      showFormAgregar,
      setShowFormAgregar,
      loteId,
      setLoteId,
      setIsTableUpdated,
      setSelectedLote,
  
      //usuario
      usu,
      c,
      setC,
      geoJSONModificado,
      marcarLote,
      setMarcarLote,
      showMapaUbicLote,
      setShowMapaUbicLote,
      showTable, 
      setShowTable,
    } = useContext(GlobalContext);


    return (
        <>
            
        </>
    );
};

export default EditarLotes;