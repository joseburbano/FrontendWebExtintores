import React, { useState, useEffect } from "react";
import { Button, notification } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import ExportExcel from "react-export-excel";
import { getAccessTokenApi } from "../../../../api/auth";
import { getCovidInformeApi} from "../../../../api/covid";

export default function ReporteCovid() {
  const [reporte, setReporte] = useState(null);

  useEffect(() => {
    const accessToken = getAccessTokenApi();
    getCovidInformeApi(accessToken)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setReporte(response.totalCovid);
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
  console.log(reporte);
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
        filename="Reporte Covid"
      >
        <ExcelSheet data={reporte} name="Covid">
          <ExcelColumn label="Persona" value="user" />
          <ExcelColumn label="sede" value="sede" />
          <ExcelColumn label="diagnostico del covid" value="diagnosticoCovid" />
          <ExcelColumn label="Dias en cuarentena" value="diasCovid" />
          <ExcelColumn label="Sospecha de estar contagiado" value="sospecha" />
          <ExcelColumn label="Fiebre" value="fiebreDias" />
          <ExcelColumn label="problemas respiratorio" value="respiratoriosDias" />
          <ExcelColumn label="Sintomas" value="sintomas" />
          <ExcelColumn label="contacto con familiar de sospecha" value="sospechosoContagiado" />
          <ExcelColumn label="familiares contagiados" value="sospechosoFamiliar" />
          <ExcelColumn label="temperatura" value="temperatura" />
          <ExcelColumn label="Fecha" value="fecha" />
        </ExcelSheet>
      </ExcelFile>
    </div>
  );
}

