import React, { useState, useEffect } from "react";
import { Spin, notification, Table, Image } from "antd";
import moment from "moment";
import { getPartiApi, getAvatarPartiApi } from "../../../../api/participacion";
import "moment/locale/es";
import "./InfoNormaParticipacion.scss";
import NoNormativa from "../../../../assets/img/JPG/noNormativa.jpg";
export default function InfoNormaParticipacion(props) {
  const { url } = props;
  const [normativaInfo, setNormativaInfo] = useState(null);
  const [infNorm, setInfNorm] = useState(null);
  const [imagenRepo, setImagenRepo] = useState(null);

  useEffect(() => {
    getPartiApi(url)
      .then((response) => {
        if (response.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setNormativaInfo(response.participante);
          setInfNorm(response.avatar);
        }
      })
      .catch(() => {
        notification["warning"]({
          message: "Error del servidor.",
        });
      });
  }, [url]);

  useEffect(() => {
    if (infNorm) {
      getAvatarPartiApi(infNorm).then((response) => {
        setImagenRepo(response);
      });
    } else {
      setImagenRepo(null);
    }
  }, [infNorm]);

  if (!normativaInfo) {
    return (
      <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }} />
    );
  }

  const columns = [
    {
      title: "Descripcion",
      dataIndex: "descripcion",
      key: "descripcion",
    },
    {
      title: "Información",
      dataIndex: "informacion",
      key: "informacion",
    },
  ];

  const data = [
    {
      key: "1",
      descripcion: "Nombre del colaborador",
      informacion: normativaInfo.user.fullname,
    },
    {
      key: "2",
      descripcion: "Cargo",
      informacion: normativaInfo.user.tipo,
    },
    {
      key: "3",
      descripcion: "Clase de riesgo",
      informacion: normativaInfo.claseRiesgoLocativo,
    },
    {
      key: "4",
      descripcion: "Novedad que reporta",
      informacion: normativaInfo.condicionInsegura,
    },
    {
      key: "5",
      descripcion: "Lugar del reporte",
      informacion: normativaInfo.lugar,
    },
    {
      key: "6",
      descripcion: "Descripcion del reporte",
      informacion: normativaInfo.descripcionNovedad,
    },
    {
      key: "7",
      descripcion: "Motivo que la provoca",
      informacion: normativaInfo.motivoRazon,
    },
    {
      key: "8",
      descripcion: "Posible solucion",
      informacion: normativaInfo.medidasImplementar,
    },
    {
      key: "9",
      descripcion: "Fecha",
      informacion: normativaInfo.fecha,
    },
    {
      key: "10",
      descripcion: "Requiere primeros auxilios",
      informacion: normativaInfo.primerosAuxilios,
    },
    {
      key: "11",
      descripcion: "tiene relacion con el trabajo",
      informacion: normativaInfo.relacionTrabajo,
    },
  ];
  return (
    <div className="extintor-info">
      <h1 className="extintor-info__title">
        {normativaInfo.claseRiesgoLocativo}
      </h1>
      <div className="extintor-info__creation-date">
        <h1>Informe de la peticion</h1>
        {moment(normativaInfo.fecha).local("es").format("LL")}
      </div>
      <Image
        width={200}
        src={imagenRepo ? imagenRepo : NoNormativa}
        className="imagen"
      />
      <Table columns={columns} dataSource={data} className="table" />
    </div>
  );
}
