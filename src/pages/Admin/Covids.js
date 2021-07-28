import React from "react";
import { Row, Col } from "antd";
import { useParams } from "react-router-dom";
//importae complememento
import CovidInfo from "../../components/Admin/Covid/InfoCovid";

export default function Extintores() {
  const { url } = useParams();

  return (
    <Row>
      <Col md={4} />
      <Col md={16}>
        <CovidInfo url={url} />
      </Col>
      <Col md={4} />
    </Row>
  );
}