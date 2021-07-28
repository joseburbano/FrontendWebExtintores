import React, { useEffect, useState } from "react";
import LogoCorhuila from "../../assets/img/SVG/logoCorhuilablack.svg";
import TotalUsuario from "../../components/Admin/Home/TotalUsuario";
import TotalExtintor from "../../components/Admin/Home/TotalExtintor";
import TotalBueno from "../../components/Admin/Home/ExtintoresBuenos";
import TotalMalo from "../../components/Admin/Home/ExtintoresMalos";
import Vence from "../../components/Admin/Home/Vencen";
import Vencidos from "../../components/Admin/Home/Vencidos";
import TotalCovid from "../../components/Admin/Home/TotalCovid";
import TotalNorma from "../../components/Admin/Home/TotalNorma";
import CovidAlto from "../../components/Admin/Home/CovidAlto";
import { getCantidadUsersApi } from "../../api/admin";
import moment from "moment";
import { Row, Col, notification } from "antd";

import "./Admin.scss";

export default function Admin() {
  const [totalUser, setTotalUser] = useState(null);
  const [totalExtintor, setTotalExtintor] = useState(null);
  const [totalExtintorMalo, setTotalExtintorMalo] = useState(null);
  const [totalBueno, setTotalBueno] = useState(null);
  const [proximoVencer, setProximoVencer] = useState(null);
  const [extintoVencido, setExtintoVencido] = useState(null);
  const [totalCovid, setTotalCovid] = useState(null);
  const [totalnorma, setTotalnorma] = useState(null);
  const [totalCo, setTotalCo] = useState(null);

  useEffect(() => {
    var fecha = moment(fecha).format("YYYY-MM-DD");
    getCantidadUsersApi(fecha)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setTotalUser(response.totalUse);
          setTotalExtintor(response.totalExtint);
          setTotalBueno(response.totalBueno);
          setTotalExtintorMalo(response.totalMalo);
          setProximoVencer(response.proximosvencer);
          setExtintoVencido(response.totalvencidos);
          setTotalCovid(response.totalCovid);
          setTotalnorma(response.totalnorma);
          setTotalCo(response.totalCo);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error de servidor al consultar total usuarios.",
        });
      });
  }, []);

  return (
    <div className="ini">
      <div>
        <Row gutter={12} className="notify">
          <Col span={6}>
            <img className="logo" src={LogoCorhuila} alt="Corhuila" />
          </Col>
        </Row>
      </div>
      <div>
        <Row className="df" style={{ marginLeft: "5%" }}>
          <Col className="gutter-row" style={{ marginRight: "5%" }}>
            <div className="usuario">
              {" "}
              <TotalUsuario totalUser={totalUser} />
            </div>
          </Col>
          <Col className="gutter-row" style={{ marginRight: "5%" }}>
            <div className="total">
              {" "}
              <TotalExtintor totalExtintor={totalExtintor} />
            </div>
          </Col>
          <Col className="gutter-row" style={{ marginRight: "5%" }}>
            <div className="bueno">
              <TotalBueno totalBueno={totalBueno} />
            </div>
          </Col>
          <Col className="gutter-row" style={{ marginRight: "5%" }}>
            <div className="malo">
              <TotalMalo totalExtintorMalo={totalExtintorMalo} />
            </div>
          </Col>
        </Row>
        <Row style={{ marginLeft: "5%" }} className="dm">
          <Col className="gutter-row" style={{ marginRight: "5%" }}>
            <div className="malo">
              <Vence proximoVencer={proximoVencer} />
            </div>
          </Col>
          <Col className="gutter-row" style={{ marginRight: "5%" }}>
            <div className="malo">
              <Vencidos extintoVencido={extintoVencido} />
            </div>
          </Col>
          <Col className="gutter-row" style={{ marginRight: "5%" }}>
            <div className="malo">
              <TotalCovid totalCovid={totalCovid} />
            </div>
          </Col>
          <Col className="gutter-row" style={{ marginRight: "5%" }}>
            <div className="malo">
              <TotalNorma totalnorma={totalnorma} />
            </div>
          </Col>
          <Col className="gutter-row" style={{ marginRight: "5%" }}>
            <div className="malo">
              <CovidAlto totalCo={totalCo} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
