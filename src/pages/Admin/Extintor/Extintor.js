import React, { useState, useEffect } from "react";
import { Button, notification, Select, Spin } from "antd";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import Modal from "../../../components/Modal";
import ExtintorCards from "../../../components/Admin/Extintor/ExtintorCards";
import AddEditExtintoresForm from "../../../components/Admin/Extintor/AddEditExtintoresForm";
import Reporte from "../../../components/Admin/Reporte";
import Pagination from "../../../components/Pagination";
import { getAccessTokenApi } from "../../../api/auth";
import {
  getExtintorApi,
  getSedeApi,
  getSedeBloqueApi,
  getSedeBloquePisoApi,
} from "../../../api/extintor";
import "./Extintor.scss";

function Extintor(props) {
  const { location, history } = props;
  const [extintor, setExtintor] = useState(null);
  const [reloadExtintor, setReloadExtintor] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  //estado para conocer que item debemos consultar
  const [sede, setSede] = useState({});
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
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
            setExtintor(response);
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
              setExtintor(response);
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
                setExtintor(response);
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
                setExtintor(response);
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

  const addExtintor = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo Extintor");
    setModalContent(
      <AddEditExtintoresForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadExtintor={setReloadExtintor}
        extintor={null}
      />,
    );
  };

  const generateReporte = () => {
    setIsVisibleModal(true);
    setModalTitle("Generar Reporte");
    setModalContent(
      <Reporte
        setIsVisibleModal={setIsVisibleModal}
        setReloadExtintor={setReloadExtintor}
        extintor={null}
      />,
    );
  };

  const editExtintor = (extinto) => {
    setIsVisibleModal(true);
    setModalTitle("Editar Extintor");
    setModalContent(
      <AddEditExtintoresForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadExtintor={setReloadExtintor}
        extintor={extinto}
      />,
    );
  };

  if (!extintor) {
    return (
      <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }} />
    );
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
      <div className="extintor__add-extintor">
        <Button
          type="danger"
          onClick={() => generateReporte()}
          style={{ marginRight: "70%" }}
        >
          Reporte Extintores
        </Button>
        <Button type="primary" onClick={() => addExtintor()}>
          Nuevo extintor
        </Button>
      </div>
      <ExtintorCards
        editExtintor={editExtintor}
        extintor={extintor}
        setReloadExtintor={setReloadExtintor}
      />
      <Pagination
        pagina={extintor.total}
        location={location}
        history={history}
      />
      <Modal
        width="75%"
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

export default withRouter(Extintor);
