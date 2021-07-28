import React, { useState, useEffect } from "react";
import { Spin, notification, Table, Image } from "antd";
import moment from "moment";
import { getInfoConvidApi, getAvatarCovidApi } from "../../../../api/covid";
import "moment/locale/es";
import "./InfoCovid.scss";
import NoAvatar from "../../../../assets/img/PNG/9.1 no-avatar.png";


export default function InfoCovid(props) {
  const { url } = props;
  const [covidInfo, setCovidInfo] = useState(null);
  const [avaCovi, setAvaCovi] = useState(null);
  const [avatarCovi, setAvatarCovi] = useState(null);
  useEffect(() => {
    getInfoConvidApi(url)
      .then((response) => {
        if (response.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setCovidInfo(response.covi);
          setAvaCovi(response.avatar);
        }
      })
      .catch(() => {
        notification["warning"]({
          message: "Error del servidor.",
        });
      });
  }, [url]);
  
  useEffect(() => {
    if (avaCovi) {
      getAvatarCovidApi(avaCovi).then((response) => {
        setAvatarCovi(response);
      });
    } else {
      setAvatarCovi(null);
    }
  }, [avaCovi]);

  if (!covidInfo) {
    return (
      <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }} />
    );
  }
console.log(covidInfo);
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
      descripcion: "Nombre del usuario",
      informacion: covidInfo.user.fullname,
    },
    {
      key: "2",
      descripcion: "diagnosticado con covid",
      informacion: covidInfo.diagnosticoCovid,
    },
    {
      key: "3",
      descripcion: "Cuantos dias ha estado aislado",
      informacion: covidInfo.diasCovid,
    },
    {
      key: "4",
      descripcion: "sospecha de estar contagiado",
      informacion: covidInfo.sospecha,
    },
    {
      key: "5",
      descripcion: "Fiebre en los ultimos dias",
      informacion: covidInfo.fiebreDias,
    },
    {
      key: "6",
      descripcion: "Problemas respiratorios",
      informacion: covidInfo.respiratoriosDias,
    },
    {
      key: "7",
      descripcion: "Presentado sintomas",
      informacion: covidInfo.sintomas,
    },
    {
      key: "8",
      descripcion: "contacto con familiares que sospeche",
      informacion: covidInfo.sospechosoContagiado,
    },
    {
      key: "9",
      descripcion: "contacto con familiares contagiados",
      informacion: covidInfo.sospechosoFamiliar,
    },
  ];

  return (
    <div className="extintor-info">
      <h1 className="extintor-info__title">{covidInfo.temperatura}°</h1>
      <div className="extintor-info__creation-date">
        <h1>Informacion del registro</h1>
        {moment(covidInfo.fecha).local("es").format("LL")}
      </div>
      <Image width={200} src={avatarCovi ? avatarCovi : NoAvatar}  className="imagen"/>

      <Table columns={columns} dataSource={data} style={{"marginTop":"10%"}}/>
    </div>
  );
}
