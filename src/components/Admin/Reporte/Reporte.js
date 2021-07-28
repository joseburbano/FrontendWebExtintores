import React, { useState, useEffect } from "react";
import { Button, notification } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import ExportExcel from "react-export-excel";
import { getAccessTokenApi } from "../../../api/auth";
import { getRegistroExtintoresApi } from "../../../api/extintor";
export default function Reporte() {
  const [reporte, setReporte] = useState(null);

  useEffect(() => {
    const accessToken = getAccessTokenApi();
    getRegistroExtintoresApi(accessToken)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setReporte(response.totalExtint);
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
        filename="Reporte Extintores"
      >
        <ExcelSheet data={reporte} name="Extintores">
          <ExcelColumn label="Numero de placa" value="placa" />
          <ExcelColumn label="Tipo de Extintor" value="tipoExt" />
          <ExcelColumn label="Tamaño del extintor" value="tamanio" />
          <ExcelColumn label="Sede" value="sede" />
          <ExcelColumn label="Bloque" value="ubicacionBloque" />
          <ExcelColumn label="Piso" value="ubicacionPiso" />
          <ExcelColumn label="Estado de los sellos" value="estadoSello" />
          <ExcelColumn label="Estado de la placa" value="estadoPlaca" />
          <ExcelColumn label="Estado general" value="estado" />
          <ExcelColumn label="Fecha de Recarga" value="fechaRecarga" />
          <ExcelColumn label="Fecha de vencimiento" value="fechaVencimiento" />
          <ExcelColumn label="Daño Fisicos" value="danoFisico" />
          <ExcelColumn label="Observaciones" value="observaciones" />
          <ExcelColumn label="Fecha de Actualizacion" value="fechaUpdate" />
          <ExcelColumn label="Fecha de Creacion" value="fechaCreate" />
        </ExcelSheet>
      </ExcelFile>
    </div>
  );
}
