import React, { useState, useEffect } from "react";
import { notification, List, Avatar, Modal } from "antd";
import { deleteCovidApi, getAvatarCovidApi } from "../../../../api/covid";
import { getAccessTokenApi } from "../../../../api/auth";
import NoAvatar from "../../../../assets/img/PNG/9.1 no-avatar.png";
import "./ListCovid.scss";
import { Link } from "react-router-dom";
export default function ListCovid(props) {
  const { listaCovid, setReloadCovid, editCovid } = props;
  const { confirm } = Modal;

  const deleteCovid = (unoPor) => {
    const accessToken = getAccessTokenApi();
    confirm({
      title: "Eliminando Registro de Covid-19",
      content: `¿Estas seguro de eliminar el registro de ${unoPor.user.fullname}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteCovidApi(accessToken, unoPor._id)
          .then((response) => {
            const typeNotification =
              response.code === 200 ? "success" : "warning";
            notification[typeNotification]({
              message: response.message,
            });
            setReloadCovid(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor.",
            });
          });
      },
    });
  };

  return (
    <div className="covid-list">
      <List
        className="covid-list__Unolist"
        itemLayout="horizontal"
        dataSource={listaCovid}
        renderItem={(unoPor) => (
          <Covidss
            unoPor={unoPor}
            deleteCovid={deleteCovid}
            editCovid={editCovid}
            NoAvatar={NoAvatar}
          />
        )}
      />
    </div>
  );
}

function Covidss(props) {
  const { unoPor, deleteCovid, editCovid, NoAvatar } = props;
  const [avatarCovid, setAvatarCovid] = useState(null);

  useEffect(() => {
    if (unoPor.user) {
      getAvatarCovidApi(unoPor.user.avatar).then((response) => {
        setAvatarCovid(response);
      });
    } else {
      setAvatarCovid(null);
    }
  }, [unoPor]);

  return (
    <List.Item
      className="botones"
      actions={[
        <div className="boton">
          <a className="editar" onClick={() => editCovid(unoPor)}>
            editar
          </a>

          <Link className="ver" to={`covids/${unoPor.url}`}>
            Ver
          </Link>

          <a className="del" onClick={() => deleteCovid(unoPor)}>
            Eliminar
          </a>
        </div>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatarCovid ? avatarCovid : NoAvatar} />}
        title={<a>{unoPor.temperatura}°C</a>}
        description={`Sospecha: ${
          unoPor ? unoPor.sospecha : "No se encontro registro"
        }, Nombre: ${
          unoPor.user ? unoPor.user.fullname : "No se encontro registro"
        }, Tipo de usuario:${
          unoPor.user ? unoPor.user.tipo : "No se encontro registro"
        }`}
      />
    </List.Item>
  );
}
