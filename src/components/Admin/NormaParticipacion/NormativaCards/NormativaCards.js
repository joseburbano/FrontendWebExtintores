import React, { useEffect, useState } from "react";
import { Modal, Avatar, notification, List } from "antd";
import { Link } from "react-router-dom";
import NoAvatar from "../../../../assets/img/PNG/9.1 no-avatar.png";
import NoAvatarParti from "../../../../assets/img/JPG/noNormativa.jpg";
import { getAccessTokenApi } from "../../../../api/auth";
import {
  deleteParticipacionApi,
  getAvatarParticiApi,
  getAvatarParticiUSerApi,
  updateParticipacionApi,
} from "../../../../api/participacion";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleTwoTone,
  SmileOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";

import "./NormativaCards.scss";

const { confirm } = Modal;
export default function NormativaCards(props) {
  const { normativa, setReloadNormativa, editNormativa } = props;

  const deleteNormativa = (gh) => {
    const accessToken = getAccessTokenApi();
    confirm({
      title: "Eliminando Normativa",
      content: `¿Estas seguro de eliminar la Normativa ${gh._id}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteParticipacionApi(accessToken, gh._id)
          .then((response) => {
            const typeNotification =
              response.code === 200 ? "success" : "warning";
            notification[typeNotification]({
              message: response.message,
            });
            setReloadNormativa(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor.",
            });
          });
      },
    });
  };

  //funcion para actualizar normativas
  const vistoNormativa = (gh) => {
    gh.estado = true;
    const token = getAccessTokenApi();
    updateParticipacionApi(token, gh._id, gh)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        setReloadNormativa(true);
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });
  };

  const normativas = normativa.docs;
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={normativas}
      renderItem={(gh) => (
        <Cargu
          gh={gh}
          deleteNormativa={deleteNormativa}
          editNormativa={editNormativa}
          vistoNormativa={vistoNormativa}
          setReloadNormativa={setReloadNormativa}
        />
      )}
    />
  );
}

function Cargu(props) {
  const {
    gh,
    deleteNormativa,
    editNormativa,
    vistoNormativa,
    setReloadNormativa,
  } = props;
  const [avatarParticiUser, setAvatarParticiUser] = useState(null);
  const [avatarPartici, setAvatarPartici] = useState(null);
  const [icono, setIcono] = useState(null);

  useState(() => {
    if (gh.estado === true) {
      setIcono("#52c41ef");
    } else {
      setIcono("#52c41a");
      setReloadNormativa(true);
    }
  }, [gh]);

  useEffect(() => {
    if (gh.user.avatar) {
      getAvatarParticiUSerApi(gh.user.avatar).then((response) => {
        setAvatarParticiUser(response);
      });
    } else {
      setAvatarParticiUser(null);
    }
  }, [gh]);

  useEffect(() => {
    if (gh.avatar) {
      getAvatarParticiApi(gh.avatar).then((response) => {
        setAvatarPartici(response);
      });
    } else {
      setAvatarPartici(null);
    }
  }, [gh]);

  return (
    <List.Item
      key={gh.claseRiesgoLocativo}
      extra={
        <img
          className="imagen"
          width={272}
          alt="logo"
          src={avatarPartici ? avatarPartici : NoAvatarParti}
        />
      }
      actions={[
        <Link to={`normativa/${gh.url}`}>
          <EyeOutlined key="ellipsis" />
        </Link>,
        <EditOutlined key="edit" onClick={() => editNormativa(gh)} />,
        <DeleteOutlined key="delete" onClick={() => deleteNormativa(gh)} />,
        <CheckCircleTwoTone
          twoToneColor={icono}
          onClick={() => vistoNormativa(gh)}
        />,
      ]}
    >
      <List.Item.Meta
        avatar={
          <Avatar src={avatarParticiUser ? avatarParticiUser : NoAvatar} />
        }
        title={`Clase de Riesgo: ${gh.claseRiesgoLocativo} Nombre del declarante ${gh.user.fullname}`}
        description={gh.descripcionNovedad}
        content={gh.descripcionNovedad}
      />
      {gh.content}
    </List.Item>
  );
}
