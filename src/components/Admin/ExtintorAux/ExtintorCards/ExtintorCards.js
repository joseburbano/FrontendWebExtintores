import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import NoAvatar from "../../../../assets/img/PNG/no-extintor.png";
import { Link } from "react-router-dom";
import "./ExtintorCards.scss";
import { getAvatarExtintorApi } from "../../../../api/extintor";
const { Meta } = Card;

export default function ExtintorList(props) {
  const {
    extintor: { extintores },
    editExtintor,
  } = props;

  return (
    <div className="extintores-cards">
      <Row>
        {extintores.map((extinto) => (
          <Col md={8} key={extinto._id} className="extintores-list__extintor">
            <Extintor extinto={extinto} editExtintor={editExtintor} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

function Extintor(props) {
  const { extinto, editExtintor } = props;
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
