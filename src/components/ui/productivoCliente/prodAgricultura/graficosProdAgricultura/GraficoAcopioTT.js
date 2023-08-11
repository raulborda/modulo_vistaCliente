import React, { useContext, useEffect, useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./graficos.css";
import { GlobalContext } from "../../../../context/GlobalContext";
import TabPane from "antd/es/tabs/TabPane";
import { Spin, Tabs } from "antd";
import { format } from "d3-format";

export const GraficoAcopioTT = () => {
  const items = [
    {
      key: "1",
      label: `Total`,
      children: `Total 1`,
    },
    {
      key: "2",
      label: `Soja`,
      children: `Soja 2`,
    },
    {
      key: "3",
      label: `Trigo`,
      children: `Trigo 3`,
    },
    {
      key: "4",
      label: `Maíz`,
      children: `Maiz 4`,
    },
    {
      key: "5",
      label: `Otros Granos`,
      children: `Otros granos 5`,
    },
  ];

  const [isLoading, setIsLoading] = useState(1);

  const handleChangeTab = (key) => {
    setActiveKey(key);
    setIsLoading(1);
  };

  useEffect(() => {
    if (isLoading > 0) {
      setTimeout(() => {
        setIsLoading(isLoading - 1);
      }, 1000);
    } else {
      setIsLoading(0);
    }
  }, [isLoading]);

  const {
    isDataTotal,
    isDataSoja,
    isDataTrigo,
    isDataMaiz,
    isDataOtrosGranos,
  } = useContext(GlobalContext);

  const [activeKey, setActiveKey] = useState(items[0].key);
  const [isValorEntregadas, setIsValorEntregadas] = useState(true);
  const [isValorEncuesta, setIsValorEncuesta] = useState(true);

  let data;
  switch (activeKey) {
    case "1":
      data = isDataTotal;
      break;
    case "2":
      data = isDataSoja;
      break;
    case "3":
      data = isDataTrigo;
      break;
    case "4":
      data = isDataMaiz;
      break;
    case "5":
      data = isDataOtrosGranos;
      break;
    default:
      data = isDataTotal;
      break;
  }

  let entregadasArray = [];
  let encuestaArray = [];

  // Extraer los valores de "Entregadas" y "Encuesta" en arreglos separados
  for (let i = 0; i < isDataTotal.length; i++) {
    entregadasArray.push(parseInt(isDataTotal[i].Entregadas));
    encuestaArray.push(parseInt(isDataTotal[i].Encuesta));
  }

  // Obtener el valor mínimo y máximo de "Entregadas" y "Encuesta"
  const minEntregadas = Math.min(...entregadasArray);
  const maxEntregadas = Math.max(...entregadasArray);
  const minEncuesta = Math.min(...encuestaArray);
  const maxEncuesta = Math.max(...encuestaArray);

  // Obtener el valor mínimo y máximo final entre "Entregadas" y "Encuesta"
  let minTotal = Math.min(minEntregadas, minEncuesta);
  const maxTotal = Math.max(maxEntregadas, maxEncuesta);

  //Evaluo si el minimo valor es negativo, si es negativo se deja tal cual, sino el minimo es cero
  if (minTotal >= 0){
    minTotal = 0;
  }

  // Sumarle el 10% al valor máximo total
    const maxTotalConIncremento = maxTotal * 1.02;
    
//   console.log("Valor mínimo total:", minTotal);
//   console.log("Valor máximo total:", maxTotal);

  const handleLegendClick = (x) => {
    if (x.value === "TT Entregadas") {
      setIsValorEntregadas(!isValorEntregadas);
    }

    if (x.value === "TT Encuesta") {
      setIsValorEncuesta(!isValorEncuesta);
    }
  };

  return (
    <>
      <div div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <div style={{ width: "100%", marginRight: "10px" }}>
          <div>
            <h1 className="titulos">ANALISIS CEREAL ENTREGADO</h1>
          </div>
          {isLoading > 0 ? (
            <Tabs
              className="tabs-custom"
              activeKey={activeKey}
              onChange={(key) => handleChangeTab(key)}
            >
              {items.map((item) => (
                <TabPane
                  disabled={true}
                  key={item.key}
                  tab={item.label}
                ></TabPane>
              ))}
            </Tabs>
          ) : (
            <Tabs
              className="tabs-custom"
              activeKey={activeKey}
              onChange={(key) => handleChangeTab(key)}
            >
              {items.map((item) => (
                <TabPane key={item.key} tab={item.label}></TabPane>
              ))}
            </Tabs>
          )}

          {isLoading > 0 ? (
            <Spin
              className="prueba"
              tip="Loading"
              size="large"
              style={{ borderColor: "red" }}
            >
              {" "}
              <div className="SpinLoading" />{" "}
            </Spin>
          ) : (
            <ResponsiveContainer className="GrafAcopio" width="100%" height={230} style={{marginTop:"-15px !important"}}>
              <ComposedChart
                height={250}
                data={
                  activeKey === "1"
                    ? isDataTotal
                    : activeKey === "2"
                    ? isDataSoja
                    : activeKey === "3"
                    ? isDataTrigo
                    : activeKey === "4"
                    ? isDataMaiz
                    : isDataOtrosGranos
                }
                margin={{
                  top: 20,
                  right: 0,
                  left: 0,
                  bottom: 12,
                }}
              >
                <CartesianGrid vertical={false} horizontal={true} />
                <XAxis dataKey="cosecha" tick={() => null} />
                <YAxis
                  domain={[minTotal, maxTotalConIncremento]}
                  tick={{ fontSize: 11 }}
                  //   label={{
                  //     value: "TT",
                  //     angle: -90,
                  //     position: "insideLeft",
                  //     offset: -5,
                  //     fontSize: "13px",
                  //   }}
                />
                <Tooltip
                  formatter={(value, name) =>
                    name === "TT Entregadas" || name === "TT Encuesta"
                      ? format(",")(parseFloat(value).toFixed(0)).replace(/,/g, ".")
                      : value
                  }
                />
                <Legend onClick={(x) => handleLegendClick(x)} />
                {isValorEntregadas ? (
                  <Bar
                    dataKey="Entregadas"
                    name="TT Entregadas"
                    barSize={50}
                    fill="#8fd14a"
                    legendType="circle"
                  >
                    <LabelList
                      dataKey="cosecha"
                      position="bottom"
                      fontSize={13}
                    />
                    <LabelList
                      dataKey="Porcentaje"
                      position="bottom"
                      dy={13}
                      fontSize={13}
                    />
                  </Bar>
                ) : (
                  <Bar
                    dataKey={0}
                    name="TT Entregadas"
                    barSize={50}
                    fill="#d8d8d8"
                    legendType="circle"
                  >
                    <LabelList
                      dataKey="cosecha"
                      position="bottom"
                      fontSize={13}
                    />
                    <LabelList
                      dataKey="Porcentaje"
                      position="bottom"
                      dy={13}
                      fontSize={13}
                    />
                  </Bar>
                )}
                {isValorEncuesta ? (
                  <Line
                    type="monotone"
                    name="TT Encuesta"
                    dataKey="Encuesta"
                    stroke="#00b33b"
                    strokeWidth={2}
                  />
                ) : (
                  <Line
                    type="monotone"
                    name="TT Encuesta"
                    dataKey={0}
                    stroke="#d8d8d8"
                    strokeWidth={2}
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </>
  );
};
