/* eslint-disable react-hooks/exhaustive-deps */
import { Empty, Select } from "antd";
import React, { useContext, useEffect, useState } from "react";
import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";
import { GlobalContext } from "../../../context/GlobalContext";
import "./index.css";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value.toLocaleString().replace(/,/g, ".")}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export const GraficosEncuestasCultivo = ({ cosechaActiva }) => {
  const URL = process.env.REACT_APP_URL;

  const {
    idCliente,
    selectedAcosDesc,
    cosechaSeleccionada,
    usu,
    setSupEncuestadas,
  } = useContext(GlobalContext);

  const [selectedCultivo, setSelectedCultivo] = useState("");
  const [cultivos, setCultivos] = useState([]);
  const [cultivosSupEncuestadas, setCultivosSupEncuestadas] = useState([]);
  const [cultivosProdEncuestadas, setCultivosProdEncuestadas] = useState([]);
  const [cultivosCostoEncuestadas, setCultivosCostoEncuestadas] = useState([]);
  const [legendSupEncuestadas, setLegendSupEncuestadas] = useState({
    activeIndex: 0,
  });
  const [legendProdEncuestadas, setLegendProdEncuestadas] = useState({
    activeIndex: 0,
  });
  const [legendCostoEncuestadas, setLegendCostoEncuestadas] = useState({
    activeIndex: 0,
  });
  const [totalProduccion, setTotalProduccion] = useState(0);
  const [totalCosto, setTotalCosto] = useState(0);
  const [totalSuperficie, setTotalSuperficie] = useState(0);
  const [lotesxCliente, setLotesxCliente] = useState([]);
  const [selectedLoteCli, setSelectedLoteCli] = useState(-1);

  const onPieEnterSupEncuestadas = (_, index) => {
    setLegendSupEncuestadas({
      activeIndex: index,
    });
  };
  const onPieEnterProdEncuestadas = (_, index) => {
    setLegendProdEncuestadas({
      activeIndex: index,
    });
  };
  const onPieEnterCostoEncuestadas = (_, index) => {
    setLegendCostoEncuestadas({
      activeIndex: index,
    });
  };

  function traeCultivos() {
    const data = new FormData();
    fetch(`${URL}modulos/clientview_listCultivos.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        const cultivosConTodos = [
          { acult_id: "TODOS", acult_desc: "TODOS" },
          ...objetoData,
        ];

        console.log(cultivosConTodos);
        setCultivos(cultivosConTodos);
      });
    });
  }

  function traerLotesCliente() {
    const data = new FormData();
    data.append("idC", idCliente);
    fetch(`${URL}modulos/clientview_listLotes.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        const lotesConTodos = [
          { alote_id: "TODOS", alote_nombre: "TODOS" },
          ...objetoData,
        ];
        setLotesxCliente(lotesConTodos);
      });
    });
  }

  useEffect(() => {
    traeCultivos();
    traerLotesCliente();
  }, []);

  // console.log("cultivosConTodos: ", cultivos);
  // console.log("lotesxCliente: ", lotesxCliente);

  useEffect(() => {
    //console.log("selectedLoteCli: ", Number(selectedLoteCli))
    const dataAdd = new FormData();
    dataAdd.append("idU", usu);
    dataAdd.append("idC", idCliente);

    if (cosechaSeleccionada) {
      dataAdd.append("idCos", cosechaSeleccionada);
    } else {
      dataAdd.append("idCos", cosechaActiva);
    }

    if (selectedCultivo === "TODOS") {
      dataAdd.append("idCul", "");
    } else {
      dataAdd.append("idCul", selectedCultivo);
    }

    if (selectedLoteCli === "TODOS" || selectedLoteCli === -1) {
      dataAdd.append("idLote", "");
    } else {
      dataAdd.append("idLote", Number(selectedLoteCli));
    }

    fetch(`${URL}modulos/clientview_SupEncuestasCultivo.php`, {
      method: "POST",
      body: dataAdd,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        // Transformar los datos antes de asignarlos al estado
        const transformedData = objetoData.map((item) => {
          return { name: item[0], value: item[1], colors: item[2] };
        });
        setCultivosSupEncuestadas(transformedData);
        // Calcular el total de los valores
        const total = transformedData.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.value;
        }, 0);
        // Hacer algo con el total, como asignarlo a un estado
        setSupEncuestadas(total);
        setTotalSuperficie(total.toLocaleString().replace(/,/g, "."));
      });
    });
  }, [selectedCultivo, selectedAcosDesc, selectedLoteCli]);

  useEffect(() => {
    const dataAdd = new FormData();

    dataAdd.append("idU", usu);
    dataAdd.append("idC", idCliente);

    if (cosechaSeleccionada) {
      dataAdd.append("idCos", cosechaSeleccionada);
    } else {
      dataAdd.append("idCos", cosechaActiva);
    }
    if (selectedCultivo === "TODOS") {
      dataAdd.append("idCul", "");
    } else {
      dataAdd.append("idCul", selectedCultivo);
    }

    if (selectedLoteCli === "TODOS" || selectedLoteCli === -1) {
      dataAdd.append("idLote", "");
    } else {
      dataAdd.append("idLote", Number(selectedLoteCli));
    }

    fetch(`${URL}modulos/clientview_ProdEncuestasCultivo.php`, {
      method: "POST",
      body: dataAdd,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        // Transformar los datos antes de asignarlos al estado
        const transformedData = objetoData.map((item) => {
          return { name: item[0], value: item[1], colors: item[2] };
        });
        setCultivosProdEncuestadas(transformedData);
        // Calcular el total de los valores
        const total = transformedData.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.value;
        }, 0);
        setTotalProduccion(total.toLocaleString().replace(/,/g, "."));
      });
    });
  }, [selectedCultivo, selectedAcosDesc, selectedLoteCli]);

  useEffect(() => {
    //console.log("cli costo estimado: ", idCliente)
    const dataAdd = new FormData();
    dataAdd.append("idU", usu);
    dataAdd.append("idC", idCliente);
    if (cosechaSeleccionada) {
      dataAdd.append("idCos", cosechaSeleccionada);
    } else {
      dataAdd.append("idCos", cosechaActiva);
    }
    if (selectedCultivo === "TODOS") {
      dataAdd.append("idCul", "");
    } else {
      dataAdd.append("idCul", selectedCultivo);
    }

    if (selectedLoteCli === "TODOS" || selectedLoteCli === -1) {
      dataAdd.append("idLote", "");
    } else {
      dataAdd.append("idLote", Number(selectedLoteCli));
    }

    fetch(`${URL}modulos/clientview_CostoEncuestasCultivo.php`, {
      method: "POST",
      body: dataAdd,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        // Transformar los datos antes de asignarlos al estado
        const transformedData = objetoData.map((item) => {
          return { name: item[0], value: item[1], colors: item[2] };
        });
        setCultivosCostoEncuestadas(transformedData);
        // Calcular el total de los valores
        const total = transformedData.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.value;
        }, 0);
        setTotalCosto(total.toLocaleString().replace(/,/g, "."));
      });
    });
  }, [selectedCultivo, selectedAcosDesc, selectedLoteCli]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <div style={{ paddingBottom: "5px" }}>
                <h1 className="titulos">ENCUESTA DE SIEMBRA</h1>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "10px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ marginLeft: "5px" }}>
                    <h1 className="titulos">LOTES</h1>
                  </div>
                  <div>
                    <Select
                      style={{ width: "200px" }}
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children &&
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      onChange={(value) => setSelectedLoteCli(value)}
                      defaultValue="TODOS"
                    >
                      {lotesxCliente.map((lotCli) => (
                        <Select.Option
                          key={lotCli.alote_id}
                          value={lotCli.alote_id}
                        >
                          {lotCli.alote_nombre}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "20px",
                  }}
                >
                  <div style={{ marginLeft: "5px" }}>
                    <h1 className="titulos">CULTIVO</h1>
                  </div>
                  <div>
                    <Select
                      style={{ width: "200px" }}
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children &&
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      onChange={(value) => setSelectedCultivo(value)}
                      defaultValue="TODOS"
                    >
                      {cultivos.map((cultivo) => (
                        <Select.Option
                          key={cultivo.acult_id}
                          value={cultivo.acult_id}
                        >
                          {cultivo.acult_desc}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                </div>
                {/* <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px" }}>
                  <div style={{ marginLeft: "5px" }}>
                    <h1 className="titulos">ESTADO</h1>
                  </div>
                  <div>
                    <Select
                      style={{ width: "200px" }}
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children &&
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      onChange={(value) => setSelectedCultivo(value)}
                      defaultValue="TODOS"
                    >
                      {cultivos.map((cultivo) => (
                        <Select.Option
                          key={cultivo.acult_id}
                          value={cultivo.acult_id}
                        >
                          {cultivo.acult_desc}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", paddingTop: "5px" }}
        >
          <div
            style={{
              width: "33%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>
              <h1 className="titulos">
                SUP. ENCUESTADA: {totalSuperficie} HAS.
              </h1>
            </div>
            {cultivosSupEncuestadas.length === 0 ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <ResponsiveContainer className="" width="100%" height={260}>
                <PieChart width={800} height={400}>
                  <Pie
                    data={cultivosSupEncuestadas}
                    activeIndex={legendSupEncuestadas.activeIndex}
                    activeShape={renderActiveShape}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                    onMouseEnter={onPieEnterSupEncuestadas}
                  >
                    {cultivosSupEncuestadas.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.colors} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) =>
                      value.toLocaleString().replace(/,/g, ".")
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <div
            style={{
              width: "33%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>
              <h1 className="titulos">
                PRODUCCION ESTIMADA: {totalProduccion} TT
              </h1>
            </div>
            {cultivosProdEncuestadas.length === 0 ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <ResponsiveContainer className="" width="100%" height={260}>
                <PieChart width={800} height={400}>
                  <Pie
                    data={cultivosProdEncuestadas}
                    activeIndex={legendProdEncuestadas.activeIndex}
                    activeShape={renderActiveShape}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                    onMouseEnter={onPieEnterProdEncuestadas}
                  >
                    {cultivosProdEncuestadas.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.colors} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) =>
                      value.toLocaleString().replace(/,/g, ".")
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <div
            style={{
              width: "33%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>
              <h1 className="titulos">COSTO ESTIMADO: U$S {totalCosto}</h1>
            </div>
            {cultivosCostoEncuestadas.length === 0 ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <ResponsiveContainer className="" width="100%" height={260}>
                <PieChart width={800} height={400}>
                  <Pie
                    data={cultivosCostoEncuestadas}
                    activeIndex={legendCostoEncuestadas.activeIndex}
                    activeShape={renderActiveShape}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                    onMouseEnter={onPieEnterCostoEncuestadas}
                  >
                    {cultivosCostoEncuestadas.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.colors} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) =>
                      value.toLocaleString().replace(/,/g, ".")
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
