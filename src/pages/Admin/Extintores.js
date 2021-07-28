import React from "react";
import { Row, Col } from "antd";
import { useParams } from "react-router-dom";
//importae complemementos
import ExtintoresInfo from "../../components/Admin/Extintor/ExtintorInfo";

export default function Extintores() {
  const { url } = useParams();

  return (
    <Row>
      <Col md={4} />
      <Col md={16}>
        <ExtintoresInfo url={url} />
      </Col>
      <Col md={4} />
    </Row>
  );
}
