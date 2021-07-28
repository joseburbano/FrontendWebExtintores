import React, { useState, useEffect } from "react";
import { Button, notification } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import ExportExcel from "react-export-excel";
import { getAccessTokenApi } from "../../../../api/auth";
import { getNormativaParticipativaApi } from "../../../../api/participacion";

export default function Reporte() {
  const [reporte, setReporte] = useState(null);

  useEffect(() => {
    const accessToken = getAccessTokenApi();
    getNormativaParticipativaApi(accessToken)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setReporte(response.totalParti);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });
  }, []);

  return (
    <div>
      <Excel reporte={reporte} />
    </div>
  );
}

function Excel(props) {
  const { reporte } = props;
  //generar reporte en excel desde la base de datos
  //archivo de excel que se va a crear
  const ExcelFile = ExportExcel.ExcelFile;
  // hoja de escel que se va a crear
  const ExcelSheet = ExportExcel.ExcelSheet;
  //columna de excel
  const ExcelColumn = ExportExcel.ExcelColumn;

  return (
    <div>
      <ExcelFile
        element={
          <Button type="primary" size={"20px"} style={{ background: "green" }}>
            <DownloadOutlined /> EXCEL
          </Button>
        }
        filename="Reporte Normativa Participacion"
      >
        <ExcelSheet data={reporte} name="Normativa Participacion">
          <ExcelColumn label="Clase de riesgo locativo" value="claseRiesgoLocativo" />
          <ExcelColumn label="Condicion Insegura" value="condicionInsegura" />
          <ExcelColumn label="Lugar donde se registra" value="lugar" />
          <ExcelColumn label="Descripcion novedad" value="descripcionNovedad" />
          <ExcelColumn label="Razon que lo provoca" value="motivoRazon" />
          <ExcelColumn label="Posible solucion" value="medidasImplementar" />
          <ExcelColumn label="Fecha" value="fecha" />
        </ExcelSheet>
      </ExcelFile>
    </div>
  );
}
