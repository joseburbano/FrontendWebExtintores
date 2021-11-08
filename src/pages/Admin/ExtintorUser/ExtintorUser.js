import React, { useState, useEffect } from "react";
import { notification, Select } from "antd";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import ExtintorCards from "../../../components/Admin/ExtintorUser/ExtintorCards";
import Pagination from "../../../components/Pagination";
import { getAccessTokenApi } from "../../../api/auth";
import {
  getExtintorApi,
  getSedeApi,
  getSedeBloqueApi,
  getSedeBloquePisoApi,
} from "../../../api/extintor";

import "./ExtintorUser.scss";

function ExtintorUser(props) {
  const { location, history } = props;
  const [extintor, setExtintor] = useState(null);
  const [reloadExtintor, setReloadExtintor] = useState(false);
  //estado para conocer que item debemos consultar
  const [sede, setSede] = useState({});
  const { page = 1 } = queryString.parse(location.search);

  useEffect(() => {
    const accessToken = getAccessTokenApi();
    const ubi = sede.sede;
    const ubii = sede.bloque;
    const pis = sede.piso;

    if (ubi && ubii && pis) {
      getSedeBloquePisoApi(accessToken, 12, page, ubi, ubii, pis)
        .then((response) => {
          if (response?.code !== 200) {
            notification["warning"]({
              message: response.message,
            });
          } else {
            setExtintor(response.pisos);
          }
        })
        .catch(() => {
          notification["Error"]({
            message: "Error del servidor.",
          });
        });
    } else {
      if (ubi && ubii) {
        getSedeBloqueApi(accessToken, 12, page, ubi, ubii)
          .then((response) => {
            if (response?.code !== 200) {
              notification["warning"]({
                message: response.message,
              });
            } else {
              setExtintor(response.bloques);
            }
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor.",
            });
          });
      } else {
        if (sede.sede) {
          getSedeApi(accessToken, 12, page, sede.sede)
            .then((response) => {
              if (response?.code !== 200) {
                notification["warning"]({
                  message: response.message,
                });
              } else {
                setExtintor(response.sedes);
              }
            })
            .catch(() => {
              notification["error"]({
                message: "Error del servidor.",
              });
            });
        } else {
          getExtintorApi(12, page)
            .then((response) => {
              if (response?.code !== 200) {
                notification["warning"]({
                  message: response.message,
                });
              } else {
                setExtintor(response.extintores);
              }
            })
            .catch(() => {
              notification["error"]({
                message: "Error del servidor.",
              });
            });
        }
      }
    }
    setReloadExtintor(false);
  }, [page, reloadExtintor, sede]);

  if (!extintor) {
    return null;
  }
  //creamos la opciones que queremos cargar en una array
  const sedee = [
    { value: "prado alto", label: "Prado Alto" },
    { value: "quirinal", label: "Quirinal" },
    { value: "pitalito", label: "Pitalito" },
  ];

  const bloquee = [
    { value: "a", label: "A" },
    { value: "b", label: "B" },
    { value: "c", label: "C" },
  ];

  const pisoo = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];
  var pagina = extintor;

  return (
    <div className="extintor">
      <Select
        className="sede"
        style={{ width: 200 }}
        options={sedee}
        placeholder="Selecciona Sede"
        onChange={(e) => setSede({ ...sede, sede: e })}
        value={sede.sede}
      ></Select>
      <Select
        className="bloque"
        style={{ width: 200 }}
        options={bloquee}
        placeholder="Selecciona Bloque"
        onChange={(e) => setSede({ ...sede, bloque: e })}
        value={sede.bloque}
      ></Select>
      <Select
        style={{ width: 200 }}
        options={pisoo}
        placeholder="Selecciona Piso"
        onChange={(e) => setSede({ ...sede, piso: e })}
        value={sede.piso}
      ></Select>
      <div className="extintor__add-extintor"></div>
      <ExtintorCards extintor={extintor} />
      <Pagination pagina={pagina} location={location} history={history} />
    </div>
  );
}

export default withRouter(ExtintorUser);
