import React, { useState, useEffect } from "react";
import { Spin, notification, Table, Image } from "antd";
import moment from "moment";
import { getExtinApi, getAvatarExtintorApi } from "../../../../api/extintor";
import "moment/locale/es";
import "./ExtintorInfo.scss";
import NoExtintor from "../../../../assets/img/PNG/no-extintor.png"
export default function ExtintorInfo(props) {
  const { url } = props;
  const [extintorInfo, setExtintorInfo] = useState(null);
  const [imator, setImator] = useState(null);
  const [imagenExtintor, setImagenExtintor] = useState(null);

  useEffect(() => {
    getExtinApi(url)
      .then((response) => {
        if (response.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setExtintorInfo(response.extintor);
          setImator(response.foto);
        }
      })
      .catch(() => {
        notification["warning"]({
          message: "Error del servidor.",
        });
      });
  }, [url]);

  useEffect(() => {
    if (imator) {
      getAvatarExtintorApi(imator).then((response) => {
        setImagenExtintor(response);
      });
    } else {
      setImagenExtintor(null);
    }
  }, [imator])
    
  //muestra animacion mientras cargan datos
  if (!extintorInfo) {
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
      descripcion: "Tipo de extintor",
      informacion: extintorInfo.tipoExt,
    },
    {
      key: "2",
      descripcion: "tamaño del extintore",
      informacion: extintorInfo.tamanio,
    },
    {
      key: "3",
      descripcion: "Sede",
      informacion: extintorInfo.sede,
    },
    {
      key: "4",
      descripcion: "Bloque",
      informacion: extintorInfo.ubicacionBloque,
    },
    {
      key: "5",
      descripcion: "Piso",
      informacion: extintorInfo.ubicacionPiso,
    },
    {
      key: "6",
      descripcion: "Daño Fisico",
      informacion: extintorInfo.danoFisico,
    },
    {
      key: "7",
      descripcion: "Observaciones",
      informacion: extintorInfo.observaciones,
    },
    {
      key: "8",
      descripcion: "Fecha de creacion",
      informacion: extintorInfo.fechaCreate,
    },
    {
      key: "9",
      descripcion: "Fecha de su ultima recarga",
      informacion: extintorInfo.fechaRecarga,
    },
    {
      key: "10",
      descripcion: "Estado de los sellos",
      informacion: extintorInfo.estadoSello,
    },
    {
      key: "11",
      descripcion: "Estado de la placa",
      informacion: extintorInfo.estadoPlaca,
    },
  ];

  return (
    <div className="extintor-info">
      <h1 className="extintor-info__title">{extintorInfo.placa}</h1>
      <div className="extintor-info__creation-date">
        <h1>Fecha de Vencimiento </h1>
        {moment(extintorInfo.fechaVencimiento).local("es").format("LL")}
      </div>

      <Image width={200} src={imagenExtintor ? imagenExtintor : NoExtintor}  className="imagen"/>

      <Table columns={columns} dataSource={data} style={{"marginTop":"18%"}}/>
    </div>
  );
}
