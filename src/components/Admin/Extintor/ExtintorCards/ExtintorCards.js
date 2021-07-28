import React, { useState, useEffect } from "react";
import { Row, Col, Modal, Card, notification } from "antd";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import NoAvatar from "../../../../assets/img/PNG/no-extintor.png";
import { Link } from "react-router-dom";
import { getAccessTokenApi } from "../../../../api/auth";
import {
  deleteExtintorApi,
  getAvatarExtintorApi,
} from "../../../../api/extintor";

import "./ExtintorCards.scss";

const { confirm } = Modal;
const { Meta } = Card;

export default function ExtintorList(props) {
  const { extintor, setReloadExtintor, editExtintor } = props;
  

  const deleteExtintor = (extinto) => {
    const accessToken = getAccessTokenApi();
    confirm({
      title: "Eliminando Extintor",
      content: `¿Estas seguro de eliminar el extintor ${extinto.placa}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteExtintorApi(accessToken, extinto._id)
          .then((response) => {
            const typeNotification =
              response.code === 200 ? "success" : "warning";
            notification[typeNotification]({
              message: response.message,
            });
            setReloadExtintor(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor.",
            });
          });
      },
    });
  };

  const extintores = extintor.docs;

  return (
    <div className="extintores-cards">
      <Row>
        {extintores.map((extinto) => (
          <Col md={8} key={extinto._id} className="extintores-list__extintor">
            <Extintor
              extinto={extinto}
              deleteExtintor={deleteExtintor}
              editExtintor={editExtintor}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

function Extintor(props) {
  const { extinto, deleteExtintor, editExtintor } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (extinto.foto) {
      getAvatarExtintorApi(extinto.foto).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [extinto]);

  return (
    <div className="cards-items">
      <Card
        style={({ width: "90%" }, { margin: "10px" })}
        cover={<img alt="Foto Extintor" src={avatar ? avatar : NoAvatar} />}
        actions={[
          <Link to={`extintores/${extinto.url}`}>
            <EyeOutlined key="ellipsis" />
          </Link>,
          <EditOutlined key="edit" onClick={() => editExtintor(extinto)} />,
          <DeleteOutlined
            key="delete"
            onClick={() => deleteExtintor(extinto)}
          />,
        ]}
      >
        <Meta
          title={`Placa: ${extinto.placa}`}
          description={`
          Sede: ${extinto.sede}, 
          Fecha de Vencimiento: ${extinto.fechaVencimiento},
          Tipo de Extintor: ${extinto.tipoExt},`}
        />
      </Card>
    </div>
  );
}
